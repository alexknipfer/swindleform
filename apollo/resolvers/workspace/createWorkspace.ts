import { GQLContext } from '@/apollo/interfaces';
import { Workspace } from '@/models/workspace';
import { ObjectId } from 'mongodb';

interface Args {
  name: string;
}

export const createWorkspace = async (
  _: Record<string, never>,
  { name }: Args,
  context: GQLContext,
) => {
  const { db, session } = context;

  const workspace = new Workspace();
  workspace.init({ workspaceName: name, firstUserId: session.user.id });
  await db.workspaceRepo.commit(workspace);
  await db.users.findOneAndUpdate(
    { _id: new ObjectId(session.user.id) as any },
    { $push: { workspaces: workspace.id } },
  );

  return workspace.snapshot();
};
