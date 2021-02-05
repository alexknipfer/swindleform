import { GQLContext } from '@/apollo/interfaces';
import { ensureUserOwnedWorkspace } from '@/db/workspace/queryHelpers';

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

  const workspace = await ensureUserOwnedWorkspace({ db, workspaceId, userId });

  return workspace.snapshot();
};
