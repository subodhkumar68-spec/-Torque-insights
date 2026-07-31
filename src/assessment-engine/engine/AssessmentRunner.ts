import { AssessmentConfig } from './AssessmentRegistry';
import { AssessmentSession } from '../../services/dbService';

export const AssessmentRunner = {
  createSession: (userId: string, config: AssessmentConfig): AssessmentSession => {
    const durationMs = (config.duration || 30) * 60 * 1000;
    return {
      id: `ses-${Date.now()}`,
      userId,
      category: config.category,
      subCategory: config.title,
      startTime: Date.now(),
      durationMs,
      answers: {},
      submitted: false
    };
  },

  isSessionExpired: (session: AssessmentSession): boolean => {
    const elapsed = Date.now() - session.startTime;
    return elapsed >= session.durationMs;
  }
};
