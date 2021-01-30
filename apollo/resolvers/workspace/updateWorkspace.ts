import { GQLContext } from '@/apollo/interfaces';

interface Args {
  id: string;
  name: string;
}

export const updateWorkspace = async (
  _: Record<string, never>,
  { id, name }: Args,
  context: GQLContext,
) => {
  const { db, session } = context;
  const workspace = await db.workspaceRepo.get(id);

  if (!workspace?.users.map(String).includes(session.user.id)) {
    return null;
  }

  workspace.updateName({ name });
  await db.workspaceRepo.commit(workspace);

  return workspace.snapshot();
};
