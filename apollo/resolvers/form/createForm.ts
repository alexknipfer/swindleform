import { GQLContext } from '@/apollo/interfaces';
import { Form } from '@/models/form';
import { ApolloError } from 'apollo-server-micro';

interface Args {
  workspaceId: string;
}

export const createForm = async (
  _: Record<string, never>,
  { workspaceId }: Args,
  { db, session }: GQLContext,
) => {
  const workspace = await db.workspaceRepo.get(workspaceId);

  if (!workspace?.users.map(String).includes(session.user.id)) {
    throw new ApolloError('Workspace not found', '404');
  }

  const form = new Form();
  workspace.createForm(form);
  await db.workspaceRepo.commit(workspace);

  return workspace.snapshot();
};
