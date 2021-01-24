import { user } from './user/getUser';
import { createUser } from './user/createUser';

export const resolvers = {
  Query: {
    user,
  },
  Mutation: {
    createUser,
  },
};
