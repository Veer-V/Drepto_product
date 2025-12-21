import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- USERS ---');
    const users = await prisma.user.findMany();
    console.table(users);

    console.log('\n--- PRODUCTS ---');
    const products = await prisma.product.findMany();
    console.table(products.map(p => ({ name: p.name, price: p.price, mrp: p.mrp })));

    console.log('\n--- SUBSCRIPTIONS ---');
    const subs = await prisma.subscription.findMany();
    console.table(subs);

    console.log('\n--- CARTS ---');
    const carts = await prisma.cart.findMany({ include: { items: true } });
    console.dir(carts, { depth: null });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
