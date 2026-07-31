import { learningStyleQuestions } from '../questionbanks/learning-style-questions';
import { learningStyleReportTemplate } from '../reporttemplates/learning-style-report-template';

export const learningStyleConfig = {
  id: 'ast-learning',
  title: 'Learning Style Diagnostic',
  subtitle: 'Discover how you learn best and capture study insights.',
  icon: 'BookOpen',
  category: 'Learning Assessment',
  duration: 20,
  instructions: [
    'Assessments evaluate visual, auditory, reading, and kinesthetic recall.',
    'Answer honestly to identify optimal classroom and self-study techniques.',
    'This diagnostic will help prepare personalized exam roadmap sheets.'
  ],
  sections: [
    { id: 'sec-learn-1', title: 'Cognitive VARK Modalities' }
  ],
  questionBank: learningStyleQuestions,
  scoringModel: {
    type: 'vark',
    dimensions: ['visualScore', 'auditoryScore', 'readingScore', 'kinestheticScore']
  },
  reportTemplate: learningStyleReportTemplate,
  themeColor: '#3B82F6', // Blue
  recommendedCourses: [
    'B.Des Visual Communication',
    'B.Ed Educational Technology',
    'B.Sc Cognitive Science'
  ],
  recommendedCareers: [
    'Technical Instructional Designer',
    'Visual Data Analyst',
    'Creative Content Strategist'
  ],
  pdfTemplate: 'learning',
  difficulty: 'Easy' as const
};
