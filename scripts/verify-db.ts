import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log('Attempting to connect to database...');
    try {
        await prisma.$connect();
        console.log('Successfully connected to database!');
        const count = await prisma.user.count();
        console.log(`Connection verified. User count: ${count}`);
    } catch (e: any) {
        console.error('Connection FAILED.');
        console.error('Error name:', e.name);
        console.error('Error message:', e.message);
        if (e.meta) {
            console.error('Error meta:', e.meta);
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
