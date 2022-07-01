import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { context } from './context';
import { buildAppSchema } from './graphql/schema';

export const app = async () => {
  const schema = await buildAppSchema();

  new ApolloServer({ schema, context }).listen({ port: process.env.PORT }, () =>
    console.log(`
🚀 Server ready at: http://localhost:${process.env.PORT}`),
  );
};
