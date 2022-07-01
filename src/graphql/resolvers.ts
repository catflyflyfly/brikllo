import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Context } from '../context';
import {
  TaskCreateInput,
  TaskListCreateInput,
  TaskListQueryInput,
  TaskMoveInput,
  TaskQueryInput,
  TaskUpdateInput,
} from './inputs';
import { Task, TaskList } from './models';
import service from '../services';

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

  @Mutation(() => TaskList)
  async createTaskList(
    @Arg('input') input: TaskListCreateInput,
    @Ctx() ctx: Context,
  ) {
    return service.graphql.createTaskList(input, ctx);
  }
}

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(@Arg('input') input: TaskQueryInput, @Ctx() ctx: Context) {
    return service.graphql.getTasks(input, ctx);
  }

  @Mutation(() => Task)
  async createTask(@Arg('input') input: TaskCreateInput, @Ctx() ctx: Context) {
    return service.graphql.createTask(input, ctx);
  }

  @Mutation(() => Task)
  async moveTask(@Arg('input') input: TaskMoveInput, @Ctx() ctx: Context) {
    return service.graphql.moveTask(input, ctx);
  }

  @Mutation(() => Task)
  async updateTask(@Arg('input') input: TaskUpdateInput, @Ctx() ctx: Context) {
    return service.graphql.updateTask(input, ctx);
  }
}
