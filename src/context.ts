import { Task, TaskList, TaskStatus } from './models';

export interface Context {
  taskLists: TaskList[];
}

export const context = {
  taskLists: [
    new TaskList(1, 'Brikllo', [
      new Task(1, 'Create GraqhQL Server', TaskStatus.Done),
      new Task(2, 'Design mock APIs', TaskStatus.Done),
      new Task(3, 'Connect to DB', TaskStatus.InProgress),
    ]),
  ],
};
