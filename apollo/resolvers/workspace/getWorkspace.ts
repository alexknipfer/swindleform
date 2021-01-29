import { GQLContext } from '@/apollo/interfaces';

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
    return null;
  }

  return workspace.snapshot();
};
