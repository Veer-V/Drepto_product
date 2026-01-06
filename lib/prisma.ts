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

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
