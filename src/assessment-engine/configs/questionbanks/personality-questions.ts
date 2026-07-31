export const personalityQuestions = [
  { id: 'q-pers-1', type: 'single' as const, prompt: 'After a demanding week, your preferred method to recharge is:', options: [
    { value: 'E', label: 'Attending group parties or outgoing dinners with classmates/peers.', weights: { E: 3 } },
    { value: 'I', label: 'Reading a book, watching videos, or resting alone in a quiet room.', weights: { I: 3 } }
  ]},
  { id: 'q-pers-2', type: 'single' as const, prompt: 'When reviewing a new subject, you naturally focus on:', options: [
    { value: 'S', label: 'Tangible facts, actual examples, and concrete step-by-step methods.', weights: { S: 3 } },
    { value: 'N', label: 'Theoretical structures, future patterns, and abstract concepts.', weights: { N: 3 } }
  ]},
  { id: 'q-pers-3', type: 'single' as const, prompt: 'In resolving an argument between team members, you prioritize:', options: [
    { value: 'T', label: 'Objectivity, logical justice, and transparent parameters.', weights: { T: 3 } },
    { value: 'F', label: 'Individual feelings, interpersonal harmony, and collaborative empathy.', weights: { F: 3 } }
  ]},
  { id: 'q-pers-4', type: 'single' as const, prompt: 'Your typical approach to tracking assignment milestones is:', options: [
    { value: 'J', label: 'Writing a strict schedule with exact daily task targets.', weights: { J: 3 } },
    { value: 'P', label: 'Adapting dynamically as guidelines and inputs change.', weights: { P: 3 } }
  ]},
  ...Array.from({ length: 21 }).map((_, i) => ({
    id: `q-pers-gen-${i + 5}`,
    type: 'likert' as const,
    prompt: `[Personality Index #${i + 1}] I feel highly motivated when working independently on self-directed tasks without micro-management.`,
    minLabel: 'Strongly Disagree',
    maxLabel: 'Strongly Agree',
    weights: { I: 2 }
  }))
];
