import { Entity, SnapshotBase } from 'sourced';
import * as uuid from 'uuid';

export interface FormSnapshot extends SnapshotBase {
  formName: string;
}

export class Form extends Entity<Form, FormSnapshot> {
  formName = '';
  constructor(snapshot?: any, events?: any[]) {
    super();

    this.rehydrate(snapshot, events);
  }

  init() {
    this.id = uuid.v4();
  }

  updateName(params: { name: string }) {
    this.formName = params.name;
    this.digest('updateName', params);
  }
}
