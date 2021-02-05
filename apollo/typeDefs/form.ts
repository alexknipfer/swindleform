import { gql } from 'apollo-server-micro';

export const form = gql`
  type Form {
    id: ID!
    name: String!
    questions: [Question]!
  }

  type QuestionData {
    question: String!
    required: Boolean!
    type: QuestionType!
  }

  type Question {
    id: ID!
    type: QuestionType!
    data: QuestionData!
    createdAt: String!
  }

  enum QuestionType {
    text
  }

  input QuestionCreateParams {
    question: String!
    required: Boolean!
    type: QuestionType!
  }

  extend type Mutation {
    createQuestion(
      workspaceId: String!
      formId: String!
      question: QuestionCreateParams!
    ): Workspace!
  }

  extend type Mutation {
    createForm(workspaceId: String!): Workspace!
  }
`;
