import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const dbUrl = process.env.DATABASE_URL;
  const hasDbUrl = !!dbUrl;
  const maskedUrl = hasDbUrl ? `${dbUrl.substring(0, 15)}...` : 'MISSING';

  try {
    // Dynamic import to catch initialization errors (e.g. missing binary, schema issues)
    // that happen at the top-level of lib/prisma.ts
    const { default: prisma } = await import('../lib/prisma');

    // Attempt basic query to verify connection
    await prisma.$connect();
    const count = await prisma.user.count();

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
      message: 'Database Connection/Init Failed',
      details: error.message,
      type: isPrismaError ? 'DatabaseError' : 'UnknownError',
      step: 'Initialization', // Flag to know if it failed during import/init
      envCheck: { hasDbUrl, maskedUrl },
    });
  }
}
