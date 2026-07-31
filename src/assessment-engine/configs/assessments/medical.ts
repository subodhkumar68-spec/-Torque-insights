import { medicalQuestions } from '../questionbanks/medical-questions';
import { genericReportTemplate } from '../reporttemplates/generic-report-template';

export const medicalConfig = {
  id: 'ast-medical',
  title: 'Medical Career Fit Assessment',
  subtitle: 'Evaluate medical profession and clinical suitability.',
  icon: 'Shield',
  category: 'Career Assessment',
  duration: 30,
  instructions: [
    'Evaluates biology interest, observational accuracy, and clinical stress.',
    'Formulate answers using empathy and organic science logic.',
    'Provides feedback on specializations fit (surgery, pathology, cardiology).'
  ],
  sections: [
    { id: 'sec-med-1', title: 'Clinical Aptitude Core' }
  ],
  questionBank: medicalQuestions,
  scoringModel: {
    type: 'dimensions',
    dimensions: ['problemSolving', 'criticalThinking', 'communicationScore', 'leadershipScore', 'emotionalIntelligence', 'decisionMaking']
  },
  reportTemplate: genericReportTemplate,
  themeColor: '#4F46E5', // Indigo
  recommendedCourses: [
    'MBBS / Medical Graduate Program',
    'B.Sc Biotechnology & Genetics',
    'M.Sc Clinical Research Methods'
  ],
  recommendedCareers: [
    'Specialized Cardiologist',
    'Clinical Research Pathologist',
    'Pediatric Neurologist'
  ],
  pdfTemplate: 'standard',
  difficulty: 'Hard' as const
};
