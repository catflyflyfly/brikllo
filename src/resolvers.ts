import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Context } from './context';
import { Task, TaskList, TaskStatus } from './models';

@InputType()
export class TaskListQueryInput {
  @Field()
  id!: number;
}

@InputType()
export class TaskQueryInput {
  @Field(() => TaskStatus)
  status!: TaskStatus;
}

@Resolver(TaskList)
export class TaskListResolver {
  @Query(() => [TaskList])
  async taskLists(
    @Arg('input') input: TaskListQueryInput,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.taskList.findMany();
  }

  @FieldResolver(() => [Task])
  async tasks(
    @Arg('input') input: TaskQueryInput,
    @Ctx() ctx: Context,
    @Root() taskList: TaskList,
  ) {
    return ctx.prisma.taskList
      .findUnique({
        where: { id: taskList.id || undefined },
      })
      ?.tasks({
        where: { status: input.status },
      });
  }
}
