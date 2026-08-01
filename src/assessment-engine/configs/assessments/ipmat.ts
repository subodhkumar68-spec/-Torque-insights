import { ipmatQuestions } from '../questionbanks/ipmat-questions';
import { ipmatReportTemplate } from '../reporttemplates/ipmat-report-template';

export const ipmatConfig = {
  id: 'ast-ipmat',
  title: 'IPMAT Readiness Diagnostic',
  subtitle: 'Benchmark performance for IIM Integrated BBA/MBA admissions.',
  icon: 'Compass',
  category: 'College Entrance',
  duration: 30,
  instructions: [
    'This diagnostic test takes approximately 30 minutes to complete.',
    'There are 40 questions assessing key entrance dimensions.',
    'Calculators are not allowed; mental math and scratchpad use is recommended.',
    'Answer every question to receive your dynamic percentile estimate.'
  ],
  sections: [
    { id: 'sec-ipmat-1', title: 'Quantitative Aptitude' },
    { id: 'sec-ipmat-2', title: 'Higher Mathematics' },
    { id: 'sec-ipmat-3', title: 'Logical Reasoning' },
    { id: 'sec-ipmat-4', title: 'Verbal Ability' }
  ],
  questionBank: ipmatQuestions,
  scoringModel: {
    type: 'dimensions',
    dimensions: ['quantitativeAptitude', 'higherMathematics', 'logicalReasoning', 'verbalAbility']
  },
  reportTemplate: ipmatReportTemplate,
  themeColor: '#002D62', // Citibank Corporate Blue
  recommendedCourses: [
    'Five-Year Integrated Program in Management (IPM)',
    'Integrated BBA + MBA (IIM Indore/Rohtak/Ranchi)',
    'BBA in Finance & Management Analytics'
  ],
  recommendedCareers: [
    'Management Consultant',
    'Investment Analyst',
    'Corporate Strategy Executive'
  ],
  pdfTemplate: 'standard',
  difficulty: 'Hard' as const
};
