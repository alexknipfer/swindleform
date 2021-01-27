import { GQLContext } from '@/apollo/interfaces';
import { ObjectID } from 'mongodb';

interface GetUserArgs {
  id: string;
}

export const user = async (
  _: Record<string, never>,
  args: GetUserArgs,
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
