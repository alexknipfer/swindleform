import { gql } from 'apollo-server-micro';

export const user = gql`
  type Workspace {
    id: ID!
    users: [String!]
    workspaceName: String!
  }

  type User {
    id: ID!
    email: String!
    workspaces: [Workspace!]
  }

  extend type Query {
    user: User!
  }
`;
