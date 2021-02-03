import { gql } from 'apollo-server-micro';

export const workspace = gql`
  type Workspace {
    id: ID!
    users: [String!]!
    workspaceName: String!
    formCount: Int!
    forms: [Form!]!
  }
  extend type Query {
    workspace(workspaceId: String!): Workspace
  }
  extend type Mutation {
    createWorkspace(name: String!): Workspace!
  }
`;
