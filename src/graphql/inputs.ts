import { Field, InputType } from 'type-graphql';
import { TaskStatus } from './models';

@InputType()
export class TaskListQueryInput {
  @Field({ nullable: true, defaultValue: 0 })
  skip!: number;

  @Field({ nullable: true, defaultValue: 5 })
  take!: number;
}

@InputType()
export class TaskQueryInput {
  @Field(() => TaskStatus, { nullable: true })
  status?: TaskStatus;

  @Field({ nullable: true, defaultValue: 0 })
  skip!: number;

  @Field({ nullable: true, defaultValue: 5 })
  take!: number;
}
