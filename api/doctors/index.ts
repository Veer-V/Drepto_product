import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default async function handler(req: Request, res: Response) {
    if (req.method === 'GET') {
        try {
            const doctors = await prisma.doctor.findMany({
                where: { available: true }
            });
            return res.status(200).json(doctors);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            return res.status(500).json({ error: 'Failed to fetch doctors' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
