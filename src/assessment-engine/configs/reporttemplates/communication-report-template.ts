export const communicationReportTemplate = {
  id: 'communication-template',
  layoutType: 'radar',
  showMbti: false,
  showVark: false,
  dimensions: [
    { key: 'verbal', label: 'Verbal Communication' },
    { key: 'written', label: 'Written Communication' },
    { key: 'business', label: 'Business Communication' },
    { key: 'interpersonal', label: 'Interpersonal Skills' },
    { key: 'presentation', label: 'Presentation Skills' },
    { key: 'interview', label: 'Interview Skills' }
  ],
  sections: {
    strengthsTitle: 'Communication Core Competencies',
    weaknessesTitle: 'Areas for Communication Refinement',
    actionPlanTitle: 'Strategic 30/60-Day Action Planner',
    careerRecTitle: 'Top Career Suitabilities',
    eduRecTitle: 'Suggested Learning Modules'
  }
};
