import * as uuid from 'uuid';

export enum QuestionType {
  TEXT = 'text',
}

export type QuestionData = TextQuestionData;

export interface BaseQuestionData {
  question: string;
  required: boolean;
  type: QuestionType;
}

export interface TextQuestionData extends BaseQuestionData {
  type: QuestionType.TEXT;
}

export interface FormQuestion {
  id: string;
  type: QuestionType;
  data: QuestionData;
  createdAt: string;
}

export type QuestionCreateParams = TextQuestionData;

interface IQuestion {
  id: string;
  type: QuestionType;
  data: QuestionData;
  createdAt: string;
}

class QuestionBase {
  id: string;
  createdAt: string;

  constructor() {
    this.id = uuid.v4();
    this.createdAt = new Date().toISOString();
  }
}

export class TextQuestion extends QuestionBase implements IQuestion {
  type = QuestionType.TEXT;
  id = uuid.v4();
  createdAt = new Date().toISOString();

  constructor(public data: TextQuestionData) {
    super();
  }
}
