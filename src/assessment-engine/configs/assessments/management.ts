import { managementQuestions } from '../questionbanks/management-questions';
import { genericReportTemplate } from '../reporttemplates/generic-report-template';

export const managementConfig = {
  id: 'ast-management',
  title: 'Management Career Fit Assessment',
  subtitle: 'Measure leadership, decision logic, and business thinking.',
  icon: 'Briefcase',
  category: 'Management',
  duration: 30,
  instructions: [
    'Evaluates leadership capability, team synergy, and strategic decision style.',
    'Provides feedback on management potential, MBA readiness, and career alignment.'
  ],
  sections: [
    { id: 'sec-mgmt-1', title: 'Management & Strategy Core' }
  ],
  questionBank: managementQuestions,
  scoringModel: {
    type: 'dimensions',
    dimensions: ['problemSolving', 'criticalThinking', 'communicationScore', 'leadershipScore', 'emotionalIntelligence', 'decisionMaking']
  },
  reportTemplate: genericReportTemplate,
  themeColor: '#7C3AED', // Purple
  recommendedCourses: [
    'MBA in Strategy & Product Marketing',
    'BBA in Entrepreneurship Studies',
    'PGDM in General Corporate Management'
  ],
  recommendedCareers: [
    'Brand Product Manager',
    'Corporate Strategy Consultant',
    'Entrepreneur / Business Founder'
  ],
  pdfTemplate: 'standard',
  difficulty: 'Hard' as const
};
