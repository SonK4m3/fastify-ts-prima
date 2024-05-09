import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['info'],
  transactionOptions: {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    maxWait: 5000, // default: 2000
    timeout: 10000, // default: 5000
  },
  errorFormat: 'pretty',
});

export default prisma;
