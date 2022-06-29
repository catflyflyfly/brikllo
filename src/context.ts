import { Task, TaskList, TaskStatus } from './models';

export interface Context {
  taskLists: TaskList[];
}

export const context = {
  taskLists: [
    new TaskList(1, 'Brikllo', [
      new Task(1, 'Create GraqhQL Server', TaskStatus.DONE),
      new Task(2, 'Design mock APIs', TaskStatus.DONE),
      new Task(3, 'Connect to DB', TaskStatus.IN_PROGRESS),
    ]),
  ],
};
