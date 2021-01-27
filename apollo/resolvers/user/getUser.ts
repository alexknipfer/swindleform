import { DbConnection } from '@/db/dbConnection';
import { ObjectID } from 'mongodb';

interface GetUserArgs {
  id: string;
}

export const user = async (
  _: Record<string, never>,
  args: GetUserArgs,
  context: { db: DbConnection },
) => {
  // TODO - Already added session to context but
  // we need a reusable type to make this context easier to use everywhere
  const { db } = context;
  const user = await db.users.findOne({ _id: new ObjectID(args.id) as any });
  const workspaces = (await db.workspaceRepo.getAll(user.workspaces)).map((w) =>
    w.snapshot(),
  );

  return {
    id: args.id,
    workspaces,
    user,
    email: 'test@email.com',
    name: 'Test Name',
  };
};
