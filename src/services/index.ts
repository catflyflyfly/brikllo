import R from 'ramda';
import { Context } from '../context';
import { TaskList, TaskStatus } from '../graphql/models';
import {
  TaskCreateInput,
  TaskListCreateInput,
  TaskListQueryInput,
  TaskQueryInput,
} from '../graphql/inputs';
import rankService from './rank';
import * as db from '@prisma/client';

const getTaskLists = async (input: TaskListQueryInput, ctx: Context) => {
  return ctx.prisma.taskList.findMany({
    where: { id: { in: input.idIn } },
    skip: input.skip,
    take: input.take,
  });
};

const getTasksInTaskList = async (
  input: TaskQueryInput,
  taskList: TaskList,
  ctx: Context,
) => {
  return ctx.prisma.taskList
    .findUnique({
      where: { id: taskList.id || undefined },
    })
    ?.tasks({
      where: {
        status: input.status,
        taskListId: input.taskListIdEq,
        id: { in: input.idIn },
      },
      orderBy: input.order.orderByValue(),
      skip: input.skip,
      take: input.take,
    });
};

const getTasks = async (input: TaskQueryInput, ctx: Context) => {
  return ctx.prisma.task.findMany({
    where: {
      status: input.status,
      taskListId: input.taskListIdEq,
      id: { in: input.idIn },
    },
    orderBy: input.order.orderByValue(),
    skip: input.skip,
    take: input.take,
  });
};

const createTaskList = async (input: TaskListCreateInput, ctx: Context) => {
  return ctx.prisma.taskList.create({
    data: {
      createdBy: 'hello',
      updatedBy: 'hello',
      title: input.title,
    },
  });
};

const createTask = async (input: TaskCreateInput, ctx: Context) => {
  const taskListTopRank = (
    await ctx.prisma.task.findFirst({
      where: { taskListId: input.taskListId },
      orderBy: { rank: 'desc' },
    })
  )?.rank;

  const newTopRank = rankService.getNewTopRank(taskListTopRank);

  if (newTopRank === undefined) {
    const existingTasks = await ctx.prisma.task.findMany({
      where: { taskListId: input.taskListId },
      orderBy: { rank: 'desc' },
    });

    const newTask = await ctx.prisma.task.create({
      data: {
        createdBy: 'hello',
        updatedBy: 'hello',
        title: input.title,
        status: TaskStatus.IN_PROGRESS,
        taskListId: input.taskListId,
        rank: rankService.MAX,
      },
    });

    const allTasks = [newTask, ...existingTasks];

    return (await upsertRebalanceTasks(allTasks, ctx))[0];
  } else {
    return ctx.prisma.task.create({
      data: {
        createdBy: 'hello',
        updatedBy: 'hello',
        title: input.title,
        status: TaskStatus.IN_PROGRESS,
        taskListId: input.taskListId,
        rank: newTopRank,
      },
    });
  }
};

const upsertRebalanceTasks = async (orderedTasks: db.Task[], ctx: Context) => {
  const newRanks = rankService.balancedRanks(orderedTasks.length);

  R.zip(orderedTasks, newRanks).forEach(([task, newRank]) => {
    task.rank = newRank;
  });

  return Promise.all(
    orderedTasks.map((task) => {
      return ctx.prisma.task.upsert({
        where: { id: task.id },
        update: {
          ...task,
        },
        create: {
          ...task,
        },
      });
    }),
  );
};

const graphqlService = {
  getTaskLists,
  getTasksInTaskList,
  getTasks,
  createTaskList,
  createTask,
};

export default {
  graphql: graphqlService,
};
