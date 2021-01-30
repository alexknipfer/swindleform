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
  const user = await db.users.findOne({ _id: new ObjectID(id) });

  if (!user) {
    throw new Error('Not found');
  }

  const workspaces = (await db.workspaceRepo.getAll(user.workspaces)).map((w) =>
    w.snapshot(),
  );

  return {
    id: user._id.toString(),
    email: user.email,
    workspaces,
    user,
  };
};
