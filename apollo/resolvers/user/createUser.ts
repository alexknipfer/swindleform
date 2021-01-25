import bcrypt from 'bcryptjs';
import { Connection } from 'typeorm';

import { User } from '../../../entities/User';

interface CreateUserArgs {
  username: string;
  password: string;
}

export const createUser = async (
  _: Record<string, never>,
  { username, password }: CreateUserArgs,
  context: { connection: Connection },
) => {
  const userRepo = context.connection.getRepository(User);
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = userRepo.create({
    username,
    passwordHash,
  });

  await userRepo.save(newUser);

  return newUser;
};
