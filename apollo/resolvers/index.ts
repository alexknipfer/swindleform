import { user } from './user/getUser';
import { workspace } from './workspace/getWorkspace';
import { createWorkspace } from './workspace/createWorkspace';

export const resolvers = {
  Query: {
    user,
    workspace,
  },
  Mutation: {
    createWorkspace,
  },
};
