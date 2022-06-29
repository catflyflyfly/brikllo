import { Task, TaskList, TaskStatus } from './models';

export interface Context {
  taskLists: TaskList[];
}

export const context = {
  taskLists: [
    new TaskList(1, 'Brikllo', [
      new Task(1, 'Design mock APIs', TaskStatus.InProgress),
      new Task(2, 'Connect to DB', TaskStatus.InProgress),
    ]),
  ],
};
