import { GQLContext } from '@/apollo/interfaces';
import { ObjectID } from 'mongodb';

export const user = async (
  _: Record<string, never>,
  args: Record<string, never>,
  context: GQLContext,
) => {
  const {
    db,
    session: {
      user: { id },
    },
  } = context;

  console.log('Proving the userid is added successfully from the session', {
    id,
  });
  const user = await db.users.findOne({ _id: new ObjectID(id) as any });
  console.log({ user });
  const workspaces = (await db.workspaceRepo.getAll(user.workspaces)).map((w) =>
    w.snapshot(),
  );

  return {
    id: args.id,
    workspaces,
    user,
  };
};
