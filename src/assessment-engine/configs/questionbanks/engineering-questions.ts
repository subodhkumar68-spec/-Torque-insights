export const engineeringQuestions = [
  { id: 'q-eng-1', type: 'likert' as const, prompt: 'I find engineering structures, programming logic, and mathematical theories highly fascinating.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { Math: 3, Tech: 1 } },
  { id: 'q-eng-2', type: 'likert' as const, prompt: 'I enjoy understanding the mechanics of energy conversion, dynamics, and electrical circuits.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { Physics: 3, Spatial: 1 } },
  ...Array.from({ length: 23 }).map((_, i) => ({
    id: `q-eng-gen-${i + 3}`,
    type: 'likert' as const,
    prompt: `[Engineering Check #${i + 1}] I perform well when solving spatial visualization puzzles or structural mechanics problems.`,
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { Spatial: 2, Analytical: 1 }
  }))
];
