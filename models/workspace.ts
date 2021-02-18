import { Entity, SnapshotBase } from 'sourced';
import * as uuid from 'uuid';

import { Form } from './form';
import { FormQuestion } from './question';

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
  createdAt = '';

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
    this.createdAt = new Date().toISOString();

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
    this.formCount++;
    this.digest('createForm', form);
  }

  addFormQuestion({
    formId,
    question,
  }: {
    formId: string;
    question: FormQuestion;
  }) {
    const form = this.findForm(formId);

    this.ensureNoConflictingQuestionId(form, question.id);

    form.questions.push(question);

    this.digest('addFormQuestion', { formId, question });
  }

  private findForm(formId: string) {
    const form = this.forms.find((f) => f.id === formId);

    if (!form) {
      throw new Error('Form not found');
    }

    return form;
  }

  private ensureNoConflictingQuestionId(form: Form, newId: string) {
    const hasConflictingQuestionId = form.questions.some((q) => q.id === newId);

    if (hasConflictingQuestionId) {
      throw new Error(
        'Question id conflict, all questions must have unique `id` field',
      );
    }
  }
}
