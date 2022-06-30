import { Context } from './context';
import { TaskList } from './models';
import { TaskListQueryInput, TaskQueryInput } from './resolvers';

const getTaskLists = async (input: TaskListQueryInput, ctx: Context) => {
  return ctx.prisma.taskList.findMany({
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
      where: { status: input.status },
      skip: input.skip,
      take: input.take,
    });
};

const getTasks = async (input: TaskQueryInput, ctx: Context) => {
  return ctx.prisma.task.findMany({
    where: { status: input.status },
    skip: input.skip,
    take: input.take,
  });
};

export default {
  getTaskLists,
  getTasksInTaskList,
  getTasks,
};
