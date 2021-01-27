import { ApolloServer } from 'apollo-server-micro';
import { schema } from '@/apollo/schema';

import { db } from '../../models';

const server = new ApolloServer({
  schema,
  async context() {
    return {
      db: await db.ensureConnection().then(() => db),
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
