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
    return ctx.taskLists;
  }

  @FieldResolver(() => [Task])
  tasks(
    @Arg('input') input: TaskQueryInput,
    @Root() taskList: TaskList,
  ): Task[] {
    return taskList.tasks.filter((task) => task.status === input.status);
  }
}
