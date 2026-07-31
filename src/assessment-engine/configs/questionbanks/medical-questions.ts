export const medicalQuestions = [
  { id: 'q-med-1', type: 'likert' as const, prompt: 'I am highly interested in human anatomy, biology research, and organic chemistry.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { Bio: 3, Science: 1 } },
  { id: 'q-med-2', type: 'likert' as const, prompt: 'I feel a strong sense of purpose when caring for others or providing healthcare diagnostics.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { Empathy: 3, Patience: 1 } },
  ...Array.from({ length: 23 }).map((_, i) => ({
    id: `q-med-gen-${i + 3}`,
    type: 'likert' as const,
    prompt: `[Medical Fit #${i + 1}] I maintain extreme focus and calmness under high-stress scenarios (such as clinical emergencies).`,
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { Emergency: 2, Observation: 1 }
  }))
];
