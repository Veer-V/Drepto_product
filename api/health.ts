import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const dbUrl = process.env.DATABASE_URL;
  const hasDbUrl = !!dbUrl;
  const maskedUrl = hasDbUrl ? `${dbUrl.substring(0, 15)}...` : 'MISSING';

  try {
    // Attempt basic query to verify connection
    // We use the shared prisma instance which handles connection pooling
    await prisma.$connect(); // Explicit connect to fail fast if there's an issue, though not strictly required
    const count = await prisma.user.count();

    // We intentionally do NOT disconnect the shared client here

    return res.status(200).json({
      status: 'ok',
      message: 'Database connected successfully',
      userCount: count,
      timestamp: new Date().toISOString(),
      envCheck: { hasDbUrl, maskedUrl },
    });
  } catch (error: any) {
    console.error('Health Check Error:', error);

    // Check for specific Prisma errors
    const isPrismaError = error.code || (error.message && error.message.includes('Prisma'));

    return res.status(500).json({
      status: 'error',
      message: 'Database Connection Failed',
      details: error.message,
      type: isPrismaError ? 'DatabaseError' : 'UnknownError',
      envCheck: { hasDbUrl, maskedUrl },
    });
  }
}
