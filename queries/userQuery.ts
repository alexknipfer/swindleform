import { gql } from '@apollo/client';
import { User } from '@/models/user';
import { WorkspaceSnapshot } from '@/models/workspace';
import { Overwrite } from '@/utils/types';

export interface UserQueryResponse {
  user: Overwrite<
    User,
    {
      workspaces: Pick<
        WorkspaceSnapshot,
        'id' | 'formCount' | 'timestamp' | 'users' | 'workspaceName'
      >[];
    }
  > & {
    __typename?: 'User';
  };
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
