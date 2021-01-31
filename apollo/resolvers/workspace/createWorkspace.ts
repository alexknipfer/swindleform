import { GQLContext } from '@/apollo/interfaces';
import { Workspace } from '@/models/workspace';
import { ObjectId } from 'mongodb';

interface Args {
  name: string;
}

export const createWorkspace = async (
  _: Record<string, never>,
  { name }: Args,
  { db, session }: GQLContext,
) => {
  const workspace = new Workspace();
  workspace.init({ workspaceName: name, firstUserId: session.user.id });
  const commit = db.workspaceRepo.commit(workspace);
  const updateUser = db.users.findOneAndUpdate(
    { _id: new ObjectId(session.user.id) },
    { $push: { workspaces: workspace.id } },
  );

  await Promise.all([commit, updateUser]);

  return workspace.snapshot();
};
