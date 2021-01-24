import bcrypt from 'bcryptjs';

interface CreateUserArgs {
  username: string;
  password: string;
}

export const createUser = async (
  _: Record<string, never>,
  { username, password }: CreateUserArgs,
) => {
  const hash = await bcrypt.hash(password, 10);

  return `${username}:${hash}`;
};
