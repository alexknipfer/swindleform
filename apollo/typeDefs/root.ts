import { gql } from 'apollo-server-micro';

export const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;
