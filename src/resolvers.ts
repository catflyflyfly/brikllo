import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Context } from './context';
import { TaskListQueryInput, TaskQueryInput } from './inputs';
import { Task, TaskList } from './models';
import service from './services';

@Resolver(TaskList)
export class TaskListResolver {
  @Query(() => [TaskList])
  async taskLists(
    @Arg('input') input: TaskListQueryInput,
    @Ctx() ctx: Context,
  ) {
    return service.graphql.getTaskLists(input, ctx);
  }

  @FieldResolver(() => [Task])
  async tasks(
    @Arg('input') input: TaskQueryInput,
    @Root() taskList: TaskList,
    @Ctx() ctx: Context,
  ) {
    return service.graphql.getTasksInTaskList(input, taskList, ctx);
  }
}

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(@Arg('input') input: TaskQueryInput, @Ctx() ctx: Context) {
    return service.graphql.getTasks(input, ctx);
  }
}
