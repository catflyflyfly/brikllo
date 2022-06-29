import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TaskList {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => [Task])
  tasks: Task[];

  constructor(id: number, title: string, tasks: Task[]) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }
}

@ObjectType()
export class Task {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
