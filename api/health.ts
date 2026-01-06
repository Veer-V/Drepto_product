import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const envKeys = Object.keys(process.env);
    const hasDbUrl = envKeys.includes('DATABASE_URL');

    // Direct instantiation to bypass lib/prisma.ts singleton potential issues
    const prisma = new PrismaClient();

    await prisma.$connect();
    const count = await prisma.user.count();
    await prisma.$disconnect();

    return res.status(200).json({
      status: 'ok',
      message: 'Database connected successfully',
      userCount: count,
      timestamp: new Date().toISOString(),
      envCheck: { hasDbUrl },
    });
  } catch (error: any) {
    console.error('Health Check Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Health Check Failed',
      details: error.message,
      stack: error.stack
    });
  }
}
