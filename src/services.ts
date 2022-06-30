import { Context } from './context';
import { TaskList } from './graphql/models';
import {
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
      title: input.title,
      createdBy: 'hello',
      updatedBy: 'hello',
    },
  });
};

const graphqlService = {
  getTaskLists,
  getTasksInTaskList,
  getTasks,
  createTaskList,
};

export default {
  graphql: graphqlService,
};
