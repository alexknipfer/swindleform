import * as uuid from 'uuid';

export class Form {
  id = '';
  name = '';
  createdAt = '';

  constructor(name?: string) {
    this.id = uuid.v4();
    this.name = name || 'My form';
    this.createdAt = new Date().toISOString();
  }
}
