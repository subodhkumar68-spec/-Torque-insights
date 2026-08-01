import { communicationQuestions } from '../questionbanks/communication-questions';
import { communicationReportTemplate } from '../reporttemplates/communication-report-template';

export const communicationConfig = {
  id: 'future-communication', // Keep registered placeholder ID
  title: 'Communication Skills Diagnostic',
  subtitle: 'Measure verbal, written, business, interpersonal, and public speaking readiness.',
  icon: 'Mail',
  category: 'Soft Skills',
  duration: 30,
  instructions: [
    'This diagnostic test takes approximately 30 minutes to complete.',
    'There are 40 multiple choice and situational judgment questions.',
    'It evaluates communication effectiveness rather than simple English grammar rules.',
    'Be honest and choose the most effective professional action in each case.'
  ],
  sections: [
    { id: 'sec-comm-1', title: 'Verbal Communication' },
    { id: 'sec-comm-2', title: 'Written Communication' },
    { id: 'sec-comm-3', title: 'Business Communication' },
    { id: 'sec-comm-4', title: 'Interpersonal Communication' },
    { id: 'sec-comm-5', title: 'Presentation & Public Speaking' },
    { id: 'sec-comm-6', title: 'Interview & Group Discussion' }
  ],
  questionBank: communicationQuestions,
  scoringModel: {
    type: 'dimensions',
    dimensions: ['verbal', 'written', 'business', 'interpersonal', 'presentation', 'interview']
  },
  reportTemplate: communicationReportTemplate,
  themeColor: '#002D62', // Citibank Corporate Blue
  recommendedCourses: [
    'Business Writing & Documentation Masterclass',
    'Executive Public Speaking & Rhetoric',
    'Interpersonal Mediation & Conflict Resolution'
  ],
  recommendedCareers: [
    'Corporate Communications Consultant',
    'Public Relations Specialist',
    'Management Consultant / Executive Partner'
  ],
  pdfTemplate: 'standard',
  difficulty: 'Medium' as const
};
