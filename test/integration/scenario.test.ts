import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { buildAppSchema } from '../../src/graphql/schema';
import { testSchema } from '../helpers';

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
          {
            taskLists(input: {}) {
              id
              title
              tasks(input: {}) {
                id
                title
                status
              }
            }
          }
        `,
        variables: {},
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
                      "title": "Do the dishes",
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
          query Query($taskListInput: TaskListQueryInput!, $tasksInput: TaskQueryInput!) {
            taskLists(input: $taskListInput) {
              id
              title
              tasks(input: $tasksInput) {
                id
                title
                status
              }
            }
          }
        `,
        variables: {
          taskListInput: {
            idIn: 1,
          },
          tasksInput: {
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
          query Query($taskListInput: TaskListQueryInput!, $tasksInput: TaskQueryInput!) {
            taskLists(input: $taskListInput) {
              id
              title
              tasks(input: $tasksInput) {
                id
                title
                status
              }
            }
          }
        `,
        variables: {
          taskListInput: {
            idIn: 3,
          },
          tasksInput: {
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

  describe('Jamie - manage a new project for Katie', () => {
    it('initiate new task list', async () => {
      await testSchema({
        schema,
        query: `
          mutation CreateTaskList($input: TaskListCreateInput!) {
            createTaskList(input: $input) {
              id
              title
              tasks(input: {}) {
                id
                title
                status
              }
            }
          }
        `,
        variables: {
          input: {
            title: 'Amazing',
          },
        },
        expectedResponse: `
          {
            "data": {
              "createTaskList": {
                "id": "4",
                "title": "Amazing",
                "tasks": []
              }
            }
          }
        `,
      });
    });
    it('add (prepend) 5 tasks to the list', async () => {
      const query = `
        mutation CreateTask($input: TaskCreateInput!) {
          createTask(input: $input) {
            id
            title
          }
        }
      `;
      const taskListId = 4;

      await testSchema({
        schema,
        query,
        variables: {
          input: {
            taskListId,
            title: 'Gather resources',
          },
        },
        expectedResponse: `
          {
            "data": {
              "createTask": {
                "id": "21",
                "title": "Gather resources"
              }
            }
          }
        `,
      });
      await testSchema({
        schema,
        query,
        variables: {
          input: {
            taskListId,
            title: 'Defend yourselg',
          },
        },
        expectedResponse: `
          {
            "data": {
              "createTask": {
                "id": "22",
                "title": "Defend yourselg"
              }
            }
          }
        `,
      });
      await testSchema({
        schema,
        query,
        variables: {
          input: {
            taskListId,
            title: 'Craft weapons',
          },
        },
        expectedResponse: `
          {
            "data": {
              "createTask": {
                "id": "23",
                "title": "Craft weapons"
              }
            }
          }
        `,
      });
      await testSchema({
        schema,
        query,
        variables: {
          input: {
            taskListId,
            title: 'Scout the area',
          },
        },
        expectedResponse: `
          {
            "data": {
              "createTask": {
                "id": "24",
                "title": "Scout the area"
              }
            }
          }
        `,
      });
      await testSchema({
        schema,
        query,
        variables: {
          input: {
            taskListId,
            title: 'Expand territories',
          },
        },
        expectedResponse: `
          {
            "data": {
              "createTask": {
                "id": "25",
                "title": "Expand territories"
              }
            }
          }
        `,
      });
    });
    it('edit the second task name', async () => {
      await testSchema({
        schema,
        query: `
          mutation UpdateTask($input: TaskUpdateInput!) {
            updateTask(input: $input) {
              id
              title
              status
            }
          }
        `,
        variables: {
          input: {
            id: 22,
            title: 'Defend yourself',
          },
        },
        expectedResponse: `
          {
            "data": {
              "updateTask": {
                "id": "22",
                "title": "Defend yourself",
                "status": "IN_PROGRESS"
              }
            }
          }
        `,
      });
    });
    it('mark the first task done', async () => {
      await testSchema({
        schema,
        query: `
          mutation UpdateTask($input: TaskUpdateInput!) {
            updateTask(input: $input) {
              id
              title
              status
            }
          }
        `,
        variables: {
          input: {
            id: 21,
            status: 'DONE',
          },
        },
        expectedResponse: `
          {
            "data": {
              "updateTask": {
                "id": "21",
                "title": "Gather resources",
                "status": "DONE"
              }
            }
          }
        `,
      });
    });
    it('move the fifth task to be the third instead', async () => {
      await testSchema({
        schema,
        query: `
          mutation MoveTask($input: TaskMoveInput!) {
            moveTask(input: $input) {
              id
              title
              status
            }
          }
        `,
        variables: {
          input: {
            taskId: 25,
            taskListId: 4,
            position: 2,
          },
        },
        expectedResponse: `
          {
            "data": {
              "moveTask": {
                "id": "25",
                "title": "Expand territories",
                "status": "IN_PROGRESS"
              }
            }
          }
        `,
      });
    });
    it('show the entire board to Katie, showing only in progress tasks', async () => {
      await testSchema({
        schema,
        query: `
          query Query($tasksInput: TaskQueryInput!) {
            taskLists(input: {}) {
              id
              title
              tasks(input: $tasksInput) {
                id
                title
                status
              }
            }
          }
        `,
        variables: {
          tasksInput: {
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
                },
                {
                  "id": "4",
                  "title": "Amazing",
                  "tasks": [
                    {
                      "id": "24",
                      "title": "Scout the area",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "25",
                      "title": "Expand territories",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "23",
                      "title": "Craft weapons",
                      "status": "IN_PROGRESS"
                    },
                    {
                      "id": "22",
                      "title": "Defend yourself",
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
  });
});
