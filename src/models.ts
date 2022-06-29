import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TaskList {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

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

  @Field(() => TaskStatus)
  status: TaskStatus;

  constructor(id: number, title: string, status: TaskStatus) {
    this.id = id;
    this.title = title;
    this.status = status;
  }
}

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
