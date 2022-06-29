import { buildSchema, registerEnumType } from 'type-graphql';
import { TaskStatus } from './models';
import { TaskListResolver } from './resolvers';

export const buildAppSchema = async () => {
  registerAllEnumTypes();

  return buildSchema({
    resolvers: [TaskListResolver],
    scalarsMap: [],
  });
};

const registerAllEnumTypes = () => {
  registerEnumType(TaskStatus, {
    name: 'TaskStatus',
  });
};
