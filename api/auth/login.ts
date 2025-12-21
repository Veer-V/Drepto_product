import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
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
        console.error('Login error:', error);
        const fs = require('fs');
        const log = `[${new Date().toISOString()}] LOGIN_ERROR: ${error.message}\nSTACK: ${error.stack}\nREQ_BODY: ${JSON.stringify(req.body)}\n\n`;
        try { fs.appendFileSync('server_error.log', log); } catch (e) { console.error('Failed to write log', e); }
        return res.status(500).json({ message: 'Internal server error' });
    }
}
