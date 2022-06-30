import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { buildAppSchema } from '../src/graphql/schema';
import { testSchema } from './helpers';

describe('Brikllo Test Scenarios', () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await buildAppSchema();
  });

  describe('Kathy - check the board in the morning looking for tasks to do', () => {
    it('open the entire board', async () => {
      await testSchema({
        schema,
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
          input: {},
          tasksInput2: {},
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
                      "id": "1",
                      "title": "Create GraphQL Server",
                      "status": "DONE"
                    },
                    {
                      "id": "2",
                      "title": "Design mock APIs",
                      "status": "DONE"
                    },
                    {
                      "id": "3",
                      "title": "Connect to DB",
                      "status": "DONE"
                    },
                    {
                      "id": "4",
                      "title": "Design mutation APIs",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "5",
                      "title": "Fine tuning",
                      "status": "IN_PROGRESS"
                    }
                  ]
                },
                {
                  "id": "2",
                  "title": "Camping vacation preps",
                  "tasks": [
                    {
                      "id": "6",
                      "title": "Pack my bag",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "7",
                      "title": "Prepare food",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "8",
                      "title": "Pin landmarks in the map",
                      "status": "DONE"
                    },
                    {
                      "id": "9",
                      "title": "Clean my room",
                      "status": "DONE"
                    },
                    {
                      "id": "10",
                      "title": "Clean my room",
                      "status": "DONE"
                    }
                  ]
                },
                {
                  "id": "3",
                  "title": "Finish that book",
                  "tasks": [
                    {
                      "id": "11",
                      "title": "Chapter 1",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "12",
                      "title": "Chapter 2",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "13",
                      "title": "Chapter 3",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "14",
                      "title": "Chapter 4",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "15",
                      "title": "Chapter 5",
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
    it('select first task list, filter only incomplete tasks', async () => {
      await testSchema({
        schema,
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
            idIn: 1,
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
                      "id": "4",
                      "title": "Design mutation APIs",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "5",
                      "title": "Fine tuning",
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
    it('select third task list, order tasks by rank, ascending', async () => {
      await testSchema({
        schema,
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
            idIn: 3,
          },
          tasksInput2: {
            order: {
              by: 'RANK',
              direction: 'ASC',
            },
          },
        },
        expectedResponse: `
          {
            "data": {
              "taskLists": [
                {
                  "id": "3",
                  "title": "Finish that book",
                  "tasks": [
                    {
                      "id": "20",
                      "title": "Chapter 10",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "19",
                      "title": "Chapter 9",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "18",
                      "title": "Chapter 8",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "17",
                      "title": "Chapter 7",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "16",
                      "title": "Chapter 6",
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
    it('scroll to see more tasks in the third task list', async () => {
      await testSchema({
        schema,
        query: `
          query Tasks($input: TaskQueryInput!) {
            tasks(input: $input) {
              id
              title
            }
          }
        `,
        variables: {
          input: {
            taskListIdEq: 3,
            order: {
              by: 'RANK',
              direction: 'ASC',
            },
            skip: 5,
          },
        },
        expectedResponse: `
          {
            "data": {
              "tasks": [
                {
                  "id": "15",
                  "title": "Chapter 5"
                },
                {
                  "id": "14",
                  "title": "Chapter 4"
                },
                {
                  "id": "13",
                  "title": "Chapter 3"
                },
                {
                  "id": "12",
                  "title": "Chapter 2"
                },
                {
                  "id": "11",
                  "title": "Chapter 1"
                }
              ]
            }
          }
        `,
      });
    });
    it('search the entire board for task id 8', async () => {
      await testSchema({
        schema,
        query: `
          query Tasks($input: TaskQueryInput!) {
            tasks(input: $input) {
              id
              title
            }
          }
        `,
        variables: {
          input: {
            idIn: [8],
          },
        },
        expectedResponse: `
          {
            "data": {
              "tasks": [
                {
                  "id": "8",
                  "title": "Pin landmarks in the map"
                }
              ]
            }
          }
        `,
      });
    });
  });
});
