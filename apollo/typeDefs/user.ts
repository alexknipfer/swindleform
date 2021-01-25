import { gql } from 'apollo-server-micro';

export const user = gql`
  type User {
    id: ID!
    username: String!
  }

  extend type Query {
    user(id: String!): User!
  }
`;

export const createUser = gql`
  type CreatedUser {
    id: ID!
    username: String!
  }

  extend type Mutation {
    createUser(username: String!, password: String!): CreatedUser!
  }
`;
