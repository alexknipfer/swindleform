import { gql } from 'apollo-server-micro';

export const user = gql`
  type User {
    id: ID!
    email: String!
    name: String!
  }
  extend type Query {
    getUser(id: String!): User!
  }
`;
