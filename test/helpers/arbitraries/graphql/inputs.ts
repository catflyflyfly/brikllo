import fc from 'fast-check';
import * as input from '../../../../src/graphql/inputs';
import { orderDirection, taskOrderBy, taskStatus } from './models';

export const taskOrder: () => fc.Arbitrary<input.TaskOrder> = () =>
  fc.tuple(taskOrderBy(), orderDirection()).map(([by, direction]) => {
    return {
      by,
      direction,
    };
  });

export const taskListQueryInput: () => fc.Arbitrary<input.TaskListQueryInput> =
  () =>
    fc
      .tuple(
        fc.integer(),
        fc.integer(),
        fc.option(fc.array(fc.integer()), { nil: undefined }),
      )
      .map(([skip, take, idIn]) => {
        return {
          skip,
          take,
          idIn,
        };
      });

export const taskQueryInput: () => fc.Arbitrary<input.TaskQueryInput> = () =>
  fc
    .tuple(
      fc.integer(),
      fc.integer(),
      fc.option(taskStatus(), { nil: undefined }),
      taskOrder(),
      fc.option(fc.integer(), { nil: undefined }),
      fc.option(fc.array(fc.integer()), { nil: undefined }),
    )
    .map(([skip, take, status, order, taskListIdEq, idIn]) => {
      return {
        skip,
        take,
        status,
        order,
        taskListIdEq,
        idIn,
      };
    });

export const taskListCreateInput: () => fc.Arbitrary<input.TaskListCreateInput> =
  () =>
    fc.tuple(fc.string()).map(([title]) => {
      return {
        title,
      };
    });

export const taskCreateInput: () => fc.Arbitrary<input.TaskCreateInput> = () =>
  fc.tuple(fc.integer(), fc.string()).map(([taskListId, title]) => {
    return {
      taskListId,
      title,
    };
  });

export const taskMoveInput: () => fc.Arbitrary<input.TaskMoveInput> = () =>
  fc
    .tuple(fc.integer(), fc.integer(), fc.integer())
    .map(([taskId, taskListId, position]) => {
      return {
        taskId,
        taskListId,
        position,
      };
    });

export const taskUpdateInput: () => fc.Arbitrary<input.TaskUpdateInput> = () =>
  fc
    .tuple(
      fc.integer(),
      fc.option(fc.string(), { nil: undefined }),
      fc.option(taskStatus(), { nil: undefined }),
    )
    .map(([id, title, status]) => {
      return {
        id,
        title,
        status,
      };
    });
