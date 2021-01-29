import { user } from './user/getUser';
import { workspace } from './workspace/getWorkspace';

export const resolvers = {
  Query: {
    user,
    workspace,
  },
};
