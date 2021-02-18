import { GQLContext } from '@/apollo/interfaces';
import { ensureUserOwnedWorkspace } from '@/db/workspace/queryHelpers';

interface Args {
  id: string;
  name: string;
}

export const updateWorkspace = async (
  _: Record<string, never>,
  { id: workspaceId, name }: Args,
  context: GQLContext,
) => {
  const {
    db,
    session: {
      user: { id: userId },
    },
  } = context;

  const workspace = await ensureUserOwnedWorkspace({ db, workspaceId, userId });

  workspace.updateName({ name });
  await db.workspaceRepo.commit(workspace);

  return workspace.snapshot();
};
