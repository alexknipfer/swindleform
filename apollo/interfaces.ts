import { DbConnection } from '@/db/dbConnection';

// TODO - this is a WIP - I'm sure we'll add more
export interface GQLContext {
  db: DbConnection;
  session: { user: { email: string; id: string } };
}
