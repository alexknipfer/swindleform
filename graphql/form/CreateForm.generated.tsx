import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../types';
export type CreateFormMutationVariables = Types.Exact<{
  workspaceId: Types.Scalars['String'];
}>;

export type CreateFormMutation = { __typename?: 'Mutation' } & {
  createForm: { __typename?: 'Form' } & Pick<Types.Form, 'id' | 'name'>;
};

export const CreateFormDocument = gql`
  mutation CreateForm($workspaceId: String!) {
    createForm(workspaceId: $workspaceId) {
      id
      name
    }
  }
`;
export type CreateFormMutationFn = Apollo.MutationFunction<
  CreateFormMutation,
  CreateFormMutationVariables
>;

/**
 * __useCreateFormMutation__
 *
 * To run a mutation, you first call `useCreateFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFormMutation, { data, loading, error }] = useCreateFormMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useCreateFormMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFormMutation,
    CreateFormMutationVariables
  >,
) {
  return Apollo.useMutation<CreateFormMutation, CreateFormMutationVariables>(
    CreateFormDocument,
    baseOptions,
  );
}
export type CreateFormMutationHookResult = ReturnType<
  typeof useCreateFormMutation
>;
export type CreateFormMutationResult = Apollo.MutationResult<CreateFormMutation>;
export type CreateFormMutationOptions = Apollo.BaseMutationOptions<
  CreateFormMutation,
  CreateFormMutationVariables
>;
