import { gql } from 'apollo-server-micro';

export const workspace = gql`
  extend type Query {
    workspace(workspaceId: String!): Workspace
  }
`;
