import fc from 'fast-check';
import * as db from '@prisma/client';

export const taskList: () => fc.Arbitrary<db.TaskList> = () =>
  fc
    .tuple(
      fc.integer(),
      fc.date(),
      fc.string(),
      fc.date(),
      fc.string(),
      fc.string(),
    )
    .map(([id, createdAt, createdBy, updatedAt, updatedBy, title]) => {
      return { id, createdAt, createdBy, updatedAt, updatedBy, title };
    });

export const task: () => fc.Arbitrary<db.Task> = () =>
  fc
    .tuple(
      fc.integer(),
      fc.date(),
      fc.string(),
      fc.date(),
      fc.string(),
      fc.string(),
      taskStatus(),
      fc.integer(),
    )
    .map(
      ([
        id,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
        title,
        status,
        taskListId,
      ]) => ({
        id,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
        title,
        status,
        taskListId,
      }),
    );

export const taskStatus: () => fc.Arbitrary<db.TaskStatus> = () => {
  return fc.constantFrom(db.TaskStatus.DONE, db.TaskStatus.IN_PROGRESS);
};
