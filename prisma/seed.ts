import 'reflect-metadata';
import { PrismaClient, TaskStatus } from '@prisma/client';
const prisma = new PrismaClient();

const seeder = 'seeder';

const createdBy = seeder;
const updatedBy = seeder;

async function main() {
  await prisma.taskList.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      createdBy,
      updatedBy,
      title: 'Brikllo',
      tasks: {
        create: [
          {
            id: 1,
            createdBy,
            updatedBy,
            title: 'Create GraphQL Server',
            status: TaskStatus.DONE,
          },
          {
            id: 2,
            createdBy,
            updatedBy,
            title: 'Design mock APIs',
            status: TaskStatus.DONE,
          },
          {
            id: 3,
            createdBy,
            updatedBy,
            title: 'Connect to DB',
            status: TaskStatus.IN_PROGRESS,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
