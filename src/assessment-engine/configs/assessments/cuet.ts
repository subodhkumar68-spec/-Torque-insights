import { cuetQuestions } from '../questionbanks/cuet-questions';
import { cuetReportTemplate } from '../reporttemplates/cuet-report-template';

export const cuetConfig = {
  id: 'ast-cuet',
  title: 'CUET UG Readiness Diagnostic',
  subtitle: 'Benchmark performance for Central & State University admissions.',
  icon: 'Compass',
  category: 'College Entrance',
  duration: 35,
  instructions: [
    'This diagnostic test takes approximately 35 minutes to complete.',
    'There are 50 questions assessing key exam dimensions.',
    'Domain readiness questions will dynamically adapt based on your chosen stream.',
    'Calculators are not allowed. Scratchpad use is recommended.'
  ],
  sections: [
    { id: 'sec-cuet-1', title: 'Language Proficiency' },
    { id: 'sec-cuet-2', title: 'General Aptitude' },
    { id: 'sec-cuet-3', title: 'Domain Readiness' },
    { id: 'sec-cuet-4', title: 'Academic Skills' }
  ],
  questionBank: cuetQuestions,
  scoringModel: {
    type: 'dimensions',
    dimensions: ['language', 'generalAptitude', 'domainReadiness', 'academicReadiness']
  },
  reportTemplate: cuetReportTemplate,
  themeColor: '#002D62', // Citibank Corporate Blue
  recommendedCourses: [
    'B.A. / B.Sc. / B.Com. (Honours) Programmes',
    'Integrated Master in Liberal Arts & Social Sciences',
    'Undergraduate Degrees in Law & Public Policy'
  ],
  recommendedCareers: [
    'Civil Services & Public Administration',
    'Research & Pedagogy Specialist',
    'Corporate Communications Manager'
  ],
  pdfTemplate: 'standard',
  difficulty: 'Hard' as const
};
