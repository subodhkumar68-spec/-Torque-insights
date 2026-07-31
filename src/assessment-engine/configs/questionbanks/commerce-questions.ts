export const commerceQuestions = [
  { id: 'q-comm-1', type: 'likert' as const, prompt: 'I enjoy tracking stock markets, learning about microeconomics, and budgeting capital.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { Finance: 3, Economics: 1 } },
  { id: 'q-comm-2', type: 'likert' as const, prompt: 'I like calculating tax structures, auditing balance sheets, and managing business accounts.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree', weights: { Accounting: 3, Business: 1 } },
  ...Array.from({ length: 23 }).map((_, i) => ({
    id: `q-comm-gen-${i + 3}`,
    type: 'likert' as const,
    prompt: `[Commerce Fit #${i + 1}] I am comfortable working with transaction data, business statistics, and interest calculations.`,
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { Finance: 2, Accounting: 1 }
  }))
];
