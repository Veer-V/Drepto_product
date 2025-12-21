import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        await prisma.$connect();
        const count = await prisma.user.count();
        return res.status(200).json({ status: 'ok', userCount: count, message: 'Database connected' });
    } catch (error: any) {
        console.error('Health Check Error:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    } finally {
        await prisma.$disconnect();
    }
}
