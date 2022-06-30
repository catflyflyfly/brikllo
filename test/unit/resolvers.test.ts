import 'reflect-metadata';
import * as chai from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
import fc from 'fast-check';

import { TaskListResolver, TaskResolver } from '../../src/graphql/resolvers';
import service from '../../src/services';
import { context } from '../../src/context';
import * as arbitrary from '../helpers/arbitraries';

const expect = chai.expect;
chai.use(sinonChai);

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
          arbitrary.graphql.input.taskListQueryInput(),
          async (serviceResponse, input) => {
            Sinon.restore();
            const fake = Sinon.replace(
              service.graphql,
              'getTaskLists',
              Sinon.fake.resolves(serviceResponse),
            );

            const response = await resolver.taskLists(input, context);

            expect(response).to.deep.equal(serviceResponse);
            expect(fake).to.have.callCount(1);
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
          arbitrary.graphql.input.taskQueryInput(),
          arbitrary.graphql.model.taskList(),
          async (serviceResponse, input, taskList) => {
            Sinon.restore();
            const fake = Sinon.replace(
              service.graphql,
              'getTasksInTaskList',
              Sinon.fake.resolves(serviceResponse),
            );

            const response = await resolver.tasks(input, taskList, context);

            expect(response).to.deep.equal(serviceResponse);
            expect(fake).to.have.callCount(1);
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
          arbitrary.graphql.input.taskQueryInput(),
          async (serviceResponse, input) => {
            Sinon.restore();
            const fake = Sinon.replace(
              service.graphql,
              'getTasks',
              Sinon.fake.resolves(serviceResponse),
            );

            const response = await resolver.tasks(input, context);

            expect(response).to.deep.equal(serviceResponse);
            expect(fake).to.have.callCount(1);
          },
        ),
      );
    });
  });
});
