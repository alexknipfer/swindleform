import { gql } from 'apollo-server-micro';

export const workspace = gql`
  extend type Query {
    workspace(workspaceId: String!): Workspace!
  }

  extend type Mutation {
    createWorkspace(name: String!): Workspace!
  }

  extend type Mutation {
    updateWorkspace(id: ID!, name: String!): Workspace!
  }
`;
