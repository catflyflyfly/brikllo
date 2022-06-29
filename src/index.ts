import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import * as tq from 'type-graphql';
import { Ctx, Field, ID, ObjectType, Query, Resolver } from 'type-graphql';

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [TaskResolver],
    scalarsMap: [],
  });

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log(`
🚀 Server ready at: http://localhost:4000`),
  );
};

@ObjectType()
export class Task {
  @Field(() => ID)
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Context {
  tasks: Task[];
}

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(@Ctx() ctx: Context) {
    return ctx.tasks;
  }
}

const context = {
  tasks: [new Task(1), new Task(2)],
};

app();
