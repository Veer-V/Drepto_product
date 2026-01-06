import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

// Standalone instance, NO SINGLETON, to test fresh connection
const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        console.log('[Test DB] Connecting...');
        await prisma.$connect();
        console.log('[Test DB] Connected. Fetching user count...');

        // Simple query
        const count = await prisma.user.count();
        console.log('[Test DB] Count:', count);

        await prisma.$disconnect();

        return res.status(200).json({
            status: 'DB Connection Success',
            userCount: count,
            env: process.env.VERCEL_ENV || 'local'
        });
    } catch (error: any) {
        console.error('[Test DB] Error:', error);
        return res.status(500).json({
            status: 'DB Connection Failed',
            error: error.message,
            stack: error.stack
        });
    }
}
