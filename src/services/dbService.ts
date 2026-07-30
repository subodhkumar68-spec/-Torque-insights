// Stateful Mock Database Service using LocalStorage
// Provides CRUD simulations for CareerDNA AI platform

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'counselor' | 'school_admin' | 'college_admin' | 'corporate_hr' | 'admin';
  avatarUrl?: string;
  // Role-specific metadata
  schoolName?: string;
  collegeName?: string;
  companyName?: string;
  childId?: string; // For parents
  assignedCounselorId?: string; // For students
}

export type QuestionType = 'single' | 'multiple' | 'likert' | 'ranking' | 'scenario' | 'behavioral';

export interface QuestionOption {
  value: string;
  label: string;
  weights?: Record<string, number>; // e.g. { R: 2, I: 0 } or { INTJ: 1 }
}

export interface Question {
  id: string;
  category: 'Class XI-XII' | 'BBA' | 'MBA';
  subCategory: string; // e.g. "Career Interest", "Leadership", "Decision Making"
  type: QuestionType;
  prompt: string;
  options?: QuestionOption[];
  minLabel?: string; // For Likert (e.g. "Strongly Disagree")
  maxLabel?: string; // For Likert (e.g. "Strongly Agree")
}

export interface AssessmentSession {
  id: string;
  userId: string;
  category: 'Class XI-XII' | 'BBA' | 'MBA';
  subCategory: string;
  startTime: number;
  durationMs: number;
  answers: Record<string, any>; // questionId -> answer
  submitted: boolean;
  completedAt?: number;
  reportId?: string;
}

export interface CareerDNAReport {
  id: string;
  userId: string;
  category: 'Class XI-XII' | 'BBA' | 'MBA';
  subCategory: string;
  submittedAt: number;
  // Compiled scores
  scores: {
    riasec?: { R: number; I: number; A: number; S: number; E: number; C: number };
    mbti?: string; // e.g., "INTJ"
    leadershipScore?: number; // 0-100
    communicationScore?: number; // 0-100
    problemSolving?: number; // 0-100
    emotionalIntelligence?: number; // 0-100
    decisionMaking?: number; // 0-100
    criticalThinking?: number; // 0-100
  };
  strengths: string[];
  weaknesses: string[];
  growthAreas: string[];
  careerRecommendations: Array<{ career: string; matchPercentage: number; description: string }>;
  suggestedDegrees: string[];
  suggestedCertifications: string[];
  suggestedColleges: string[];
  skillGapAnalysis: Array<{ skill: string; current: number; required: number }>;
  learningRoadmap: Array<{ phase: string; title: string; duration: string; details: string[] }>;
}

