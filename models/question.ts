import * as uuid from 'uuid';

export enum QuestionType {
  TEXT = 'text',
}

export type QuestionData = TextQuestionData;

interface QuestionBase {
  id: string;
  type: QuestionType;
  data: QuestionData;
  createdAt: string;
}

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

export class TextQuestion implements QuestionBase {
  type = QuestionType.TEXT;
  id = uuid.v4();
  createdAt = new Date().toISOString();

  constructor(public data: TextQuestionData) {}
}
