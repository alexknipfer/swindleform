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
   * and should handle the first time creation of the model
   * in one shot, ie all required params at once
   */
  init({
    id = uuid.v4(),
    workspaceName = 'default',
    firstUserId,
  }: {
    id?: string;
    workspaceName?: string;
    firstUserId: string;
  }) {
    this.id = id;
    this.workspaceName = workspaceName;
    this.users = [firstUserId];

    this.digest('init', { id, workspaceName, firstUserId });
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
