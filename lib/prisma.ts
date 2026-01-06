import { PrismaClient } from '@prisma/client';
// import { withOptimize } from "@prisma/extension-optimize";

const prismaClientSingleton = () => {
  return new PrismaClient();
  // .$extends(
  //   withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY })
  // );
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

if (!process.env.DATABASE_URL) {
  console.warn('WARNING: DATABASE_URL is not defined in environment variables. Prisma Client may fail to connect.');
}

// Force short timeouts for Serverless environment to fail-fast
if (process.env.DATABASE_URL) {
  if (!process.env.DATABASE_URL.includes('connectTimeoutMS=')) {
    const separator = process.env.DATABASE_URL.includes('?') ? '&' : '?';
    process.env.DATABASE_URL = `${process.env.DATABASE_URL}${separator}connectTimeoutMS=5000&socketTimeoutMS=5000`;
  }
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

console.log('Prisma Client Initialized'); // Debug log

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
