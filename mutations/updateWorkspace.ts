import { WorkspaceSnapshot } from '@/models/workspace';
import { gql } from '@apollo/client';

export interface UpdateWorkspaceMutationResponse {
  workspace: Pick<
    WorkspaceSnapshot,
    'id' | 'formCount' | 'users' | 'workspaceName'
  > & {
    __typename?: 'Workspace';
  };
}

export const UPDATE_WORKSPACE_MUTATION = gql`
  mutation updateWorkspace($id: ID!, $name: String!) {
    updateWorkspace(id: $id, name: $name) {
      id
      workspaceName
      formCount
      users
    }
  }
`;
