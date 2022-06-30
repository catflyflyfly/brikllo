import { expect } from 'chai';
import { GraphQLSchema, graphql } from 'graphql';
import { Maybe } from 'type-graphql';
import { context } from '../../src/context';

type TestSchemaOptions = {
  schema: GraphQLSchema;
  query: string;
  variables: Maybe<{ [key: string]: unknown }>;
  expectedResponse: string;
};

export const testSchema = async (options: TestSchemaOptions) => {
  const response = await graphql(
    options.schema,
    options.query,
    undefined,
    context,
    options.variables,
  );

  expect(response).to.deep.equal(JSON.parse(options.expectedResponse));
};
