import { appConfig } from '@/config/appConfig';
import { Repository } from 'sourced-repo-mongo';
import { Collection, Db } from 'mongodb';
import { Entity } from 'sourced';
import { TConstructor } from 'sourced-repo-mongo';

import { Workspace } from './workspace';
import { User } from './user';

const mongo = require('sourced-repo-mongo/mongo');

interface AsyncRepo<T extends Entity> {
  get: (id: string) => Promise<T>;
  getAll: (ids: string[]) => Promise<T[]>;
  commit: (entity: T, options?: any) => Promise<void>;
  commitAll: (entities: T[], options?: any) => Promise<void>;
}

const makeRepoAsync = <T extends Entity>(
  entity: TConstructor<T>,
): AsyncRepo<T> => {
  const repo = new Repository(entity);

  const get = (id: string): Promise<T> =>
    new Promise<T>((resolve, reject) =>
      repo.get(id, (err, entity) => {
        if (err) return reject(err);
        resolve(entity);
      }),
    );

  const getAll = (ids: string[]): Promise<T[]> =>
    new Promise<T[]>((resolve, reject) =>
      repo.getAll(ids, (err, entity) => {
        if (err) return reject(err);
        resolve(entity);
      }),
    );

  const commit = (entity: T, options?: any): Promise<void> =>
    new Promise((resolve, reject) => {
      repo.commit(entity, options, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

  const commitAll = (entities: T[], options?: any): Promise<void> =>
    new Promise((resolve, reject) => {
      repo.commitAll(entities, options, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

  return {
    get,
    getAll,
    commit,
    commitAll,
  };
};

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

export const db = new DbConnection();
