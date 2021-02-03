import { Entity, SnapshotBase } from 'sourced';
import * as uuid from 'uuid';

import { Form } from './form';

export interface WorkspaceSnapshot extends SnapshotBase {
  users: string[];
  workspaceName: string;
  formCount: number;
}

export class Workspace extends Entity<Workspace, WorkspaceSnapshot> {
  id = '';
  users: string[] = [];
  workspaceName = '';
  formCount = 0;
  forms: Form[] = [];

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

  createForm(form: Form) {
    this.forms.push(form);
    this.digest('createForm', form);
  }
}
