import { Repository } from 'sourced-repo-mongo';
import { Entity } from 'sourced';
import { TConstructor } from 'sourced-repo-mongo';

export interface AsyncRepo<T extends Entity> {
  get: (id: string) => Promise<T | null>;
  getAll: (ids: string[]) => Promise<T[]>;
  commit: (entity: T, options?: any) => Promise<void>;
  commitAll: (entities: T[], options?: any) => Promise<void>;
}

export const makeRepoAsync = <T extends Entity>(
  entity: TConstructor<T>,
): AsyncRepo<T> => {
  const repo = new Repository(entity);

  const get = (id: string): Promise<T | null> =>
    new Promise<T | null>((resolve, reject) =>
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

  const commit = (entity: T, options: any = {}): Promise<void> =>
    new Promise((resolve, reject) => {
      repo.commit(entity, options, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

  const commitAll = (entities: T[], options: any = {}): Promise<void> =>
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
