import {
  QuestionCreateParams,
  QuestionType,
  TextQuestion,
} from '@/models/question';

export const formQuestionFactory = (params: QuestionCreateParams) => {
  switch (params.type) {
    case QuestionType.TEXT:
      return new TextQuestion(params);
    default:
      throw new Error('Unsupported question type');
  }
};
