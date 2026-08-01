import { highSchoolQuestions } from '../questionbanks/high-school-questions';
import { genericReportTemplate } from '../reporttemplates/generic-report-template';

export const highSchoolConfig = {
  id: 'ast-aptitude',
  title: 'High School Career Aptitude Test',
  subtitle: 'Identify core streams and academic disciplines.',
  icon: 'GraduationCap',
  category: 'Career Aptitude',
  duration: 30,
  instructions: [
    'This test takes approximately 30 minutes to complete.',
    'There are 30 questions assessing multiple cognitive dimensions.',
    'Do not search for answers online; your first instinct is usually the most accurate.',
    'Make sure you are in a quiet room with a stable internet connection.'
  ],
  sections: [
    { id: 'sec-apt-1', title: 'Quantitative & Logical Aptitude' },
    { id: 'sec-apt-2', title: 'Spatial & Mechanical Visualization' },
    { id: 'sec-apt-3', title: 'Verbal Fluency & Reasoning' }
  ],
  questionBank: highSchoolQuestions,
  scoringModel: {
    type: 'riasec',
    dimensions: ['problemSolving', 'criticalThinking', 'communicationScore', 'leadershipScore', 'emotionalIntelligence', 'decisionMaking']
  },
  reportTemplate: genericReportTemplate,
  themeColor: '#C62828', // Brand Red
  recommendedCourses: [
    'B.Tech Computer Science & AI',
    'B.Sc Mathematics & Statistics',
    'Integrated M.Tech Software Systems'
  ],
  recommendedCareers: [
    'AI / Machine Learning Engineer',
    'Bioinformatics Scientist',
    'Cybersecurity Analyst'
  ],
  pdfTemplate: 'standard',
  difficulty: 'Medium' as const
};
