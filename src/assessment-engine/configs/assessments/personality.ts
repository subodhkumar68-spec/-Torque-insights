import { personalityQuestions } from '../questionbanks/personality-questions';
import { personalityReportTemplate } from '../reporttemplates/personality-report-template';

export const personalityConfig = {
  id: 'ast-personality',
  title: 'Personality Mapping',
  subtitle: 'Understand behavioral patterns, communication, and leadership tendencies.',
  icon: 'BrainCircuit',
  category: 'Personality Assessment',
  duration: 25,
  instructions: [
    'Answer questions based on your typical feelings and preferences.',
    'There are no right or wrong answers in personality diagnostics.',
    'Work at a steady pace without overthinking individual scenarios.',
    'Your profile results will compile an MBTI-based archetype.'
  ],
  sections: [
    { id: 'sec-pers-1', title: 'Energy & Information Styles' },
    { id: 'sec-pers-2', title: 'Decision & Task Strategies' }
  ],
  questionBank: personalityQuestions,
  scoringModel: {
    type: 'mbti',
    dimensions: ['problemSolving', 'criticalThinking', 'communicationScore', 'leadershipScore', 'emotionalIntelligence', 'decisionMaking']
  },
  reportTemplate: personalityReportTemplate,
  themeColor: '#EC4899', // Pink
  recommendedCourses: [
    'BA / B.Sc Psychology',
    'BBA in Human Resource Management',
    'MBA in Leadership & Strategy'
  ],
  recommendedCareers: [
    'Software Product Manager',
    'Strategic Management Consultant',
    'Clinical Psychologist'
  ],
  pdfTemplate: 'personality',
  difficulty: 'Easy' as const
};
