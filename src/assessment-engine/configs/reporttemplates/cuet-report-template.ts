export const cuetReportTemplate = {
  id: 'cuet-template',
  layoutType: 'radar',
  showMbti: false,
  showVark: false,
  dimensions: [
    { key: 'language', label: 'Language Proficiency' },
    { key: 'generalAptitude', label: 'General Aptitude' },
    { key: 'domainReadiness', label: 'Domain Readiness' },
    { key: 'academicReadiness', label: 'Academic Skills' }
  ],
  sections: {
    strengthsTitle: 'CUET Strengths & Core Competencies',
    weaknessesTitle: 'Target Areas for Growth',
    actionPlanTitle: 'Strategic 30/60-Day Study Planner',
    careerRecTitle: 'Top Career Recommendations',
    eduRecTitle: 'Suggested Central & State Universities'
  }
};
