export const cuetQuestions = [
  // SECTION 1: LANGUAGE PROFICIENCY (10 Questions)
  {
    id: 'q-cuet-lang-1',
    type: 'single' as const,
    prompt: 'Identify the synonym for the word "LOQUACIOUS".',
    options: [
      { value: 'A', label: 'Taciturn' },
      { value: 'B', label: 'Talkative' },
      { value: 'C', label: 'Diffident' },
      { value: 'D', label: 'Reticent' }
    ],
    correctAnswer: 'B',
    explanation: 'Loquacious means talkative or tending to talk a great deal. "Talkative" is the correct synonym.',
    difficulty: 'Easy',
    topic: 'Synonyms',
    category: 'language',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-lang-2',
    type: 'single' as const,
    prompt: 'Choose the antonym for the word "EPHEMERAL".',
    options: [
      { value: 'A', label: 'Transient' },
      { value: 'B', label: 'Permanent' },
      { value: 'C', label: 'Fleeting' },
      { value: 'D', label: 'Evanescent' }
    ],
    correctAnswer: 'B',
    explanation: 'Ephemeral means lasting for a very short time. The opposite is permanent.',
    difficulty: 'Easy',
    topic: 'Antonyms',
    category: 'language',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-lang-3',
    type: 'single' as const,
    prompt: 'Identify the grammatically correct sentence from the choices below.',
    options: [
      { value: 'A', label: 'Neither of the boys have completed their homework.' },
      { value: 'B', label: 'Neither of the boys has completed his homework.' },
      { value: 'C', label: 'Neither of the boys have completed his homework.' },
      { value: 'D', label: 'Neither boy have completed their homework.' }
    ],
    correctAnswer: 'B',
    explanation: 'The pronoun "neither" is singular and requires a singular verb ("has") and singular pronoun ("his").',
    difficulty: 'Medium',
    topic: 'Grammar',
    category: 'language',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-lang-4',
    type: 'single' as const,
    prompt: 'Choose the correct meaning of the idiom "to take with a grain of salt".',
    options: [
      { value: 'A', label: 'To swallow something salty' },
      { value: 'B', label: 'To view something with skepticism or reservation' },
      { value: 'C', label: 'To take a small bite of food' },
      { value: 'D', label: 'To believe everything completely' }
    ],
    correctAnswer: 'B',
    explanation: 'To take something with a grain of salt means to maintain skepticism and not accept it as absolute truth.',
    difficulty: 'Easy',
    topic: 'Idioms',
    category: 'language',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-lang-5',
    type: 'single' as const,
    prompt: 'Complete the analogy: INK : PEN :: COAL : ?',
    options: [
      { value: 'A', label: 'Fire' },
      { value: 'B', label: 'Steam Engine' },
      { value: 'C', label: 'Smoke' },
      { value: 'D', label: 'Black' }
    ],
    correctAnswer: 'B',
    explanation: 'Ink is the fuel or substance used to power a pen. Coal is the fuel traditionally used to power a steam engine.',
    difficulty: 'Easy',
    topic: 'Analogies',
    category: 'language',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-lang-6',
    type: 'single' as const,
    prompt: 'In a sentence: "His argument was filled with logical ___." Fill in the blank.',
    options: [
      { value: 'A', label: 'fallacies' },
      { value: 'B', label: 'accuracies' },
      { value: 'C', label: 'deductions' },
      { value: 'D', label: 'veracities' }
    ],
    correctAnswer: 'A',
    explanation: '"Logical fallacies" is a standard academic phrase describing flaws in reasoning.',
    difficulty: 'Medium',
    topic: 'Word Usage',
    category: 'language',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-lang-7',
    type: 'single' as const,
    prompt: 'Correct the underlined part: "She has been studying since three hours."',
    options: [
      { value: 'A', label: 'studying for three hours' },
      { value: 'B', label: 'studied since three hours' },
      { value: 'C', label: 'studying since three hours ago' },
      { value: 'D', label: 'No correction needed' }
    ],
    correctAnswer: 'A',
    explanation: '"For" is used to refer to a duration of time (three hours), whereas "since" refers to a specific starting point.',
    difficulty: 'Medium',
    topic: 'Sentence Improvement',
    category: 'language',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-lang-8',
    type: 'single' as const,
    prompt: 'Which of the following describes a reader\'s logical deduction not explicitly stated in a passage?',
    options: [
      { value: 'A', label: 'Summarization' },
      { value: 'B', label: 'Inference' },
      { value: 'C', label: 'Paraphrasing' },
      { value: 'D', label: 'Recalling' }
    ],
    correctAnswer: 'B',
    explanation: 'An inference is a logical conclusion derived from premises or evidence present in the text but not explicitly spelled out.',
    difficulty: 'Medium',
    topic: 'Inference',
    category: 'language',
    bloomsLevel: 'Analyzing'
  },
  {
    id: 'q-cuet-lang-9',
    type: 'single' as const,
    prompt: 'Arrange the jumbled sentences to make a paragraph: P. It was a dark night. Q. Suddenly, a wolf barked. R. Jack stayed awake. S. He felt a shiver.',
    options: [
      { value: 'A', label: 'P-R-Q-S' },
      { value: 'B', label: 'R-P-Q-S' },
      { value: 'C', label: 'P-Q-R-S' },
      { value: 'D', label: 'S-R-P-Q' }
    ],
    correctAnswer: 'A',
    explanation: 'P sets the scene (dark night). R details the reaction (stayed awake). Q describes the trigger (wolf barked). S describes the ultimate feeling (felt a shiver).',
    topic: 'Para Completion',
    category: 'language',
    bloomsLevel: 'Analyzing'
  },
  {
    id: 'q-cuet-lang-10',
    type: 'single' as const,
    prompt: 'Read this short passage: "The company reported high gains, but heavy taxation and shipping delays offset their final profits." What was the primary drag on profits?',
    options: [
      { value: 'A', label: 'Low sales volume' },
      { value: 'B', label: 'Taxes and logistics issues' },
      { value: 'C', label: 'Employee turnover' },
      { value: 'D', label: 'Competitor pricing' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage explicitly mentions "heavy taxation and shipping delays" (logistics) as the offsetting factors.',
    difficulty: 'Hard',
    topic: 'Reading Comprehension',
    category: 'language',
    bloomsLevel: 'Evaluating'
  },

  // SECTION 2: GENERAL APTITUDE (15 Questions)
  {
    id: 'q-cuet-gen-1',
    type: 'single' as const,
    prompt: 'If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?',
    options: [
      { value: 'A', label: 'Father' },
      { value: 'B', label: 'Uncle' },
      { value: 'C', label: 'Brother' },
      { value: 'D', label: 'Grandfather' }
    ],
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: 'C is D\'s father. A is B\'s and C\'s brother. Therefore, A is D\'s paternal uncle.',
    topic: 'Logical Reasoning',
    category: 'generalAptitude',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-gen-2',
    type: 'single' as const,
    prompt: 'Find the next term in the series: 3, 6, 11, 18, 27, ?',
    options: [
      { value: 'A', label: '36' },
      { value: 'B', label: '38' },
      { value: 'C', label: '40' },
      { value: 'D', label: '42' }
    ],
    correctAnswer: 'B',
    explanation: 'The differences between consecutive terms are odd numbers: +3, +5, +7, +9. The next difference is +11. 27 + 11 = 38.',
    difficulty: 'Easy',
    topic: 'Mental Ability',
    category: 'generalAptitude',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-gen-3',
    type: 'single' as const,
    prompt: 'If 15% of a number is 45, what is 40% of the same number?',
    options: [
      { value: 'A', label: '90' },
      { value: 'B', label: '120' },
      { value: 'C', label: '150' },
      { value: 'D', label: '180' }
    ],
    correctAnswer: 'B',
    explanation: 'Let number be x. 0.15x = 45 => x = 300. 40% of 300 = 120.',
    difficulty: 'Easy',
    topic: 'Basic Mathematics',
    category: 'generalAptitude',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-gen-4',
    type: 'single' as const,
    prompt: 'A man travels at 40 km/h for 2 hours and then at 60 km/h for 3 hours. What is his average speed for the entire journey?',
    options: [
      { value: 'A', label: '48 km/h' },
      { value: 'B', label: '50 km/h' },
      { value: 'C', label: '52 km/h' },
      { value: 'D', label: '54 km/h' }
    ],
    correctAnswer: 'C',
    explanation: 'Total distance = (40 * 2) + (60 * 3) = 80 + 180 = 260 km. Total time = 2 + 3 = 5 hours. Average speed = 260 / 5 = 52 km/h.',
    difficulty: 'Medium',
    topic: 'Quantitative Aptitude',
    category: 'generalAptitude',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-gen-5',
    type: 'single' as const,
    prompt: 'Who is the current President of India?',
    options: [
      { value: 'A', label: 'Ram Nath Kovind' },
      { value: 'B', label: 'Droupadi Murmu' },
      { value: 'C', label: 'Jagdeep Dhankhar' },
      { value: 'D', label: 'Pranab Mukherjee' }
    ],
    correctAnswer: 'B',
    explanation: 'Smt. Droupadi Murmu is the current and 15th President of India.',
    difficulty: 'Easy',
    topic: 'Current Affairs Awareness',
    category: 'generalAptitude',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-gen-6',
    type: 'single' as const,
    prompt: 'Where is the headquarters of the United Nations situated?',
    options: [
      { value: 'A', label: 'Geneva' },
      { value: 'B', label: 'New York City' },
      { value: 'C', label: 'Paris' },
      { value: 'D', label: 'London' }
    ],
    correctAnswer: 'B',
    explanation: 'The main headquarters of the United Nations is located in New York City.',
    difficulty: 'Easy',
    topic: 'General Knowledge',
    category: 'generalAptitude',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-gen-7',
    type: 'single' as const,
    prompt: 'A company decides to allocate 60% of its budget to research. If research projects fail, what is the most logical next decision?',
    options: [
      { value: 'A', label: 'Instantly shut down research department' },
      { value: 'B', label: 'Audit research methodologies and relocate resources systematically' },
      { value: 'C', label: 'Double research budget immediately' },
      { value: 'D', label: 'Ignore failure reports' }
    ],
    correctAnswer: 'B',
    explanation: 'Auditing methodologies allows logical troubleshooting and resource realignment, which is structural decision-making.',
    difficulty: 'Medium',
    topic: 'Decision Making',
    category: 'generalAptitude',
    bloomsLevel: 'Evaluating'
  },
  {
    id: 'q-cuet-gen-8',
    type: 'single' as const,
    prompt: 'Identify the next letter pair in the series: AZ, CX, EV, GT, ?',
    options: [
      { value: 'A', label: 'IR' },
      { value: 'B', label: 'HS' },
      { value: 'C', label: 'KP' },
      { value: 'D', label: 'JQ' }
    ],
    correctAnswer: 'A',
    explanation: 'First letters increase (+2): A->C->E->G->I. Second letters decrease (-2) from Z: Z->X->V->T->R. The pair is IR.',
    difficulty: 'Medium',
    topic: 'Logical Reasoning',
    category: 'generalAptitude',
    bloomsLevel: 'Analyzing'
  },
  {
    id: 'q-cuet-gen-9',
    type: 'single' as const,
    prompt: 'In a group of 5 people, A is taller than B but shorter than C. D is taller than C. Who is the tallest?',
    options: [
      { value: 'A', label: 'A' },
      { value: 'B', label: 'C' },
      { value: 'C', label: 'D' },
      { value: 'D', label: 'B' }
    ],
    correctAnswer: 'C',
    explanation: 'Relationships: C > A > B. Also D > C. Therefore, D > C > A > B. D is the tallest.',
    difficulty: 'Medium',
    topic: 'Analytical Reasoning',
    category: 'generalAptitude',
    bloomsLevel: 'Analyzing'
  },
  {
    id: 'q-cuet-gen-10',
    type: 'single' as const,
    prompt: 'Refer to a chart indicating sales: Year 1 ($100k), Year 2 ($150k), Year 3 ($180k). Find the percentage growth from Year 1 to Year 3.',
    options: [
      { value: 'A', label: '50%' },
      { value: 'B', label: '80%' },
      { value: 'C', label: '100%' },
      { value: 'D', label: '180%' }
    ],
    correctAnswer: 'B',
    explanation: 'Growth = (180 - 100) / 100 * 100 = 80%.',
    difficulty: 'Medium',
    topic: 'Data Interpretation',
    category: 'generalAptitude',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-gen-11',
    type: 'single' as const,
    prompt: 'Which country successfully landed the Chandrayaan-3 probe on the South Pole of the Moon?',
    options: [
      { value: 'A', label: 'United States' },
      { value: 'B', label: 'Russia' },
      { value: 'C', label: 'China' },
      { value: 'D', label: 'India' }
    ],
    correctAnswer: 'D',
    explanation: 'India (ISRO) successfully landed Chandrayaan-3 near the lunar South Pole in August 2023.',
    difficulty: 'Medium',
    topic: 'Current Affairs Awareness',
    category: 'generalAptitude',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-gen-12',
    type: 'single' as const,
    prompt: 'Solve: 12 * 8 - (24 / 4) + 10.',
    options: [
      { value: 'A', label: '100' },
      { value: 'B', label: '102' },
      { value: 'C', label: '104' },
      { value: 'D', label: '106' }
    ],
    correctAnswer: 'A',
    explanation: 'Using BODMAS: 12 * 8 - 6 + 10 = 96 - 6 + 10 = 100.',
    difficulty: 'Medium',
    topic: 'Basic Mathematics',
    category: 'generalAptitude',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-gen-13',
    type: 'single' as const,
    prompt: 'A puzzle consists of arranging blocks. If Box A holds 3 red blocks and Box B holds 2 blue, how many arrangements exist placing all in a line?',
    options: [
      { value: 'A', label: '5' },
      { value: 'B', label: '10' },
      { value: 'C', label: '20' },
      { value: 'D', label: '120' }
    ],
    correctAnswer: 'B',
    explanation: 'Permutations of identical items = 5! / (3! * 2!) = 120 / (6 * 2) = 10.',
    difficulty: 'Hard',
    topic: 'Problem Solving',
    category: 'generalAptitude',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-gen-14',
    type: 'single' as const,
    prompt: 'Statements: Some tables are chairs. All chairs are benches. Conclusion: Some tables are benches.',
    options: [
      { value: 'A', label: 'Legitimately valid' },
      { value: 'B', label: 'Invalid' },
      { value: 'C', label: 'Doubtful' },
      { value: 'D', label: 'Insufficient data' }
    ],
    correctAnswer: 'A',
    explanation: 'Since all chairs are benches, the tables that are chairs must also be benches. The conclusion is valid.',
    difficulty: 'Hard',
    topic: 'Logical Reasoning',
    category: 'generalAptitude',
    bloomsLevel: 'Analyzing'
  },
  {
    id: 'q-cuet-gen-15',
    type: 'single' as const,
    prompt: 'A municipal team wants to reduce road accidents. What is the most effective policy initiative?',
    options: [
      { value: 'A', label: 'Impose high speed limits' },
      { value: 'B', label: 'Upgrade safety signs, install speed bumps, and enforce camera checks' },
      { value: 'C', label: 'Ban all vehicles on weekend schedules' },
      { value: 'D', label: 'Replace concrete roads with gravel' }
    ],
    correctAnswer: 'B',
    explanation: 'This initiative addresses speed limits, driver warning, and structural checks directly, representing a balanced management decision.',
    difficulty: 'Hard',
    topic: 'Decision Making',
    category: 'generalAptitude',
    bloomsLevel: 'Evaluating'
  },

  // SECTION 3: SCIENCE DOMAIN QUESTIONS (20 Questions)
  {
    id: 'q-cuet-sci-1',
    type: 'single' as const,
    prompt: 'What is the electric field inside a perfectly conducting hollow sphere charged to a potential V?',
    options: [
      { value: 'A', label: 'Zero' },
      { value: 'B', label: 'V / r' },
      { value: 'C', label: 'V / R^2' },
      { value: 'D', label: 'Infinite' }
    ],
    correctAnswer: 'A',
    explanation: 'Electrostatic shielding dictates that the electric field inside a hollow charged conductor is always zero.',
    difficulty: 'Medium',
    topic: 'Physics',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-sci-2',
    type: 'single' as const,
    prompt: 'Which of the following organic compounds will give a positive Tollen\'s test?',
    options: [
      { value: 'A', label: 'Acetone' },
      { value: 'B', label: 'Acetaldehyde' },
      { value: 'C', label: 'Ethanol' },
      { value: 'D', label: 'Diethyl ether' }
    ],
    correctAnswer: 'B',
    explanation: 'Tollen\'s test is given by aldehydes. Acetaldehyde is oxidized to acetic acid while reducing silver ions to metallic silver.',
    difficulty: 'Medium',
    topic: 'Chemistry',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-sci-3',
    type: 'single' as const,
    prompt: 'Find the derivative of f(x) = sin(x^2) with respect to x.',
    options: [
      { value: 'A', label: '2x * cos(x^2)' },
      { value: 'B', label: 'cos(x^2)' },
      { value: 'C', label: '2 * sin(x)' },
      { value: 'D', label: '2x * sin(x^2)' }
    ],
    correctAnswer: 'A',
    explanation: 'Using the chain rule: d/dx[sin(x^2)] = cos(x^2) * d/dx(x^2) = 2x * cos(x^2).',
    difficulty: 'Medium',
    topic: 'Mathematics',
    category: 'domainReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-sci-4',
    type: 'single' as const,
    prompt: 'Which organelle is responsible for cellular respiration and ATP generation in eukaryotic cells?',
    options: [
      { value: 'A', label: 'Lysosome' },
      { value: 'B', label: 'Mitochondria' },
      { value: 'C', label: 'Golgi Apparatus' },
      { value: 'D', label: 'Ribosome' }
    ],
    correctAnswer: 'B',
    explanation: 'Mitochondria are known as the powerhouse of the cell, generating adenosine triphosphate (ATP).',
    difficulty: 'Easy',
    topic: 'Biology',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-sci-5',
    type: 'single' as const,
    prompt: 'What is the time complexity of searching an element in a balanced binary search tree (BST)?',
    options: [
      { value: 'A', label: 'O(1)' },
      { value: 'B', label: 'O(log n)' },
      { value: 'C', label: 'O(n)' },
      { value: 'D', label: 'O(n log n)' }
    ],
    correctAnswer: 'B',
    explanation: 'A balanced BST halves the search space at each step, resulting in a time complexity of O(log n).',
    difficulty: 'Medium',
    topic: 'Computer Science',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-sci-6',
    type: 'single' as const,
    prompt: 'According to Kepler\'s third law, the square of the orbital period (T) of a planet is proportional to:',
    options: [
      { value: 'A', label: 'cube of semi-major axis (r^3)' },
      { value: 'B', label: 'square of semi-major axis (r^2)' },
      { value: 'C', label: 'semi-major axis (r)' },
      { value: 'D', label: 'inverse of semi-major axis (1/r)' }
    ],
    correctAnswer: 'A',
    explanation: 'Kepler\'s third law states T^2 is proportional to r^3.',
    difficulty: 'Easy',
    topic: 'Physics',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-sci-7',
    type: 'single' as const,
    prompt: 'What is the hybridization of carbon in ethylene (C2H4)?',
    options: [
      { value: 'A', label: 'sp' },
      { value: 'B', label: 'sp2' },
      { value: 'C', label: 'sp3' },
      { value: 'D', label: 'dsp2' }
    ],
    correctAnswer: 'B',
    explanation: 'Each carbon in ethylene is double-bonded to another carbon and single-bonded to two hydrogen atoms, meaning it has 3 sigma bonds. Hybridization is sp2.',
    difficulty: 'Medium',
    topic: 'Chemistry',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-sci-8',
    type: 'single' as const,
    prompt: 'Evaluate the integral of cos(x) dx from 0 to π/2.',
    options: [
      { value: 'A', label: '0' },
      { value: 'B', label: '1' },
      { value: 'C', label: '-1' },
      { value: 'D', label: 'π' }
    ],
    correctAnswer: 'B',
    explanation: 'Integral of cos(x) is sin(x). Evaluate sin(π/2) - sin(0) = 1 - 0 = 1.',
    difficulty: 'Medium',
    topic: 'Mathematics',
    category: 'domainReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-sci-9',
    type: 'single' as const,
    prompt: 'Which of the following processes represents cellular division in somatic cells?',
    options: [
      { value: 'A', label: 'Mitosis' },
      { value: 'B', label: 'Meiosis' },
      { value: 'C', label: 'Binary fission' },
      { value: 'D', label: 'Fertilization' }
    ],
    correctAnswer: 'A',
    explanation: 'Mitosis is the cell division process for normal somatic body cells, producing identical diploid copies.',
    difficulty: 'Easy',
    topic: 'Biology',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-sci-10',
    type: 'single' as const,
    prompt: 'Which protocol is used to translate domain names into IP addresses?',
    options: [
      { value: 'A', label: 'HTTP' },
      { value: 'B', label: 'DNS' },
      { value: 'C', label: 'FTP' },
      { value: 'D', label: 'SMTP' }
    ],
    correctAnswer: 'B',
    explanation: 'Domain Name System (DNS) translates human-readable addresses (e.g. google.com) into numerical IP addresses.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-sci-11',
    type: 'single' as const,
    prompt: 'What is the focal length of a convex lens with a power of +2.5 Diopters?',
    options: [
      { value: 'A', label: '40 cm' },
      { value: 'B', label: '25 cm' },
      { value: 'C', label: '50 cm' },
      { value: 'D', label: '10 cm' }
    ],
    correctAnswer: 'A',
    explanation: 'f = 1 / P = 1 / 2.5 = 0.4 meters = 40 cm.',
    difficulty: 'Medium',
    topic: 'Physics',
    category: 'domainReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-sci-12',
    type: 'single' as const,
    prompt: 'The rate of a chemical reaction doubles for every 10°C rise in temperature. This is explained by which concept?',
    options: [
      { value: 'A', label: 'Activation energy increase' },
      { value: 'B', label: 'Increase in fraction of molecules with energy greater than activation energy' },
      { value: 'C', label: 'Decrease in collision frequency' },
      { value: 'D', label: 'Entropy drop' }
    ],
    correctAnswer: 'B',
    explanation: 'A rise in temperature shifts the Maxwell-Boltzmann distribution curve, significantly increasing the fraction of molecules with energy exceeding the activation energy threshold.',
    difficulty: 'Hard',
    topic: 'Chemistry',
    category: 'domainReadiness',
    bloomsLevel: 'Analyzing'
  },
  {
    id: 'q-cuet-sci-13',
    type: 'single' as const,
    prompt: 'If the matrix A is orthogonal, then the determinant of A is equal to:',
    options: [
      { value: 'A', label: '0' },
      { value: 'B', label: '±1' },
      { value: 'C', label: '2' },
      { value: 'D', label: 'Infinite' }
    ],
    correctAnswer: 'B',
    explanation: 'For orthogonal matrices, A * A^T = I. Det(A * A^T) = det(A)^2 = det(I) = 1. Therefore det(A) = ±1.',
    difficulty: 'Hard',
    topic: 'Mathematics',
    category: 'domainReadiness',
    bloomsLevel: 'Analyzing'
  },
  {
    id: 'q-cuet-sci-14',
    type: 'single' as const,
    prompt: 'In DNA, which base always pairs with Adenine through hydrogen bonds?',
    options: [
      { value: 'A', label: 'Cytosine' },
      { value: 'B', label: 'Thymine' },
      { value: 'C', label: 'Guanine' },
      { value: 'D', label: 'Uracil' }
    ],
    correctAnswer: 'B',
    explanation: 'Adenine always bonds with Thymine in DNA (using 2 hydrogen bonds). Cytosine pairs with Guanine.',
    difficulty: 'Easy',
    topic: 'Biology',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-sci-15',
    type: 'single' as const,
    prompt: 'In OOP, which concept allows a class to inherit properties and behaviors from another class?',
    options: [
      { value: 'A', label: 'Encapsulation' },
      { value: 'B', label: 'Inheritance' },
      { value: 'C', label: 'Polymorphism' },
      { value: 'D', label: 'Abstraction' }
    ],
    correctAnswer: 'B',
    explanation: 'Inheritance allows a subclass to reuse or adapt variables and methods defined in a parent class.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-sci-16',
    type: 'single' as const,
    prompt: 'What is the de Broglie wavelength of a particle with momentum p?',
    options: [
      { value: 'A', label: 'h / p' },
      { value: 'B', label: 'hp' },
      { value: 'C', label: 'p / h' },
      { value: 'D', label: 'h / (2p)' }
    ],
    correctAnswer: 'A',
    explanation: 'Wavelength lambda = h / p (where h is Planck\'s constant).',
    difficulty: 'Medium',
    topic: 'Physics',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-sci-17',
    type: 'single' as const,
    prompt: 'Which chemical bond is formed by the sharing of an electron pair between two atoms?',
    options: [
      { value: 'A', label: 'Ionic Bond' },
      { value: 'B', label: 'Covalent Bond' },
      { value: 'C', label: 'Hydrogen Bond' },
      { value: 'D', label: 'Metallic Bond' }
    ],
    correctAnswer: 'B',
    explanation: 'Sharing of electrons forms covalent bonds. Ionic bonds form via transfer of electrons.',
    difficulty: 'Easy',
    topic: 'Chemistry',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-sci-18',
    type: 'single' as const,
    prompt: 'Find the standard deviation of a population where variance is equal to 16.',
    options: [
      { value: 'A', label: '2' },
      { value: 'B', label: '4' },
      { value: 'C', label: '8' },
      { value: 'D', label: '256' }
    ],
    correctAnswer: 'B',
    explanation: 'Standard deviation is the square root of variance. S.D. = sqrt(16) = 4.',
    difficulty: 'Easy',
    topic: 'Mathematics',
    category: 'domainReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-sci-19',
    type: 'single' as const,
    prompt: 'What is the primary product of photosynthesis released into the atmosphere?',
    options: [
      { value: 'A', label: 'Carbon dioxide' },
      { value: 'B', label: 'Oxygen' },
      { value: 'C', label: 'Glucose' },
      { value: 'D', label: 'Water vapor' }
    ],
    correctAnswer: 'B',
    explanation: 'Photosynthesis converts water and carbon dioxide into glucose and releases oxygen as a byproduct.',
    difficulty: 'Easy',
    topic: 'Biology',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-sci-20',
    type: 'single' as const,
    prompt: 'In SQL, which clause is used to filter records based on group aggregate functions?',
    options: [
      { value: 'A', label: 'WHERE' },
      { value: 'B', label: 'HAVING' },
      { value: 'C', label: 'ORDER BY' },
      { value: 'D', label: 'GROUP BY' }
    ],
    correctAnswer: 'B',
    explanation: 'The HAVING clause filters records after a GROUP BY aggregation has been computed. WHERE cannot filter aggregate values.',
    difficulty: 'Hard',
    topic: 'Computer Science',
    category: 'domainReadiness',
    bloomsLevel: 'Evaluating'
  },

  // SECTION 3: COMMERCE DOMAIN QUESTIONS (20 Questions)
  {
    id: 'q-cuet-comm-1',
    type: 'single' as const,
    prompt: 'Under which system of accounting are transactions recorded only when cash is received or paid?',
    options: [
      { value: 'A', label: 'Accrual basis' },
      { value: 'B', label: 'Cash basis' },
      { value: 'C', label: 'Hybrid basis' },
      { value: 'D', label: 'Dual entry' }
    ],
    correctAnswer: 'B',
    explanation: 'Cash basis accounting only logs transactions when cash physically changes hands.',
    difficulty: 'Easy',
    topic: 'Accountancy',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-comm-2',
    type: 'single' as const,
    prompt: 'Which of the following functions of management focuses on setting goals and establishing strategies?',
    options: [
      { value: 'A', label: 'Organizing' },
      { value: 'B', label: 'Planning' },
      { value: 'C', label: 'Controlling' },
      { value: 'D', label: 'Directing' }
    ],
    correctAnswer: 'B',
    explanation: 'Planning is the management function that maps goals, scenarios, and actions.',
    difficulty: 'Easy',
    topic: 'Business Studies',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-comm-3',
    type: 'single' as const,
    prompt: 'When the price of a Giffen good drops, its demand naturally:',
    options: [
      { value: 'A', label: 'increases' },
      { value: 'B', label: 'decreases' },
      { value: 'C', label: 'remains unchanged' },
      { value: 'D', label: 'becomes infinite' }
    ],
    correctAnswer: 'B',
    explanation: 'Giffen goods violate the standard law of demand. As price drops, the income effect dominates, causing demand to drop.',
    difficulty: 'Medium',
    topic: 'Economics',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-comm-4',
    type: 'single' as const,
    prompt: 'Solve: If a firm\'s profit function is P(x) = 50x - 2x^2, what quantity x maximizes profit?',
    options: [
      { value: 'A', label: '10' },
      { value: 'B', label: '12.5' },
      { value: 'C', label: '25' },
      { value: 'D', label: '50' }
    ],
    correctAnswer: 'B',
    explanation: 'Differentiate P(x): dP/dx = 50 - 4x. Set to 0 => 4x = 50 => x = 12.5.',
    difficulty: 'Medium',
    topic: 'Mathematics',
    category: 'domainReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-comm-5',
    type: 'single' as const,
    prompt: 'An entrepreneur notices a gap in organic waste management. Which phase of venture ideation does this represent?',
    options: [
      { value: 'A', label: 'Feasibility analysis' },
      { value: 'B', label: 'Opportunity recognition' },
      { value: 'C', label: 'Business model draft' },
      { value: 'D', label: 'Scaling' }
    ],
    correctAnswer: 'B',
    explanation: 'Recognizing unmet market demands or issues represents the Opportunity Recognition phase.',
    difficulty: 'Easy',
    topic: 'Entrepreneurship',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-comm-6',
    type: 'single' as const,
    prompt: 'Which accounting equation represents the foundational balance sheet double-entry framework?',
    options: [
      { value: 'A', label: 'Assets = Liabilities - Capital' },
      { value: 'B', label: 'Assets = Liabilities + Capital' },
      { value: 'C', label: 'Capital = Assets + Liabilities' },
      { value: 'D', label: 'Liabilities = Assets + Capital' }
    ],
    correctAnswer: 'B',
    explanation: 'The fundamental accounting equation is Assets = Liabilities + Capital.',
    difficulty: 'Easy',
    topic: 'Accountancy',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-comm-7',
    type: 'single' as const,
    prompt: 'Which principles of management states that each subordinate should receive orders from one superior only?',
    options: [
      { value: 'A', label: 'Unity of Direction' },
      { value: 'B', label: 'Unity of Command' },
      { value: 'C', label: 'Division of Work' },
      { value: 'D', label: 'Scalar Chain' }
    ],
    correctAnswer: 'B',
    explanation: 'Fayol\'s principle of Unity of Command dictates that an employee should be answerable to a single manager only.',
    difficulty: 'Easy',
    topic: 'Business Studies',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-comm-8',
    type: 'single' as const,
    prompt: 'The measure of responsiveness of quantity demanded to a change in price is called:',
    options: [
      { value: 'A', label: 'Income elasticity' },
      { value: 'B', label: 'Price elasticity of demand' },
      { value: 'C', label: 'Cross elasticity' },
      { value: 'D', label: 'Marginal utility' }
    ],
    correctAnswer: 'B',
    explanation: 'Price elasticity of demand calculates demand percentage shifts in response to unit price shifts.',
    difficulty: 'Easy',
    topic: 'Economics',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-comm-9',
    type: 'single' as const,
    prompt: 'Evaluate: Find the compound interest on $1,000 for 2 years at 10% interest per annum compounded annually.',
    options: [
      { value: 'A', label: '$200' },
      { value: 'B', label: '$210' },
      { value: 'C', label: '$220' },
      { value: 'D', label: '$250' }
    ],
    correctAnswer: 'B',
    explanation: 'Amount = 1000 * (1.1)^2 = 1210. Interest = 1210 - 1000 = $210.',
    difficulty: 'Easy',
    topic: 'Mathematics',
    category: 'domainReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-comm-10',
    type: 'single' as const,
    prompt: 'What is the primary document called that details a venture\'s goals, financial plans, and market strategy?',
    options: [
      { value: 'A', label: 'Balance sheet' },
      { value: 'B', label: 'Business Plan' },
      { value: 'C', label: 'Articles of Association' },
      { value: 'D', label: 'Prospectus' }
    ],
    correctAnswer: 'B',
    explanation: 'A business plan acts as a complete blueprint outlining operations, financials, and marketing.',
    difficulty: 'Easy',
    topic: 'Entrepreneurship',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-comm-11',
    type: 'single' as const,
    prompt: 'If gross profit is $50,000 and cost of goods sold is $150,000, what is the net sales revenue?',
    options: [
      { value: 'A', label: '$100,000' },
      { value: 'B', label: '$200,000' },
      { value: 'C', label: '$250,000' },
      { value: 'D', label: '$300,000' }
    ],
    correctAnswer: 'B',
    explanation: 'Sales Revenue = Cost of Goods Sold + Gross Profit = 150000 + 50000 = $200,000.',
    difficulty: 'Medium',
    topic: 'Accountancy',
    category: 'domainReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-comm-12',
    type: 'single' as const,
    prompt: 'Which style of leadership involves a hands-off approach allowing team members total freedom?',
    options: [
      { value: 'A', label: 'Autocratic' },
      { value: 'B', label: 'Laissez-faire' },
      { value: 'C', label: 'Democratic' },
      { value: 'D', label: 'Paternalistic' }
    ],
    correctAnswer: 'B',
    explanation: 'Laissez-faire translates to "let do", representing a style where managers delegate completely with minimal rules.',
    difficulty: 'Medium',
    topic: 'Business Studies',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-comm-13',
    type: 'single' as const,
    prompt: 'Under monopoly market conditions, the demand curve of the firm is:',
    options: [
      { value: 'A', label: 'Perfect horizontal' },
      { value: 'B', label: 'Downward sloping' },
      { value: 'C', label: 'Upward sloping' },
      { value: 'D', label: 'Perfect vertical' }
    ],
    correctAnswer: 'B',
    explanation: 'Even a monopolist must drop prices to sell larger quantities, giving it a downward-sloping demand curve.',
    difficulty: 'Medium',
    topic: 'Economics',
    category: 'domainReadiness',
    bloomsLevel: 'Analyzing'
  },
  {
    id: 'q-cuet-comm-14',
    type: 'single' as const,
    prompt: 'If f(x) = x^3 - 3x, find the coordinates of local minima.',
    options: [
      { value: 'A', label: 'x = 1' },
      { value: 'B', label: 'x = -1' },
      { value: 'C', label: 'x = 0' },
      { value: 'D', label: 'x = 2' }
    ],
    correctAnswer: 'A',
    explanation: 'f\'(x) = 3x^2 - 3. Set to 0 => x = ±1. f\'\'(x) = 6x. Since f\'\'(1) = 6 > 0, x = 1 is the point of local minimum.',
    difficulty: 'Hard',
    topic: 'Mathematics',
    category: 'domainReadiness',
    bloomsLevel: 'Analyzing'
  },
  {
    id: 'q-cuet-comm-15',
    type: 'single' as const,
    prompt: 'What type of startup funding involves raising small capital amounts from a large crowd online?',
    options: [
      { value: 'A', label: 'Venture Capital' },
      { value: 'B', label: 'Crowdfunding' },
      { value: 'C', label: 'Angel Investment' },
      { value: 'D', label: 'Bank Loan' }
    ],
    correctAnswer: 'B',
    explanation: 'Crowdfunding platforms (like Kickstarter) pool small contributions from thousands of public supporters online.',
    difficulty: 'Easy',
    topic: 'Entrepreneurship',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-comm-16',
    type: 'single' as const,
    prompt: 'Which accounting principles dictates that all business items must be logged assuming the company stays active indefinitely?',
    options: [
      { value: 'A', label: 'Going Concern Concept' },
      { value: 'B', label: 'Money Measurement Concept' },
      { value: 'C', label: 'Consistency concept' },
      { value: 'D', label: 'Prudence concept' }
    ],
    correctAnswer: 'A',
    explanation: 'The Going Concern principle assumes that the business will continue its operations long enough to realize its assets and commitments.',
    difficulty: 'Medium',
    topic: 'Accountancy',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-comm-17',
    type: 'single' as const,
    prompt: 'The process of selecting the most suitable candidate out of all applicants is called:',
    options: [
      { value: 'A', label: 'Recruitment' },
      { value: 'B', label: 'Selection' },
      { value: 'C', label: 'Training' },
      { value: 'D', label: 'Induction' }
    ],
    correctAnswer: 'B',
    explanation: 'Recruitment pools applicants, while selection is the vetting process to choose the best individual.',
    difficulty: 'Easy',
    topic: 'Business Studies',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-comm-18',
    type: 'single' as const,
    prompt: 'Which type of deficit occurs when a government\'s total expenditure exceeds its total revenue (excluding borrowing)?',
    options: [
      { value: 'A', label: 'Revenue deficit' },
      { value: 'B', label: 'Fiscal deficit' },
      { value: 'C', label: 'Primary deficit' },
      { value: 'D', label: 'Trade deficit' }
    ],
    correctAnswer: 'B',
    explanation: 'Fiscal deficit is the excess of total budget expenditure over total revenue receipts (except public borrowings).',
    difficulty: 'Medium',
    topic: 'Economics',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-comm-19',
    type: 'single' as const,
    prompt: 'Solve: Find the sum of an infinite GP with first term a = 6 and common ratio r = 1/2.',
    options: [
      { value: 'A', label: '10' },
      { value: 'B', label: '12' },
      { value: 'C', label: '15' },
      { value: 'D', label: '18' }
    ],
    correctAnswer: 'B',
    explanation: 'S_inf = a / (1 - r) = 6 / (1 - 0.5) = 6 / 0.5 = 12.',
    difficulty: 'Medium',
    topic: 'Mathematics',
    category: 'domainReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-comm-20',
    type: 'single' as const,
    prompt: 'A startup wants to evaluate its break-even point. If fixed costs are $20,000, price is $15, and variable cost is $10 per unit, how many units must it sell?',
    options: [
      { value: 'A', label: '1,000' },
      { value: 'B', label: '2,000' },
      { value: 'C', label: '4,000' },
      { value: 'D', label: '5,000' }
    ],
    correctAnswer: 'C',
    explanation: 'Break-even quantity = Fixed Costs / (Price - Variable Cost) = 20000 / (15 - 10) = 20000 / 5 = 4,000 units.',
    difficulty: 'Hard',
    topic: 'Entrepreneurship',
    category: 'domainReadiness',
    bloomsLevel: 'Evaluating'
  },

  // SECTION 3: HUMANITIES DOMAIN QUESTIONS (20 Questions)
  {
    id: 'q-cuet-hum-1',
    type: 'single' as const,
    prompt: 'In which year did the Harappan civilization excavation start under Daya Ram Sahni?',
    options: [
      { value: 'A', label: '1919' },
      { value: 'B', label: '1921' },
      { value: 'C', label: '1925' },
      { value: 'D', label: '1931' }
    ],
    correctAnswer: 'B',
    explanation: 'Excavations at Harappa started in 1921 under Daya Ram Sahni.',
    difficulty: 'Easy',
    topic: 'History',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-2',
    type: 'single' as const,
    prompt: 'Which organ of the United Nations is primarily responsible for maintaining global peace and security?',
    options: [
      { value: 'A', label: 'General Assembly' },
      { value: 'B', label: 'Security Council' },
      { value: 'C', label: 'Secretariat' },
      { value: 'D', label: 'Trusteeship Council' }
    ],
    correctAnswer: 'B',
    explanation: 'The UN Security Council handles international peace, deploying peacekeeping missions and resolutions.',
    difficulty: 'Easy',
    topic: 'Political Science',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-3',
    type: 'single' as const,
    prompt: 'Which imaginary line separates the Northern and Southern Hemispheres of the Earth?',
    options: [
      { value: 'A', label: 'Prime Meridian' },
      { value: 'B', label: 'Equator' },
      { value: 'C', label: 'Tropic of Cancer' },
      { value: 'D', label: 'Tropic of Capricorn' }
    ],
    correctAnswer: 'B',
    explanation: 'The Equator is the 0-degree latitude line dividing the globe into Northern and Southern Hemispheres.',
    difficulty: 'Easy',
    topic: 'Geography',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-4',
    type: 'single' as const,
    prompt: 'According to Freud\'s model of personality, which component operates on the pleasure principle?',
    options: [
      { value: 'A', label: 'Ego' },
      { value: 'B', label: 'Id' },
      { value: 'C', label: 'Super-ego' },
      { value: 'D', label: 'Persona' }
    ],
    correctAnswer: 'B',
    explanation: 'Freud\'s "Id" represents primitive, instinctive desires seeking immediate gratification without filters.',
    difficulty: 'Medium',
    topic: 'Psychology',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-hum-5',
    type: 'single' as const,
    prompt: 'Which sociologist introduced the concept of the "sociological imagination"?',
    options: [
      { value: 'A', label: 'Karl Marx' },
      { value: 'B', label: 'C. Wright Mills' },
      { value: 'C', label: 'Max Weber' },
      { value: 'D', label: 'Emile Durkheim' }
    ],
    correctAnswer: 'B',
    explanation: 'C. Wright Mills coined "sociological imagination" in 1959 to describe connecting personal troubles to public issues.',
    difficulty: 'Medium',
    topic: 'Sociology',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-6',
    type: 'single' as const,
    prompt: 'What was the primary economic objective of the British East India Company in India?',
    options: [
      { value: 'A', label: 'Welfare and development' },
      { value: 'B', label: 'Extracting raw materials and market monopoly' },
      { value: 'C', label: 'Cultural integration' },
      { value: 'D', label: 'Educational reform' }
    ],
    correctAnswer: 'B',
    explanation: 'The Company sought commercial monopoly, importing cheap raw materials from India and exporting final goods.',
    difficulty: 'Easy',
    topic: 'History',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-hum-7',
    type: 'single' as const,
    prompt: 'Which amendment to the Constitution of India added the words "Socialist" and "Secular" to the Preamble?',
    options: [
      { value: 'A', label: '24th Amendment' },
      { value: 'B', label: '42nd Amendment' },
      { value: 'C', label: '44th Amendment' },
      { value: 'D', label: '86th Amendment' }
    ],
    correctAnswer: 'B',
    explanation: 'The 42nd Amendment of 1976 amended the Preamble to add "Socialist", "Secular", and "Integrity".',
    difficulty: 'Easy',
    topic: 'Political Science',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-8',
    type: 'single' as const,
    prompt: 'Which type of rock is formed by the cooling and solidification of magma or lava?',
    options: [
      { value: 'A', label: 'Sedimentary' },
      { value: 'B', label: 'Igneous' },
      { value: 'C', label: 'Metamorphic' },
      { value: 'D', label: 'Fossilized' }
    ],
    correctAnswer: 'B',
    explanation: 'Igneous rocks (like basalt or granite) crystallize directly from molten magma or lava flows.',
    difficulty: 'Easy',
    topic: 'Geography',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-9',
    type: 'single' as const,
    prompt: 'What psychological term describes the mental discomfort experienced when holding two conflicting beliefs?',
    options: [
      { value: 'A', label: 'Cognitive dissonance' },
      { value: 'B', label: 'Regression' },
      { value: 'C', label: 'Confirmation bias' },
      { value: 'D', label: 'Catharsis' }
    ],
    correctAnswer: 'A',
    explanation: 'Cognitive dissonance is the psychological tension felt when behavior or facts clash with core beliefs.',
    difficulty: 'Medium',
    topic: 'Psychology',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-hum-10',
    type: 'single' as const,
    prompt: 'Which type of status is assigned to an individual at birth or involuntarily later in life?',
    options: [
      { value: 'A', label: 'Achieved status' },
      { value: 'B', label: 'Ascribed status' },
      { value: 'C', label: 'Master status' },
      { value: 'D', label: 'Role set' }
    ],
    correctAnswer: 'B',
    explanation: 'Ascribed status is social status inherited automatically (like race, sex, caste) rather than earned.',
    difficulty: 'Easy',
    topic: 'Sociology',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-11',
    type: 'single' as const,
    prompt: 'Who was the founder of the Mauryan Empire in ancient India?',
    options: [
      { value: 'A', label: 'Ashoka' },
      { value: 'B', label: 'Chandragupta Maurya' },
      { value: 'C', label: 'Bindusara' },
      { value: 'D', label: 'Chandragupta II' }
    ],
    correctAnswer: 'B',
    explanation: 'Chandragupta Maurya founded the empire in 322 BCE with the strategic counsel of Chanakya (Kautilya).',
    difficulty: 'Easy',
    topic: 'History',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-12',
    type: 'single' as const,
    prompt: 'The concept of "Separation of Powers" into Legislature, Executive, and Judiciary was advocated by:',
    options: [
      { value: 'A', label: 'Jean-Jacques Rousseau' },
      { value: 'B', label: 'Montesquieu' },
      { value: 'C', label: 'John Locke' },
      { value: 'D', label: 'Thomas Hobbes' }
    ],
    correctAnswer: 'B',
    explanation: 'Baron de Montesquieu formulated the separation of powers model in "The Spirit of Laws" (1748).',
    difficulty: 'Medium',
    topic: 'Political Science',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-hum-13',
    type: 'single' as const,
    prompt: 'Which layers of the Earth\'s atmosphere contains the ozone layer that filters UV radiation?',
    options: [
      { value: 'A', label: 'Troposphere' },
      { value: 'B', label: 'Stratosphere' },
      { value: 'C', label: 'Mesosphere' },
      { value: 'D', label: 'Thermosphere' }
    ],
    correctAnswer: 'B',
    explanation: 'The ozone layer sits within the Stratosphere, absorbing harmful solar ultraviolet rays.',
    difficulty: 'Easy',
    topic: 'Geography',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-14',
    type: 'single' as const,
    prompt: 'In classical conditioning, what was the dog\'s salivation to the bell alone called?',
    options: [
      { value: 'A', label: 'Unconditioned Stimulus' },
      { value: 'B', label: 'Conditioned Response' },
      { value: 'C', label: 'Conditioned Stimulus' },
      { value: 'D', label: 'Unconditioned Response' }
    ],
    correctAnswer: 'B',
    explanation: 'The salivation to the bell (conditioned stimulus) is the learned or Conditioned Response.',
    difficulty: 'Medium',
    topic: 'Psychology',
    category: 'domainReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-hum-15',
    type: 'single' as const,
    prompt: 'Which social system divides Hindu society into hierarchically ordered groups based on birth?',
    options: [
      { value: 'A', label: 'Class system' },
      { value: 'B', label: 'Caste system' },
      { value: 'C', label: 'Clergy' },
      { value: 'D', label: 'Feudalism' }
    ],
    correctAnswer: 'B',
    explanation: 'The caste system (Varna/Jati) is a rigid, hereditary hierarchical social stratification model in India.',
    difficulty: 'Easy',
    topic: 'Sociology',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-16',
    type: 'single' as const,
    prompt: 'Which treaty ended the First World War in 1919?',
    options: [
      { value: 'A', label: 'Treaty of Paris' },
      { value: 'B', label: 'Treaty of Versailles' },
      { value: 'C', label: 'Treaty of Berlin' },
      { value: 'D', label: 'Treaty of Brest-Litovsk' }
    ],
    correctAnswer: 'B',
    explanation: 'The Treaty of Versailles, signed in June 1919, officially ended the state of war between Germany and the Allied Powers.',
    difficulty: 'Easy',
    topic: 'History',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-17',
    type: 'single' as const,
    prompt: 'The concept of "Gram Swaraj" (village self-reliance) was proposed by:',
    options: [
      { value: 'A', label: 'Jawaharlal Nehru' },
      { value: 'B', label: 'Mahatma Gandhi' },
      { value: 'C', label: 'B. R. Ambedkar' },
      { value: 'D', label: 'Subhas Chandra Bose' }
    ],
    correctAnswer: 'B',
    explanation: 'Mahatma Gandhi championed Gram Swaraj to promote decentralized governance and independent village economies.',
    difficulty: 'Medium',
    topic: 'Political Science',
    category: 'domainReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-hum-18',
    type: 'single' as const,
    prompt: 'Which process describes the wear and tear of rocks by agents like water, wind, and ice?',
    options: [
      { value: 'A', label: 'Deposition' },
      { value: 'B', label: 'Erosion' },
      { value: 'C', label: 'Solidification' },
      { value: 'D', label: 'Folding' }
    ],
    correctAnswer: 'B',
    explanation: 'Erosion describes the physical weathering, removal, and transport of rock debris by natural forces.',
    difficulty: 'Easy',
    topic: 'Geography',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-19',
    type: 'single' as const,
    prompt: 'Which basic memory structure stores information for very brief fractions of a second?',
    options: [
      { value: 'A', label: 'Short-term memory' },
      { value: 'B', label: 'Sensory memory' },
      { value: 'C', label: 'Long-term memory' },
      { value: 'D', label: 'Working memory' }
    ],
    correctAnswer: 'B',
    explanation: 'Sensory memory holds raw sensory impressions (iconic/echoic) for less than a second before passing to short-term storage.',
    difficulty: 'Medium',
    topic: 'Psychology',
    category: 'domainReadiness',
    bloomsLevel: 'Remembering'
  },
  {
    id: 'q-cuet-hum-20',
    type: 'single' as const,
    prompt: 'Karl Marx argued that the history of all society is a history of:',
    options: [
      { value: 'A', label: 'technological progress' },
      { value: 'B', label: 'class struggles' },
      { value: 'C', label: 'religious cooperation' },
      { value: 'D', label: 'global harmony' }
    ],
    correctAnswer: 'B',
    explanation: 'Marx stated in the Communist Manifesto: "The history of all hitherto existing society is the history of class struggles" (between exploiters and exploited).',
    difficulty: 'Hard',
    topic: 'Sociology',
    category: 'domainReadiness',
    bloomsLevel: 'Evaluating'
  },

  // SECTION 4: ACADEMIC SKILLS (5 Questions)
  {
    id: 'q-cuet-acad-1',
    type: 'likert' as const,
    prompt: 'I allocate study time for each subject according to its difficulty and stick to my weekly schedule.',
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { academicReadiness: 3 },
    topic: 'Time Management',
    category: 'academicReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-acad-2',
    type: 'likert' as const,
    prompt: 'When preparing for competitive exams, I practice previous year papers and mock tests under strict timed conditions.',
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { academicReadiness: 3 },
    topic: 'Exam Strategy',
    category: 'academicReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-acad-3',
    type: 'likert' as const,
    prompt: 'I study in a quiet, distraction-free environment and avoid checking social media during my study blocks.',
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { academicReadiness: 3 },
    topic: 'Study Discipline',
    category: 'academicReadiness',
    bloomsLevel: 'Applying'
  },
  {
    id: 'q-cuet-acad-4',
    type: 'likert' as const,
    prompt: 'I feel highly confident in my ability to handle complex syllabus topics and solve competitive questions.',
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { academicReadiness: 3 },
    topic: 'Confidence',
    category: 'academicReadiness',
    bloomsLevel: 'Understanding'
  },
  {
    id: 'q-cuet-acad-5',
    type: 'likert' as const,
    prompt: 'I maintain a consistent study routine daily rather than cramming only when exam dates are announced.',
    minLabel: 'Never',
    maxLabel: 'Always',
    weights: { academicReadiness: 3 },
    topic: 'Consistency',
    category: 'academicReadiness',
    bloomsLevel: 'Applying'
  }
];
