import { getUser } from './user/getUser';

export const rootResolver = {
  Query: {
    getUser,
  },
};
