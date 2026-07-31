import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAssessment } from '../../context/AssessmentContext';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Search, Filter, ArrowRight, Clock, Award, Star, 
  ShieldCheck, HelpCircle, FileText, CheckCircle, ChevronRight, 
  X, Sparkles, BookOpen, User, Flame, TrendingUp, RefreshCw, BarChart2 
} from 'lucide-react';
import { RazorpayModal } from '../../components/RazorpayModal';

// Assessment Model definition
interface Assessment {
  id: string;
  title: string;
  subTitle: string;
  category: string;
  audience: 'Class XI-XII' | 'Undergraduate' | 'MBA' | 'All' | 'Professionals';
  duration: number; // in mins
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  certification: boolean;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Recommended' | 'Popular' | 'New';
  progress?: number; // 0-100 if in progress
  price: number;
  description: string;
  purpose: string;
  measures: string[];
  scientificFramework: string;
  version: string;
  reliability: string; // Cronbach's Alpha
}

export const Assessments: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { startAssessment, activeSession } = useAssessment();

  // Navigation / View states: 'catalog' | 'details'
  const [view, setView] = useState<'catalog' | 'details'>('catalog');
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAudience, setSelectedAudience] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Razorpay simulation state
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<Assessment | null>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Mock assessments catalog dataset (8 records)
  const assessmentsDataset: Assessment[] = [
    {
      id: 'ast-aptitude',
      title: 'High School Career Aptitude Test',
      subTitle: 'Identify core streams and academic disciplines.',
      category: 'Career Aptitude',
      audience: 'Class XI-XII',
      duration: 30,
      questions: 60,
      difficulty: 'Medium',
      certification: true,
      status: 'Recommended',
      price: 1499,
      description: 'Scientifically maps logical, spatial, and numeric capacity to align high school stream selection with university courses.',
      purpose: 'Diagnose core academic aptitudes to facilitate stress-free stream and degree decisions.',
      measures: ['Quantitative Reasoning', 'Spatial Visualization', 'Logical Induction', 'Verbal Fluency', 'Holland RIASEC Interests'],
      scientificFramework: 'Holland RIASEC Interest Inventory & Differential Aptitude Constructs',
      version: 'v4.2.1',
      reliability: '0.94 Cronbach Alpha (Very High)'
    },
    {
      id: 'ast-personality',
      title: '16-Personality Archetype Map',
      subTitle: 'Understand behavioral patterns and work preferences.',
      category: 'Personality',
      audience: 'All',
      duration: 25,
      questions: 50,
      difficulty: 'Easy',
      certification: true,
      status: 'Popular',
      price: 999,
      description: 'Deep personality analysis mapping work preferences, group dynamics, communication style, and structural alignment.',
      purpose: 'Uncover individual behavioral styles to determine optimal work environments and leadership roles.',
      measures: ['Extroversion Index', 'Conceptual Processing', 'Decision Logic Style', 'Task Organization Strategy'],
      scientificFramework: 'Myers & Briggs 16-Personality Construct Matrix',
      version: 'v3.5.0',
      reliability: '0.92 Cronbach Alpha (High)'
    },
    {
      id: 'ast-learning',
      title: 'Cognitive Learning Style Diagnostic',
      subTitle: 'Discover how your brain captures and recalls data.',
      category: 'Learning Style',
      audience: 'Class XI-XII',
      duration: 20,
      questions: 40,
      difficulty: 'Easy',
      certification: false,
      status: 'New',
      price: 699,
      description: 'Identifies conceptual, visual, and audio processing structures to refine study strategies and test preparation methods.',
      purpose: 'Enable learners to optimize study schedules and build personalized note-taking models.',
      measures: ['Visual Retention', 'Auditory Memory Recall', 'Kinesthetic Concept Processing', 'Abstract Conceptualization'],
      scientificFramework: 'Kolb Experiential Learning & VARK Modalities',
      version: 'v2.1.2',
      reliability: '0.88 Cronbach Alpha (Reliable)'
    },
    {
      id: 'ast-leadership',
      title: 'Executive Leadership Suitability Index',
      subTitle: 'Assess strategic decision execution and delegation logic.',
      category: 'Leadership',
      audience: 'MBA',
      duration: 40,
      questions: 80,
      difficulty: 'Hard',
      certification: true,
      status: 'Recommended',
      price: 2499,
      description: 'Advanced scenario-based simulation analyzing delegation habits, stress de-escalation, conflict modeling, and vision tracking.',
      purpose: 'Establish leadership potential indices for management candidates, supervisors, and organizational directors.',
      measures: ['Delegation Competency', 'Strategic Alignment', 'Systemic Crisis De-escalation', 'Empathetic Performance Auditing'],
      scientificFramework: 'Transformational Leadership Constructs & Fiedler Contingency Model',
      version: 'v5.1.0',
      reliability: '0.95 Cronbach Alpha (Very High)'
    },
    {
      id: 'ast-eq',
      title: 'EQ & Emotional Intelligence Diagnostics',
      subTitle: 'Map social empathy and stress de-escalation indexes.',
      category: 'Emotional Intelligence',
      audience: 'All',
      duration: 30,
      questions: 60,
      difficulty: 'Medium',
      certification: true,
      status: 'Not Started',
      price: 1199,
      description: 'Evaluates self-regulation, empathy, motivation, and interactive metrics critical for teamwork and customer-facing roles.',
      purpose: 'Measure interpersonal intelligence indices to foster psychological safety in modern corporate structures.',
      measures: ['Self-Regulation Competency', 'Social Empathy Ratio', 'Intrinsic Motivation Drive', 'Active Listening Integrity'],
      scientificFramework: 'Goleman Emotional Intelligence Competency Model',
      version: 'v4.0.1',
      reliability: '0.91 Cronbach Alpha (High)'
    },
    {
      id: 'ast-employability',
      title: 'Corporate Talent Employability Blueprint',
      subTitle: 'Benchmark readiness for modern consulting and tech roles.',
      category: 'Employability',
      audience: 'Undergraduate',
      duration: 45,
      questions: 90,
      difficulty: 'Hard',
      certification: true,
      status: 'In Progress',
      progress: 45,
      price: 1999,
      description: 'Comprehensive benchmark of quantitative logic, business acumen, verbal capability, and agile task management logic.',
      purpose: 'Enable campus students to audit skill gaps prior to corporate placement seasons.',
      measures: ['Logical Acumen', 'Quantitative Aptitude', 'Verbal Fluency', 'Agile Case Performance'],
      scientificFramework: 'Torque Corporate Readiness Benchmarking Scales',
      version: 'v6.2.0',
      reliability: '0.96 Cronbach Alpha (Excellent)'
    },
    {
      id: 'ast-communication',
      title: 'Business & Verbal Communication Audit',
      subTitle: 'Gauge presentation, writing, and active listening.',
      category: 'Communication',
      audience: 'Professionals',
      duration: 30,
      questions: 50,
      difficulty: 'Medium',
      certification: true,
      status: 'Completed',
      price: 1299,
      description: 'Measures drafting clarity, presentation articulation, active listening index, and cross-functional feedback logic.',
      purpose: 'Audit professional communications capability to align remote and matrix organization operations.',
      measures: ['Drafting Precision', 'Presentation Articulation', 'Active Listening Index', 'Conflict De-escalation Style'],
      scientificFramework: 'Professional Communications Performance Standard',
      version: 'v3.2.1',
      reliability: '0.89 Cronbach Alpha (Reliable)'
    },
    {
      id: 'ast-critical',
      title: 'Critical Logic & Analytical Aptitude',
      subTitle: 'Audit problem solving under timed cognitive limits.',
      category: 'Critical Thinking',
      audience: 'Undergraduate',
      duration: 35,
      questions: 70,
      difficulty: 'Hard',
      certification: true,
      status: 'Not Started',
      price: 1499,
      description: 'Rigorous cognitive test auditing induction, deduction, pattern analysis, and fast logic calculations under tight timers.',
      purpose: 'Diagnose mental agility, critical audit traits, and technical problem-solving capacity.',
      measures: ['Deductive Inference', 'Inductive Logic Map', 'Numerical Pattern Sequences', 'Data Interpretation Accuracy'],
      scientificFramework: 'Watson-Glaser Critical Thinking Assessment Scales',
      version: 'v4.1.2',
      reliability: '0.93 Cronbach Alpha (High)'
    }
  ];

  // Category Selector options
  const categoriesList = [
    'All', 'Career Aptitude', 'Personality', 'Learning Style', 'Leadership', 
    'Emotional Intelligence', 'Employability', 'Communication', 'Critical Thinking'
  ];

  // Filter & Search Logic
  const filteredAssessments = assessmentsDataset.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesAudience = selectedAudience === 'All' || item.audience === selectedAudience;
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesAudience && matchesDifficulty && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'Price Low') return a.price - b.price;
    if (sortBy === 'Price High') return b.price - a.price;
    if (sortBy === 'Questions') return b.questions - a.questions;
    return 0; // Default Recommended preserves natural state
  });

  const featuredAssessments = assessmentsDataset.slice(0, 3);
  const recentlyViewed = assessmentsDataset.slice(4, 7);

  const handleStart = async (item: Assessment) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      alert('Please log in or create an account to start taking the test!');
      navigate('/login');
      return;
    }

    if (activeSession) {
      // If there is an unfinished test, resume it
      navigate('/dashboard/student');
      return;
    }

    // Directly start the assessment (free of charge)
    const mapCategory = (aud: string): 'Class XI-XII' | 'BBA' | 'MBA' => {
      if (aud === 'Class XI-XII') return 'Class XI-XII';
      if (aud === 'Undergraduate') return 'BBA';
      return 'MBA';
    };
    startAssessment(mapCategory(item.audience), item.title);
    navigate('/dashboard/student');
  };

  const handlePaymentSuccess = (txId: string) => {
    setIsPayModalOpen(false);
    if (!selectedPlanForPayment) return;
    
    const mapCategory = (aud: string): 'Class XI-XII' | 'BBA' | 'MBA' => {
      if (aud === 'Class XI-XII') return 'Class XI-XII';
      if (aud === 'Undergraduate') return 'BBA';
      return 'MBA';
    };
    startAssessment(mapCategory(selectedPlanForPayment.audience), selectedPlanForPayment.title);
    navigate('/dashboard/student');
  };

  const openDetails = (item: Assessment) => {
    setSelectedAssessment(item);
    setView('details');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans text-slate-800">
      
      <AnimatePresence mode="wait">
        
        {/* ==================== VIEW 1: ASSESSMENT CATALOG ==================== */}
        {view === 'catalog' && (
          <motion.div
            key="catalog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12 text-left"
          >
            {/* Top Header Section */}
            <div className="space-y-4 max-w-3xl">
              <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-0.5 text-[9px] font-black uppercase text-brand-red tracking-wider">
                Platform Diagnostic Catalog
              </span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-5xl leading-none">Discover Assessments</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                Choose the assessment that best matches your academic, career, or professional goals. Take a 30-minute diagnostic session to receive your AI report.
              </p>
            </div>

            {/* Quick Filter Header Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-slate-200 p-4 rounded-3xl shadow-sm">
              
              {/* Search input */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search assessments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold focus:outline-none focus:border-brand-red bg-slate-50"
                />
              </div>

              {/* Filters triggers */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button 
                  onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
                  className={`flex items-center gap-1.5 px-4 py-2 border rounded-full text-xs font-bold transition-all cursor-pointer bg-white ${showFiltersDrawer ? 'border-brand-red text-brand-red bg-brand-pink/10' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                >
                  <Filter className="h-4.5 w-4.5" />
                  Filters
                </button>

                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-slate-200 rounded-full text-xs font-bold focus:outline-none bg-white text-slate-700 cursor-pointer"
                >
                  <option value="Recommended">Sort: Recommended</option>
                  <option value="Price Low">Price: Low to High</option>
                  <option value="Price High">Price: High to Low</option>
                  <option value="Questions">Questions Count</option>
                </select>
              </div>

            </div>

            {/* Collapsible Filters Drawer */}
            {showFiltersDrawer && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="bg-white border border-slate-200 p-6 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-left shadow-sm"
              >
                {/* Filter 1 */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Target Audience</span>
                  <select 
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold bg-slate-50"
                  >
                    <option value="All">All Audiences</option>
                    <option value="Class XI-XII">Class XI-XII</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="MBA">MBA Candidate</option>
                    <option value="Professionals">Professionals</option>
                  </select>
                </div>

                {/* Filter 2 */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Difficulty Level</span>
                  <select 
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold bg-slate-50"
                  >
                    <option value="All">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                {/* Filter 3 */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Assessment Status</span>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold bg-slate-50"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Filter Reset Button */}
                <div className="flex items-end">
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedAudience('All');
                      setSelectedDifficulty('All');
                      setSelectedStatus('All');
                    }}
                    className="w-full py-2 border border-dashed border-slate-200 hover:border-brand-red hover:text-brand-red rounded-xl text-xs font-bold text-slate-500 text-center transition-all cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}

            {/* Horizontal Category Selector Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1.5 border-b border-slate-200">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-full px-4.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${selectedCategory === cat ? 'bg-slate-950 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ==================== FEATURED / RECOMMENDED SECTION ==================== */}
            <div className="space-y-6">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-brand-red" /> Recommended for You
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {featuredAssessments.map((item) => (
                  <div 
                    key={item.id}
                    className="group rounded-3xl border border-red-100 bg-white bg-gradient-to-br from-brand-pink/20 via-white to-white p-6.5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink text-brand-red text-xl font-bold">🎯</div>
                        <span className="rounded bg-brand-red px-2.5 py-0.5 text-[8px] font-black uppercase text-white tracking-widest">
                          AI Top Fit
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-base font-black text-slate-950">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{item.category} · {item.audience}</p>
                      </div>

                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-3 text-[10px] font-bold text-slate-500 pt-1">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {item.duration} Mins</span>
                        <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {item.questions} Qs</span>
                        <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> {item.difficulty}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-slate-100 mt-6">
                      <button 
                        onClick={() => handleStart(item)}
                        className="flex-1 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-sm transition-colors cursor-pointer text-center"
                      >
                        Start Assessment
                      </button>
                      <button 
                        onClick={() => openDetails(item)}
                        className="py-2.5 px-4.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== ALL ASSESSMENTS GRID ==================== */}
            <div className="space-y-6">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">All Available Diagnostics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAssessments.map((item) => (
                  <div 
                    key={item.id}
                    className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-4">
                      {/* Icon & Badges */}
                      <div className="flex justify-between items-start">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-xl font-bold">🧬</div>
                        <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-wider ${
                          item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                          item.status === 'In Progress' ? 'bg-brand-pink text-brand-red border border-red-100' : 'bg-slate-50 text-slate-400 border border-slate-200'
                        }`}>{item.status}</span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-slate-950 truncate">{item.title}</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{item.category}</p>
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.subTitle}</p>

                      {/* Progress bar if in progress */}
                      {item.status === 'In Progress' && item.progress && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                            <span>Progress</span>
                            <span className="text-brand-red">{item.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-red" style={{ width: `${item.progress}%` }} />
                          </div>
                        </div>
                      )}

                      {/* Diagnostic list flags */}
                      <div className="space-y-1 pt-1.5 border-t border-slate-100 text-[10px] font-bold text-slate-500">
                        <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-brand-red shrink-0" /> {item.duration} Mins</div>
                        <div className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-brand-red shrink-0" /> {item.questions} Questions</div>
                        <div className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-brand-red shrink-0" /> AI Analysis Included</div>
                        <div className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-brand-red shrink-0" /> Certificate: {item.certification ? 'Yes' : 'No'}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 border-t border-slate-100 pt-4 mt-4">
                      <button 
                        onClick={() => handleStart(item)}
                        className="flex-1 py-2 rounded-lg bg-slate-950 hover:bg-black text-[10px] font-black text-white cursor-pointer"
                      >
                        Start
                      </button>
                      <button 
                        onClick={() => openDetails(item)}
                        className="py-2 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black text-slate-600 cursor-pointer"
                      >
                        Details
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* ==================== AI RECOMMENDATION WHY PANEL ==================== */}
            <div className="rounded-3xl border border-red-150 bg-gradient-to-br from-brand-pink/30 via-white to-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 text-left">
                <span className="text-[9px] font-black text-brand-red uppercase tracking-wider block">Neural Recommendation Engine</span>
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">Why are these assessments recommended?</h3>
                <p className="text-xs text-slate-500 font-semibold max-w-xl">
                  Our system evaluates your registration profile, selected target disciplines, declared study goals, and previous trial results to compile suitability match ratings.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 max-w-sm justify-end text-[10px] font-bold text-slate-600 uppercase">
                <span className="rounded-full bg-white border border-slate-200 px-3 py-1 shadow-sm">🧬 Profile Traits</span>
                <span className="rounded-full bg-white border border-slate-200 px-3 py-1 shadow-sm">🎓 Education Stream</span>
                <span className="rounded-full bg-white border border-slate-200 px-3 py-1 shadow-sm">🧭 Previous Logs</span>
                <span className="rounded-full bg-white border border-slate-200 px-3 py-1 shadow-sm">⭐ Career Goals</span>
              </div>
            </div>

            {/* ==================== RECENTLY VIEWED (CAROUSEL) ==================== */}
            <div className="space-y-6">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">Recently Viewed</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentlyViewed.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => openDetails(item)}
                    className="group rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center justify-between text-left"
                  >
                    <div>
                      <h4 className="text-xs font-black text-slate-900 group-hover:text-brand-red transition-colors">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">{item.category} · {item.duration} Mins</p>
                    </div>
                    <ChevronRight className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== POPULAR ASSESSMENTS (RANKING TRENDS) ==================== */}
            <div className="space-y-6">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">Trending Assessments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { rank: '#1', title: '16-Personality Archetype Map', trend: 'Hot · +25% sessions' },
                  { rank: '#2', title: 'High School Career Aptitude Test', trend: 'Recommended for stream selection' },
                  { rank: '#3', title: 'Executive Leadership Suitability Index', trend: 'Hot among MBA groups' },
                  { rank: '#4', title: 'Corporate Talent Employability Blueprint', trend: 'Trending placement diagnostic' },
                ].map((trend, i) => (
                  <div 
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-4 text-left"
                  >
                    <span className="text-lg font-black text-brand-red shrink-0">{trend.rank}</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{trend.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">{trend.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ==================== VIEW 2: ASSESSMENT DETAILS ==================== */}
        {view === 'details' && selectedAssessment && (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-12 text-left"
          >
            {/* Back to catalog breadcrumb navigation */}
            <button 
              onClick={() => setView('catalog')}
              className="text-xs font-black text-slate-400 hover:text-slate-950 transition-colors flex items-center gap-1 cursor-pointer"
            >
              &larr; Return to Assessments Discover Catalog
            </button>

            {/* Hero Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-br from-brand-pink/10 via-white to-white">
              
              {/* Left details */}
              <div className="md:col-span-8 space-y-6">
                <div className="space-y-2">
                  <span className="rounded-full bg-brand-pink border border-red-100 px-3.5 py-1 text-[9px] font-black uppercase text-brand-red tracking-widest inline-block">
                    {selectedAssessment.category} Diagnostic
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {selectedAssessment.title}
                  </h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Target: {selectedAssessment.audience} Candidate Level</p>
                </div>

                <div className="flex flex-wrap gap-5 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock className="h-4.5 w-4.5 text-brand-red" /> {selectedAssessment.duration} Mins</span>
                  <span className="flex items-center gap-1.5"><FileText className="h-4.5 w-4.5 text-brand-red" /> {selectedAssessment.questions} Questions</span>
                  <span className="flex items-center gap-1.5"><Award className="h-4.5 w-4.5 text-brand-red" /> Difficulty: {selectedAssessment.difficulty}</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-4.5 w-4.5 text-brand-red" /> Languages: English, Hindi</span>
                </div>
              </div>

              {/* Right CTA / Pricing panel */}
              <div className="md:col-span-4 rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-4 shadow-sm shrink-0">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Single seat token access</span>
                <h3 className="text-3xl font-black text-slate-950">₹{selectedAssessment.price.toLocaleString('en-IN')}</h3>
                
                <button 
                  onClick={() => handleStart(selectedAssessment)}
                  className="w-full py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-md transition-colors cursor-pointer"
                >
                  Start Assessment
                </button>
                <button 
                  onClick={() => alert("Assessment page saved to your bookmarks directory!")}
                  className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  Save for Later
                </button>
              </div>

            </div>

            {/* Core Description columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Desc, Receives, Structure, Sample questions) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Purpose Description */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Description & Purpose</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{selectedAssessment.description}</p>
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Assessment Target Objectives:</span>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1">{selectedAssessment.purpose}</p>
                  </div>
                </div>

                {/* What You Will Receive */}
                <div className="space-y-4 bg-white border border-slate-200 p-6 rounded-3xl">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">What you will receive</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                    <div className="flex gap-2 items-start"><CheckCircle className="h-4.5 w-4.5 text-brand-red shrink-0 mt-0.5" /> <span>AI Career Intelligence Report</span></div>
                    <div className="flex gap-2 items-start"><CheckCircle className="h-4.5 w-4.5 text-brand-red shrink-0 mt-0.5" /> <span>Holland interest profile mapping</span></div>
                    <div className="flex gap-2 items-start"><CheckCircle className="h-4.5 w-4.5 text-brand-red shrink-0 mt-0.5" /> <span>6-axis radar skills index summary</span></div>
                    <div className="flex gap-2 items-start"><CheckCircle className="h-4.5 w-4.5 text-brand-red shrink-0 mt-0.5" /> <span>Customized academic stream roadmaps</span></div>
                    <div className="flex gap-2 items-start"><CheckCircle className="h-4.5 w-4.5 text-brand-red shrink-0 mt-0.5" /> <span>Downloadable certificate of assessment</span></div>
                  </div>
                </div>

                {/* Structure of Assessment */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Assessment Section Structure</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    {[
                      { step: '01', name: 'Introduction', desc: 'Mock tutorial profiles check.' },
                      { step: '02', name: 'Core Questions', desc: 'Aptitude Likert diagnostic logs.' },
                      { step: '03', name: 'Scenario Options', desc: 'Interactive situation analysis.' },
                      { step: '04', name: 'Reflection', desc: 'Self-audit value declaration.' },
                      { step: '05', name: 'Completion', desc: 'AI report generation dispatch.' },
                    ].map((step, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 p-4 rounded-2xl text-center space-y-1">
                        <span className="text-lg font-black text-brand-red">{step.step}</span>
                        <h4 className="text-[10px] font-black text-slate-900">{step.name}</h4>
                        <p className="text-[9px] text-slate-400 font-bold mt-1 leading-normal">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample questions preview (Read Only) */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Sample Questions Preview</h3>
                    <span className="text-[9px] font-black text-slate-400 uppercase">Read Only</span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                      <p className="text-xs font-bold text-slate-800">Q1. "I prefer projects with logical framework modeling over creative design layouts."</p>
                      <div className="flex gap-2 mt-3 justify-between text-[10px] font-black text-slate-400 uppercase">
                        <span>Strongly Disagree</span>
                        <div className="flex gap-3">
                          <span className="h-5 w-5 rounded-full border border-slate-350 flex items-center justify-center">1</span>
                          <span className="h-5 w-5 rounded-full border border-slate-350 flex items-center justify-center">2</span>
                          <span className="h-5 w-5 rounded-full border border-slate-350 flex items-center justify-center">3</span>
                          <span className="h-5 w-5 rounded-full border border-slate-350 flex items-center justify-center">4</span>
                          <span className="h-5 w-5 rounded-full border border-slate-350 flex items-center justify-center text-brand-red border-brand-red font-black">5</span>
                        </div>
                        <span>Strongly Agree</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                      <p className="text-xs font-bold text-slate-800">Q2. "You are coordinating a group assignment, and one contributor missed a task deadline. How do you respond?"</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase italic">Sample scenario option index selection</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (Metadata, Guidelines, Reviews) */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Guidelines Checklist */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Before you begin</h3>
                  
                  <div className="space-y-3 text-xs font-bold text-slate-500">
                    <div className="flex gap-2 items-start"><Clock className="h-4.5 w-4.5 text-brand-red shrink-0" /> <span>Complete in one single session</span></div>
                    <div className="flex gap-2 items-start"><ShieldCheck className="h-4.5 w-4.5 text-brand-red shrink-0" /> <span>Stable internet connect recommended</span></div>
                    <div className="flex gap-2 items-start"><CheckCircle className="h-4.5 w-4.5 text-brand-red shrink-0" /> <span>No correct or wrong answers</span></div>
                    <div className="flex gap-2 items-start"><FileText className="h-4.5 w-4.5 text-brand-red shrink-0" /> <span>Progress cached to user session</span></div>
                  </div>
                </div>

                {/* Metadata details */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Scientific Parameters</h3>
                  
                  <div className="space-y-2 text-xs font-bold text-slate-700">
                    <div className="flex justify-between"><span>Created By:</span> <span className="text-slate-900">Torque Diagnostics</span></div>
                    <div className="flex justify-between"><span>Framework:</span> <span className="text-slate-900 truncate max-w-[120px]">{selectedAssessment.scientificFramework}</span></div>
                    <div className="flex justify-between"><span>Reliability Index:</span> <span className="text-brand-red font-black">{selectedAssessment.reliability}</span></div>
                    <div className="flex justify-between"><span>Version:</span> <span className="text-slate-900">{selectedAssessment.version}</span></div>
                  </div>
                </div>

                {/* Placeholder reviews */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">User Feedback</h3>
                  
                  <div className="space-y-4 text-xs font-medium text-slate-500 leading-relaxed">
                    <div className="space-y-1">
                      <p className="italic">"We deployed this for our Class XII cohort and the stream selection recommendations map NEP criteria."</p>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider block">— Counselor Dr. Sunil</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Razorpay checkout simulation modal */}
      {selectedPlanForPayment && (
        <RazorpayModal
          isOpen={isPayModalOpen}
          onClose={() => setIsPayModalOpen(false)}
          onSuccess={handlePaymentSuccess}
          planName={selectedPlanForPayment.title}
          price={selectedPlanForPayment.price}
        />
      )}

    </div>
  );
};
