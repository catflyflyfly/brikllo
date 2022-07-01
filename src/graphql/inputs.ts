import { Field, InputType, Int } from 'type-graphql';
import {
  OrderDirection,
  Task,
  TaskList,
  TaskOrderBy,
  TaskStatus,
} from './models';

@InputType()
export class TaskOrder {
  @Field(() => TaskOrderBy)
  by!: TaskOrderBy;

  @Field(() => OrderDirection)
  direction!: OrderDirection;

  orderByValue: () => Record<string, 'asc' | 'desc'> = () => {
    switch (this.by) {
      case TaskOrderBy.RANK:
        return { rank: this.directionValue() };
    }
  };

  directionValue: () => 'asc' | 'desc' = () => {
    switch (this.direction) {
      case OrderDirection.ASC:
        return 'asc';
      case OrderDirection.DESC:
        return 'desc';
    }
  };

  constructor(by: TaskOrderBy, direction: OrderDirection) {
    this.by = by;
    this.direction = direction;
  }
}

@InputType()
export class TaskListQueryInput {
  @Field({ nullable: true, defaultValue: 0 })
  skip!: number;

  @Field({ nullable: true, defaultValue: 5 })
  take!: number;

  @Field(() => [Int], { nullable: true })
  idIn?: number[];
}

@InputType()
export class TaskQueryInput {
  @Field({ nullable: true, defaultValue: 0 })
  skip!: number;

  @Field({ nullable: true, defaultValue: 5 })
  take!: number;

  @Field(() => TaskStatus, { nullable: true })
  status?: TaskStatus;

  @Field(() => TaskOrder, {
    nullable: true,
    defaultValue: { by: TaskOrderBy.RANK, direction: OrderDirection.DESC },
  })
  order!: TaskOrder;

  @Field({ nullable: true })
  taskListIdEq?: number;

  @Field(() => [Int], { nullable: true })
  idIn?: number[];
}

@InputType()
export class TaskListCreateInput implements Partial<TaskList> {
  @Field()
  title!: string;
}

@InputType()
export class TaskCreateInput implements Partial<Task> {
  @Field()
  taskListId!: number;

  @Field()
  title!: string;
}

@InputType()
export class TaskMoveInput {
  @Field()
  taskId!: number;

  @Field()
  taskListId!: number;

  @Field()
  position!: number;
}

@InputType()
export class TaskUpdateInput implements Partial<Task> {
  @Field()
  id!: number;

  @Field({ nullable: true })
  title?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: TaskStatus;
}
