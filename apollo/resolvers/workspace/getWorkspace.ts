import { GQLContext } from '@/apollo/interfaces';
import { ApolloError } from 'apollo-server-micro';

export const workspace = async (
  _: Record<string, never>,
  { workspaceId }: { workspaceId: string },
  context: GQLContext,
) => {
  const {
    db,
    session: {
      user: { id: userId },
    },
  } = context;

  const workspace = await db.workspaceRepo.get(workspaceId);

  if (!workspace || !workspace.users.map(String).includes(userId)) {
    throw new ApolloError('Workspace not found', '404');
  }

  return workspace.snapshot();
};
