import { UserWorkspace } from '@/models/user';
import { gql } from '@apollo/client';

export interface CreateWorkspaceMutationResponse {
  createWorkspace: UserWorkspace & { __typename?: 'Workspace' };
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
