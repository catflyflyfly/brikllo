import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import * as tq from 'type-graphql';
import { context } from './context';
import { TaskStatus } from './models';
import { TaskListResolver } from './resolvers';

export const app = async () => {
  registerAllEnum();

  const schema = await tq.buildSchema({
    resolvers: [TaskListResolver],
    scalarsMap: [],
  });

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log(`
🚀 Server ready at: http://localhost:4000`),
  );
};

const registerAllEnum = () => {
  tq.registerEnumType(TaskStatus, {
    name: 'TaskStatus',
  });
};
