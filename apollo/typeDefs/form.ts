import { gql } from 'apollo-server-micro';

export const form = gql`
  type Form {
    id: ID!
    name: String!
  }
  extend type Mutation {
    createForm(workspaceId: String!): Form!
  }
`;
