import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { plan } = req.body;
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const userId = decoded.userId;

    // Calculate end date (e.g., 1 month)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    // Fetch User Details for Snapshot
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan: plan || 'Standard',
        status: 'Active',
        startDate,
        endDate,
        // Snapshot Data
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        userContact: user.phoneNumber || 'Not Provided',
      },
    });

    return res
      .status(201)
      .json({ message: 'Subscribed successfully', subscription });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return res.status(500).json({
      message: `Subscription Failed: ${error.message}`,
      stack: error.stack,
    });
  }
}
