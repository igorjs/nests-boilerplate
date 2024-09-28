// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const schedule1 = await prisma.schedule.create({
    data: {
      agentId: 1,
      accountId: 1,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const schedule2 = await prisma.schedule.create({
    data: {
      agentId: 2,
      accountId: 2,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const task1 = await prisma.task.create({
    data: {
      accountId: 1,
      scheduleId: schedule1.id,
      startTime: new Date(),
      duration: 10,
      type: 'WORK',
    },
  });

  const task2 = await prisma.task.create({
    data: {
      accountId: 2,
      scheduleId: schedule2.id,
      startTime: new Date(),
      duration: 10,
      type: 'BREAK',
    },
  });

  console.log({ schedule1, schedule2, task1, task2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
