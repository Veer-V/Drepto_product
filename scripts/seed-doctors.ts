import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'General Physician',
    qualification: 'MBBS, MD',
    experience: 12,
    rating: 4.8,
    reviews: 124,
    consultationFee: 499,
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    about:
      'Dr. Sarah is a compassionate General Physician with over 12 years of experience. She specializes in proactive health monitoring and preventive care.',
    available: true,
  },
  {
    name: 'Dr. Rajesh Gupta',
    specialty: 'Cardiologist',
    qualification: 'MBBS, MD, DM (Cardiology)',
    experience: 15,
    rating: 4.9,
    reviews: 89,
    consultationFee: 999,
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    about:
      'Dr. Rajesh is a renowned Cardiologist known for his expertise in treating complex heart conditions.',
    available: true,
  },
  {
    name: 'Dr. Emily Chen',
    specialty: 'Dermatologist',
    qualification: 'MBBS, DDVL',
    experience: 8,
    rating: 4.7,
    reviews: 210,
    consultationFee: 699,
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    about:
      'Dr. Emily helps you achieve healthy, glowing skin with modern dermatological treatments.',
    available: true,
  },
  {
    name: 'Dr. Michael Ross',
    specialty: 'Pediatrician',
    qualification: 'MBBS, MD (Pediatrics)',
    experience: 10,
    rating: 4.8,
    reviews: 150,
    consultationFee: 599,
    image:
      'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&q=80&w=300&h=300',
    about:
      'Dr. Michael loves kids and provides the best care for your little ones.',
    available: true,
  },
  {
    name: 'Dr. Anita Desai',
    specialty: 'Gynecologist',
    qualification: 'MBBS, MS (OBG)',
    experience: 14,
    rating: 4.9,
    reviews: 320,
    consultationFee: 799,
    image:
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300&h=300',
    about: "Dr. Anita is a trusted specialist in women's health and wellness.",
    available: true,
  },
];

async function main() {
  console.log('Start seeding doctors...');

  // Clear existing doctors to avoid duplicates if re-run (optional, or check logic)
  // await prisma.doctor.deleteMany({});

  for (const doc of doctors) {
    const existing = await prisma.doctor.findFirst({
      where: { name: doc.name },
    });

    if (!existing) {
      await prisma.doctor.create({
        data: doc,
      });
      console.log(`Created doctor: ${doc.name}`);
    } else {
      console.log(`Skipped existing doctor: ${doc.name}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
