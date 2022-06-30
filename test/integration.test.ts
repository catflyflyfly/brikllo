import 'reflect-metadata';
import { expect } from 'chai';
import { GraphQLSchema, graphql } from 'graphql';
import { buildAppSchema } from '../src/graphql/schema';
import { context } from '../src/context';
import { Maybe } from 'type-graphql';

describe('brikllo', () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await buildAppSchema();
  });

  describe('taskLists', () => {
    type TestSchemaOptions = {
      query: string;
      variables: Maybe<{ [key: string]: unknown }>;
      expectedResponse: string;
    };

    const testSchema = async (options: TestSchemaOptions) => {
      const response = await graphql(
        schema,
        options.query,
        undefined,
        context,
        options.variables,
      );

      expect(response).to.deep.equal(JSON.parse(options.expectedResponse));
    };

    describe('should return data as expected', async () => {
      it('case 1', async () => {
        await testSchema({
          query: `
            query Query($input: TaskListQueryInput!, $tasksInput2: TaskQueryInput!) {
              taskLists(input: $input) {
                id
                title
                tasks(input: $tasksInput2) {
                  id
                  title
                  status
                }
              }
            }
          `,
          variables: {
            input: {
              id: 1,
            },
            tasksInput2: {
              status: 'IN_PROGRESS',
            },
          },
          expectedResponse: `
            {
              "data": {
                "taskLists": [
                  {
                    "id": "1",
                    "title": "Brikllo",
                    "tasks": [
                      {
                        "id": "3",
                        "title": "Connect to DB",
                        "status": "IN_PROGRESS"
                      }
                    ]
                  }
                ]
              }
            }
          `,
        });
      });

      it('case 2', async () => {
        await testSchema({
          query: `
            query TaskLists($input: TaskListQueryInput!) {
              taskLists(input: $input) {
                id
                title
              }
            }
          `,
          variables: {
            input: { id: 1 },
          },
          expectedResponse: `
            {
              "data": {
                "taskLists": [
                  {
                    "id": "1",
                    "title": "Brikllo"
                  }
                ]
              }
            }
          `,
        });
      });
    });
  });
});
