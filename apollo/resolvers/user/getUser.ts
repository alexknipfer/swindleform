import { Connection } from 'typeorm';

import { User } from '../../../entities/User';

interface GetUserArgs {
  id: string;
}

export const user = async (
  _: Record<string, never>,
  args: GetUserArgs,
  context: { connection: Connection },
) => {
  const userRepo = context.connection.getRepository(User);

  const user = await userRepo.findOne(args.id);
  delete user.passwordHash;

  return user;
};
