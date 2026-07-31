import { commerceQuestions } from '../questionbanks/commerce-questions';
import { genericReportTemplate } from '../reporttemplates/generic-report-template';

export const commerceConfig = {
  id: 'ast-commerce',
  title: 'Commerce Career Fit Assessment',
  subtitle: 'Benchmark business aptitude and finance interest.',
  icon: 'TrendingUp',
  category: 'Career Assessment',
  duration: 30,
  instructions: [
    'Evaluates finance interest, accounting rules, and economics acumen.',
    'Provides feedback on suitability for CA, CS, CMA, and BBA/MBA fields.'
  ],
  sections: [
    { id: 'sec-comm-1', title: 'Business & Finance Core' }
  ],
  questionBank: commerceQuestions,
  scoringModel: {
    type: 'dimensions',
    dimensions: ['problemSolving', 'criticalThinking', 'communicationScore', 'leadershipScore', 'emotionalIntelligence', 'decisionMaking']
  },
  reportTemplate: genericReportTemplate,
  themeColor: '#D97706', // Amber
  recommendedCourses: [
    'Bachelor of Commerce (B.Com Hons)',
    'Chartered Accountancy (CA)',
    'BBA in Corporate Finance'
  ],
  recommendedCareers: [
    'Corporate Investment Banker',
    'Chartered Accountant',
    'Equity Research Strategy Lead'
  ],
  pdfTemplate: 'standard',
  difficulty: 'Medium' as const
};
