import { gql } from 'apollo-server-micro';

export const user = gql`
  type User {
    id: ID!
    email: String!
    name: String!
  }
  extend type Query {
    user(id: String!): User!
  }
`;

export const createUser = gql`
  extend type Mutation {
    createUser(username: ID!, password: String): String
  }
`;
