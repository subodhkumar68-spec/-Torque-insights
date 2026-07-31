import { Question } from './dbService';

export const SEED_QUESTIONS_EXPANDED: Question[] = [
  // 1. High School Career Aptitude Test (id prefix: q-apt-)
  { id: 'q-apt-1', category: 'Career Aptitude', subCategory: 'Logical Reasoning', type: 'likert', prompt: 'I enjoy decoding complex logic puzzles and math equations.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-apt-2', category: 'Career Aptitude', subCategory: 'Quantitative Aptitude', type: 'likert', prompt: 'I find it easy to analyze trends in data charts and numeric spreadsheets.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-apt-3', category: 'Career Aptitude', subCategory: 'Spatial Visualization', type: 'likert', prompt: 'I can visualize three-dimensional figures and mechanical structures easily in my mind.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-apt-4', category: 'Career Aptitude', subCategory: 'Verbal Agility', type: 'likert', prompt: 'I excel in structuring arguments, vocabulary tests, and reading essays.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-apt-5', category: 'Career Aptitude', subCategory: 'Analytical Thinking', type: 'likert', prompt: 'I enjoy breaking down complex systemic roadblocks into manageable parts.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `q-apt-gen-${i + 6}`,
    category: 'Career Aptitude',
    subCategory: 'General Aptitude Index',
    type: 'likert' as const,
    prompt: `[Aptitude Check #${i + 1}] I perform well when tasked with evaluating abstract patterns or logic sequences.`,
    minLabel: 'Never',
    maxLabel: 'Always'
  })),

  // 2. Personality Mapping (id prefix: q-pers-)
  { id: 'q-pers-1', category: 'Personality Assessment', subCategory: 'Energy Style', type: 'single', prompt: 'After a demanding week, your preferred method to recharge is:', options: [
    { value: 'E', label: 'Attending group parties or outgoing dinners with classmates/peers.' },
    { value: 'I', label: 'Reading a book, watching videos, or resting alone in a quiet room.' }
  ]},
  { id: 'q-pers-2', category: 'Personality Assessment', subCategory: 'Information Capture', type: 'single', prompt: 'When reviewing a new subject, you naturally focus on:', options: [
    { value: 'S', label: 'Tangible facts, actual examples, and concrete step-by-step methods.' },
    { value: 'N', label: 'Theoretical structures, future patterns, and abstract concepts.' }
  ]},
  { id: 'q-pers-3', category: 'Personality Assessment', subCategory: 'Decision Logic', type: 'single', prompt: 'In resolving an argument between team members, you prioritize:', options: [
    { value: 'T', label: 'Objectivity, logical justice, and transparent parameters.' },
    { value: 'F', label: 'Individual feelings, interpersonal harmony, and collaborative empathy.' }
  ]},
  { id: 'q-pers-4', category: 'Personality Assessment', subCategory: 'Task Strategy', type: 'single', prompt: 'Your typical approach to tracking assignment milestones is:', options: [
    { value: 'J', label: 'Writing a strict schedule with exact daily task targets.' },
    { value: 'P', label: 'Adapting dynamically as guidelines and inputs change.' }
  ]},
  ...Array.from({ length: 21 }).map((_, i) => ({
    id: `q-pers-gen-${i + 5}`,
    category: 'Personality Assessment',
    subCategory: 'Behavioral Traits',
    type: 'likert' as const,
    prompt: `[Personality Index #${i + 1}] I feel highly motivated when working independently on self-directed tasks without micro-management.`,
    minLabel: 'Strongly Disagree',
    maxLabel: 'Strongly Agree'
  })),

  // 3. Learning Style Diagnostic (id prefix: q-learn-)
  { id: 'q-learn-1', category: 'Learning Assessment', subCategory: 'VARK Modalities', type: 'single', prompt: 'When trying to remember directions to a new place, you prefer:', options: [
    { value: 'V', label: 'Viewing a visual roadmap highlight of the paths.' },
    { value: 'A', label: 'Listening to verbal audio instructions repeated step-by-step.' },
    { value: 'R', label: 'Reading a written list of streets and street numbers.' },
    { value: 'K', label: 'Driving or walking through the route once to build body memory.' }
  ]},
  ...Array.from({ length: 24 }).map((_, i) => ({
    id: `q-learn-gen-${i + 2}`,
    category: 'Learning Assessment',
    subCategory: 'VARK Diagnostic Scales',
    type: 'likert' as const,
    prompt: `[Learning Scale #${i + 1}] I remember information better when it is presented in visual formats (charts, flow diagrams, videos).`,
    minLabel: 'Strongly Disagree',
    maxLabel: 'Strongly Agree'
  })),

  // 4. Engineering Readiness Assessment (id prefix: q-eng-)
  { id: 'q-eng-1', category: 'Career Readiness', subCategory: 'Logical Reasoning', type: 'likert', prompt: 'I find engineering structures, programming logic, and mathematical theories highly fascinating.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-eng-2', category: 'Career Readiness', subCategory: 'Physics Concepts', type: 'likert', prompt: 'I enjoy understanding the mechanics of energy conversion, dynamics, and electrical circuits.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  ...Array.from({ length: 23 }).map((_, i) => ({
    id: `q-eng-gen-${i + 3}`,
    category: 'Career Readiness',
    subCategory: 'STEM Aptitude Dimensions',
    type: 'likert' as const,
    prompt: `[Engineering Check #${i + 1}] I perform well when solving spatial visualization puzzles or structural mechanics problems.`,
    minLabel: 'Never',
    maxLabel: 'Always'
  })),

  // 5. Medical Career Fit Assessment (id prefix: q-med-)
  { id: 'q-med-1', category: 'Career Assessment', subCategory: 'Biology Interest', type: 'likert', prompt: 'I am highly interested in human anatomy, biology research, and organic chemistry.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-med-2', category: 'Career Assessment', subCategory: 'Empathy & Care', type: 'likert', prompt: 'I feel a strong sense of purpose when caring for others or providing healthcare diagnostics.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  ...Array.from({ length: 23 }).map((_, i) => ({
    id: `q-med-gen-${i + 3}`,
    category: 'Career Assessment',
    subCategory: 'Clinical Suitability Scales',
    type: 'likert' as const,
    prompt: `[Medical Fit #${i + 1}] I maintain extreme focus and calmness under high-stress scenarios (such as clinical emergencies).`,
    minLabel: 'Never',
    maxLabel: 'Always'
  })),

  // 6. Commerce Career Fit Assessment (id prefix: q-comm-)
  { id: 'q-comm-1', category: 'Career Assessment', subCategory: 'Finance Interest', type: 'likert', prompt: 'I enjoy tracking stock markets, learning about microeconomics, and budgeting capital.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-comm-2', category: 'Career Assessment', subCategory: 'Accounting Systems', type: 'likert', prompt: 'I like calculating tax structures, auditing balance sheets, and managing business accounts.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  ...Array.from({ length: 23 }).map((_, i) => ({
    id: `q-comm-gen-${i + 3}`,
    category: 'Career Assessment',
    subCategory: 'Business & Finance Scales',
    type: 'likert' as const,
    prompt: `[Commerce Fit #${i + 1}] I am comfortable working with transaction data, business statistics, and interest calculations.`,
    minLabel: 'Never',
    maxLabel: 'Always'
  })),

  // 7. Management Career Fit Assessment (id prefix: q-mgmt-)
  { id: 'q-mgmt-1', category: 'Management', subCategory: 'Leadership Style', type: 'likert', prompt: 'I naturally step forward to lead team milestones and organize delegation tracks.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-mgmt-2', category: 'Management', subCategory: 'Business Thinking', type: 'likert', prompt: 'I am fascinated by corporate strategy, startup modeling, and organizational branding.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  ...Array.from({ length: 23 }).map((_, i) => ({
    id: `q-mgmt-gen-${i + 3}`,
    category: 'Management',
    subCategory: 'Strategic Capability Scales',
    type: 'likert' as const,
    prompt: `[Management Fit #${i + 1}] I can pitch value propositions and motivate team members effectively.`,
    minLabel: 'Never',
    maxLabel: 'Always'
  }))
];
