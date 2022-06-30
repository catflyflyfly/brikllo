import { Context } from './context';
import { TaskList } from './graphql/models';
import { TaskListQueryInput, TaskQueryInput } from './graphql/inputs';

const getTaskLists = async (input: TaskListQueryInput, ctx: Context) => {
  return ctx.prisma.taskList.findMany({
    where: { id: input.idEq },
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
    },
    orderBy: input.order.orderByValue(),
    skip: input.skip,
    take: input.take,
  });
};

const graphqlService = {
  getTaskLists,
  getTasksInTaskList,
  getTasks,
};

export default {
  graphql: graphqlService,
};
