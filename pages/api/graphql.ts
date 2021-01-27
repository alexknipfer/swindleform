import { ApolloServer } from 'apollo-server-micro';
import { schema } from '@/apollo/schema';
import { getSession } from 'next-auth/client';

import { db } from '../../models';

const server = new ApolloServer({
  schema,
  async context({ req }) {
    const [session, dbIntance] = await Promise.all([
      getSession({ req }),
      db.ensureConnection().then(() => db),
    ]);

    return {
      db: dbIntance,
      session,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
