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
  console.log(workspace);

  if (!workspace || !workspace.users.includes(userId)) {
    return null;
  }

  return { workspace: workspace.snapshot() };
};
