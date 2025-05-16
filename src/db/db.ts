// src/db.ts (or src/db/index.ts)
import { Prisma } from '@prisma/client';

const prisma = new Prisma.PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;