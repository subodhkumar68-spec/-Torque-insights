export const ipmatReportTemplate = {
  id: 'ipmat-template',
  layoutType: 'radar',
  showMbti: false,
  showVark: false,
  dimensions: [
    { key: 'quantitativeAptitude', label: 'Quantitative Aptitude' },
    { key: 'higherMathematics', label: 'Higher Mathematics' },
    { key: 'logicalReasoning', label: 'Logical Reasoning' },
    { key: 'verbalAbility', label: 'Verbal Ability' }
  ],
  sections: {
    strengthsTitle: 'IPMAT Focus Areas & Strengths',
    weaknessesTitle: 'Areas Requiring Improvement',
    actionPlanTitle: 'Strategic Preparation & Study Roadmap',
    careerRecTitle: 'Top Recommended Career Tracks',
    eduRecTitle: 'Target Integrated BBA/MBA Colleges'
  }
};
