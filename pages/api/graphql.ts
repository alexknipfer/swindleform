import { ApolloServer } from 'apollo-server-micro';

import { rootResolver } from '../../apollo/resolvers';
import { typeDefsSchema } from '../../apollo/typeDefs';

const server = new ApolloServer({
  resolvers: rootResolver,
  typeDefs: typeDefsSchema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
