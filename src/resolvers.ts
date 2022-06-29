import { Ctx, Query, Resolver } from 'type-graphql';
import { Context } from './app';
import { Task } from './models';

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(@Ctx() ctx: Context) {
    return ctx.tasks;
  }
}
