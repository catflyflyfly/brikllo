import 'reflect-metadata';
import { expect } from 'chai';
import { GraphQLSchema, graphql } from 'graphql';
import { buildAppSchema } from '../src/schema';
import { context } from '../src/context';

describe('brikllo', () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await buildAppSchema();
  });

  describe('taskList', () => {
    it('should return data as expected', async () => {
      const query = `
        query Query($input: TaskListQueryInput!, $tasksInput2: TaskQueryInput!) {
          taskLists(input: $input) {
            id
            title
            tasks(input: $tasksInput2) {
              id
              title
            }
          }
        }
      `;

      const variables = {
        input: {
          id: 1,
        },
        tasksInput2: {
          status: 'InProgress',
        },
      };

      const response = await graphql(
        schema,
        query,
        undefined,
        context,
        variables,
      );

      expect(true).to.equal(true);
      expect(response.errors).to.be.undefined;
      expect(response.data?.taskLists).to.have.lengthOf(1);
      expect(response.data?.taskLists[0]?.tasks).to.have.lengthOf(1);
    });
  });
});
