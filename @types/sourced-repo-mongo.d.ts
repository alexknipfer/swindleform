declare module 'sourced-repo-mongo' {
  import { EventEmitter } from 'events';

  import { Entity } from 'sourced';

  export interface TConstructor<TSourcedEntity extends Entity> {
    new (snapshot?: any, events?: any[]): TSourcedEntity;
  }
  interface RepositoryOptions {
    snapshotFrequency?: number;
  }
  export declare class Repository<T extends Entity> extends EventEmitter {
    constructor(entityType: TConstructor<T>, options?: RepositoryOptions);
    get(id: string, cb: (err: Error | null, entity: T | null) => void): void;
    getAll(ids: string[], cb: (err: Error | null, entities: T[]) => void): void;
    commit(entity: T, options: any, cb: (err: Error | null) => void): void;
    commit(entity: T, cb: (err: Error | null) => void): void;
    commitAll(
      entity: T[],
      options?: { forceSnapshot: boolean },
      cb: (err: Error | null) => void,
    );
  }
  export default Repository;
}
