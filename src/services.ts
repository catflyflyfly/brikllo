import { Context } from './context';
import { TaskList, TaskStatus } from './graphql/models';
import {
  TaskCreateInput,
  TaskListCreateInput,
  TaskListQueryInput,
  TaskQueryInput,
} from './graphql/inputs';

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
  return ctx.prisma.task.create({
    data: {
      createdBy: 'hello',
      updatedBy: 'hello',
      title: input.title,
      status: TaskStatus.IN_PROGRESS,
      taskListId: input.taskListId,
      rank: '0000000000',
    },
  });
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
