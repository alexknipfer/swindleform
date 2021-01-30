import { WorkspaceSnapshot } from '@/models/workspace';
import { gql } from '@apollo/client';

export interface CreateWorkspaceMutationResponse {
  createWorkspace: Pick<
    WorkspaceSnapshot,
    'id' | 'formCount' | 'users' | 'workspaceName'
  > & {
    __typename?: 'Workspace';
  };
}

export const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateWorkspace($name: String!) {
    createWorkspace(name: $name) {
      id
      workspaceName
      formCount
      users
    }
  }
`;
