import { Field, InputType } from 'type-graphql';
import { OrderDirection, TaskOrderBy, TaskStatus } from './models';

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
}

@InputType()
export class TaskListQueryInput {
  @Field({ nullable: true, defaultValue: 0 })
  skip!: number;

  @Field({ nullable: true, defaultValue: 5 })
  take!: number;

  @Field({ nullable: true })
  idEq?: number;
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
}
