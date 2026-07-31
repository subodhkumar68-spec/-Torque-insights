export const genericReportTemplate = {
  id: 'generic-template',
  layoutType: 'radar',
  showMbti: false,
  showVark: false,
  dimensions: [
    { key: 'problemSolving', label: 'Problem Solving' },
    { key: 'criticalThinking', label: 'Critical Thinking' },
    { key: 'leadershipScore', label: 'Leadership' },
    { key: 'communicationScore', label: 'Communication' },
    { key: 'emotionalIntelligence', label: 'Emotional Intelligence' },
    { key: 'decisionMaking', label: 'Decision Making' }
  ],
  sections: {
    strengthsTitle: 'Top Professional Strengths',
    weaknessesTitle: 'Areas of Potential Development',
    actionPlanTitle: 'Custom Action & Learning Roadmap',
    careerRecTitle: 'Recommended Career Sectors',
    eduRecTitle: 'Suggested Academic Pathways & Degrees'
  }
};
