import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../types';
export type CreateWorkspaceMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;

export type CreateWorkspaceMutation = { __typename?: 'Mutation' } & {
  createWorkspace: { __typename?: 'Workspace' } & Pick<
    Types.Workspace,
    'id' | 'workspaceName' | 'formCount' | 'users'
  >;
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
