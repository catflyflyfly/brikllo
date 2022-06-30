import { Field, InputType } from 'type-graphql';
import { TaskStatus } from './models';

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
