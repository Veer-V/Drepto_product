import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const dbUrl = process.env.DATABASE_URL;
  const hasDbUrl = !!dbUrl;
  const maskedUrl = hasDbUrl ? `${dbUrl.substring(0, 15)}...` : 'MISSING';

  try {
    console.log('Health Check: Connecting to DB...');
    // Use a local client to test connection irrespective of global instance
    const client = new PrismaClient();
    await client.$connect();
    const count = await client.user.count();
    await client.$disconnect();

    return res.status(200).json({
      status: 'ok',
      message: 'Database connected successfully',
      userCount: count,
      envCheck: { hasDbUrl, maskedUrl },
    });
  } catch (error: any) {
    console.error('Health Check Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Database Connection Failed',
      details: error.message,
      envCheck: { hasDbUrl, maskedUrl },
    });
  }
}
