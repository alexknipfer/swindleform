import { appConfig } from '@/config/appConfig';
import { User } from '@/models/user';
import { Workspace } from '@/models/workspace';
import { Db, Collection, MongoClient } from 'mongodb';

import { AsyncRepo, makeRepoAsync } from './asyncRepository';

// annoying require but types are poor with this package and
// this is a simple fix
const mongo = require('sourced-repo-mongo/mongo');

export class DbConnection {
  connection: any;
  store: any = {};

  constructor() {
    if (mongo.db && (mongo.client as MongoClient).isConnected()) {
      this.store.mongoDb = mongo.db;
      this.store.users = mongo.db.collection('users');
      this.store.workspaceRepo = makeRepoAsync(Workspace);

      return;
    }

    this.connection = mongo.connect(appConfig.db.connectionString).then(() => {
      this.store.mongoDb = mongo.db;
      this.store.users = mongo.db.collection('users');
      this.store.workspaceRepo = makeRepoAsync(Workspace);
    });
  }

  async ensureConnection(): Promise<void> {
    await this.connection;
  }

  get workspaceRepo(): AsyncRepo<Workspace> {
    return this.store.workspaceRepo;
  }

  get users(): Collection<User> {
    return this.store.users;
  }

  get mongoDb(): Db {
    return this.store.mongoDb;
  }
}
