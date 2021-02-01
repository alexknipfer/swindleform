import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../types';
export type UpdateWorkspaceMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  id: Types.Scalars['ID'];
}>;

export type UpdateWorkspaceMutation = { __typename?: 'Mutation' } & {
  updateWorkspace: { __typename?: 'Workspace' } & Pick<
    Types.Workspace,
    'id' | 'workspaceName' | 'users' | 'formCount'
  >;
};

export const UpdateWorkspaceDocument = gql`
  mutation updateWorkspace($name: String!, $id: ID!) {
    updateWorkspace(name: $name, id: $id) {
      id
      workspaceName
      users
      formCount
    }
  }
`;
export type UpdateWorkspaceMutationFn = Apollo.MutationFunction<
  UpdateWorkspaceMutation,
  UpdateWorkspaceMutationVariables
>;

/**
 * __useUpdateWorkspaceMutation__
 *
 * To run a mutation, you first call `useUpdateWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkspaceMutation, { data, loading, error }] = useUpdateWorkspaceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateWorkspaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateWorkspaceMutation,
    UpdateWorkspaceMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateWorkspaceMutation,
    UpdateWorkspaceMutationVariables
  >(UpdateWorkspaceDocument, baseOptions);
}
export type UpdateWorkspaceMutationHookResult = ReturnType<
  typeof useUpdateWorkspaceMutation
>;
export type UpdateWorkspaceMutationResult = Apollo.MutationResult<UpdateWorkspaceMutation>;
export type UpdateWorkspaceMutationOptions = Apollo.BaseMutationOptions<
  UpdateWorkspaceMutation,
  UpdateWorkspaceMutationVariables
>;
