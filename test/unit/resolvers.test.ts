import 'reflect-metadata';
import { expect } from 'chai';
import Sinon from 'sinon';

import {
  TaskListQueryInput,
  TaskListResolver,
  TaskQueryInput,
  TaskResolver,
} from '../../src/resolvers';
import service from '../../src/service';
import { context } from '../../src/context';
import fc from 'fast-check';
import * as arbitrary from '../helpers/arbitrary';

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
              service,
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
              service,
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
              service,
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
