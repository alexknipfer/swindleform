import { ApolloServer } from 'apollo-server-micro';
import { schema } from '@/apollo/schema';
import { ensureConnection } from 'db/connection';

const server = new ApolloServer({
  schema,
  context: async () => {
    return {
      connection: await ensureConnection(),
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
