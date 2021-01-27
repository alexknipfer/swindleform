import { appConfig } from '@/config/appConfig';
import { User } from '@/models/user';
import { Workspace } from '@/models/workspace';
import { Db, Collection } from 'mongodb';

import { AsyncRepo, makeRepoAsync } from './asyncRepository';

// annoying require but types are poor with this package and
// this is a simple fix
const mongo = require('sourced-repo-mongo/mongo');

export class DbConnection {
  connection: any;
  workspaceRepo: AsyncRepo<Workspace>;
  mongoDb: Db;
  users: Collection<User>;
  constructor() {
    this.connection = mongo.connect(appConfig.db.connectionString).then(() => {
      this.mongoDb = mongo.db;
      this.users = this.mongoDb.collection('users');
      this.workspaceRepo = makeRepoAsync(Workspace);
    });
  }

  async ensureConnection(): Promise<void> {
    await this.connection;
  }
}
