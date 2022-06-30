import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { buildAppSchema } from '../src/graphql/schema';
import { testSchema } from './helpers';

describe('brikllo', () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await buildAppSchema();
  });

  describe('taskLists', () => {
    describe('should return data as expected', async () => {
      // it('case 1', async () => {
      //   await testSchema({
      //     schema,
      //     query: `
      //       query Query($input: TaskListQueryInput!, $tasksInput2: TaskQueryInput!) {
      //         taskLists(input: $input) {
      //           id
      //           title
      //           tasks(input: $tasksInput2) {
      //             id
      //             title
      //             status
      //           }
      //         }
      //       }
      //     `,
      //     variables: {
      //       input: {
      //         id: 1,
      //       },
      //       tasksInput2: {
      //         status: 'IN_PROGRESS',
      //       },
      //     },
      //     expectedResponse: `
      //       {
      //         "data": {
      //           "taskLists": [
      //             {
      //               "id": "1",
      //               "title": "Brikllo",
      //               "tasks": [
      //                 {
      //                   "id": "3",
      //                   "title": "Connect to DB",
      //                   "status": "IN_PROGRESS"
      //                 }
      //               ]
      //             }
      //           ]
      //         }
      //       }
      //     `,
      //   });
      // });
      // it('case 2', async () => {
      //   await testSchema({
      //     schema,
      //     query: `
      //       query TaskLists($input: TaskListQueryInput!) {
      //         taskLists(input: $input) {
      //           id
      //           title
      //         }
      //       }
      //     `,
      //     variables: {
      //       input: { id: 1 },
      //     },
      //     expectedResponse: `
      //       {
      //         "data": {
      //           "taskLists": [
      //             {
      //               "id": "1",
      //               "title": "Brikllo"
      //             }
      //           ]
      //         }
      //       }
      //     `,
      //   });
      // });
    });
  });
});
