import { DbConnection } from '@/models/index';
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
  const workspaces = await new Promise((resolve, reject) =>
    db.workspaceRepo.getAll(user.workspaces, (err, workspaces) => {
      if (err) return reject(err);
      resolve(workspaces);
    }),
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
