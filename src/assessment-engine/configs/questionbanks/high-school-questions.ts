export const highSchoolQuestions = [
  { id: 'q-apt-1', type: 'likert' as const, prompt: 'I enjoy decoding complex logic puzzles and math equations.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { I: 3, R: 1 } },
  { id: 'q-apt-2', type: 'likert' as const, prompt: 'I find it easy to analyze trends in data charts and numeric spreadsheets.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { I: 2, C: 2 } },
  { id: 'q-apt-3', type: 'likert' as const, prompt: 'I can visualize three-dimensional figures and mechanical structures easily in my mind.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { R: 3 } },
  { id: 'q-apt-4', type: 'likert' as const, prompt: 'I excel in structuring arguments, vocabulary tests, and reading essays.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { A: 2, S: 2 } },
  { id: 'q-apt-5', type: 'likert' as const, prompt: 'I enjoy breaking down complex systemic roadblocks into manageable parts.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { I: 3, E: 1 } },
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `q-apt-gen-${i + 6}`,
    type: 'likert' as const,
    prompt: `[Aptitude Check #${i + 1}] I perform well when tasked with evaluating abstract patterns or logic sequences.`,
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { I: 2 }
  }))
];
