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
  @Field({ nullable: true })
  skip?: number;

  @Field({ nullable: true })
  take?: number;
}

@InputType()
export class TaskQueryInput {
  @Field(() => TaskStatus, { nullable: true })
  status?: TaskStatus;

  @Field({ nullable: true })
  skip?: number;

  @Field({ nullable: true })
  take?: number;
}

@Resolver(TaskList)
export class TaskListResolver {
  @Query(() => [TaskList])
  async taskLists(
    @Arg('input') input: TaskListQueryInput,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.taskList.findMany({
      skip: input.skip,
      take: input.take,
    });
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
        skip: input.skip,
        take: input.take,
      });
  }
}

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(@Arg('input') input: TaskQueryInput, @Ctx() ctx: Context) {
    return ctx.prisma.task.findMany({
      where: { status: input.status },
      skip: input.skip,
      take: input.take,
    });
  }
}
