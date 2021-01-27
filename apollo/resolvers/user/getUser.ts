import { DbConnection } from '@/db/dbConnection';
import { ObjectID } from 'mongodb';

interface GetUserArgs {
  id: string;
}

export const user = async (
  _: Record<string, never>,
  args: GetUserArgs,
  { db }: { db: DbConnection },
) => {
  const user = await db.users.findOne({ _id: new ObjectID(args.id) as any });
  const workspaces = (await db.workspaceRepo.getAll(user.workspaces)).map((w) =>
    w.snapshot(),
  );

  console.log({ workspaces });

  return {
    id: args.id,
    workspaces,
    user,
    email: 'test@email.com',
    name: 'Test Name',
  };
};
