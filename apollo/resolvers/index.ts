import { user } from './user/getUser';
import { workspace } from './workspace/getWorkspace';
import { createWorkspace } from './workspace/createWorkspace';
import { updateWorkspace } from './workspace/updateWorkspace';

export const resolvers = {
  Query: {
    user,
    workspace,
  },
  Mutation: {
    createWorkspace,
    updateWorkspace,
  },
};
