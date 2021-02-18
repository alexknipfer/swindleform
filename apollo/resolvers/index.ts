import { user } from './user/getUser';
import { workspace } from './workspace/getWorkspace';
import { createWorkspace } from './workspace/createWorkspace';
import { createForm } from './form/createForm';
import { createQuestion } from './form/createQuestion';
import { updateWorkspace } from './workspace/updateWorkspace';

export const resolvers = {
  Query: {
    user,
    workspace,
  },
  Mutation: {
    createWorkspace,
    createForm,
    createQuestion,
    updateWorkspace,
  },
};