export interface CounselingSession {
  id: string;
  studentId: string;
  studentName: string;
  counselorId: string;
  counselorName: string;
  dateTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  recommendations?: string;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  planName: string;
  amount: number;
  gst: number;
  couponCode?: string;
  timestamp: number;
  invoiceNumber: string;
  paymentMethod: string;
  status: 'captured' | 'failed';
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Career Guidance' | 'Study Abroad' | 'Entrance Exams' | 'Leadership' | 'MBA' | 'AI Careers' | 'Resume' | 'Interview';
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

// Initial Data Seed
const SEED_USERS: User[] = [
  { id: 'usr-student-1', name: 'Rohan Sharma', email: 'rohan@example.com', role: 'student', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120', schoolName: 'Delhi Public School', assignedCounselorId: 'usr-counselor-1' },
  { id: 'usr-parent-1', name: 'Alok Sharma', email: 'alok@example.com', role: 'parent', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120', childId: 'usr-student-1' },
  { id: 'usr-counselor-1', name: 'Dr. Sunita Mehta', email: 'sunita@example.com', role: 'counselor', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120' },
  { id: 'usr-school-1', name: 'Principal V. K. Iyer', email: 'dps@example.com', role: 'school_admin', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120', schoolName: 'Delhi Public School' },
  { id: 'usr-college-1', name: 'Dr. Arindam Bose', email: 'dean@iim.edu', role: 'college_admin', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120', collegeName: 'Symbiosis Business School' },
  { id: 'usr-corporate-1', name: 'Megha Sen', email: 'megha.recruiter@tata.com', role: 'corporate_hr', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120', companyName: 'Tata Consultancy Services' },
  { id: 'usr-admin-1', name: 'Super Admin', email: 'admin@careerdna.ai', role: 'admin', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120' },
];

const SEED_QUESTIONS: Question[] = [
  // Class XI-XII: Career Interest (RIASEC)
  { id: 'q-xi-1', category: 'Class XI-XII', subCategory: 'Career Interest', type: 'likert', prompt: 'I enjoy taking apart mechanical gadgets and putting them back together.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-xi-2', category: 'Class XI-XII', subCategory: 'Career Interest', type: 'likert', prompt: 'I like conducting research experiments and working with scientific data tables.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-xi-3', category: 'Class XI-XII', subCategory: 'Career Interest', type: 'likert', prompt: 'I love writing creative stories, designing graphics, or acting in plays.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-xi-4', category: 'Class XI-XII', subCategory: 'Career Interest', type: 'likert', prompt: 'I feel deeply satisfied when I help friends solve personal problems or tutor them.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-xi-5', category: 'Class XI-XII', subCategory: 'Career Interest', type: 'likert', prompt: 'I enjoy convincing people to buy products, invest in ideas, or support a cause.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  { id: 'q-xi-6', category: 'Class XI-XII', subCategory: 'Career Interest', type: 'likert', prompt: 'I like organizing databases, tracking budgets, and maintaining clean documentation.', minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
  
  // Class XI-XII: Personality (MBTI)
  { id: 'q-xi-7', category: 'Class XI-XII', subCategory: 'Personality', type: 'single', prompt: 'When attending a social gather or school festival, you usually:', options: [
    { value: 'E', label: 'Mingle actively with a large group of people, even strangers.' },
    { value: 'I', label: 'Interact quietly with a few close friends in a comfortable corner.' }
  ]},
  { id: 'q-xi-8', category: 'Class XI-XII', subCategory: 'Personality', type: 'single', prompt: 'In solving a complex math or logic puzzle, you tend to rely on:', options: [
    { value: 'S', label: 'Concrete rules, step-by-step facts, and known formulas.' },
    { value: 'N', label: 'Intuition, search for patterns, and trying out-of-the-box methods.' }
  ]},
  { id: 'q-xi-9', category: 'Class XI-XII', subCategory: 'Personality', type: 'single', prompt: 'When making choices that affect a group project, you prioritize:', options: [
    { value: 'T', label: 'Objective criteria, cold logic, and fairness.' },
    { value: 'F', label: 'Personal feelings, team harmony, and individual impact.' }
  ]},
  { id: 'q-xi-10', category: 'Class XI-XII', subCategory: 'Personality', type: 'single', prompt: 'Which style of studying for finals fits you best?', options: [
    { value: 'J', label: 'A highly organized study calendar sticking strictly to daily milestones.' },
    { value: 'P', label: 'A flexible, adaptive schedule, cramming when feeling inspired.' }
  ]},

  // Class XI-XII: Stream Selection / Aptitude
  { id: 'q-xi-11', category: 'Class XI-XII', subCategory: 'Stream Selection', type: 'scenario', prompt: 'Scenario: You are given a budget of Rs. 10,000 to launch a small science fair booth. Which part of the process gets you most excited?', options: [
    { value: 'ScienceTech', label: 'Designing the technical prototypes, coding the simulations, and setting up hardware.' },
    { value: 'Commerce', label: 'Drafting the budget spreadsheet, tracking expenses, and calculating potential ROI.' },
    { value: 'ArtsHumanities', label: 'Designing the banners, writing the marketing copy, and speaking to visitors about the human impact.' }
  ]},
  { id: 'q-xi-12', category: 'Class XI-XII', subCategory: 'Stream Selection', type: 'ranking', prompt: 'Rank your interest level in these academic areas (highest interest at top):', options: [
    { value: 'PCM', label: 'Physics, Mathematics, Computer Science' },
    { value: 'PCB', label: 'Biology, Chemistry, Biotechnology' },
    { value: 'Commerce', label: 'Accountancy, Business Studies, Economics' },
    { value: 'Humanities', label: 'Psychology, History, Fine Arts' }
  ]},

  // BBA: Leadership & Business Aptitude
  { id: 'q-bba-1', category: 'BBA', subCategory: 'Business Aptitude', type: 'single', prompt: 'If a company has high revenue growth but negative operating cash flow, it is most likely because of:', options: [
    { value: 'A', label: 'High inventory build-up and delayed collections from buyers.' },
    { value: 'B', label: 'Excellent sales performance and upfront payments received.' },
    { value: 'C', label: 'Extremely low administrative overheads.' }
  ]},
  { id: 'q-bba-2', category: 'BBA', subCategory: 'Leadership', type: 'scenario', prompt: 'A critical group assignment is due in 4 hours. One team member has disappeared. You:', options: [
    { value: 'L1', label: 'Take charge, divide their portion among others, and submit on time.' },
    { value: 'L2', label: 'Inform the professor immediately, stating the missing member\'s name.' },
    { value: 'L3', label: 'Keep messaging the missing member and delay submission waiting for them.' }
  ]},
  { id: 'q-bba-3', category: 'BBA', subCategory: 'Critical Thinking', type: 'likert', prompt: 'I always verify claims and news reports by cross-referencing primary sources before believing them.', minLabel: 'Never', maxLabel: 'Always' },

  // MBA: Leadership & Strategic Thinking
  { id: 'q-mba-1', category: 'MBA', subCategory: 'Strategic Thinking', type: 'scenario', prompt: 'A competitor launches an aggressive price-cutting campaign, dropping pricing by 30%. As CEO, what is your strategic move?', options: [
    { value: 'S1', label: 'Match the pricing cut immediately to protect market share, cutting short-term margins.' },
    { value: 'S2', label: 'Pivot to premium positioning, introducing value-added service extensions, and keeping prices stable.' },
    { value: 'S3', label: 'Launch a counter-marketing campaign targeting the competitor\'s quality cuts.' }
  ]},
  { id: 'q-mba-2', category: 'MBA', subCategory: 'Decision Making', type: 'single', prompt: 'Under high-stress, ambiguous market conditions, you make decisions by:', options: [
    { value: 'D1', label: 'Waiting for complete data reports, prioritizing minimization of errors.' },
    { value: 'D2', label: 'Blending available signals with experience to act fast, adjusting course dynamically.' },
    { value: 'D3', label: 'Calling an emergency brainstorm session to secure cross-functional consensus.' }
  ]},
  { id: 'q-mba-3', category: 'MBA', subCategory: 'Emotional Intelligence', type: 'behavioral', prompt: 'An executive director criticizes your product roadmap directly in a public meeting. Your reaction is to:', options: [
    { value: 'E1', label: 'Listen calmly, validate their valid points, and propose a side-bar meeting to review the data.' },
    { value: 'E2', label: 'Defend your roadmap on the spot, showing competitor case studies to prove them wrong.' },
    { value: 'E3', label: 'Accept the criticism silently and alter the roadmap to avoid further confrontation.' }
  ]}
];

const SEED_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'The AI Revolution in Careers: What Fields Will Thrive in 2030?',
    summary: 'An depth look into how AI is altering employment trends and which skills class 12 and college students need to master.',
    content: 'Artificial Intelligence is no longer just a futuristic concept. It is reshaping industries from Healthcare to Finance. This guide explores the rising career domains—such as AI Ethics, Prompt Engineering, Bioinformatics, and Robotics—and details how students can adapt their stream choices to stay ahead of the curve.',
    category: 'AI Careers',
    author: 'Amit Roy (Career Expert)',
    date: 'July 20, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'blog-2',
    title: 'Mastering the MBA: General Management vs. Consulting',
    summary: 'A side-by-side analysis of MBA tracks to help you choose the right specialization for executive success.',
    content: 'Choosing the right MBA stream is crucial. Consulting tracks focus heavily on case analysis, quantitative reasoning, and structured problem solving. General Management roles, on the other hand, emphasize emotional intelligence, operations, leadership potential, and cross-functional operations. Learn how your CareerDNA assessment score can guide this choice.',
    category: 'MBA',
    author: 'Dean Arindam Bose',
    date: 'July 15, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'blog-3',
    title: 'Developing Strong Study Habits for Competitive Exams',
    summary: 'Scientific techniques to boost memory retention, handle exam stress, and streamline your study planning.',
    content: 'Whether preparing for IIT-JEE, NEET, CAT, or CLAT, your study style matters. We discuss the Pomodoro technique, active recall, spaced repetition, and how identifying your personal Learning Style (Visual vs Auditory vs Kinesthetic) can optimize your study hours.',
    category: 'Entrance Exams',
    author: 'Dr. Sunita Mehta',
    date: 'July 10, 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600'
  }
];

// Helper to load/save state
const loadData = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(`careerdna_${key}`);
  return data ? JSON.parse(data) : defaultValue;
};

const saveData = <T>(key: string, value: T): void => {
  localStorage.setItem(`careerdna_${key}`, JSON.stringify(value));
};

export const dbService = {
  // Users
  getUsers: (): User[] => loadData<User[]>('users', SEED_USERS),
  saveUsers: (users: User[]) => saveData<User[]>('users', users),
  
  // Questions
  getQuestions: (): Question[] => loadData<Question[]>('questions', SEED_QUESTIONS),
  saveQuestions: (questions: Question[]) => saveData<Question[]>('questions', questions),

  // Assessments Sessions
  getSessions: (): AssessmentSession[] => loadData<AssessmentSession[]>('sessions', []),
  saveSessions: (sessions: AssessmentSession[]) => saveData<AssessmentSession[]>('sessions', sessions),

  // Reports
  getReports: (): CareerDNAReport[] => loadData<CareerDNAReport[]>('reports', []),
  saveReports: (reports: CareerDNAReport[]) => saveData<CareerDNAReport[]>('reports', reports),

  // Counseling
  getBookings: (): CounselingSession[] => loadData<CounselingSession[]>('bookings', []),
  saveBookings: (bookings: CounselingSession[]) => saveData<CounselingSession[]>('bookings', bookings),

  // Payments
  getPayments: (): PaymentTransaction[] => loadData<PaymentTransaction[]>('payments', []),
  savePayments: (payments: PaymentTransaction[]) => saveData<PaymentTransaction[]>('payments', payments),

  // Blogs
  getBlogs: (): Blog[] => loadData<Blog[]>('blogs', SEED_BLOGS),
  saveBlogs: (blogs: Blog[]) => saveData<Blog[]>('blogs', blogs),

  // Reset database to seed
  resetDB: () => {
    localStorage.removeItem('careerdna_users');
    localStorage.removeItem('careerdna_questions');
    localStorage.removeItem('careerdna_sessions');
    localStorage.removeItem('careerdna_reports');
    localStorage.removeItem('careerdna_bookings');
    localStorage.removeItem('careerdna_payments');
    localStorage.removeItem('careerdna_blogs');
  }
};
