export const managementQuestions = [
  { id: 'q-mgmt-1', type: 'likert' as const, prompt: 'I naturally step forward to lead team milestones and organize delegation tracks.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { Leadership: 3, TeamWork: 1 } },
  { id: 'q-mgmt-2', type: 'likert' as const, prompt: 'I am fascinated by corporate strategy, startup modeling, and organizational branding.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { Strategy: 3, Business: 1 } },
  ...Array.from({ length: 23 }).map((_, i) => ({
    id: `q-mgmt-gen-${i + 3}`,
    type: 'likert' as const,
    prompt: `[Management Fit #${i + 1}] I can pitch value propositions and motivate team members effectively.`,
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { Communication: 2, DecisionMaking: 1 }
  }))
];
