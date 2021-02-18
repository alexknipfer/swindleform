import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../types';
export type CreateQuestionMutationVariables = Types.Exact<{
  workspaceId: Types.Scalars['String'];
  formId: Types.Scalars['String'];
  question: Types.QuestionCreateParams;
}>;

export type CreateQuestionMutation = { __typename?: 'Mutation' } & {
  createQuestion: { __typename?: 'Workspace' } & Pick<
    Types.Workspace,
    'workspaceName' | 'id' | 'users' | 'formCount'
  > & {
      forms: Array<
        { __typename?: 'Form' } & Pick<Types.Form, 'id' | 'name'> & {
            questions: Array<
              Types.Maybe<
                { __typename?: 'Question' } & Pick<
                  Types.Question,
                  'id' | 'type' | 'createdAt'
                > & {
                    data: { __typename?: 'QuestionData' } & Pick<
                      Types.QuestionData,
                      'question' | 'type'
                    >;
                  }
              >
            >;
          }
      >;
    };
};

export const CreateQuestionDocument = gql`
  mutation createQuestion(
    $workspaceId: String!
    $formId: String!
    $question: QuestionCreateParams!
  ) {
    createQuestion(
      workspaceId: $workspaceId
      formId: $formId
      question: $question
    ) {
      workspaceName
      id
      users
      formCount
      forms {
        id
        name
        questions {
          id
          type
          createdAt
          data {
            question
            type
          }
        }
      }
    }
  }
`;
export type CreateQuestionMutationFn = Apollo.MutationFunction<
  CreateQuestionMutation,
  CreateQuestionMutationVariables
>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      formId: // value for 'formId'
 *      question: // value for 'question'
 *   },
 * });
 */
export function useCreateQuestionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateQuestionMutation,
    CreateQuestionMutationVariables
  >,
) {
  return Apollo.useMutation<
    CreateQuestionMutation,
    CreateQuestionMutationVariables
  >(CreateQuestionDocument, baseOptions);
}
export type CreateQuestionMutationHookResult = ReturnType<
  typeof useCreateQuestionMutation
>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<
  CreateQuestionMutation,
  CreateQuestionMutationVariables
>;
