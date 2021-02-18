import { ApolloError } from 'apollo-server-micro';

import { DbConnection } from '../dbConnection';

interface EnsureWorkspaceUserArgs {
  db: DbConnection;
  userId: string;
  workspaceId: string;
}

export const ensureUserOwnedWorkspace = async ({
  db,
  userId,
  workspaceId,
}: EnsureWorkspaceUserArgs) => {
  const workspace = await db.workspaceRepo.get(workspaceId);

  if (!workspace?.users.map(String).includes(userId)) {
    throw new ApolloError('Workspace not found', '404');
  }

  return workspace;
};
