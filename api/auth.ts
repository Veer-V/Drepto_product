import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// Direct instantiation to ensure fresh connection (matching the working api/test-db)
const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log('[Auth] Request Started. Query:', req.query);

    // CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { action } = req.query;

    try {
        await prisma.$connect();
        console.log('[Auth] DB Connected');

        // ==========================================
        // LOGIN
        // ==========================================
        if (action === 'login') {
            const { email, password } = req.body;
            console.log('[Auth] Login attempt for:', email);

            if (!process.env.JWT_SECRET) {
                console.error('[Auth] Critical: JWT_SECRET missing');
                return res.status(500).json({ message: 'Server Configuration Error' });
            }

            if (!email || !password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const user = await prisma.user.findFirst({
                where: { OR: [{ email }, { phoneNumber: email }] },
            });

            if (!user) {
                console.log('[Auth] User not found');
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.log('[Auth] Invalid password');
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' },
            );

            res.setHeader('Set-Cookie', serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            }));

            console.log('[Auth] Login Success');
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
        }

        // ==========================================
        // REGISTER
        // ==========================================
        else if (action === 'register') {
            const { email, password, firstName, lastName, phone, gender, age } = req.body;
            console.log('[Auth] Register attempt for:', email);

            if (!email || !password || !firstName || !lastName || !phone || !gender || !age) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

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
                maxAge: 60 * 60 * 24 * 7,
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
        }

        else {
            return res.status(400).json({ message: `Invalid action: ${action}` });
        }

    } catch (error: any) {
        console.error('[Auth] CRASH:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            details: error.message,
            stack: error.stack
        });
    } finally {
        await prisma.$disconnect();
    }
}
