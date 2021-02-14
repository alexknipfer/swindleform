import { useReducer } from 'react';

interface State {
  textQuestions: string[];
  selectedQuestion: number;
}

type Action =
  | { type: 'add_text_question' }
  | { type: 'select_question'; questionIndex: number };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add_text_question': {
      const textQuestions = [...state.textQuestions, ''];
      const selectedQuestion = textQuestions.length - 1;

      return {
        ...state,
        textQuestions,
        selectedQuestion,
      };
    }
    case 'select_question': {
      return {
        ...state,
        selectedQuestion: action.questionIndex,
      };
    }
  }
};

export const useQuestionBuilderReducer = () =>
  useReducer(reducer, {
    textQuestions: [''],
    selectedQuestion: 0,
  });
