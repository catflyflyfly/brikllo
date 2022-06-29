import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import * as tq from 'type-graphql';
import { Task } from './models';
import { TaskResolver } from './resolvers';

export const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [TaskResolver],
    scalarsMap: [],
  });

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log(`
🚀 Server ready at: http://localhost:4000`),
  );
};

export interface Context {
  tasks: Task[];
}

const context = {
  tasks: [new Task(1), new Task(2)],
};
