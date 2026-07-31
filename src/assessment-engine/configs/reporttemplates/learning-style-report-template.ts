export const learningStyleReportTemplate = {
  id: 'learning-style-template',
  layoutType: 'pie',
  showMbti: false,
  showVark: true,
  dimensions: [
    { key: 'visualScore', label: 'Visual Learner' },
    { key: 'auditoryScore', label: 'Auditory Learner' },
    { key: 'readingScore', label: 'Reading/Writing Learner' },
    { key: 'kinestheticScore', label: 'Kinesthetic Learner' }
  ],
  sections: {
    strengthsTitle: 'Cognitive Strengths',
    weaknessesTitle: 'Areas to Optimize Study Habits',
    actionPlanTitle: 'Custom Learning Style Strategy Roadmap',
    careerRecTitle: 'Top Professional Alignment Recommendations',
    eduRecTitle: 'Suggested Certification & Study Resources'
  }
};
