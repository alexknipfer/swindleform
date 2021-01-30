import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  root?: Maybe<Scalars['String']>;
  user: User;
  workspace?: Maybe<Workspace>;
};

export type QueryWorkspaceArgs = {
  workspaceId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  root?: Maybe<Scalars['String']>;
  createWorkspace: Workspace;
};

export type MutationCreateWorkspaceArgs = {
  name: Scalars['String'];
};

export type Workspace = {
  __typename?: 'Workspace';
  id: Scalars['ID'];
  users: Array<Scalars['String']>;
  workspaceName: Scalars['String'];
  formCount: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  workspaces: Array<Workspace>;
};

export type CreateWorkspaceMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type CreateWorkspaceMutation = { __typename?: 'Mutation' } & {
  createWorkspace: { __typename?: 'Workspace' } & Pick<
    Workspace,
    'id' | 'workspaceName' | 'formCount' | 'users'
  >;
};

export type UserQueryQueryVariables = Exact<{ [key: string]: never }>;

export type UserQueryQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & {
    workspaces: Array<
      { __typename?: 'Workspace' } & Pick<
        Workspace,
        'id' | 'workspaceName' | 'users'
      >
    >;
  };
};

export const CreateWorkspaceDocument = gql`
  mutation CreateWorkspace($name: String!) {
    createWorkspace(name: $name) {
      id
      workspaceName
      formCount
      users
    }
  }
`;
export type CreateWorkspaceMutationFn = Apollo.MutationFunction<
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables
>;

/**
 * __useCreateWorkspaceMutation__
 *
 * To run a mutation, you first call `useCreateWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkspaceMutation, { data, loading, error }] = useCreateWorkspaceMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateWorkspaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateWorkspaceMutation,
    CreateWorkspaceMutationVariables
  >,
) {
  return Apollo.useMutation<
    CreateWorkspaceMutation,
    CreateWorkspaceMutationVariables
  >(CreateWorkspaceDocument, baseOptions);
}
export type CreateWorkspaceMutationHookResult = ReturnType<
  typeof useCreateWorkspaceMutation
>;
export type CreateWorkspaceMutationResult = Apollo.MutationResult<CreateWorkspaceMutation>;
export type CreateWorkspaceMutationOptions = Apollo.BaseMutationOptions<
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables
>;
export const UserQueryDocument = gql`
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

/**
 * __useUserQueryQuery__
 *
 * To run a query within a React component, call `useUserQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserQueryQuery,
    UserQueryQueryVariables
  >,
) {
  return Apollo.useQuery<UserQueryQuery, UserQueryQueryVariables>(
    UserQueryDocument,
    baseOptions,
  );
}
export function useUserQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserQueryQuery,
    UserQueryQueryVariables
  >,
) {
  return Apollo.useLazyQuery<UserQueryQuery, UserQueryQueryVariables>(
    UserQueryDocument,
    baseOptions,
  );
}
export type UserQueryQueryHookResult = ReturnType<typeof useUserQueryQuery>;
export type UserQueryLazyQueryHookResult = ReturnType<
  typeof useUserQueryLazyQuery
>;
export type UserQueryQueryResult = Apollo.QueryResult<
  UserQueryQuery,
  UserQueryQueryVariables
>;
