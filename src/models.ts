import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
