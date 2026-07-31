export const personalityReportTemplate = {
  id: 'personality-template',
  layoutType: 'radar',
  showMbti: true,
  showVark: false,
  dimensions: [
    { key: 'problemSolving', label: 'Problem Solving' },
    { key: 'criticalThinking', label: 'Critical Thinking' },
    { key: 'leadershipScore', label: 'Leadership potential' },
    { key: 'communicationScore', label: 'Communication' },
    { key: 'emotionalIntelligence', label: 'Emotional Intelligence' },
    { key: 'decisionMaking', label: 'Decision style' }
  ],
  sections: {
    strengthsTitle: 'Behavioral & Synergy Strengths',
    weaknessesTitle: 'Preferred Growth Spheres',
    actionPlanTitle: 'Personalized Behavioral Alignment Map',
    careerRecTitle: 'Top Matching Work Roles',
    eduRecTitle: 'Suggested Learning Styles & Certs'
  }
};
