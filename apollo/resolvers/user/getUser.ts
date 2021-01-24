import { getConnection } from 'typeorm';

import { User } from '../../../entities/User';

interface GetUserArgs {
  id: string;
}

export const user = async (_: Record<string, never>, args: GetUserArgs) => {
  const userRepo = await getConnection('default')
    .connect()
    .then((connection) => connection.getRepository(User));

  const user = await userRepo.findOne(args.id);

  return user;
};
