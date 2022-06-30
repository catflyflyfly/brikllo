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
            status: TaskStatus.DONE,
          },
          {
            id: 4,
            createdBy,
            updatedBy,
            title: 'Design mutation APIs',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 5,
            createdBy,
            updatedBy,
            title: 'Fine tuning',
            status: TaskStatus.IN_PROGRESS,
          },
        ],
      },
    },
  });
  await prisma.taskList.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      createdBy,
      updatedBy,
      title: 'Camping vacation preps',
      tasks: {
        create: [
          {
            id: 6,
            createdBy,
            updatedBy,
            title: 'Pack my bag',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 7,
            createdBy,
            updatedBy,
            title: 'Prepare food',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 8,
            createdBy,
            updatedBy,
            title: 'Pin landmarks in the map',
            status: TaskStatus.DONE,
          },
          {
            id: 9,
            createdBy,
            updatedBy,
            title: 'Clean my room',
            status: TaskStatus.DONE,
          },
        ],
      },
    },
  });
  await prisma.taskList.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      createdBy,
      updatedBy,
      title: 'Finish that book',
      tasks: {
        create: [
          {
            id: 11,
            createdBy,
            updatedBy,
            title: 'Chapter 1',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 12,
            createdBy,
            updatedBy,
            title: 'Chapter 2',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 13,
            createdBy,
            updatedBy,
            title: 'Chapter 3',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 14,
            createdBy,
            updatedBy,
            title: 'Chapter 4',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 15,
            createdBy,
            updatedBy,
            title: 'Chapter 5',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 16,
            createdBy,
            updatedBy,
            title: 'Chapter 6',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 17,
            createdBy,
            updatedBy,
            title: 'Chapter 7',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 18,
            createdBy,
            updatedBy,
            title: 'Chapter 8',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 19,
            createdBy,
            updatedBy,
            title: 'Chapter 9',
            status: TaskStatus.IN_PROGRESS,
          },
          {
            id: 20,
            createdBy,
            updatedBy,
            title: 'Chapter 10',
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
