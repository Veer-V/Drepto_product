import { PrismaClient } from "@prisma/client";
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

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
