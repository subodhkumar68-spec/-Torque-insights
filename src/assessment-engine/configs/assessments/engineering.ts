import { engineeringQuestions } from '../questionbanks/engineering-questions';
import { genericReportTemplate } from '../reporttemplates/generic-report-template';

export const engineeringConfig = {
  id: 'ast-engineering',
  title: 'Engineering Readiness Assessment',
  subtitle: 'Evaluate engineering aptitude and STEM capabilities.',
  icon: 'Rocket',
  category: 'Career Readiness',
  duration: 30,
  instructions: [
    'Evaluates logical induction, mathematics, physics, and spatial structures.',
    'Formulate answers using scientific and logic concepts.',
    'Provides feedback on readiness for top engineering branches.'
  ],
  sections: [
    { id: 'sec-eng-1', title: 'STEM Aptitude Core' }
  ],
  questionBank: engineeringQuestions,
  scoringModel: {
    type: 'dimensions',
    dimensions: ['problemSolving', 'criticalThinking', 'communicationScore', 'leadershipScore', 'emotionalIntelligence', 'decisionMaking']
  },
  reportTemplate: genericReportTemplate,
  themeColor: '#059669', // Emerald
  recommendedCourses: [
    'B.Tech Mechanical Engineering',
    'B.Tech Computer Science & engineering',
    'M.Tech Robotics & Control Systems'
  ],
  recommendedCareers: [
    'Robotics & Automation Engineer',
    'Computer Systems Architect',
    'Aerospace Structural Designer'
  ],
  pdfTemplate: 'standard',
  difficulty: 'Hard' as const
};
