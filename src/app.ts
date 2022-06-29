import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import * as tq from 'type-graphql';
import { Task, TaskList } from './models';
import { TaskListResolver } from './resolvers';

export const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [TaskListResolver],
    scalarsMap: [],
  });

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log(`
🚀 Server ready at: http://localhost:4000`),
  );
};

export interface Context {
  taskLists: TaskList[];
}

const context = {
  taskLists: [
    new TaskList(1, 'Brikllo', [
      new Task(1, 'Design mock APIs'),
      new Task(2, 'Connect to DB'),
    ]),
  ],
};
