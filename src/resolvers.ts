import { Ctx, Query, Resolver } from 'type-graphql';
import { Context } from './context';
import { TaskList } from './models';

@Resolver(TaskList)
export class TaskListResolver {
  @Query(() => [TaskList])
  async taskLists(@Ctx() ctx: Context) {
    return ctx.taskLists;
  }
}
