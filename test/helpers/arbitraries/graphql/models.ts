import fc from 'fast-check';
import * as model from '../../../../src/graphql/models';

export const taskList: () => fc.Arbitrary<model.TaskList> = () =>
  fc
    .tuple(fc.integer(), fc.string(), fc.array(task()))
    .map(([id, title, tasks]) => {
      return { id, title, tasks };
    });

export const task: () => fc.Arbitrary<model.Task> = () =>
  fc
    .tuple(fc.integer(), fc.string(), taskStatus())
    .map(([id, title, status]) => {
      return { id, title, status };
    });

export const taskStatus: () => fc.Arbitrary<model.TaskStatus> = () => {
  return fc.constantFrom(model.TaskStatus.DONE, model.TaskStatus.IN_PROGRESS);
};

export const taskOrderBy: () => fc.Arbitrary<model.TaskOrderBy> = () => {
  return fc.constantFrom(model.TaskOrderBy.RANK);
};

export const orderDirection: () => fc.Arbitrary<model.OrderDirection> = () => {
  return fc.constantFrom(model.OrderDirection.ASC, model.OrderDirection.DESC);
};
