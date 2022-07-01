import 'reflect-metadata';
import { PrismaClient, TaskStatus } from '@prisma/client';
const prisma = new PrismaClient();

const seeder = 'seeder';

const createdBy = seeder;
const updatedBy = seeder;

async function main() {
  await prisma.taskList.createMany({
    data: [
      {
        createdBy,
        updatedBy,
        title: 'Brikllo',
      },
      {
        createdBy,
        updatedBy,
        title: 'Camping vacation preps',
      },
      {
        createdBy,
        updatedBy,
        title: 'Finish that book',
      },
    ],
  });
  await prisma.task.createMany({
    data: [
      {
        taskListId: 1,
        createdBy,
        updatedBy,
        title: 'Create GraphQL Server',
        status: TaskStatus.DONE,
        rank: '5000000000',
      },
      {
        taskListId: 1,
        createdBy,
        updatedBy,
        title: 'Design mock APIs',
        status: TaskStatus.DONE,
        rank: '2500000000',
      },
      {
        taskListId: 1,
        createdBy,
        updatedBy,
        title: 'Connect to DB',
        status: TaskStatus.DONE,
        rank: '1250000000',
      },
      {
        taskListId: 1,
        createdBy,
        updatedBy,
        title: 'Design mutation APIs',
        status: TaskStatus.IN_PROGRESS,
        rank: '0625000000',
      },
      {
        taskListId: 1,
        createdBy,
        updatedBy,
        title: 'Fine tuning',
        status: TaskStatus.IN_PROGRESS,
        rank: '0312500000',
      },
      {
        taskListId: 2,
        createdBy,
        updatedBy,
        title: 'Pack my bag',
        status: TaskStatus.IN_PROGRESS,
        rank: '5000000000',
      },
      {
        taskListId: 2,
        createdBy,
        updatedBy,
        title: 'Prepare food',
        status: TaskStatus.IN_PROGRESS,
        rank: '2500000000',
      },
      {
        taskListId: 2,
        createdBy,
        updatedBy,
        title: 'Pin landmarks in the map',
        status: TaskStatus.DONE,
        rank: '1250000000',
      },
      {
        taskListId: 2,
        createdBy,
        updatedBy,
        title: 'Clean my room',
        status: TaskStatus.DONE,
        rank: '0625000000',
      },
      {
        taskListId: 2,
        createdBy,
        updatedBy,
        title: 'Do the dishes',
        status: TaskStatus.DONE,
        rank: '0312500000',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 1',
        status: TaskStatus.IN_PROGRESS,
        rank: '5000000000',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 2',
        status: TaskStatus.IN_PROGRESS,
        rank: '2500000000',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 3',
        status: TaskStatus.IN_PROGRESS,
        rank: '1250000000',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 4',
        status: TaskStatus.IN_PROGRESS,
        rank: '0625000000',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 5',
        status: TaskStatus.IN_PROGRESS,
        rank: '0312500000',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 6',
        status: TaskStatus.IN_PROGRESS,
        rank: '0156250000',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 7',
        status: TaskStatus.IN_PROGRESS,
        rank: '0078125000',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 8',
        status: TaskStatus.IN_PROGRESS,
        rank: '0039062500',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 9',
        status: TaskStatus.IN_PROGRESS,
        rank: '0019531250',
      },
      {
        taskListId: 3,
        createdBy,
        updatedBy,
        title: 'Chapter 10',
        status: TaskStatus.IN_PROGRESS,
        rank: '0009765625',
      },
    ],
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
