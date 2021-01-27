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
    name: String!
    workspaces: [Workspace!]
  }

  extend type Query {
    user(id: String!): User!
  }
`;

export const createUser = gql`
  extend type Mutation {
    createUser(username: String!, password: String!): String
  }
`;
