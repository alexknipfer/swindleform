import bcrypt from 'bcryptjs';
import { getConnection } from 'typeorm';

import stuff from '../../../db/connection';
import { User } from '../../../entities/User';

interface CreateUserArgs {
  username: string;
  password: string;
}

export const createUser = async (
  _: Record<string, never>,
  { username, password }: CreateUserArgs,
) => {
  try {
    let repo: any;
    if (stuff.isConnected()) {
      repo = getConnection().getRepository(User);
    }
    // const userRepo = await stuff
    //   .getConnection()
    //   .connect()
    //   .then((connection) => connection.getRepository(User));

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = repo.create({
      username,
      passwordHash,
    });

    await repo.save(newUser);

    return { __typename: 'CreatedUser', ...newUser };
  } catch (error) {
    return {
      __typename: 'CreateUserError',
      message: 'Error creating user',
    };
  }
};
