import { gql } from '@apollo/client';
import { UserResponse } from '@/models/user';

export interface UserQueryResponse {
  user: UserResponse & { __typename?: 'User' };
}

export const USER_QUERY = gql`
  query UserQuery {
    user {
      workspaces {
        id
        workspaceName
        users
      }
    }
  }
`;
