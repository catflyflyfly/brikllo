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
import service from './service';

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
    return service.getTaskLists(input, ctx);
  }

  @FieldResolver(() => [Task])
  async tasks(
    @Arg('input') input: TaskQueryInput,
    @Root() taskList: TaskList,
    @Ctx() ctx: Context,
  ) {
    return service.getTasksInTaskList(input, taskList, ctx);
  }
}

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(@Arg('input') input: TaskQueryInput, @Ctx() ctx: Context) {
    return service.getTasks(input, ctx);
  }
}
