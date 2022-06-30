import fc from 'fast-check';
import * as input from '../../../../src/graphql/inputs';
import { taskStatus } from './models';

export const taskListQueryInput: () => fc.Arbitrary<input.TaskListQueryInput> =
  () =>
    fc
      .tuple(
        fc.option(fc.integer(), { nil: undefined }),
        fc.option(fc.integer(), { nil: undefined }),
      )
      .map(([skip, take]) => {
        return {
          skip,
          take,
        };
      });

export const taskQueryInput: () => fc.Arbitrary<input.TaskQueryInput> = () =>
  fc
    .tuple(
      fc.option(taskStatus(), { nil: undefined }),
      fc.option(fc.integer(), { nil: undefined }),
      fc.option(fc.integer(), { nil: undefined }),
    )
    .map(([status, skip, take]) => {
      return {
        status,
        skip,
        take,
      };
    });
