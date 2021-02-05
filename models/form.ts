import * as uuid from 'uuid';

import { FormQuestion } from './question';

export class Form {
  id = '';
  name = '';
  createdAt = '';
  questions: FormQuestion[] = [];

  constructor(name?: string) {
    this.id = uuid.v4();
    this.name = name || 'My form';
    this.createdAt = new Date().toISOString();
  }
}
