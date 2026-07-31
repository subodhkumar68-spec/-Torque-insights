export const learningStyleQuestions = [
  { id: 'q-learn-1', type: 'single' as const, prompt: 'When trying to remember directions to a new place, you prefer:', options: [
    { value: 'V', label: 'Viewing a visual roadmap highlight of the paths.', weights: { V: 3 } },
    { value: 'A', label: 'Listening to verbal audio instructions repeated step-by-step.', weights: { A: 3 } },
    { value: 'R', label: 'Reading a written list of streets and street numbers.', weights: { R: 3 } },
    { value: 'K', label: 'Driving or walking through the route once to build body memory.', weights: { K: 3 } }
  ]},
  ...Array.from({ length: 24 }).map((_, i) => ({
    id: `q-learn-gen-${i + 2}`,
    type: 'likert' as const,
    prompt: `[Learning Scale #${i + 1}] I remember information better when it is presented in visual formats (charts, flow diagrams, videos).`,
    minLabel: 'Strongly Disagree',
    maxLabel: 'Strongly Agree',
    weights: { V: 2 }
  }))
];
