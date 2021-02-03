import { user } from './user/getUser';
import { workspace } from './workspace/getWorkspace';
import { createWorkspace } from './workspace/createWorkspace';
import { createForm } from './form/createForm';

export const resolvers = {
  Query: {
    user,
    workspace,
  },
  Mutation: {
    createWorkspace,
    createForm,
  },
};
