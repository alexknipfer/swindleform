import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../types';
export type WorkspaceQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['String'];
}>;

export type WorkspaceQuery = { __typename?: 'Query' } & {
  workspace: { __typename?: 'Workspace' } & Pick<
    Types.Workspace,
    'id' | 'workspaceName' | 'users' | 'formCount'
  >;
};

export const WorkspaceDocument = gql`
  query workspace($workspaceId: String!) {
    workspace(workspaceId: $workspaceId) {
      id
      workspaceName
      users
      formCount
    }
  }
`;

/**
 * __useWorkspaceQuery__
 *
 * To run a query within a React component, call `useWorkspaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkspaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkspaceQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useWorkspaceQuery(
  baseOptions: Apollo.QueryHookOptions<WorkspaceQuery, WorkspaceQueryVariables>,
) {
  return Apollo.useQuery<WorkspaceQuery, WorkspaceQueryVariables>(
    WorkspaceDocument,
    baseOptions,
  );
}
export function useWorkspaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WorkspaceQuery,
    WorkspaceQueryVariables
  >,
) {
  return Apollo.useLazyQuery<WorkspaceQuery, WorkspaceQueryVariables>(
    WorkspaceDocument,
    baseOptions,
  );
}
export type WorkspaceQueryHookResult = ReturnType<typeof useWorkspaceQuery>;
export type WorkspaceLazyQueryHookResult = ReturnType<
  typeof useWorkspaceLazyQuery
>;
export type WorkspaceQueryResult = Apollo.QueryResult<
  WorkspaceQuery,
  WorkspaceQueryVariables
>;
