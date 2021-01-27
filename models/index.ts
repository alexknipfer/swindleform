import { appConfig } from '@/config/appConfig';
import { Repository } from 'sourced-repo-mongo';
import { Collection, Db } from 'mongodb';

import { Workspace } from './workspace';
import { User } from './user';

const mongo = require('sourced-repo-mongo/mongo');

export class DbConnection {
  connection: any;
  workspaceRepo: Repository<Workspace>;
  mongoDb: Db;
  users: Collection<User>;
  constructor() {
    this.connection = mongo.connect(appConfig.db.connectionString).then(() => {
      this.mongoDb = mongo.db;
      this.users = this.mongoDb.collection('users');
      this.workspaceRepo = new Repository(Workspace);
    });
  }

  async ensureConnection(): Promise<void> {
    await this.connection;
  }
}

export const db = new DbConnection();
