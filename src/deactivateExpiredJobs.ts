import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deactivateExpiredJobs() {
  const now = new Date();
  const result = await prisma.jobListing.updateMany({
    where: {
      expiration_date: { lte: now },
      is_active: true,
    },
    data: { is_active: false },
  });
  console.log(`Deactivated ${result.count} expired job listings.`);
  await prisma.$disconnect();
}

deactivateExpiredJobs().catch((err) => {
  console.error('Error deactivating expired jobs:', err);
  prisma.$disconnect();
  process.exit(1);
}); 