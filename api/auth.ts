import { createHandler } from '../lib/api-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default createHandler(async (req, res) => {
    const { action } = req.query;

    // Dynamic import to prevent init crash on Vercel
    const { default: prisma } = await import('../lib/prisma');

    // ==========================================
    // LOGIN
    // ==========================================
    if (action === 'login') {
        if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

        const { email, password } = req.body;

        if (!process.env.JWT_SECRET) {
            console.error('SERVER ERROR: JWT_SECRET is missing');
            return res.status(500).json({ message: 'Configuration Error: Server is misconfigured' });
        }

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const user = await prisma.user.findFirst({
                where: { OR: [{ email }, { phoneNumber: email }] },
            });

            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' },
            );

            res.setHeader('Set-Cookie', serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            }));

            return res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isFirstOrder: user.isFirstOrder,
                },
                token,
            });
        } catch (error: any) {
            console.error('Login Error:', error);
            return res.status(500).json({ message: 'Internal Server Error during Login', details: error.message });
        }
    }

    // ==========================================
    // REGISTER
    // ==========================================
    else if (action === 'register') {
        if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

        const { email, password, firstName, lastName, phone, gender, age } = req.body;

        if (!email || !password || !firstName || !lastName || !phone || !gender || !age) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) return res.status(409).json({ message: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    phoneNumber: phone,
                    gender,
                    age: age ? parseInt(age) : null,
                    isFirstOrder: true,
                },
            });

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' },
            );

            res.setHeader('Set-Cookie', serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            }));

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isFirstOrder: user.isFirstOrder,
                },
                token,
            });
        } catch (error: any) {
            console.error('Registration Error:', error);
            return res.status(500).json({ message: 'Internal Server Error during Registration', details: error.message });
        }
    }

    // ==========================================
    // UNKNOWN ACTION
    // ==========================================
    else {
        return res.status(400).json({ message: `Invalid action: ${action}` });
    }
});
