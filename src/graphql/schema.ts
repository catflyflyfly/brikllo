import { buildSchema, registerEnumType } from 'type-graphql';
import { OrderDirection, TaskOrderBy, TaskStatus } from './models';
import { TaskListResolver, TaskResolver } from './resolvers';

export const buildAppSchema = async () => {
  registerAllEnumTypes();

  return buildSchema({
    resolvers: [TaskListResolver, TaskResolver],
    scalarsMap: [],
  });
};

const registerAllEnumTypes = () => {
  registerEnumType(TaskStatus, {
    name: 'TaskStatus',
  });
  registerEnumType(TaskOrderBy, {
    name: 'TaskOrderBy',
  });
  registerEnumType(OrderDirection, {
    name: 'OrderDirection',
  });
};
