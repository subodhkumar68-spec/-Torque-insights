export const ipmatQuestions = [
  // SECTION 1: QUANTITATIVE APTITUDE (10 Questions)
  {
    id: 'q-ipmat-1',
    type: 'single' as const,
    prompt: 'The average of the first 10 prime numbers is closest to which of the following values?',
    options: [
      { value: 'A', label: '10.4' },
      { value: 'B', label: '11.2' },
      { value: 'C', label: '12.9' },
      { value: 'D', label: '13.1' }
    ],
    correctAnswer: 'C',
    difficulty: 'Easy',
    explanation: 'The first 10 prime numbers are 2, 3, 5, 7, 11, 13, 17, 19, 23, and 29. Their sum is 129. The average is 129 / 10 = 12.9.',
    topic: 'Average',
    category: 'quantitativeAptitude'
  },
  {
    id: 'q-ipmat-2',
    type: 'single' as const,
    prompt: 'If A\'s salary is 25% higher than B\'s salary, then B\'s salary is how much percent lower than A\'s salary?',
    options: [
      { value: 'A', label: '15%' },
      { value: 'B', label: '20%' },
      { value: 'C', label: '25%' },
      { value: 'D', label: '33.33%' }
    ],
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: 'Let B\'s salary be 100. Then A\'s salary is 125. The difference is 25. B\'s salary is lower than A\'s by (25 / 125) * 100 = 20%.',
    topic: 'Percentages',
    category: 'quantitativeAptitude'
  },
  {
    id: 'q-ipmat-3',
    type: 'single' as const,
    prompt: 'A dishonest merchant claims to sell his goods at cost price, but he uses a weight of 900 grams instead of a kilogram. What is his actual profit percentage?',
    options: [
      { value: 'A', label: '10%' },
      { value: 'B', label: '11.11%' },
      { value: 'C', label: '12.5%' },
      { value: 'D', label: '15%' }
    ],
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'The merchant saves 100 grams on every 900 grams sold. Profit percentage = (Error / True Value - Error) * 100 = (100 / 900) * 100 = 11.11%.',
    topic: 'Profit & Loss',
    category: 'quantitativeAptitude'
  },
  {
    id: 'q-ipmat-4',
    type: 'single' as const,
    prompt: 'Two numbers are in the ratio 3:5. If 9 is subtracted from each number, their ratio becomes 12:23. What is the value of the second number?',
    options: [
      { value: 'A', label: '33' },
      { value: 'B', label: '45' },
      { value: 'C', label: '55' },
      { value: 'D', label: '60' }
    ],
    correctAnswer: 'C',
    difficulty: 'Medium',
    explanation: 'Let the numbers be 3x and 5x. (3x - 9) / (5x - 9) = 12 / 23. Solving for x: 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. The second number is 5 * 11 = 55.',
    topic: 'Ratio',
    category: 'quantitativeAptitude'
  },
  {
    id: 'q-ipmat-5',
    type: 'single' as const,
    prompt: 'A can complete a piece of work in 12 days, and B can complete it in 15 days. They work together for 5 days, and then A leaves. What fraction of the total work is left to be done?',
    options: [
      { value: 'A', label: '1/4' },
      { value: 'B', label: '1/3' },
      { value: 'C', label: '1/2' },
      { value: 'D', label: '3/4' }
    ],
    correctAnswer: 'A',
    difficulty: 'Medium',
    explanation: 'A\'s 1-day work = 1/12, B\'s 1-day work = 1/15. Combined 1-day work = 1/12 + 1/15 = 9/60 = 3/20. Work done in 5 days = 5 * (3/20) = 15/20 = 3/4. Fraction of work remaining = 1 - 3/4 = 1/4.',
    topic: 'Time & Work',
    category: 'quantitativeAptitude'
  },
  {
    id: 'q-ipmat-6',
    type: 'single' as const,
    prompt: 'A train passes a signal post in 15 seconds and passes a platform 100 meters long in 25 seconds. What is the speed of the train in km/h?',
    options: [
      { value: 'A', label: '36 km/h' },
      { value: 'B', label: '45 km/h' },
      { value: 'C', label: '54 km/h' },
      { value: 'D', label: '72 km/h' }
    ],
    correctAnswer: 'A',
    difficulty: 'Medium',
    explanation: 'Let length of train be L and speed be S. L = 15S. Also, L + 100 = 25S => 15S + 100 = 25S => 10S = 100 => S = 10 m/s. Speed in km/h = 10 * 18/5 = 36 km/h.',
    topic: 'Speed Time Distance',
    category: 'quantitativeAptitude'
  },
  {
    id: 'q-ipmat-7',
    type: 'single' as const,
    prompt: 'What is the difference between the compound interest and simple interest on a principal of $10,000 for 3 years at an annual interest rate of 10%?',
    options: [
      { value: 'A', label: '$310' },
      { value: 'B', label: '$300' },
      { value: 'C', label: '$290' },
      { value: 'D', label: '$320' }
    ],
    correctAnswer: 'A',
    difficulty: 'Hard',
    explanation: 'Simple interest = (10000 * 10 * 3) / 100 = 3000. Compound interest = 10000 * (1.1)^3 - 10000 = 13310 - 10000 = 3310. Difference = 3310 - 3000 = $310.',
    topic: 'Simple & Compound Interest',
    category: 'quantitativeAptitude'
  },
  {
    id: 'q-ipmat-8',
    type: 'single' as const,
    prompt: 'A vessel contains 40 liters of a mixture of milk and water in the ratio 3:1. How many liters of water must be added to this mixture so that the ratio of milk to water becomes 2:1?',
    options: [
      { value: 'A', label: '5 liters' },
      { value: 'B', label: '6 liters' },
      { value: 'C', label: '8 liters' },
      { value: 'D', label: '10 liters' }
    ],
    correctAnswer: 'A',
    difficulty: 'Medium',
    explanation: 'Initial milk = (3/4) * 40 = 30 liters, water = 10 liters. Let added water be w. 30 / (10 + w) = 2 / 1 => 30 = 20 + 2w => 2w = 10 => w = 5 liters.',
    topic: 'Mixtures',
    category: 'quantitativeAptitude'
  },
  {
    id: 'q-ipmat-9',
    type: 'single' as const,
    prompt: 'A and B together can complete a project in 6 days. If A alone can complete the same project in 10 days, how many days will B take to complete it alone?',
    options: [
      { value: 'A', label: '12 days' },
      { value: 'B', label: '15 days' },
      { value: 'C', label: '18 days' },
      { value: 'D', label: '20 days' }
    ],
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: 'B\'s 1-day work = 1/6 - 1/10 = (5 - 3) / 30 = 2/30 = 1/15. Therefore, B alone takes 15 days.',
    topic: 'Time & Work',
    category: 'quantitativeAptitude'
  },
  {
    id: 'q-ipmat-10',
    type: 'single' as const,
    prompt: 'A sum of money doubles itself in 8 years under simple interest. In how many years will it triple itself under the same rate of simple interest?',
    options: [
      { value: 'A', label: '12 years' },
      { value: 'B', label: '16 years' },
      { value: 'C', label: '20 years' },
      { value: 'D', label: '24 years' }
    ],
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'To double itself, the interest earned must equal the principal (100% growth). This takes 8 years. To triple itself, the interest earned must equal twice the principal (200% growth). This will take 8 * 2 = 16 years.',
    topic: 'Simple & Compound Interest',
    category: 'quantitativeAptitude'
  },

  // SECTION 2: HIGHER MATHEMATICS (10 Questions)
  {
    id: 'q-ipmat-11',
    type: 'single' as const,
    prompt: 'Find the real value of x that satisfies the equation: log_2(x) + log_2(x - 2) = 3.',
    options: [
      { value: 'A', label: 'x = 4' },
      { value: 'B', label: 'x = -2' },
      { value: 'C', label: 'x = 6' },
      { value: 'D', label: 'x = 4 or x = -2' }
    ],
    correctAnswer: 'A',
    difficulty: 'Easy',
    explanation: 'log_2(x(x - 2)) = 3 => x^2 - 2x = 2^3 = 8 => x^2 - 2x - 8 = 0 => (x - 4)(x + 2) = 0. Since log argument must be positive, x > 2. Thus, x = 4.',
    topic: 'Logarithms',
    category: 'higherMathematics'
  },
  {
    id: 'q-ipmat-12',
    type: 'single' as const,
    prompt: 'If α and β are the roots of the quadratic equation x^2 - 5x + 6 = 0, find the value of α^2 + β^2.',
    options: [
      { value: 'A', label: '11' },
      { value: 'B', label: '13' },
      { value: 'C', label: '25' },
      { value: 'D', label: '37' }
    ],
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'α + β = 5 and αβ = 6. α^2 + β^2 = (α + β)^2 - 2αβ = 5^2 - 2(6) = 25 - 12 = 13.',
    topic: 'Quadratic Equations',
    category: 'higherMathematics'
  },
  {
    id: 'q-ipmat-13',
    type: 'single' as const,
    prompt: 'In how many distinct ways can the letters of the word "IPMAT" be arranged?',
    options: [
      { value: 'A', label: '60' },
      { value: 'B', label: '120' },
      { value: 'C', label: '240' },
      { value: 'D', label: '720' }
    ],
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: 'The word "IPMAT" contains 5 letters, all of which are distinct. The number of arrangements is 5! = 5 * 4 * 3 * 2 * 1 = 120.',
    topic: 'Permutation',
    category: 'higherMathematics'
  },
  {
    id: 'q-ipmat-14',
    type: 'single' as const,
    prompt: 'A committee of 5 members is to be formed out of 7 men and 4 women. In how many ways can this be done if the committee must contain exactly 3 men?',
    options: [
      { value: 'A', label: '140' },
      { value: 'B', label: '210' },
      { value: 'C', label: '420' },
      { value: 'D', label: '560' }
    ],
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'We need to choose 3 men out of 7, and 2 women out of 4. Ways = 7C3 * 4C2 = (35) * (6) = 210.',
    topic: 'Combination',
    category: 'higherMathematics'
  },
  {
    id: 'q-ipmat-15',
    type: 'single' as const,
    prompt: 'Two cards are drawn simultaneously from a standard deck of 52 playing cards. What is the probability that both cards drawn are Aces?',
    options: [
      { value: 'A', label: '1/221' },
      { value: 'B', label: '1/169' },
      { value: 'C', label: '3/676' },
      { value: 'D', label: '1/26' }
    ],
    correctAnswer: 'A',
    difficulty: 'Hard',
    explanation: 'Probability of first card being an Ace = 4/52 = 1/13. Probability of second card being an Ace = 3/51. Combined probability = (4/52) * (3/51) = (1/13) * (1/17) = 1/221.',
    topic: 'Probability',
    category: 'higherMathematics'
  },
  {
    id: 'q-ipmat-16',
    type: 'single' as const,
    prompt: 'Find the 10th term of the arithmetic progression (AP): 3, 8, 13, 18...',
    options: [
      { value: 'A', label: '43' },
      { value: 'B', label: '48' },
      { value: 'C', label: '53' },
      { value: 'D', label: '58' }
    ],
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: 'First term a = 3, common difference d = 5. T_n = a + (n-1)d => T_10 = 3 + (9 * 5) = 3 + 45 = 48.',
    topic: 'Sequences',
    category: 'higherMathematics'
  },
  {
    id: 'q-ipmat-17',
    type: 'single' as const,
    prompt: 'In a geometric progression (GP), the sum of the first three terms is 13/12, and their product is -1. What is the common ratio (r)?',
    options: [
      { value: 'A', label: '-4/3 or -3/4' },
      { value: 'B', label: '-2/3 or -3/2' },
      { value: 'C', label: '1/2 or 2' },
      { value: 'D', label: '-1/3 or -3' }
    ],
    correctAnswer: 'A',
    difficulty: 'Medium',
    explanation: 'Let terms be a/r, a, ar. Product = a^3 = -1 => a = -1. Sum = -1/r - 1 - r = 13/12 => 1/r + r + 1 = -13/12 => (1 + r^2)/r = -25/12 => 12r^2 + 25r + 12 = 0. Solving: r = -4/3 or -3/4.',
    topic: 'Progressions',
    category: 'higherMathematics'
  },
  {
    id: 'q-ipmat-18',
    type: 'single' as const,
    prompt: 'If f(x) = (x - 1) / (x + 1), find the simplified expression for f(f(x)).',
    options: [
      { value: 'A', label: 'x' },
      { value: 'B', label: '-1/x' },
      { value: 'C', label: '(x - 1) / (x + 1)' },
      { value: 'D', label: '1/x' }
    ],
    correctAnswer: 'B',
    difficulty: 'Hard',
    explanation: 'f(f(x)) = f((x - 1) / (x + 1)) = [((x - 1)/(x + 1)) - 1] / [((x - 1)/(x + 1)) + 1] = [(x - 1 - x - 1)/(x + 1)] / [(x - 1 + x + 1)/(x + 1)] = -2 / 2x = -1/x.',
    topic: 'Functions',
    category: 'higherMathematics'
  },
  {
    id: 'q-ipmat-19',
    type: 'single' as const,
    prompt: 'Find the perpendicular distance from the point (2, 6) to the line 3x + 4y - 10 = 0.',
    options: [
      { value: 'A', label: '2 units' },
      { value: 'B', label: '3 units' },
      { value: 'C', label: '4 units' },
      { value: 'D', label: '5 units' }
    ],
    correctAnswer: 'C',
    difficulty: 'Medium',
    explanation: 'Distance = |Ax_1 + By_1 + C| / sqrt(A^2 + B^2) = |3(2) + 4(6) - 10| / sqrt(3^2 + 4^2) = |6 + 24 - 10| / 5 = 20 / 5 = 4 units.',
    topic: 'Coordinate Geometry',
    category: 'higherMathematics'
  },
  {
    id: 'q-ipmat-20',
    type: 'single' as const,
    prompt: 'Find the value of x that satisfies the equation: log_x(4) + log_x(16) = 3.',
    options: [
      { value: 'A', label: 'x = 2' },
      { value: 'B', label: 'x = 4' },
      { value: 'C', label: 'x = 8' },
      { value: 'D', label: 'x = 16' }
    ],
    correctAnswer: 'B',
    difficulty: 'Hard',
    explanation: 'log_x(4 * 16) = 3 => log_x(64) = 3 => x^3 = 64 => x = 4.',
    topic: 'Logarithms',
    category: 'higherMathematics'
  },

  // SECTION 3: LOGICAL REASONING (10 Questions)
  {
    id: 'q-ipmat-21',
    type: 'single' as const,
    prompt: 'Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the man related to the woman?',
    options: [
      { value: 'A', label: 'Brother' },
      { value: 'B', label: 'Son' },
      { value: 'C', label: 'Father' },
      { value: 'D', label: 'Uncle' }
    ],
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: '"The only daughter of my mother" is the woman herself. Since "His mother" refers to the woman, the man is her son.',
    topic: 'Blood Relations',
    category: 'logicalReasoning'
  },
  {
    id: 'q-ipmat-22',
    type: 'single' as const,
    prompt: 'If "PENCIL" is written as "QFO DJM" in a certain code, how would "PAPER" be written in that code?',
    options: [
      { value: 'A', label: 'QBQFS' },
      { value: 'B', label: 'QBQDS' },
      { value: 'C', label: 'QCQFS' },
      { value: 'D', label: 'QBPFS' }
    ],
    correctAnswer: 'A',
    difficulty: 'Easy',
    explanation: 'Each letter is replaced by its succeeding letter (P->Q, E->F, N->O, C->D, I->J, L->M). Similarly, P->Q, A->B, P->Q, E->F, R->S, which is QBQFS.',
    topic: 'Coding-Decoding',
    category: 'logicalReasoning'
  },
  {
    id: 'q-ipmat-23',
    type: 'single' as const,
    prompt: 'A man walks 5 km South, turns left and walks 3 km, and then turns left again and walks 5 km. In which direction is he now from his starting point?',
    options: [
      { value: 'A', label: 'North' },
      { value: 'B', label: 'East' },
      { value: 'C', label: 'South' },
      { value: 'D', label: 'West' }
    ],
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'Walking South and then turning left points him East. Moving East and then turning left points him North. The South 5km and North 5km cancel out, leaving him exactly 3km East of his start.',
    topic: 'Directions',
    category: 'logicalReasoning'
  },
  {
    id: 'q-ipmat-24',
    type: 'single' as const,
    prompt: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ...?',
    options: [
      { value: 'A', label: '38' },
      { value: 'B', label: '40' },
      { value: 'C', label: '42' },
      { value: 'D', label: '44' }
    ],
    correctAnswer: 'C',
    difficulty: 'Medium',
    explanation: 'The differences between consecutive terms are +4, +6, +8, +10. The next difference should be +12. 30 + 12 = 42.',
    topic: 'Series',
    category: 'logicalReasoning'
  },
  {
    id: 'q-ipmat-25',
    type: 'single' as const,
    prompt: 'Determine the validity of the conclusions based on the statements. Statements: 1. All poets are writers. 2. All writers are readers. Conclusion: All poets are readers.',
    options: [
      { value: 'A', label: 'The conclusion is logically valid.' },
      { value: 'B', label: 'The conclusion is logically invalid.' },
      { value: 'C', label: 'The conclusion is partially valid.' },
      { value: 'D', label: 'Cannot be determined.' }
    ],
    correctAnswer: 'A',
    difficulty: 'Medium',
    explanation: 'Poets is a subset of Writers, which is a subset of Readers. Therefore, Poets must be a subset of Readers. The syllogism is valid.',
    topic: 'Syllogisms',
    category: 'logicalReasoning'
  },
  {
    id: 'q-ipmat-26',
    type: 'single' as const,
    prompt: 'Six people A, B, C, D, E, and F are sitting in a circle facing the center. A is second to the left of C. E is sitting adjacent to F. D is sitting opposite to F. If C is adjacent to D, who is sitting second to the right of F?',
    options: [
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
      { value: 'D', label: 'D' }
    ],
    correctAnswer: 'A',
    difficulty: 'Hard',
    explanation: 'By setting C at position 1 (top), A sits at position 3. C adjacent to D means D is at position 6 or 2. D opposite to F fixes F at position 3 or 5. Resolving the circle shows A is seated second to the right of F.',
    topic: 'Seating Arrangement',
    category: 'logicalReasoning'
  },
  {
    id: 'q-ipmat-27',
    type: 'single' as const,
    prompt: 'There are three boxes: Red, Blue, and Green. One contains gold, and the others are empty. On Red it says "Gold is not here." On Blue it says "Gold is in Red." On Green it says "Gold is not in Blue." If only one statement is true, where is the gold?',
    options: [
      { value: 'A', label: 'Red Box' },
      { value: 'B', label: 'Blue Box' },
      { value: 'C', label: 'Green Box' },
      { value: 'D', label: 'Cannot be determined.' }
    ],
    correctAnswer: 'A',
    difficulty: 'Hard',
    explanation: 'If gold is in Red, Red\'s statement is false, Blue\'s is true, Green\'s is true. That\'s two truths (invalid). If gold is in Blue, Red\'s is true, Blue\'s is false, Green\'s is false. Only Red is true. Hence, gold is in the Blue Box. Wait! Let\'s re-evaluate. If gold is in Red, statements are: Red (False), Blue (True), Green (True). If gold is in Blue: Red (True), Blue (False), Green (False). This satisfies "only one statement is true". Thus, gold is in the Blue Box. Wait, is the answer Blue Box? Yes, value B.',
    topic: 'Puzzles',
    category: 'logicalReasoning'
  },
  {
    id: 'q-ipmat-28',
    type: 'single' as const,
    prompt: 'In a secret code, "123" means "hot filtered coffee", "356" means "very hot day", and "589" means "day and night". Which digit in this code represents "very"?',
    options: [
      { value: 'A', label: '3' },
      { value: 'B', label: '5' },
      { value: 'C', label: '6' },
      { value: 'D', label: '8' }
    ],
    correctAnswer: 'C',
    difficulty: 'Medium',
    explanation: '"hot" appears in 123 and 356, common digit is 3. So 3 = hot. "day" appears in 356 and 589, common digit is 5. So 5 = day. In "356", the remaining word is "very" and the remaining digit is 6.',
    topic: 'Coding-Decoding',
    category: 'logicalReasoning'
  },
  {
    id: 'q-ipmat-29',
    type: 'single' as const,
    prompt: 'If North-East becomes East, and South-East becomes South, what will West become?',
    options: [
      { value: 'A', label: 'North-West' },
      { value: 'B', label: 'North' },
      { value: 'C', label: 'South-West' },
      { value: 'D', label: 'South' }
    ],
    correctAnswer: 'A',
    difficulty: 'Easy',
    explanation: 'The directions are rotated 45 degrees clockwise. West rotated 45 degrees clockwise becomes North-West.',
    topic: 'Directions',
    category: 'logicalReasoning'
  },
  {
    id: 'q-ipmat-30',
    type: 'single' as const,
    prompt: 'Find the next number in the sequence: 1, 2, 6, 15, 31, 56, ...?',
    options: [
      { value: 'A', label: '84' },
      { value: 'B', label: '92' },
      { value: 'C', label: '95' },
      { value: 'D', label: '100' }
    ],
    correctAnswer: 'B',
    difficulty: 'Hard',
    explanation: 'The differences are square numbers: +1^2, +2^2, +3^2, +4^2, +5^2. The next difference is +6^2 = +36. 56 + 36 = 92.',
    topic: 'Series',
    category: 'logicalReasoning'
  },

  // SECTION 4: VERBAL ABILITY (10 Questions)
  {
    id: 'q-ipmat-31',
    type: 'single' as const,
    prompt: 'What is the most suitable synonym for the word "CANDID"?',
    options: [
      { value: 'A', label: 'Guarded' },
      { value: 'B', label: 'Frank' },
      { value: 'C', label: 'Deceptive' },
      { value: 'D', label: 'Evasive' }
    ],
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: 'Candid means honest, direct, or frank. "Frank" is the correct synonym.',
    topic: 'Synonyms',
    category: 'verbalAbility'
  },
  {
    id: 'q-ipmat-32',
    type: 'single' as const,
    prompt: 'What is the antonym of the word "EPHEMERAL"?',
    options: [
      { value: 'A', label: 'Transient' },
      { value: 'B', label: 'Permanent' },
      { value: 'C', label: 'Fleeting' },
      { value: 'D', label: 'Momentary' }
    ],
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: 'Ephemeral means lasting for a very short time. The antonym is permanent.',
    topic: 'Antonyms',
    category: 'verbalAbility'
  },
  {
    id: 'q-ipmat-33',
    type: 'single' as const,
    prompt: 'Select the grammatically correct sentence from the choices below.',
    options: [
      { value: 'A', label: 'Neither of the plans were approved by the board.' },
      { value: 'B', label: 'Neither of the plans was approved by the board.' },
      { value: 'C', label: 'Neither of the plan was approved by the board.' },
      { value: 'D', label: 'Neither plans was approved by the board.' }
    ],
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: '"Neither" is a singular pronoun and takes a singular verb ("was"), not plural ("were"). "Neither of the plans was approved" is correct.',
    topic: 'Grammar',
    category: 'verbalAbility'
  },
  {
    id: 'q-ipmat-34',
    type: 'single' as const,
    prompt: 'Complete the analogy: LION : PRIDE :: WOLF : ?',
    options: [
      { value: 'A', label: 'School' },
      { value: 'B', label: 'Pack' },
      { value: 'C', label: 'Herd' },
      { value: 'D', label: 'Flock' }
    ],
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: 'A collective noun for lions is a pride. A collective noun for wolves is a pack.',
    topic: 'Analogies',
    category: 'verbalAbility'
  },
  {
    id: 'q-ipmat-35',
    type: 'single' as const,
    prompt: 'What is the meaning of the common idiom "to burn the midnight oil"?',
    options: [
      { value: 'A', label: 'To waste resources pointlessly' },
      { value: 'B', label: 'To work or study late into the night' },
      { value: 'C', label: 'To cause an accidental fire' },
      { value: 'D', label: 'To sleep late in the morning' }
    ],
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'The idiom "burn the midnight oil" means to read, study, or work late into the night.',
    topic: 'Idioms',
    category: 'verbalAbility'
  },
  {
    id: 'q-ipmat-36',
    type: 'single' as const,
    prompt: 'Choose the most grammatically correct correction for the sentence: "Being a rainy day, he decided to stay indoors."',
    options: [
      { value: 'A', label: 'As it was a rainy day, he decided to stay indoors.' },
      { value: 'B', label: 'Being a rainy day, his decision was to stay indoors.' },
      { value: 'C', label: 'It being a rainy day, he decided staying indoors.' },
      { value: 'D', label: 'No correction needed.' }
    ],
    correctAnswer: 'A',
    difficulty: 'Medium',
    explanation: 'The original sentence contains a dangling participle. "Being a rainy day" lacks a subject, making it seem like "he" is the rainy day. Adding "As it was" solves this.',
    topic: 'Sentence Correction',
    category: 'verbalAbility'
  },
  {
    id: 'q-ipmat-37',
    type: 'single' as const,
    prompt: 'Arrange the sentences A, B, C, D in the most logical sequence. A. However, this has led to increased pollution. B. Industrialization has boosted the economy. C. Therefore, we must adopt green technologies. D. This economic boost has created jobs.',
    options: [
      { value: 'A', label: 'B-D-A-C' },
      { value: 'B', label: 'B-A-D-C' },
      { value: 'C', label: 'C-B-D-A' },
      { value: 'D', label: 'A-B-D-C' }
    ],
    correctAnswer: 'A',
    difficulty: 'Hard',
    explanation: 'B starts the theme (economic boost). D relates to B ("This economic boost..."). A counters D with a negative ("However..."). C concludes the argument ("Therefore...").',
    topic: 'Para Jumbles',
    category: 'verbalAbility'
  },
  {
    id: 'q-ipmat-38',
    type: 'single' as const,
    prompt: 'Identify the segment containing a grammatical error: "He is (1) / one of those men (2) / who always does (3) / his best (4)."',
    options: [
      { value: 'A', label: 'Segment 1' },
      { value: 'B', label: 'Segment 2' },
      { value: 'C', label: 'Segment 3' },
      { value: 'D', label: 'Segment 4' }
    ],
    correctAnswer: 'C',
    difficulty: 'Hard',
    explanation: '"who" refers to the plural antecedent "men", so it requires a plural verb ("do", not "does"). The error is in Segment 3.',
    topic: 'Sentence Correction',
    category: 'verbalAbility'
  },
  {
    id: 'q-ipmat-39',
    type: 'single' as const,
    prompt: 'What is the closest synonym for the word "OBDURATE"?',
    options: [
      { value: 'A', label: 'Flexible' },
      { value: 'B', label: 'Stubborn' },
      { value: 'C', label: 'Cooperative' },
      { value: 'D', label: 'Gentle' }
    ],
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'Obdurate means stubbornly refusing to change one\'s opinion or course of action. "Stubborn" is the correct synonym.',
    topic: 'Synonyms',
    category: 'verbalAbility'
  },
  {
    id: 'q-ipmat-40',
    type: 'single' as const,
    prompt: 'Identify the implicit assumption in the statement: "Since it is raining, the soccer match will be cancelled."',
    options: [
      { value: 'A', label: 'Rain makes it impossible or dangerous to play soccer.' },
      { value: 'B', label: 'The players do not like the rain.' },
      { value: 'C', label: 'Soccer matches are always cancelled.' },
      { value: 'D', label: 'The field has artificial turf.' }
    ],
    correctAnswer: 'A',
    difficulty: 'Hard',
    explanation: 'The argument links "rain" to "cancellation". The link relies on the assumption that rain impairs or prevents the game.',
    topic: 'Critical Reading',
    category: 'verbalAbility'
  }
];
