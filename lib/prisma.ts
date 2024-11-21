import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    // Configure connection pooling
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    },
    // Increase pool timeout and configure pool settings
    connectionTimeout: 20000, // 20 seconds
    pool: {
      min: 0,
      max: 10,
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}