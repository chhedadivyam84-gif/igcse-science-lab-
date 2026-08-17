import { PrismaClient } from '@prisma/client';

// Next's dev server re-evaluates modules on every hot reload; without the global
// cache that would open a new connection pool each time.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
