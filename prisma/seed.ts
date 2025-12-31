import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const products = [
    {
      name: 'Drepto Glucometer',
      description: 'Advanced glucometer for accurate blood sugar monitoring.',
      price: 45.0,
      mrp: 100.0,
      category: 'Device',
      images: ['https://placehold.co/200x200?text=Glucometer'],
    },
    {
      name: 'Drepto BP Monitor',
      description: 'Digital Blood Pressure monitor with large display.',
      price: 45.0,
      mrp: 100.0,
      category: 'Device',
      images: ['https://placehold.co/200x200?text=BP+Monitor'],
    },
    {
      name: 'Drepto Thermometer',
      description: 'Instant read digital thermometer.',
      price: 45.0,
      mrp: 100.0,
      category: 'Device',
      images: ['https://placehold.co/200x200?text=Thermometer'],
    },
  ];

  for (const p of products) {
    const created = await prisma.product.create({
      data: p,
    });
    console.log(`Created product: ${created.name}`);
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
