 import PrismaClient from '@prisma/client';

// Create a singleton instance of PrismaClient
const prisma = new PrismaClient();

// Handle potential errors
prisma.$on('error', (e) => {
  console.error('Prisma Client error:', e);
});

export { prisma };