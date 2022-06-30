import 'reflect-metadata';
import { expect } from 'chai';
import Sinon from 'sinon';
import fc from 'fast-check';

import { TaskListQueryInput, TaskQueryInput } from '../../src/inputs';
import { TaskListResolver, TaskResolver } from '../../src/resolvers';
import service from '../../src/services';
import { context } from '../../src/context';
import * as arbitrary from '../helpers/arbitraries';

describe('TaskListResolver', () => {
  let resolver: TaskListResolver;

  before(() => {
    resolver = new TaskListResolver();
  });

  describe('.taskLists', () => {
    it('should always return response from service', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(arbitrary.db.taskList()),
          async (serviceResponse) => {
            Sinon.restore();
            Sinon.replace(
              service.graphql,
              'getTaskLists',
              Sinon.fake.resolves(serviceResponse),
            );

            const response = await resolver.taskLists(
              new TaskListQueryInput(),
              context,
            );

            expect(response).to.deep.equal(serviceResponse);
          },
        ),
      );
    });
  });

  describe('.tasks', () => {
    it('should always return response from service', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(arbitrary.db.task()),
          arbitrary.model.taskList(),
          async (serviceResponse, taskList) => {
            Sinon.restore();
            Sinon.replace(
              service.graphql,
              'getTasksInTaskList',
              Sinon.fake.resolves(serviceResponse),
            );

            const response = await resolver.tasks(
              new TaskQueryInput(),
              taskList,
              context,
            );

            expect(response).to.deep.equal(serviceResponse);
          },
        ),
      );
    });
  });
});

describe('TaskResolver', () => {
  let resolver: TaskResolver;

  before(() => {
    resolver = new TaskResolver();
  });

  describe('.tasks', () => {
    it('should always return response from service', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(arbitrary.db.task()),
          async (serviceResponse) => {
            Sinon.restore();
            Sinon.replace(
              service.graphql,
              'getTasks',
              Sinon.fake.resolves(serviceResponse),
            );

            const response = await resolver.tasks(
              new TaskQueryInput(),
              context,
            );

            expect(response).to.deep.equal(serviceResponse);
          },
        ),
      );
    });
  });
});
