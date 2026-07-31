import { AssessmentConfig } from './AssessmentRegistry';

export const QuestionLoader = {
  loadQuestions: (config: AssessmentConfig) => {
    return config.questionBank || [];
  }
};
