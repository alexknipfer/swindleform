import { Entity } from 'sourced';
import * as uuid from 'uuid';

export class Workspace extends Entity {
  id = '';
  users: string[] = [];
  workspaceName = '';

  constructor(snapshot?: any, events?: any[]) {
    super();

    this.rehydrate(snapshot, events);
  }

  /**
   * should only be called the first time an entity is created
   */
  init(id = uuid.v4()) {
    this.id = id;
    this.digest('init', id);
  }

  updateName(params: { name: string }) {
    this.workspaceName = params.name;
    this.digest('updateName', params);
  }

  addUser(params: { userId: string }) {
    this.users.push(params.userId);
    this.digest('addUser', params);
  }
}
