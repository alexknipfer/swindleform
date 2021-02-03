import * as uuid from 'uuid';

export class Form {
  id = '';
  name = '';

  constructor(name?: string) {
    this.id = uuid.v4();
    this.name = name || 'My form';
  }
}
