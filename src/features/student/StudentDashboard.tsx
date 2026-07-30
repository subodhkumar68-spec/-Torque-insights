import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAssessment } from '../../context/AssessmentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar 
} from 'recharts';
import { 
  BrainCircuit, Search, Bell, MessageSquare, Sun, Moon, ChevronDown, Check, 
  Award, BookOpen, Calendar, Clock, Sparkles, Star, TrendingUp, ArrowRight, 
  Menu, X, HelpCircle, Settings, LogOut, Compass, FileText, BarChart2, ShieldCheck, Zap,
  AlertCircle, ChevronRight, CheckCircle2, Bookmark, BookmarkCheck, Sliders, Type, Contrast,
  Target, Flame, Medal, CalendarDays, Download, Send
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { 
    activeSession, questions, currentQuestionIndex, timeLeft, 
    saveAnswer, submitAssessment, setCurrentQuestionIndex, cancelAssessment 
  } = useAssessment();
  
  // Dashboard Tabs & Navigation States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'roadmap' | 'counseling' | 'coach'>('overview');
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Assessment Engine States
  const [engineStep, setEngineStep] = useState<'instructions' | 'test' | 'review' | 'processing' | 'success'>('instructions');
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [finalReport, setFinalReport] = useState<any>(null);
  
  // Roadmap & Goal state overrides
  const [targetCareer, setTargetCareer] = useState('Software Product Manager');
  const [learningStreak, setLearningStreak] = useState(7);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [smartGoals, setSmartGoals] = useState([
    { id: 1, title: 'Complete AI Fundamentals Course', progress: 75, date: 'Aug 12, 2026', priority: 'High', status: 'In Progress' },
    { id: 2, title: 'Improve Public Speaking briefs', progress: 40, date: 'Aug 18, 2026', priority: 'Medium', status: 'In Progress' },
    { id: 3, title: 'Earn Google Data Analytics Cert', progress: 10, date: 'Sep 05, 2026', priority: 'High', status: 'Not Started' },
    { id: 4, title: 'Build React Portfolio Website', progress: 90, date: 'Aug 07, 2026', priority: 'Critical', status: 'In Progress' },
  ]);
  
  // Counseling & Appointment States
  const [counselingStep, setCounselingStep] = useState<'home' | 'browse' | 'profile' | 'wizard' | 'confirm' | 'appointments' | 'join' | 'summary'>('home');
  const [selectedCounselor, setSelectedCounselor] = useState<any>(null);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [bookingType, setBookingType] = useState('Individual');
  const [bookingMode, setBookingMode] = useState('Online Video Call');
  const [bookingDate, setBookingDate] = useState('2026-08-02');
  const [bookingTime, setBookingTime] = useState('02:00 PM');
  const [bookingNotes, setBookingNotes] = useState('');
  const [confirmedId, setConfirmedId] = useState('');
  
  const [counselingBookings, setCounselingBookings] = useState<any[]>([
    { id: 'BC-901', counselorName: 'Dr. Sunita Mehta', date: '2026-08-02', time: '02:00 PM', status: 'Upcoming', mode: 'Video Call', type: 'Individual' },
    { id: 'BC-702', counselorName: 'Dr. Sunita Mehta', date: '2026-07-20', time: '11:00 AM', status: 'Completed', mode: 'Phone Call', type: 'Individual' }
  ]);
  
  // Counselor Filters
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [filterLanguage, setFilterLanguage] = useState('All');
  const [filterMode, setFilterMode] = useState('All');
  
  // Join Session states
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [joinTimer, setJoinTimer] = useState(0);
  
  // Feedback state
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  
  // AI Career Coach States
  const [activeSessionId, setActiveSessionId] = useState('1');
  const [searchChatQuery, setSearchChatQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatSessions, setChatSessions] = useState([
    { id: '1', title: 'Personality Profile Analysis', date: 'Today', pinned: true },
    { id: '2', title: 'AWS Cloud vs. Data Science', date: 'Yesterday', pinned: false },
    { id: '3', title: 'Resume Review Advice', date: '3 days ago', pinned: false }
  ]);
  const [chatMessages, setChatMessages] = useState<Record<string, Array<{sender: 'user' | 'coach', text: string, timestamp: number, id: string}>>>({
    '1': [
      { id: '1-1', sender: 'coach', text: `Hello Sarah 👋! I'm your AI Career Coach. How can I help you shape your future today?`, timestamp: Date.now() - 3600000 }
    ],
    '2': [
      { id: '2-1', sender: 'coach', text: `Hello Sarah 👋! Let's compare Software Engineering vs Data Science or AWS Cloud certifications. Ask me any question!`, timestamp: Date.now() - 86400000 }
    ],
    '3': [
      { id: '3-1', sender: 'coach', text: `Hello Sarah 👋! Let's optimize your resume. I've scanned your current draft. Let me know what you'd like to improve.`, timestamp: Date.now() - 259200000 }
    ]
  });
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [bookmarkedMessages, setBookmarkedMessages] = useState<Record<string, boolean>>({});
  const [likedMessages, setLikedMessages] = useState<Record<string, boolean>>({});
  const [dislikedMessages, setDislikedMessages] = useState<Record<string, boolean>>({});

  const handleSendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: Date.now()
    };
    
    // Add user message
    setChatMessages(prev => ({
      ...prev,
      [activeSessionId]: [...(prev[activeSessionId] || []), userMsg]
    }));

    // Start typing indicator
    setIsAiTyping(true);

    // Simulate AI response after 1.2 seconds
    setTimeout(() => {
      let aiText = '';
      const query = text.toLowerCase();

      if (query.includes('personality') || query.includes('mbti') || query.includes('explain my profile')) {
        aiText = `[PERSONALITY] Based on your Assessment Diagnostic scoring, your primary personality archetype is **INTJ (Logical Architect)**. Your highest interest traits are **Investigative (95%)** and **Conventional (90%)**.

Here is your Holland RIASEC spectrum:
* **Investigative (95%):** Highly analytical, theoretical, and logic-driven.
* **Conventional (90%):** Structured, methodical, and documentation-focused.
* **Social (80%):** Collaborative and communicative.
* **Artistic (75%):** Imaginative and visual.
* **Enterprising (65%):** Decisive and leadership-minded.
* **Realistic (65%):** Concrete and builder-oriented.

How would you like to apply these personality styles to your career learning path?`;
      } else if (query.includes('compare') || query.includes('career options') || query.includes('vs')) {
        aiText = `[COMPARISON] Here is the interactive career comparison of **Software Engineer** vs **Data Scientist**:
* **Software Engineer:** 96% match, focuses on software development and cloud operations.
* **Data Scientist:** 92% match, focuses on big data analytics, regression models, and python scripting.

Which career path matches your interests? Click one to explore.`;
      } else if (query.includes('interview') || query.includes('prepare')) {
        aiText = `[INTERVIEW] I have compiled an interactive Interview Preparation workspace:
* **Mock Question:** "Tell me about a time you solved a complex technical problem under a tight deadline."
* **AI Feedback:** Ensure you use the STAR method (Situation, Task, Action, Result) to outline details.
* **Aptitude Confidence Index:** 78% (High readiness)

Review the checklist below to complete your mock interview!`;
      } else if (query.includes('resume') || query.includes('cv')) {
        aiText = `[RESUME] I have scanned your current resume draft.
* **Overall Score:** 74/100
* **ATS Readiness:** High
* **Missing Sections:** Certifications credentials, Portfolio website links.
* **Suggestions:** Add AWS Cloud Practitioner or Scrum Master credentials to double recruiter views.`;
      } else if (query.includes('cert') || query.includes('recommend') || query.includes('course')) {
        aiText = `[RECOMMENDATIONS] Here are some recommended learning assets tailored to your skill gaps:
* **Recommended Course:** Generative AI & LLM Fundamentals (12 Hours)
* **Certification:** Google Data Analytics Professional Certificate
* **Portfolio Project:** Systems Requirement Document (PRD) Notion Dashboard
* **Book:** "Designing Data-Intensive Applications" by Martin Kleppmann`;
      } else if (query.includes('goal')) {
        aiText = `[GOALS] Here is your active Smart Goal tracking status:
* **Goal:** Complete AI Fundamentals Course (Target: Aug 12, 2026)
* **Progress:** 75%
* **Next Step:** Complete AI Section 4 mock assessment quiz.`;
      } else {
        aiText = `I have received your question! Let's analyze how this fits your Career DNA target paths. Let me know if you would like me to help schedule a session with Dr. Sunita Mehta, or if we should review your skill gap radar scores.`;
      }

      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'coach' as const,
        text: aiText,
        timestamp: Date.now()
      };

      setChatMessages(prev => ({
        ...prev,
        [activeSessionId]: [...(prev[activeSessionId] || []), aiMsg]
      }));
      setIsAiTyping(false);
    }, 1200);
  };
  
  // Accessibility controls for testing
  const [zoomText, setZoomText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // AI Processing simulation progress
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStepIndex, setProcessingStepIndex] = useState(0);

  const processingSteps = [
    'Validating Responses',
    'Psychometric Scoring',
    'Behavioral Analysis',
    'Career Mapping',
    'AI Interpretation',
    'Generating Career Intelligence Report'
  ];

  const studentName = user?.name || "Sarah Jenkins";

  // Map Holland RIASEC / Skill Gap Recharts sample data
  const skillData = [
    { subject: 'Critical Thinking', Current: 85, Target: 95 },
    { subject: 'Communication', Current: 70, Target: 90 },
    { subject: 'Leadership', Current: 60, Target: 85 },
    { subject: 'AI Literacy', Current: 50, Target: 80 },
    { subject: 'Problem Solving', Current: 90, Target: 95 },
  ];

  // Recommended careers list (6 items)
  const recommendedCareers = [
    { name: 'Software Engineer', match: 96, growth: 'High', desc: 'Design, write, and audit desktop or SaaS applications.', trend: '+15% growth' },
    { name: 'Data Scientist', match: 92, growth: 'Very High', desc: 'Construct numeric machine models and big-data graphs.', trend: '+22% growth' },
    { name: 'Product Manager', match: 89, growth: 'High', desc: 'Coordinate agile tasks and user experience priorities.', trend: '+12% growth' },
    { name: 'UX Designer', match: 87, growth: 'High', desc: 'Wireframe and prototype premium layouts & interactive apps.', trend: '+18% growth' },
    { name: 'Digital Marketing Specialist', match: 84, growth: 'Medium', desc: 'Optimize acquisition conversion pipelines and campaigns.', trend: '+8% growth' },
    { name: 'Business Analyst', match: 81, growth: 'Medium', desc: 'Audit enterprise diagnostics logs and functional parameters.', trend: '+10% growth' },
  ];

  // Learning resources horizontal list
  const learningResources = [
    { title: 'Career Guide', tag: 'Aptitude', summary: 'How to transition into tech management with zero codebase background.', img: '🧭' },
    { title: 'AI Learning', tag: 'Future Skill', summary: 'Introductory neural networks and ChatGPT prompting workflows.', img: '🧠' },
    { title: 'Resume Building', tag: 'Placement', summary: 'Tailor your application summary templates to lock corporate attention.', img: '📄' },
    { title: 'Interview Skills', tag: 'Soft Skill', summary: 'Tackle behavioral scenarios under validation standards.', img: '💬' },
    { title: 'Communication Skills', tag: 'Aptitude', summary: 'Persuade cross-functional stakeholders with brief decks.', img: '📢' },
    { title: 'Leadership Development', tag: 'Management', summary: 'De-escalate team conflicts and coordinate task timelines.', img: '⭐' }
  ];

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Tracking visited questions
  useEffect(() => {
    if (activeSession && questions[currentQuestionIndex]) {
      setVisitedQuestions(prev => ({ ...prev, [questions[currentQuestionIndex].id]: true }));
    }
  }, [currentQuestionIndex, activeSession, questions]);

  // AI Report Compilation Simulation
  useEffect(() => {
    let interval: any = null;
    if (engineStep === 'processing') {
      interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            const report = submitAssessment();
            setFinalReport(report);
            setEngineStep('success');
            return 100;
          }
          const nextVal = prev + 5;
          setProcessingStepIndex(Math.min(
            processingSteps.length - 1,
            Math.floor((nextVal / 100) * processingSteps.length)
          ));
          return nextVal;
        });
      }, 150);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [engineStep]);

  // Join counseling session timer effect
  useEffect(() => {
    let interval: any = null;
    if (counselingStep === 'join') {
      interval = setInterval(() => {
        setJoinTimer(prev => prev + 1);
      }, 1000);
    } else {
      setJoinTimer(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [counselingStep]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Check how many questions are answered
  const getAnsweredCount = () => {
    if (!activeSession) return 0;
    return Object.keys(activeSession.answers).length;
  };

  // Motivational Messages generator
  const getMotivationalMessage = () => {
    if (!activeSession) return '';
    const total = questions.length;
    const answered = getAnsweredCount();
    if (answered === 0) return 'Take your time. Answer honestly!';
    if (answered === Math.floor(total / 2)) return "Keep going! You're exactly halfway there.";
    if (answered === total - 1) return 'Almost finished! Just one final question.';
    return 'Doing great! Progress is automatically saved.';
  };

  // =========================================================================
  // ==================== RENDER: DEDICATED ASSESSMENT ENGINE ====================
  // =========================================================================
  if (activeSession || finalReport) {
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const answeredCount = getAnsweredCount();
    const remainingCount = totalQuestions - answeredCount;
    const completionPercent = Math.round((answeredCount / totalQuestions) * 100);

    return (
      <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-300 ${
        highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'
      }`}>
        
        {/* Top Header of Assessment Engine */}
        <header className={`h-16 flex items-center justify-between px-6 border-b shrink-0 bg-white ${
          highContrast ? 'bg-zinc-950 border-zinc-800 text-white' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white shadow-sm">
              <BrainCircuit className="h-5.5 w-5.5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 leading-none">
                {activeSession?.subCategory || finalReport?.subCategory || 'AI Career Assessment'}
              </h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Powered by Torque Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Accessibility Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setZoomText(!zoomText)}
                title="Zoom Text"
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-red cursor-pointer bg-slate-50"
              >
                <Type className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setHighContrast(!highContrast)}
                title="High Contrast"
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-red cursor-pointer bg-slate-50"
              >
                <Contrast className="h-4 w-4" />
              </button>
            </div>

            {/* Session Timer (Visible only in Test view) */}
            {engineStep === 'test' && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4.5 py-1.5 font-mono text-xs font-black text-brand-red shadow-sm animate-pulse">
                <Clock className="h-4 w-4" />
                {formatTime(timeLeft)}
              </div>
            )}

            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to quit the assessment session? Progress is cached.")) {
                  cancelAssessment();
                  navigate('/assessments');
                }
              }}
              className="text-xs font-bold text-slate-400 hover:text-brand-red cursor-pointer"
            >
              Quit
            </button>
          </div>
        </header>

        {/* Dynamic Step Engine Views */}
        <div className="flex-1 flex overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: ASSESSMENT INSTRUCTIONS */}
            {engineStep === 'instructions' && (
              <motion.div
                key="instructions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-4xl mx-auto p-6 sm:p-12 overflow-y-auto text-left space-y-8"
              >
                <div className="space-y-2">
                  <span className="rounded bg-brand-pink px-2.5 py-1 text-[10px] font-black uppercase text-brand-red tracking-wider">
                    Instructions Checklist
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    Assessment Guidelines & Environment Verification
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Candidate: {user?.name || 'Sarah Jenkins'} | ID: {activeSession?.id || 'ses-test'}
                  </p>
                </div>

                {/* Premium instructions cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2.5">
                    <span className="text-lg">⏱️</span>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Complete in one sitting</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      Set aside 30 minutes. Do not close or refresh the tab.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2.5">
                    <span className="text-lg">🧬</span>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">No right or wrong answers</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      Answer honestly to align reports with your genuine RIASEC and personality traits.
                    </p>
                  </div>
                </div>

                {/* System Check Panel */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">System Requirements Check</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Internet Status</p>
                      <p className="text-xs font-black text-emerald-600 mt-1 flex items-center justify-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Online
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Browser</p>
                      <p className="text-xs font-black text-emerald-600 mt-1 flex items-center justify-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Compatible
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Auto Save</p>
                      <p className="text-xs font-black text-emerald-600 mt-1 flex items-center justify-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Enabled
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Timer Calibration</p>
                      <p className="text-xs font-black text-emerald-600 mt-1 flex items-center justify-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Passed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-150">
                  <button 
                    onClick={() => { cancelAssessment(); navigate('/assessments'); }}
                    className="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                  >
                    Back to Catalog
                  </button>
                  <button 
                    onClick={() => setEngineStep('test')}
                    className="flex-1 py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-md transition-all cursor-pointer text-center"
                  >
                    Begin Assessment
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: QUESTION RUNNER INTERFACE */}
            {engineStep === 'test' && (
              <motion.div
                key="test"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col md:flex-row overflow-hidden relative"
              >
                {/* Scrollable Content Container */}
                <div className="flex-1 p-6 sm:p-12 overflow-y-auto text-left space-y-6 flex flex-col justify-between">
                  
                  {/* Top Stats Ring indicator */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                      <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                      <span>{completionPercent}% Completed</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-red transition-all duration-300" style={{ width: `${completionPercent}%` }} />
                    </div>
                  </div>

                  {/* Motivational Notification */}
                  <div className="bg-brand-pink/20 border border-brand-red/10 rounded-2xl p-3 text-xs font-black text-brand-red flex items-center gap-1.5 justify-center">
                    <Sparkles className="h-4.5 w-4.5" />
                    {getMotivationalMessage()}
                  </div>

                  {/* Clean readable question card */}
                  {currentQuestion && (
                    <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {currentQuestion.subCategory}
                        </span>
                        <button 
                          onClick={() => setFlaggedQuestions({ ...flaggedQuestions, [currentQuestion.id]: !flaggedQuestions[currentQuestion.id] })}
                          className={`flex items-center gap-1 text-[10px] font-black uppercase cursor-pointer transition-colors ${
                            flaggedQuestions[currentQuestion.id] ? 'text-brand-red' : 'text-slate-400 hover:text-slate-650'
                          }`}
                        >
                          {flaggedQuestions[currentQuestion.id] ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                          Mark for Review
                        </button>
                      </div>

                      {/* Prompt Question title with accessibility Zoom Text size scaling */}
                      <p className={`font-black text-slate-900 leading-normal ${zoomText ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>
                        {currentQuestion.prompt}
                      </p>

                      {/* Question Answer Options by Type */}
                      <div className="pt-2">
                        {currentQuestion.type === 'likert' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-5 gap-2">
                              {[1, 2, 3, 4, 5].map((val) => {
                                const isSel = Number(activeSession?.answers[currentQuestion.id]) === val;
                                return (
                                  <button
                                    key={val}
                                    onClick={() => saveAnswer(currentQuestion.id, val.toString())}
                                    className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border font-bold transition-all cursor-pointer ${
                                      isSel 
                                        ? 'bg-brand-red border-brand-red text-white' 
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                    }`}
                                  >
                                    <span className="text-sm">{val}</span>
                                  </button>
                                );
                              })}
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 uppercase tracking-wider">
                              <span>{currentQuestion.minLabel || 'Disagree'}</span>
                              <span>{currentQuestion.maxLabel || 'Agree'}</span>
                            </div>
                          </div>
                        )}

                        {currentQuestion.type === 'single' && currentQuestion.options && (
                          <div className="space-y-2.5">
                            {currentQuestion.options.map((opt) => {
                              const isSel = activeSession?.answers[currentQuestion.id] === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  onClick={() => saveAnswer(currentQuestion.id, opt.value)}
                                  className={`w-full text-left rounded-2xl border p-4 text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer ${
                                    isSel 
                                      ? 'bg-brand-red border-brand-red text-white' 
                                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  <div className={`h-4.5 w-4.5 shrink-0 rounded-full border flex items-center justify-center mt-0.5 ${isSel ? 'border-white bg-white/20' : 'border-slate-500'}`}>
                                    {isSel && <div className="h-2 w-2 rounded-full bg-white" />}
                                  </div>
                                  <span>{opt.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bottom Actions footer buttons */}
                  <div className="flex flex-wrap justify-between items-center gap-3 pt-6 border-t border-slate-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => {
                          if (currentQuestion) {
                            saveAnswer(currentQuestion.id, ''); // Clears response
                          }
                        }}
                        className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-500 cursor-pointer"
                      >
                        Clear Response
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setEngineStep('review')}
                        className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4.5 py-2.5 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        Review Answers
                      </button>

                      {currentQuestionIndex < totalQuestions - 1 ? (
                        <button
                          onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                          className="rounded-xl bg-slate-950 hover:bg-black px-6 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
                        >
                          Save & Next
                        </button>
                      ) : (
                        <button
                          onClick={() => setEngineStep('review')}
                          className="rounded-xl bg-brand-red hover:bg-brand-redhover px-6 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
                        >
                          Review & Submit
                        </button>
                      )}
                    </div>
                  </div>

                </div>

                {/* Sidebar Question Navigator Panel (collapsible/visible on desktop) */}
                <div className="w-full md:w-64 border-l border-slate-200 bg-white p-6 text-left flex flex-col justify-between shrink-0">
                  <div className="space-y-4">
                    <div className="border-b border-slate-100 pb-2">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Question Navigator</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Click index to jump to question</p>
                    </div>

                    {/* Navigator Grid */}
                    <div className="grid grid-cols-5 gap-2">
                      {questions.map((q, idx) => {
                        const isCurrent = idx === currentQuestionIndex;
                        const isAnswered = activeSession?.answers[q.id] !== undefined && activeSession?.answers[q.id] !== '';
                        const isFlagged = flaggedQuestions[q.id];
                        const isVisited = visitedQuestions[q.id];

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIndex(idx)}
                            className={`h-9 w-9 rounded-xl border flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative ${
                              isCurrent ? 'border-brand-red bg-brand-pink/30 text-brand-red font-black ring-1 ring-brand-red' :
                              isAnswered ? 'bg-slate-900 border-slate-900 text-white' :
                              isVisited ? 'bg-slate-50 border-slate-300 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                            {isFlagged && (
                              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-brand-red border border-white" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Autosave Indicators footer */}
                  <div className="border-t border-slate-100 pt-4 mt-6 text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Saved Successfully</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW ANSWERS SUMMARY */}
            {engineStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-4xl mx-auto p-6 sm:p-12 overflow-y-auto text-left space-y-8"
              >
                <div className="space-y-2">
                  <span className="rounded bg-brand-pink px-2.5 py-1 text-[10px] font-black uppercase text-brand-red tracking-wider">
                    Summary Verification
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    Review Your Answers
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Ensure all questions have been addressed. Click any option card to return to editing.
                  </p>
                </div>

                {/* Warnings check block if unanswered */}
                {remainingCount > 0 && (
                  <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 text-xs font-bold text-amber-800 leading-relaxed">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black">Unanswered Questions Detected</p>
                      <p className="font-medium text-amber-700 mt-0.5">
                        You have {remainingCount} questions left unanswered. We highly recommend filling out all diagnostic options to get complete AI reports.
                      </p>
                    </div>
                  </div>
                )}

                {/* Complete Question Grid checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions.map((q, idx) => {
                    const isAnswered = activeSession?.answers[q.id] !== undefined && activeSession?.answers[q.id] !== '';
                    const isFlagged = flaggedQuestions[q.id];
                    return (
                      <button 
                        key={q.id}
                        onClick={() => { setCurrentQuestionIndex(idx); setEngineStep('test'); }}
                        className="w-full text-left rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-350 transition-all flex justify-between items-center cursor-pointer"
                      >
                        <div className="space-y-0.5 truncate max-w-[80%]">
                          <p className="text-[10px] font-black text-slate-400 uppercase">Question {idx + 1}</p>
                          <p className="text-xs font-bold text-slate-900 truncate">{q.prompt}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {isFlagged && <Bookmark className="h-4 w-4 text-brand-red" />}
                          <span className={`rounded-full px-2.5 py-0.5 text-[8px] font-black uppercase ${isAnswered ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-brand-red'}`}>
                            {isAnswered ? 'Answered' : 'Empty'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-150">
                  <button 
                    onClick={() => setEngineStep('test')}
                    className="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                  >
                    Continue Assessment
                  </button>
                  <button 
                    onClick={() => setShowSubmitModal(true)}
                    className="flex-1 py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-md transition-all cursor-pointer text-center font-black uppercase tracking-wider"
                  >
                    Submit Assessment
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: AI PROCESSING SIMULATION */}
            {engineStep === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-md mx-auto p-6 sm:p-12 text-center space-y-8 flex flex-col justify-center items-center my-auto"
              >
                <div className="relative h-24 w-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-brand-red animate-spin" />
                  <Sparkles className="h-10 w-10 text-brand-red animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">Analyzing Your Responses</h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Our AI Career Intelligence Engine is compiling and scoring your personalized diagnostic indices.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                    <span>Compiling Report</span>
                    <span className="text-brand-red">{processingProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-red transition-all duration-150" style={{ width: `${processingProgress}%` }} />
                  </div>
                </div>

                {/* Step List tracking */}
                <div className="w-full text-left space-y-2.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                  {processingSteps.map((stepName, sIdx) => {
                    const isDone = processingStepIndex > sIdx;
                    const isActive = processingStepIndex === sIdx;
                    return (
                      <div key={sIdx} className="flex items-center justify-between">
                        <span className={isDone ? 'text-slate-400 line-through' : (isActive ? 'text-brand-red font-black' : 'text-slate-500')}>{stepName}</span>
                        {isDone ? (
                          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        ) : (
                          isActive && <div className="h-2 w-2 rounded-full bg-brand-red animate-ping" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 7: SUCCESS COMPLETION SCREEN */}
            {engineStep === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg mx-auto p-6 sm:p-12 text-center space-y-8 flex flex-col justify-center items-center my-auto text-slate-800"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce shadow">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Assessment Completed Successfully!</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                    Your responses have been processed. Our AI Career Intelligence Engine has generated your full CareerDNA Report.
                  </p>
                </div>

                {/* Output visual summary metrics mockup */}
                <div className="border border-slate-200 bg-white rounded-3xl p-5 w-full text-left space-y-3 shadow-sm">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Generated Report ID:</span>
                    <span className="text-slate-900 font-black">{finalReport?.id || `rep-${Date.now().toString().slice(-6)}`}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span> Holland RIASEC Traits:</span>
                    <span className="text-brand-red font-black">Investigative & Conventional</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Personality Archetype:</span>
                    <span className="text-slate-900 font-black">INTJ (Logical Architect)</span>
                  </div>
                </div>

                <div className="space-y-3 w-full pt-2">
                  <button 
                    onClick={() => {
                      if (finalReport) {
                        setFinalReport(null);
                        setEngineStep('instructions');
                        setActiveTab('reports');
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-md transition-colors cursor-pointer"
                  >
                    View AI Report
                  </button>
                  <button 
                    onClick={() => {
                      setFinalReport(null);
                      setEngineStep('instructions');
                      setActiveTab('overview');
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Modal Overlay: Submission Confirmation Dialogue */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setShowSubmitModal(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-6 text-left z-10"
            >
              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 tracking-tight leading-tight">Are you sure you want to submit?</h3>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  You are about to submit your diagnostic credentials. You cannot modify your answers once the processing compiles.
                </p>
              </div>

              {/* Assessment stats */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 text-xs font-bold text-slate-700">
                <div className="flex justify-between"><span>Answered Questions:</span> <span className="text-emerald-600">{answeredCount}</span></div>
                <div className="flex justify-between"><span>Remaining Questions:</span> <span className="text-brand-red">{remainingCount}</span></div>
                <div className="flex justify-between"><span>Assessment Category:</span> <span className="text-slate-900">{activeSession?.category}</span></div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Return
                </button>
                <button 
                  onClick={() => {
                    setShowSubmitModal(false);
                    setEngineStep('processing');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-sm cursor-pointer"
                >
                  Submit Final
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // ==================== RENDER: STANDARD STUDENT DASHBOARD ====================
  // =========================================================================
  return (
    <div className={`min-h-screen font-sans flex ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* ==================== LEFT SIDEBAR (Desktop) ==================== */}
      <aside className={`hidden lg:flex flex-col border-r shrink-0 transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-100">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white shadow-sm">
            <BrainCircuit className="h-5.5 w-5.5" />
          </div>
          {sidebarOpen && (
            <span className="font-sans text-base font-black tracking-tight text-slate-950">
              Torque <span className="text-brand-red">Insights</span>
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {[
            { label: 'Dashboard', icon: BarChart2, tab: 'overview' },
            { label: 'My Assessments', icon: FileText, tab: 'overview' },
            { label: 'AI Career Report', icon: Sparkles, tab: 'reports' },
            { label: 'Career Roadmap', icon: Compass, tab: 'roadmap' },
            { label: 'Skill Gap Analysis', icon: TrendingUp, tab: 'overview' },
            { label: 'Learning Resources', icon: BookOpen, tab: 'overview' },
            { label: 'Career Counseling', icon: Calendar, tab: 'counseling' },
            { label: 'Certificates', icon: Award, tab: 'reports' },
            { label: 'Notifications', icon: Bell, tab: 'overview' },
            { label: 'AI Career Coach', icon: MessageSquare, tab: 'coach' },
            { label: 'Profile Settings', icon: Settings, tab: 'overview' },
            { label: 'Help & Support', icon: HelpCircle, tab: 'overview' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.label;
            return (
              <button
                key={item.label}
                onClick={() => {
                  setActiveMenu(item.label);
                  setActiveTab(item.tab as any);
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-brand-red text-white shadow-sm' 
                    : `${darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-brand-red hover:bg-red-50/50 transition-all cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ==================== MAIN WORKSPACE CONTAINER ==================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* ==================== TOP NAVIGATION ==================== */}
        <header className={`h-16 flex items-center justify-between px-6 border-b shrink-0 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative max-w-xs hidden sm:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search assessments or careers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 rounded-full border border-slate-200 pl-9 pr-4 py-1.5 text-xs font-bold focus:outline-none focus:border-brand-red focus:w-64 transition-all bg-slate-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer bg-slate-50"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <div className="relative">
              <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer bg-slate-50">
                <Bell className="h-4.5 w-4.5" />
              </button>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-brand-red" />
            </div>

            <div className="relative">
              <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer bg-slate-50">
                <MessageSquare className="h-4.5 w-4.5" />
              </button>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500" />
            </div>

            <div className="h-px w-6 bg-slate-200 transform rotate-90 hidden sm:block" />

            <div className="flex items-center gap-2 cursor-pointer group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
                alt="Sarah" 
                className="h-8 w-8 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-black text-slate-900 group-hover:text-brand-red transition-colors">{user?.name || "Sarah Jenkins"}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Premium Account</p>
              </div>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </div>
          </div>
        </header>

        {/* ==================== SCROLLABLE MAIN CONTENT ==================== */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* ==================== WELCOME GREETING BANNER ==================== */}
          <div className="rounded-3xl border border-red-150 bg-gradient-to-br from-brand-pink/40 via-white to-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6 text-left relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-0.5 text-[9px] font-black uppercase text-brand-red tracking-wider">
                Good Morning, Sarah!
              </span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
                Welcome back to your Career Intelligence Dashboard
              </h1>
              <p className="text-xs text-slate-500 font-semibold max-w-xl">
                Track your progress, explore AI insights, and continue building your future roadmap.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/assessments')}
              className="shrink-0 rounded-full bg-brand-red px-6 py-3 text-xs font-bold text-white shadow hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-1.5"
            >
              Start Career Diagnostic <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* ==================== STATS ROW (4 CARDS) ==================== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Assessments Completed', val: '2 / 5', trend: 'Next: Aptitude', col: 'text-slate-900', icon: FileText },
              { title: 'Career Match Score', val: '92%', trend: 'Top Fit Match', col: 'text-brand-red', icon: Sparkles },
              { title: 'Leadership Potential', val: '88 / 100', trend: 'Strong Index', col: 'text-slate-900', icon: Star },
              { title: 'Learning Readiness', val: '94%', trend: 'Highly Agile', col: 'text-slate-900', icon: Zap },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.title}</span>
                    <Icon className="h-4.5 w-4.5 text-brand-red" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-black ${stat.col}`}>{stat.val}</h3>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" /> {stat.trend}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Tab Panel switcher templates */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT AREA: Snapshot, Careers list, radar */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Snapshot summary */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-brand-red" />
                      <h3 className="text-base font-black text-slate-900">Your AI Career Snapshot</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('reports')}
                      className="text-xs font-black text-brand-red hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      View Full AI Report <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4 text-xs font-bold text-slate-600">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex items-center justify-between">
                        <span>Primary Career Match:</span>
                        <span className="text-brand-red font-black">Software Product Manager</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex items-center justify-between">
                        <span>Top Personality Traits:</span>
                        <span className="text-slate-900">INTP (Logical Architect)</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex items-center justify-between">
                        <span>Learning Style:</span>
                        <span className="text-slate-900">Visual & Conceptual</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1 text-left">
                        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                          <span>Leadership Score</span>
                          <span className="text-brand-red">88/100</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-red w-[88%]" />
                        </div>
                      </div>

                      <div className="space-y-1 text-left">
                        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                          <span>Career Confidence Index</span>
                          <span className="text-brand-red">92%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-red w-[92%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career matches list grid */}
                <div className="space-y-4 text-left">
                  <h3 className="text-base font-black text-slate-900">Recommended Career Matches</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {recommendedCareers.map((c, i) => (
                      <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-black text-slate-900 truncate max-w-[70%]">{c.name}</h4>
                            <span className="rounded bg-brand-pink px-2 py-0.5 text-[9px] font-black text-brand-red">{c.match}%</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{c.desc}</p>
                        </div>
                        <button onClick={() => alert(`Exploring ${c.name}...`)} className="w-full text-center py-2 rounded-lg border border-slate-200 text-[10px] font-black text-slate-600 hover:border-brand-red hover:text-brand-red transition-all cursor-pointer">
                          Explore Career Path
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Radar chart */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center">
                    <div className="w-full border-b border-slate-100 pb-2 mb-2 flex items-center justify-between text-xs font-black uppercase">
                      <span>Skill Competency Radar</span>
                    </div>
                    <div className="h-56 w-full max-w-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 8, fontWeight: 700 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 7 }} />
                          <Radar name="Current" dataKey="Current" stroke="#C62828" fill="#C62828" fillOpacity={0.15} />
                          <Radar name="Target" dataKey="Target" stroke="#1E293B" fill="#1E293B" fillOpacity={0.05} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="border-b border-slate-100 pb-2 text-xs font-black uppercase">
                      <span>Top Skills to Develop</span>
                    </div>
                    <div className="space-y-2 text-xs font-bold text-slate-700">
                      {['Critical Thinking', 'Communication', 'Leadership', 'AI Literacy', 'Problem Solving'].map((sk) => (
                        <div key={sk} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                          <span>{sk}</span>
                          <span className="text-[10px] text-brand-red font-black">Development Target</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT UTILITY AREA: progress checklists */}
              <div className="lg:col-span-4 space-y-8">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 flex items-center justify-center rounded-full bg-brand-pink text-brand-red font-black text-xs">
                      72%
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">Profile Progress</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">2 steps remaining</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-2"><Check className="h-4.5 w-4.5 text-emerald-600" /> <span className="line-through text-slate-400">Profile Completed</span></div>
                    <div className="flex items-center gap-2"><Check className="h-4.5 w-4.5 text-emerald-600" /> <span className="line-through text-slate-400">Assessment Started</span></div>
                    <div className="flex items-center gap-2"><Check className="h-4.5 w-4.5 text-emerald-600" /> <span className="line-through text-slate-400">AI Report Generated</span></div>
                    <div className="flex items-center gap-2"><div className="h-4.5 w-4.5 rounded-full border border-slate-300" /> <span>Career Counseling Booked</span></div>
                    <div className="flex items-center gap-2"><div className="h-4.5 w-4.5 rounded-full border border-slate-300" /> <span>Career Roadmap Completed</span></div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-3.5">
                  <div className="border-b border-slate-100 pb-2 text-xs font-black uppercase">
                    <span>Daily Insights</span>
                  </div>
                  <div className="space-y-2 text-xs font-semibold text-slate-500">
                    <p><strong>Tip:</strong> Keep building your portfolios with practical projects.</p>
                    <p><strong>Quote:</strong> "The best way to predict the future is to create it." — Abraham Lincoln</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS TAB VIEW */}
          {activeTab === 'reports' && (
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl text-left space-y-6">
              <div className="border-b border-slate-150 pb-4">
                <h3 className="text-xl font-black text-slate-900 leading-none">Your AI Diagnostics Reports</h3>
                <p className="text-xs text-slate-400 font-bold uppercase mt-1">Official CareerDNA Certificates</p>
              </div>

              {/* Mock Reports List */}
              <div className="divide-y divide-slate-100">
                {[
                  { title: 'High School Career Aptitude Test', date: 'July 29th, 2026', code: 'ast-aptitude', status: 'Completed' },
                  { title: '16-Personality Archetype Map', date: 'July 28th, 2026', code: 'ast-personality', status: 'Completed' },
                ].map((rep, idx) => (
                  <div key={idx} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                    <div>
                      <h4 className="text-xs font-black text-slate-950">{rep.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">{rep.date} · Code: {rep.code}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Opening PDF certificate report download for ${rep.code}...`)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black text-brand-red transition-all cursor-pointer"
                    >
                      Download Report PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROADMAP TAB VIEW */}
          {activeTab === 'roadmap' && (
            <div className="space-y-8">
              
              {/* ==================== ROADMAP HEADER ==================== */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1.5">
                  <span className="rounded bg-brand-pink px-2.5 py-1 text-[10px] font-black uppercase text-brand-red tracking-wider">
                    Interactive Plan
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-none">Personalized Career Roadmap</h3>
                  <p className="text-xs text-slate-500 font-semibold uppercase mt-1">
                    Candidate: {studentName} | Target Career: <span className="text-brand-red font-black">{targetCareer}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button 
                    onClick={() => alert("Downloading printable roadmap syllabus PDF...")}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    <Download className="h-4 w-4" /> Download Roadmap
                  </button>
                  <button 
                    onClick={() => alert("Directing to counselor booking form...")}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 text-brand-red" /> Book Counseling
                  </button>
                  <button 
                    onClick={() => {
                      const updated = prompt("Enter your target dream career:", targetCareer);
                      if (updated) setTargetCareer(updated);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 hover:bg-black px-4.5 py-2 text-xs font-bold text-white shadow cursor-pointer"
                  >
                    Update Career Goal
                  </button>
                </div>
              </div>

              {/* Grid: 12-Section Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Main Roadmap Workspace (Left Column) */}
                <div className="lg:col-span-8 space-y-8">
                  
                  {/* SECTION 1: CAREER DESTINATION */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-4">
                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-1">
                        <Target className="h-4.5 w-4.5 text-brand-red" /> Career Destination Profile
                      </h4>
                      <span className="rounded-full bg-brand-pink px-2.5 py-0.5 text-[9px] font-black text-brand-red">
                        AI Match Confidence: 94%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-500">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Dream Career</p>
                        <p className="text-sm font-black text-slate-900">{targetCareer}</p>
                        <p className="text-[9px] text-emerald-600 font-bold uppercase">Trending High</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Alternative Targets</p>
                        <p className="text-slate-900 font-bold">Consulting Strategist, UX Lead</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">88% match indices</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Avg Salary potential</p>
                        <p className="text-slate-900 font-bold">₹12L - ₹18L per annum</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Entry level benchmark</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      <strong>AI Fit analysis:</strong> The system identified {targetCareer} as your top recommendation based on your high logical assessment marks, RIASECConventional preferences, and strong systems design affinity.
                    </p>
                  </div>

                  {/* SECTION 2: ROADMAP TIMELINE */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-6">
                    <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Interactive Pathway Milestones</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">68% Complete</span>
                    </div>

                    {/* Timeline steps */}
                    <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-2 text-left">
                      {[
                        { num: 1, title: 'Complete Assessment Diagnostic', dur: 'Done', priority: 'High', status: 'Completed', action: 'Download score certificate' },
                        { num: 2, title: 'Review AI Career Intelligence Report', dur: 'Done', priority: 'High', status: 'Completed', action: 'Verify primary career choice' },
                        { num: 3, title: 'Develop Core Technical Skills', dur: '1 Month', priority: 'Critical', status: 'In Progress', action: 'Enroll in AI Fundamentals course' },
                        { num: 4, title: 'Complete Recommended Courses Syllabus', dur: '3 Months', priority: 'Medium', status: 'Pending', action: 'Resume communication program' },
                        { num: 5, title: 'Earn Industry Credentials & Certifications', dur: '4 Months', priority: 'High', status: 'Pending', action: 'Mock Google Data cert test' },
                        { num: 6, title: 'Build Sandbox Portfolio Projects', dur: '2 Months', priority: 'High', status: 'Pending', action: 'Initialize github page mockups' },
                        { num: 7, title: 'Mock Technical & Behavioral Interviews', dur: '1 Month', priority: 'Medium', status: 'Pending', action: 'Schedule slot with Dr. Sunita' },
                        { num: 8, title: 'Submit Placements Portfolio Logs', dur: 'Upcoming', priority: 'Critical', status: 'Pending', action: 'Export verified report links' },
                      ].map((mile, mIdx) => (
                        <div key={mIdx} className="relative pl-7">
                          <div className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 bg-white flex items-center justify-center ${
                            mile.status === 'Completed' ? 'border-emerald-600' :
                            mile.status === 'In Progress' ? 'border-brand-red animate-pulse' : 'border-slate-350'
                          }`}>
                            {mile.status === 'Completed' && <div className="h-2 w-2 rounded-full bg-emerald-600" />}
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Milestone {mile.num} ({mile.dur})</span>
                                <h5 className="text-xs font-black text-slate-900">{mile.title}</h5>
                              </div>
                              <span className={`rounded-full px-2.5 py-0.5 text-[8px] font-black uppercase shrink-0 ${
                                mile.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                mile.status === 'In Progress' ? 'bg-red-50 text-brand-red border border-red-100' : 'bg-slate-50 text-slate-500 border border-slate-200'
                              }`}>{mile.status}</span>
                            </div>

                            <p className="text-[11px] text-slate-500 font-semibold">Suggested next step: <button onClick={() => alert(`Starting action: ${mile.action}`)} className="text-brand-red hover:underline font-black cursor-pointer">{mile.action}</button></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: SKILL DEVELOPMENT PLAN */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-5">
                    <div className="border-b border-slate-100 pb-3">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Skill Competency Tracks</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                      {[
                        { name: 'AI & Data Analysis (AI Skill)', cur: 50, target: 80, dur: '30 hours', priority: 'High', res: 'Generative AI basics, Pandas SQL logs' },
                        { name: 'Public Speaking (Soft Skill)', cur: 70, target: 90, dur: '12 hours', priority: 'Medium', res: 'Brief decks presenting methods' },
                        { name: 'Systems Architecture (Technical)', cur: 60, target: 85, dur: '45 hours', priority: 'High', res: 'UML class diagnostics structures' },
                        { name: 'Agile Operations (Leadership)', cur: 75, target: 95, dur: '20 hours', priority: 'Critical', res: 'JIRA ticket roadmap management' },
                      ].map((skill, skIdx) => (
                        <div key={skIdx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl space-y-3.5">
                          <div className="flex justify-between items-start gap-3">
                            <h5 className="text-xs font-black text-slate-950 truncate">{skill.name}</h5>
                            <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase ${
                              skill.priority === 'Critical' ? 'bg-red-50 text-brand-red' : 'bg-slate-200 text-slate-700'
                            }`}>{skill.priority}</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span>Level: {skill.cur}%</span>
                              <span>Target: {skill.target}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden relative">
                              <div className="absolute left-0 top-0 h-full bg-slate-400" style={{ width: `${skill.cur}%` }} />
                              <div className="absolute left-0 top-0 h-full bg-brand-red opacity-80" style={{ width: `${skill.target}%` }} />
                            </div>
                          </div>

                          <div className="text-[10px] text-slate-500 font-semibold space-y-0.5">
                            <p><strong>Est Duration:</strong> {skill.dur}</p>
                            <p><strong>Resource:</strong> {skill.res}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 4: LEARNING PATH (4 Courses) */}
                  <div className="space-y-4 text-left">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Recommended Learning Paths</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Generative AI & LLM Fundamentals', dur: '12 Hours', difficulty: 'Beginner', progress: 75 },
                        { title: 'Communication Skills for Tech Leaders', dur: '8 Hours', difficulty: 'Medium', progress: 40 },
                        { title: 'Agile Product Management Mastery', dur: '25 Hours', difficulty: 'Advanced', progress: 0 },
                        { title: 'Interactive Resume & Resume Builder', dur: '4 Hours', difficulty: 'Beginner', progress: 90 },
                      ].map((course, cIdx) => (
                        <div key={cIdx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{course.difficulty} · Duration: {course.dur}</span>
                            <h5 className="text-xs font-black text-slate-900">{course.title}</h5>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-slate-400">
                                <span>Progress</span>
                                <span className="text-brand-red font-black">{course.progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-red transition-all" style={{ width: `${course.progress}%` }} />
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => alert(`Redirecting to interactive canvas module viewer for ${course.title}...`)}
                            className="w-full text-center py-2.5 rounded-xl border border-slate-200 hover:border-brand-red hover:bg-brand-pink/20 hover:text-brand-red text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                          >
                            Continue Learning
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 5: CERTIFICATION RECOMMENDATIONS */}
                  <div className="space-y-4 text-left">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Recommended Credentials & Certifications</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {[
                        { title: 'AWS Cloud Practitioner', provider: 'Amazon Web Services', difficulty: 'Medium', time: '40 Hours', impact: 'Very High' },
                        { title: 'Google Data Analytics Cert', provider: 'Google Career Certs', difficulty: 'Medium', time: '60 Hours', impact: 'High' },
                        { title: 'Certified Scrum Master (CSM)', provider: 'Scrum Alliance', difficulty: 'Hard', time: '16 Hours', impact: 'Critical' },
                      ].map((cert, certIdx) => (
                        <div key={certIdx} className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-brand-red uppercase tracking-wider block">{cert.provider}</span>
                            <h5 className="text-xs font-black text-slate-950 leading-tight">{cert.title}</h5>
                            
                            <div className="h-px bg-slate-100 my-1" />
                            
                            <div className="text-[10px] font-semibold text-slate-500 space-y-1">
                              <p><strong>Difficulty:</strong> {cert.difficulty}</p>
                              <p><strong>Time Target:</strong> {cert.time}</p>
                              <p><strong>Impact Level:</strong> {cert.impact}</p>
                            </div>
                          </div>

                          <button 
                            onClick={() => alert(`Directing to credentials application workflow for ${cert.title}...`)}
                            className="w-full text-center py-2 rounded-lg bg-slate-950 hover:bg-black text-[10px] font-black text-white cursor-pointer"
                          >
                            Enroll Course
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 6: PROJECT BUILDER */}
                  <div className="space-y-4 text-left">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Suggested Sandbox Portfolio Projects</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {[
                        { name: 'Interactive Portfolio Website', diff: 'Easy', time: '8 Hours', value: 'Critical', skills: 'HTML, CSS, React, deployment' },
                        { name: 'Data Insights Analytics Dashboard', diff: 'Medium', time: '20 Hours', value: 'High', skills: 'Python, SQL, Recharts graphs' },
                        { name: 'Agile Product Requirement (PRD)', diff: 'Medium', time: '15 Hours', value: 'Very High', skills: 'Figma, Notion, Roadmap logs' },
                      ].map((proj, pIdx) => (
                        <div key={pIdx} className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start gap-2">
                              <h5 className="text-xs font-black text-slate-950 leading-tight">{proj.name}</h5>
                              <span className="rounded bg-brand-pink px-2 py-0.5 text-[8px] font-black text-brand-red shrink-0">{proj.value}</span>
                            </div>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">Difficulty: {proj.diff} · Duration: {proj.time}</p>
                            
                            <div className="h-px bg-slate-100 my-1" />
                            <p className="text-[10px] text-slate-500 font-semibold"><strong>Skills covered:</strong> {proj.skills}</p>
                          </div>

                          <button 
                            onClick={() => alert(`Opening template instructions for ${proj.name}...`)}
                            className="w-full text-center py-2 rounded-lg border border-slate-200 hover:border-brand-red text-[10px] font-black text-slate-650 cursor-pointer"
                          >
                            View Blueprint
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 7: CAREER READINESS DASHBOARD */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Career Readiness Audit Indices</h4>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      {[
                        { title: 'Resume Readiness', score: 85 },
                        { title: 'Interview Readiness', score: 70 },
                        { title: 'Technical Readiness', score: 78 },
                        { title: 'Communication Readiness', score: 92 },
                      ].map((ready, rIdx) => (
                        <div key={rIdx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col items-center">
                          <div className="relative h-14 w-14 mb-2">
                            <svg className="h-full w-full transform -rotate-90">
                              <circle cx="28" cy="28" r="24" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                              <circle cx="28" cy="28" r="24" fill="transparent" stroke="#C62828" strokeWidth="4" strokeDasharray="150" strokeDashoffset={150 - (150 * ready.score) / 100} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-900">
                              {ready.score}%
                            </div>
                          </div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block leading-tight">{ready.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 8: SMART GOALS */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-4">
                    <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Your Interactive Smart Goals</h4>
                      <button 
                        onClick={() => setShowGoalModal(true)}
                        className="text-xs font-black text-brand-red hover:underline cursor-pointer"
                      >
                        + Add Goal
                      </button>
                    </div>

                    <div className="space-y-2.5 text-xs font-bold text-slate-700">
                      {smartGoals.map((goal) => (
                        <div key={goal.id} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <input 
                              type="checkbox" 
                              checked={goal.status === 'Completed'}
                              onChange={() => {
                                setSmartGoals(smartGoals.map(g => g.id === goal.id ? { 
                                  ...g, 
                                  status: g.status === 'Completed' ? 'In Progress' : 'Completed',
                                  progress: g.status === 'Completed' ? 50 : 100 
                                } : g));
                              }}
                              className="h-4 w-4 border-slate-300 text-brand-red focus:ring-brand-red rounded cursor-pointer"
                            />
                            <div>
                              <p className={`text-slate-900 ${goal.status === 'Completed' ? 'line-through text-slate-400' : 'font-black'}`}>{goal.title}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Target: {goal.date} · Priority: {goal.priority}</p>
                            </div>
                          </div>

                          <div className="w-full sm:w-32 space-y-1">
                            <div className="flex justify-between text-[9px] text-slate-400 uppercase">
                              <span>Progress</span>
                              <span className="text-brand-red font-black">{goal.progress}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={goal.progress}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setSmartGoals(smartGoals.map(g => g.id === goal.id ? { 
                                  ...g, 
                                  progress: val,
                                  status: val === 100 ? 'Completed' : 'In Progress'
                                } : g));
                              }}
                              className="w-full accent-brand-red h-1 rounded-full cursor-pointer bg-slate-200"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 9: AI NEXT STEPS */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-4">
                    <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-brand-red" />
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">AI Next Step Bullet Audits</h4>
                    </div>

                    <ul className="space-y-3.5 text-xs font-bold text-slate-600">
                      {[
                        { action: 'Improve analytical systems thinking.', detail: 'Practice reading mock software PRDs on tech blogs.' },
                        { action: 'Strengthen collaborative public speaking.', detail: 'Tackle scenario questions in the Assessments catalog.' },
                        { action: 'Earn AWS Practitioner certification.', detail: 'Allocate 2 hours of study time daily using the plan planner.' },
                        { action: 'Engage with mock interviews early.', detail: 'Book virtual advisory review slot with Dr. Sunita.' },
                      ].map((step, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-slate-950 font-black">{step.action}</p>
                            <p className="text-slate-500 font-semibold mt-0.5">{step.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SECTION 10: ACHIEVEMENTS */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-4">
                    <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                      <Medal className="h-5 w-5 text-brand-red" />
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Your Achievement Badges</h4>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      {[
                        { title: 'Career Explorer', icon: '🧭', unlock: 'Unlocked', col: 'bg-emerald-50 text-emerald-700' },
                        { title: 'Skill Builder', icon: '🧠', unlock: 'Unlocked', col: 'bg-emerald-50 text-emerald-700' },
                        { title: 'AI Learner', icon: '🤖', unlock: 'Locked', col: 'bg-slate-50 text-slate-400' },
                        { title: 'Certification Ready', icon: '📄', unlock: 'Locked', col: 'bg-slate-50 text-slate-400' },
                      ].map((badge, idx) => (
                        <div key={idx} className={`border border-slate-200 p-4.5 rounded-2xl ${badge.col} space-y-2`}>
                          <span className="text-2xl block">{badge.icon}</span>
                          <p className="text-xs font-black leading-tight">{badge.title}</p>
                          <span className="text-[9px] font-bold uppercase tracking-wider block">{badge.unlock}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 11: CALENDAR & PLANNER */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left space-y-4">
                    <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-1">
                        <CalendarDays className="h-4.5 w-4.5 text-brand-red" /> Monthly Learning Planner
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">August 2026</span>
                    </div>

                    {/* Simple calendar layout */}
                    <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold text-slate-500">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} className="py-1 font-black text-slate-400">{d}</div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => {
                        const day = i + 1;
                        const hasEvent = day === 5 || day === 12 || day === 18;
                        return (
                          <div 
                            key={i} 
                            className={`py-2 border border-slate-150 rounded-lg relative ${
                              hasEvent ? 'bg-brand-pink/30 border-brand-red text-brand-red font-black' : 'bg-slate-50'
                            }`}
                          >
                            <span>{day}</span>
                            {hasEvent && (
                              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full bg-brand-red" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="text-[10px] font-semibold text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                      <p>📅 <strong>Aug 5th:</strong> Goal deadline - Complete React website draft</p>
                      <p>📅 <strong>Aug 12th:</strong> Goal deadline - Complete AI fundamentals course</p>
                      <p>📅 <strong>Aug 18th:</strong> Counseling advisory slot scheduled with Sunita</p>
                    </div>
                  </div>

                  {/* SECTION 12: ACTION CENTER */}
                  <div className="rounded-3xl bg-[#1E293B] text-white p-6 shadow-md text-center space-y-4">
                    <h5 className="text-base font-black tracking-tight leading-none">Complete Actions Workspace</h5>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold max-w-md mx-auto">
                      Share your milestone progress on social media feeds, modify career parameters, or export roadmap PDFs.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button 
                        onClick={() => alert("Roadmap PDF export initialized...")}
                        className="rounded-xl bg-brand-red px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-redhover transition-colors cursor-pointer"
                      >
                        Download Syllabus
                      </button>
                      <button 
                        onClick={() => alert("Successfully copied sharing link to clipboard!")}
                        className="rounded-xl bg-[#334155] hover:bg-[#475569] border border-slate-650 px-6 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
                      >
                        Share Progress
                      </button>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN SIDEBAR */}
                <div className="lg:col-span-4 space-y-8 text-left">
                  
                  {/* Today Recommendation */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                    <span className="text-[9px] font-black text-brand-red uppercase tracking-wider block">Today's Recommendation</span>
                    <h5 className="text-xs font-black text-slate-900">Complete AI Section 4</h5>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      You are at 75% progress on your AI fundamentals course. Complete the remaining 2 questions to unlock the achievement.
                    </p>
                    <button 
                      onClick={() => alert("Loading AI Section 4...")}
                      className="w-full text-center py-2 rounded-xl bg-brand-red hover:bg-brand-redhover text-[10px] font-black text-white transition-colors cursor-pointer"
                    >
                      Start Learning
                    </button>
                  </div>

                  {/* Learning Streak */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-red-50 rounded-xl flex items-center justify-center text-brand-red border border-red-100">
                        <Flame className="h-5.5 w-5.5 text-brand-red fill-brand-red animate-pulse" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-900">{learningStreak} Day learning Streak</h5>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Keep the fire burning!</p>
                      </div>
                    </div>
                  </div>

                  {/* Weekly Progress */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3.5">
                    <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Weekly Action Summary</h5>
                    
                    <div className="space-y-3.5 text-xs font-bold text-slate-700">
                      <div className="flex justify-between"><span>Active Hours:</span> <span className="text-slate-900 font-black">4.5h / 6h Target</span></div>
                      <div className="flex justify-between"><span>Lessons completed:</span> <span className="text-slate-900 font-black">6 of 8</span></div>
                      <div className="flex justify-between"><span>Project commits:</span> <span className="text-slate-900 font-black">2 of 3</span></div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Smart Goal Addition Modal */}
              {showGoalModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setShowGoalModal(false)} />
                  <div className="relative w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-6 text-left z-10">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Add Roadmap Goal</h4>
                      <button onClick={() => setShowGoalModal(false)} className="text-slate-400 cursor-pointer"><X className="h-4 w-4" /></button>
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const title = formData.get('title') as string;
                        const date = formData.get('date') as string;
                        const priority = formData.get('priority') as string;
                        
                        setSmartGoals([...smartGoals, {
                          id: Date.now(),
                          title,
                          date: date || 'Aug 30, 2026',
                          priority: priority || 'Medium',
                          progress: 0,
                          status: 'Not Started'
                        }]);
                        setShowGoalModal(false);
                      }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-400 uppercase">Goal Title</label>
                        <input name="title" required type="text" placeholder="e.g. Complete AWS practice quiz" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold bg-slate-50 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-400 uppercase">Target Date</label>
                        <input name="date" type="text" placeholder="e.g. Aug 28, 2026" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold bg-slate-50 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-400 uppercase">Priority</label>
                        <select name="priority" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold bg-slate-50 focus:outline-none">
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-brand-red hover:bg-brand-redhover rounded-xl text-xs font-bold text-white shadow cursor-pointer">
                        Add to Roadmap
                      </button>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* COUNSELING TAB VIEW */}
          {activeTab === 'counseling' && (
            <div className="space-y-8 text-left">
              
              {/* ==================== SCREEN 1: COUNSELING HOME ==================== */}
              {counselingStep === 'home' && (
                <div className="space-y-6">
                  {/* Header summary */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                      <span className="rounded bg-brand-pink px-2.5 py-1 text-[10px] font-black uppercase text-brand-red tracking-wider">
                        Virtual Advisory Portal
                      </span>
                      <h3 className="text-xl font-black text-slate-900 leading-none">Career Counseling Hub</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">
                        Connect with certified experts and receive personalized guidance based on your AI Career reports.
                      </p>
                    </div>

                    <button 
                      onClick={() => setCounselingStep('browse')}
                      className="shrink-0 rounded-xl bg-brand-red hover:bg-brand-redhover px-6 py-3 text-xs font-bold text-white shadow cursor-pointer uppercase tracking-wider"
                    >
                      Book Counseling Session
                    </button>
                  </div>

                  {/* Quick stats row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: 'Upcoming Sessions', val: counselingBookings.filter(b => b.status === 'Upcoming').length, trend: 'Confirmed Slot', col: 'text-slate-900', icon: Calendar },
                      { title: 'Past Sessions', val: counselingBookings.filter(b => b.status === 'Completed').length, trend: 'Completed Index', col: 'text-slate-900', icon: Award },
                      { title: 'Available Advisors', val: '3 Certified', trend: 'Online Ready', col: 'text-slate-900', icon: ShieldCheck },
                      { title: 'Primary Recommended', val: 'Dr. Sunita Mehta', trend: 'RIASEC Specialist', col: 'text-brand-red', icon: Sparkles },
                    ].map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm text-left flex flex-col justify-between">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">{stat.title}</span>
                          <div>
                            <h3 className={`text-base font-black ${stat.col}`}>{stat.val}</h3>
                            <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-500" /> {stat.trend}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Upcoming & History Bookings section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Main list of appointments */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Active Counseling Calendar</h4>
                        <button 
                          onClick={() => setCounselingStep('appointments')}
                          className="text-xs font-black text-brand-red hover:underline cursor-pointer"
                        >
                          View All Appointments
                        </button>
                      </div>

                      {counselingBookings.filter(b => b.status === 'Upcoming').length === 0 ? (
                        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-400 text-xs font-bold">
                          No upcoming sessions booked. Click "Book Counseling Session" to start.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {counselingBookings
                            .filter(b => b.status === 'Upcoming')
                            .map((booking) => (
                              <div key={booking.id} className="rounded-2xl border border-slate-255 bg-white p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-red transition-all">
                                <div className="space-y-1">
                                  <span className="text-[9px] font-black text-brand-red uppercase tracking-wider block">ID: {booking.id} · {booking.type} Session</span>
                                  <h5 className="text-xs font-black text-slate-950">{booking.counselorName}</h5>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Date: {booking.date} · Time: {booking.time} · Mode: {booking.mode}</p>
                                </div>
                                
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => setCounselingStep('join')}
                                    className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2 text-xs font-bold text-white shadow-sm cursor-pointer"
                                  >
                                    Join Session
                                  </button>
                                  <button 
                                    onClick={() => {
                                      if (window.confirm("Cancel this booking?")) {
                                        setCounselingBookings(counselingBookings.map(b => b.id === booking.id ? { ...b, status: 'Cancelled' } : b));
                                      }
                                    }}
                                    className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500 cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Right sidebar quick tips */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Quick tip</span>
                        <h5 className="text-xs font-black text-slate-900">Prepare your AI report briefs</h5>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          Certified mentors use your generated diagnostics match scores and RIASEC profile interests to construct target learning paths. Make sure your latest report is verified!
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ==================== SCREEN 2: BROWSE COUNSELORS ==================== */}
              {counselingStep === 'browse' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Certified Advisors Discovery</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Filter by experience or specialties</p>
                    </div>
                    <button 
                      onClick={() => setCounselingStep('home')}
                      className="text-xs font-black text-brand-red hover:underline cursor-pointer"
                    >
                      Back
                    </button>
                  </div>

                  {/* Filters block */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm flex flex-wrap gap-4 text-xs font-bold text-slate-700">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-black text-slate-400 uppercase">Specialization</label>
                      <select 
                        value={filterSpecialty} 
                        onChange={(e) => setFilterSpecialty(e.target.value)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 focus:outline-none"
                      >
                        <option value="All">All Specializations</option>
                        <option value="Career Planning">Career Planning</option>
                        <option value="Study Abroad">Study Abroad</option>
                        <option value="Interview Preparation">Interview Prep</option>
                        <option value="Corporate Career Growth">Corporate Growth</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-black text-slate-400 uppercase">Language</label>
                      <select 
                        value={filterLanguage} 
                        onChange={(e) => setFilterLanguage(e.target.value)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 focus:outline-none"
                      >
                        <option value="All">All Languages</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Telugu">Telugu</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-black text-slate-400 uppercase">Session Mode</label>
                      <select 
                        value={filterMode} 
                        onChange={(e) => setFilterMode(e.target.value)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 focus:outline-none"
                      >
                        <option value="All">All Modes</option>
                        <option value="Online">Online</option>
                        <option value="In Person">In Person</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  {/* Counselors Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { id: 'c-1', name: 'Dr. Sunita Mehta', title: 'Senior Career Advisor & Psychologist', exp: 15, specialty: 'Career Planning', lang: 'English, Hindi', rating: 4.9, status: 'Online', mode: 'Hybrid', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120' },
                      { id: 'c-2', name: 'Dr. Rajesh Malhotra', title: 'Corporate Career Advisor & Executive Coach', exp: 12, specialty: 'Corporate Career Growth', lang: 'English', rating: 4.8, status: 'Online', mode: 'Online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120' },
                      { id: 'c-3', name: 'Anjali Rao', title: 'Study Abroad Placement Mentor', exp: 8, specialty: 'Study Abroad', lang: 'English, Telugu', rating: 4.7, status: 'Offline', mode: 'Online', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120' }
                    ]
                    .filter(c => filterSpecialty === 'All' || c.specialty === filterSpecialty)
                    .filter(c => filterLanguage === 'All' || c.lang.includes(filterLanguage))
                    .filter(c => filterMode === 'All' || c.mode === filterMode)
                    .map((counselor) => (
                      <div key={counselor.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex gap-3 items-center">
                            <img src={counselor.avatar} alt={counselor.name} className="h-12 w-12 rounded-full object-cover border border-slate-200" />
                            <div>
                              <h5 className="text-xs font-black text-slate-900">{counselor.name}</h5>
                              <p className="text-[9px] text-slate-400 font-bold uppercase">{counselor.title}</p>
                            </div>
                          </div>

                          <div className="h-px bg-slate-100" />

                          <div className="text-[10px] font-semibold text-slate-500 space-y-1">
                            <p><strong>Experience:</strong> {counselor.exp} Years</p>
                            <p><strong>Specialty:</strong> {counselor.specialty}</p>
                            <p><strong>Languages:</strong> {counselor.lang}</p>
                            <p><strong>Status:</strong> <span className={counselor.status === 'Online' ? 'text-emerald-600 font-black' : 'text-slate-400'}>{counselor.status}</span></p>
                            <p><strong>Mode:</strong> {counselor.mode}</p>
                            <p><strong>Rating:</strong> ★ {counselor.rating}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setSelectedCounselor(counselor); setCounselingStep('profile'); }}
                            className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black text-slate-700 transition-all cursor-pointer"
                          >
                            View Profile
                          </button>
                          <button 
                            onClick={() => { setSelectedCounselor(counselor); setWizardStep(1); setCounselingStep('wizard'); }}
                            className="flex-1 text-center py-2.5 rounded-xl bg-brand-red hover:bg-brand-redhover text-[10px] font-black text-white shadow-sm transition-all cursor-pointer"
                          >
                            Book Session
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== SCREEN 3: COUNSELOR PROFILE ==================== */}
              {counselingStep === 'profile' && selectedCounselor && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-150 pb-3">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Mentor Biography Profile</h4>
                    <button 
                      onClick={() => setCounselingStep('browse')}
                      className="text-xs font-black text-brand-red hover:underline cursor-pointer"
                    >
                      Back
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Photo & metrics column */}
                    <div className="space-y-4 flex flex-col items-center text-center">
                      <img src={selectedCounselor.avatar} alt={selectedCounselor.name} className="h-32 w-32 rounded-3xl object-cover border border-slate-250" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-900">{selectedCounselor.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{selectedCounselor.title}</p>
                      </div>
                      
                      <div className="w-full bg-slate-50 p-4.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 space-y-1.5 text-left">
                        <p><strong>Total Sessions:</strong> 120+</p>
                        <p><strong>Client Rating:</strong> ★ {selectedCounselor.rating}</p>
                        <p><strong>Language:</strong> {selectedCounselor.lang}</p>
                      </div>
                    </div>

                    {/* Biography & expertise column */}
                    <div className="md:col-span-2 space-y-5 text-xs font-semibold text-slate-500 leading-relaxed text-left">
                      <div>
                        <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-wider mb-2">About Advisor</h5>
                        <p>
                          Dr. {selectedCounselor.name.split(' ').slice(-1)} is a certified career diagnostic advisor with over {selectedCounselor.exp} years of practice. She specializes in NEP-compliant streams advisory mapping, career transitions, and cognitive counseling strategies for MBA and post-graduates.
                        </p>
                      </div>

                      <div>
                        <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-wider mb-2">Areas of Expertise</h5>
                        <div className="flex flex-wrap gap-1.5 text-[9px] font-black uppercase">
                          {['Psychometric Interpretation', 'MBA Prep', 'University Selection', 'Career Mapping'].map((area) => (
                            <span key={area} className="bg-slate-105 border border-slate-200 text-slate-650 rounded-full px-3 py-1">{area}</span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-150 flex gap-4">
                        <button 
                          onClick={() => { setWizardStep(1); setCounselingStep('wizard'); }}
                          className="flex-1 py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow transition-all cursor-pointer text-center font-black uppercase tracking-wider"
                        >
                          Choose Slot & Book
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ==================== SCREEN 4: BOOKING APPOINTMENT WIZARD ==================== */}
              {counselingStep === 'wizard' && selectedCounselor && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-150 pb-3">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Book Appointment Stepper</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Step {wizardStep} of 5</p>
                    </div>
                    <button 
                      onClick={() => setCounselingStep('browse')}
                      className="text-xs font-black text-brand-red hover:underline cursor-pointer"
                    >
                      Cancel Wizard
                    </button>
                  </div>

                  {/* Stepper Progress bar */}
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-red transition-all duration-300" style={{ width: `${(wizardStep / 5) * 100}%` }} />
                  </div>

                  {/* STEP 1: Session Type */}
                  {wizardStep === 1 && (
                    <div className="space-y-4">
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Choose Session Type</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {['Individual', 'Parent + Student', 'Institution', 'Corporate'].map((t) => (
                          <button
                            key={t}
                            onClick={() => { setBookingType(t); setWizardStep(2); }}
                            className={`p-5 rounded-2xl border text-xs font-black uppercase transition-all flex flex-col justify-between items-start text-left cursor-pointer ${
                              bookingType === t ? 'border-brand-red bg-brand-pink/20 text-brand-red' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{t}</span>
                            <span className="text-[9px] text-slate-450 font-normal mt-1 leading-normal uppercase">Personalized consultative advisory format.</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Mode selection */}
                  {wizardStep === 2 && (
                    <div className="space-y-4">
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Choose Meeting Mode</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['Online Video Call', 'Phone Call', 'In Person'].map((m) => (
                          <button
                            key={m}
                            onClick={() => { setBookingMode(m); setWizardStep(3); }}
                            className={`p-5 rounded-2xl border text-xs font-black uppercase transition-all cursor-pointer ${
                              bookingMode === m ? 'border-brand-red bg-brand-pink/20 text-brand-red' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Date selection */}
                  {wizardStep === 3 && (
                    <div className="space-y-4">
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Select Available Date</h5>
                      
                      <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold text-slate-500 max-w-sm mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, idx) => (
                          <div key={idx} className="py-1 font-black text-slate-400">{d}</div>
                        ))}
                        {Array.from({ length: 15 }, (_, i) => {
                          const dayNum = i + 1;
                          const dateString = `2026-08-${dayNum.toString().padStart(2, '0')}`;
                          const isSel = bookingDate === dateString;
                          return (
                            <button
                              key={i}
                              onClick={() => { setBookingDate(dateString); setWizardStep(4); }}
                              className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                isSel ? 'bg-brand-red text-white font-black' : 'bg-white hover:bg-slate-100 border border-slate-150'
                              }`}
                            >
                              {dayNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Time Slot selection */}
                  {wizardStep === 4 && (
                    <div className="space-y-4">
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Choose Time Slot</h5>
                      <div className="space-y-4">
                        <div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Morning Slots</span>
                          <div className="flex gap-2">
                            {['10:00 AM', '11:30 AM'].map((t) => (
                              <button key={t} onClick={() => { setBookingTime(t); setWizardStep(5); }} className={`px-4 py-2 border rounded-xl text-xs font-bold cursor-pointer ${bookingTime === t ? 'border-brand-red bg-brand-pink/20 text-brand-red' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>{t}</button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Afternoon Slots</span>
                          <div className="flex gap-2">
                            {['02:00 PM', '03:30 PM'].map((t) => (
                              <button key={t} onClick={() => { setBookingTime(t); setWizardStep(5); }} className={`px-4 py-2 border rounded-xl text-xs font-bold cursor-pointer ${bookingTime === t ? 'border-brand-red bg-brand-pink/20 text-brand-red' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>{t}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Booking Summary review */}
                  {wizardStep === 5 && (
                    <div className="space-y-6">
                      <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Verify Booking Parameters</h5>
                      
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs font-bold text-slate-700 space-y-3">
                        <div className="flex justify-between"><span>Mentor Name:</span> <span className="text-slate-900 font-black">{selectedCounselor.name}</span></div>
                        <div className="flex justify-between"><span>Session Type:</span> <span className="text-slate-900 font-black">{bookingType}</span></div>
                        <div className="flex justify-between"><span>Meeting Mode:</span> <span className="text-slate-900 font-black">{bookingMode}</span></div>
                        <div className="flex justify-between"><span>Date Selected:</span> <span className="text-brand-red font-black">{bookingDate}</span></div>
                        <div className="flex justify-between"><span>Time Selected:</span> <span className="text-brand-red font-black">{bookingTime}</span></div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-400 uppercase">Consultative notes for advisor (optional)</label>
                        <textarea 
                          value={bookingNotes}
                          onChange={(e) => setBookingNotes(e.target.value)}
                          placeholder="e.g. Focus on discussing my RIASEC logic profile gaps..."
                          className="w-full px-4 py-2 border border-slate-200 rounded-2xl text-xs font-bold bg-slate-50 focus:outline-none h-20"
                        />
                      </div>

                      <button 
                        onClick={() => {
                          const newId = `BC-${Math.floor(100 + Math.random() * 900)}`;
                          setConfirmedId(newId);
                          setCounselingBookings([
                            ...counselingBookings,
                            { id: newId, counselorName: selectedCounselor.name, date: bookingDate, time: bookingTime, status: 'Upcoming', mode: bookingMode, type: bookingType }
                          ]);
                          setCounselingStep('confirm');
                        }}
                        className="w-full py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-md transition-colors cursor-pointer text-center font-black uppercase tracking-wider"
                      >
                        Confirm Appointment
                      </button>
                    </div>
                  )}

                  {/* Previous step navigations */}
                  {wizardStep > 1 && (
                    <button 
                      onClick={() => setWizardStep(wizardStep - 1)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer pt-4 border-t border-slate-100"
                    >
                      ← Go back to Step {wizardStep - 1}
                    </button>
                  )}
                </div>
              )}

              {/* ==================== SCREEN 5: BOOKING CONFIRMATION ==================== */}
              {counselingStep === 'confirm' && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-12 shadow-sm max-w-md mx-auto text-center space-y-6">
                  <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow">
                    <Check className="h-8 w-8" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-slate-900 leading-none">Counseling Confirmed!</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      Your virtual advisory booking has been registered successfully. An invite code has been dispatched.
                    </p>
                  </div>

                  {/* Summary list */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-700 text-left space-y-2.5">
                    <div className="flex justify-between"><span>Booking ID:</span> <span className="text-slate-950 font-black">{confirmedId}</span></div>
                    <div className="flex justify-between"><span>Advisor Name:</span> <span className="text-slate-950 font-black">{selectedCounselor?.name || 'Dr. Sunita Mehta'}</span></div>
                    <div className="flex justify-between"><span>Scheduled Time:</span> <span className="text-brand-red font-black">{bookingDate} @ {bookingTime}</span></div>
                    <div className="flex justify-between"><span>Invite Link:</span> <span className="text-slate-950 underline font-black">meet.careerdna.ai/{confirmedId}</span></div>
                  </div>

                  {/* Mock calendar integrators */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Add to calendar</span>
                    <div className="flex gap-2 justify-center text-[10px] font-bold text-slate-600">
                      {['Google', 'Outlook', 'Apple'].map((cal) => (
                        <button key={cal} onClick={() => alert(`Added appointment ${confirmedId} to your ${cal} Calendar!`)} className="px-3 py-1.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 cursor-pointer">{cal}</button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => setCounselingStep('appointments')}
                      className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-black text-xs font-bold text-white shadow-sm cursor-pointer"
                    >
                      View Appointment
                    </button>
                    <button 
                      onClick={() => setCounselingStep('home')}
                      className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      Return to Hub
                    </button>
                  </div>
                </div>
              )}

              {/* ==================== SCREEN 6: MY APPOINTMENTS ==================== */}
              {counselingStep === 'appointments' && (
                <div className="space-y-6 text-left">
                  <div className="border-b border-slate-150 pb-3 flex justify-between items-center">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">Counseling History Logs</h4>
                    <button 
                      onClick={() => setCounselingStep('home')}
                      className="text-xs font-black text-brand-red hover:underline cursor-pointer"
                    >
                      Back to Hub
                    </button>
                  </div>

                  {/* List bookings cards */}
                  <div className="space-y-4">
                    {counselingBookings.map((b) => (
                      <div key={b.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-red transition-all">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-brand-red uppercase tracking-wider block">ID: {b.id} · {b.type} Session</span>
                          <h5 className="text-xs font-black text-slate-950">{b.counselorName}</h5>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Date: {b.date} · Time: {b.time} · Mode: {b.mode}</p>
                        </div>

                        <div className="flex gap-2">
                          {b.status === 'Upcoming' && (
                            <>
                              <button 
                                onClick={() => setCounselingStep('join')}
                                className="rounded-xl bg-brand-red hover:bg-brand-redhover px-5 py-2 text-xs font-bold text-white shadow-sm cursor-pointer"
                              >
                                Join Session
                              </button>
                              <button 
                                onClick={() => {
                                  if (window.confirm("Cancel this booking?")) {
                                    setCounselingBookings(counselingBookings.map(item => item.id === b.id ? { ...item, status: 'Cancelled' } : item));
                                  }
                                }}
                                className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {b.status === 'Completed' && (
                            <button 
                              onClick={() => setCounselingStep('summary')}
                              className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-brand-red cursor-pointer"
                            >
                              View Action Plan
                            </button>
                          )}
                          {b.status === 'Cancelled' && (
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 py-2 block">Cancelled</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== SCREEN 7: JOIN MEETING VIDEO ROOM ==================== */}
              {counselingStep === 'join' && (
                <div className="rounded-3xl border border-slate-800 bg-[#0F172A] text-white p-6 shadow-2xl flex flex-col h-[calc(100vh-160px)] min-h-[500px] justify-between relative">
                  
                  {/* Header bar info */}
                  <div className="flex justify-between items-center bg-[#1E293B]/70 backdrop-blur-xs p-3 rounded-2xl border border-[#334155]">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
                      <span className="text-xs font-black uppercase">Advisory Call (Dr. Sunita Mehta)</span>
                    </div>
                    <span className="font-mono text-xs font-black text-brand-red">{formatTime(joinTimer)}</span>
                  </div>

                  {/* Video Grid placeholders */}
                  <div className="flex-1 flex gap-4 items-center justify-center p-6 sm:p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl h-full max-h-[300px]">
                      {/* Doctor avatar box */}
                      <div className="rounded-2xl border border-[#334155] bg-[#1E293B] relative flex items-center justify-center overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" alt="Sunita" className="h-20 w-20 rounded-full object-cover border-2 border-brand-red" />
                        <span className="absolute bottom-3 left-3 rounded bg-black/40 px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider">Dr. Sunita Mehta</span>
                      </div>
                      {/* Candidate avatar box */}
                      <div className="rounded-2xl border border-[#334155] bg-[#1E293B] relative flex items-center justify-center overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Sarah" className="h-20 w-20 rounded-full object-cover border-2 border-brand-red" />
                        <span className="absolute bottom-3 left-3 rounded bg-black/40 px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider">Sarah (You)</span>
                      </div>
                    </div>
                  </div>

                  {/* Controls bottom bar */}
                  <div className="flex flex-wrap justify-between items-center gap-4 bg-[#1E293B]/70 backdrop-blur-xs p-3.5 rounded-2xl border border-[#334155] shrink-0">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsMicOn(!isMicOn)}
                        className={`h-9 px-4 rounded-xl border font-bold text-xs cursor-pointer ${
                          isMicOn ? 'border-[#334155] bg-[#1E293B] hover:bg-[#334155]' : 'border-red-500 bg-red-500/20 text-red-500'
                        }`}
                      >
                        {isMicOn ? 'Mic On' : 'Mic Muted'}
                      </button>
                      <button 
                        onClick={() => setIsCamOn(!isCamOn)}
                        className={`h-9 px-4 rounded-xl border font-bold text-xs cursor-pointer ${
                          isCamOn ? 'border-[#334155] bg-[#1E293B] hover:bg-[#334155]' : 'border-red-500 bg-red-500/20 text-red-500'
                        }`}
                      >
                        {isCamOn ? 'Cam On' : 'Cam Muted'}
                      </button>
                    </div>

                    <button 
                      onClick={() => setCounselingStep('summary')}
                      className="rounded-xl bg-red-600 hover:bg-red-700 px-6 py-2.5 text-xs font-bold text-white shadow cursor-pointer uppercase tracking-wider"
                    >
                      Leave Meeting
                    </button>
                  </div>
                </div>
              )}

              {/* ==================== SCREEN 8: POST SESSION SUMMARY ==================== */}
              {counselingStep === 'summary' && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="border-b border-slate-150 pb-3">
                    <span className="rounded bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-600 tracking-wider">
                      Session Completed
                    </span>
                    <h3 className="text-xl font-black text-slate-900 leading-none mt-2">Action Plan & Diagnostic Summary</h3>
                    <p className="text-xs text-slate-450 font-bold uppercase tracking-wider mt-1">Advisor: Dr. Sunita Mehta · Completed just now</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-bold text-slate-700 text-left">
                    {/* Strengths & Improvements */}
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Advisor Discussion notes</h4>
                        <p className="text-slate-500 font-semibold leading-relaxed">
                          "Sarah displays robust quant logic capabilities. During placement coaching, we aligned her portfolio website targets to focus on full-stack React components. She should earn her AWS Cloud Practitioner credentials by the end of August."
                        </p>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Key Action plan Checklist</h4>
                        <div className="space-y-1 font-semibold text-slate-550">
                          <div className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Complete AI Fundamentals course</div>
                          <div className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Practice quantitative logic mocks</div>
                          <div className="flex items-center gap-1.5"><div className="h-4 w-4 rounded border border-slate-300 bg-white" /> Apply for junior product PM internship</div>
                        </div>
                      </div>
                    </div>

                    {/* Rating Feedback */}
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rate Counseling Session</h4>
                      
                      <div className="flex gap-1.5 text-lg">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button 
                            key={star} 
                            onClick={() => setFeedbackRating(star)} 
                            className={`cursor-pointer transition-colors ${feedbackRating >= star ? 'text-brand-red' : 'text-slate-300'}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-400 uppercase">Write Review Feedback (optional)</label>
                        <textarea 
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Provide session notes review..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:outline-none h-20"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setCounselingStep('home');
                            setFeedbackText('');
                            alert("Thank you for your rating feedback! Logs saved.");
                          }}
                          className="flex-1 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-sm cursor-pointer text-center font-black uppercase tracking-wider"
                        >
                          Submit Feedback
                        </button>
                        <button 
                          onClick={() => { setCounselingStep('browse'); }}
                          className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer text-center font-black uppercase tracking-wider"
                        >
                          Book Follow-up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* AI CAREER COACH TAB VIEW */}
          {activeTab === 'coach' && (
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col md:flex-row h-[calc(100vh-140px)] min-h-[500px]">
              
              {/* LEFT SIDEBAR: Conversational memory list */}
              <div className="w-full md:w-64 border-r border-slate-200 bg-slate-50 p-4 flex flex-col justify-between shrink-0 text-left">
                <div className="space-y-4 overflow-y-auto no-scrollbar">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Conversations</h4>
                    <button 
                      onClick={() => {
                        const newId = (chatSessions.length + 1).toString();
                        setChatSessions([
                          ...chatSessions,
                          { id: newId, title: `New Conversation #${newId}`, date: 'Just now', pinned: false }
                        ]);
                        setChatMessages({
                          ...chatMessages,
                          [newId]: [{ id: `welcome-${newId}`, sender: 'coach', text: `Hello Sarah 👋! I'm your AI Career Coach. How can I assist you in this new session?`, timestamp: Date.now() }]
                        });
                        setActiveSessionId(newId);
                      }}
                      className="text-xs font-black text-brand-red hover:underline cursor-pointer"
                    >
                      + New
                    </button>
                  </div>

                  {/* Search filter input */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search chats..." 
                      value={searchChatQuery}
                      onChange={(e) => setSearchChatQuery(e.target.value)}
                      className="w-full bg-white rounded-lg border border-slate-200 pl-8 pr-2 py-1.5 text-xs font-bold focus:outline-none"
                    />
                  </div>

                  {/* Sessions grid list */}
                  <div className="space-y-1">
                    {chatSessions
                      .filter(s => s.title.toLowerCase().includes(searchChatQuery.toLowerCase()))
                      .map((session) => {
                        const isAct = session.id === activeSessionId;
                        return (
                          <div 
                            key={session.id}
                            onClick={() => setActiveSessionId(session.id)}
                            className={`group w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isAct 
                                ? 'bg-brand-red text-white' 
                                : 'text-slate-655 hover:bg-slate-200'
                            }`}
                          >
                            <span className="truncate pr-2">{session.title}</span>
                            <span className={`text-[8px] font-bold uppercase shrink-0 ${isAct ? 'text-white' : 'text-slate-400'}`}>
                              {session.pinned ? '📌' : session.date}
                            </span>
                          </div>
                        );
                      })}
                  </div>

                  {/* Suggested Career Topics quick navigation */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">AI Career suggestions</span>
                    {['Aptitude gaps', 'UX design roles', 'AWS certification path', 'Resume layout fixes'].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setChatInput(`Tell me about ${topic}`);
                          handleSendChatMessage(`Tell me about ${topic}`);
                        }}
                        className="w-full text-left py-1 text-xs text-slate-500 hover:text-brand-red font-semibold block transition-colors cursor-pointer"
                      >
                        💡 {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Limitations warning card */}
                <div className="rounded-xl bg-red-50 border border-red-100 p-3 mt-4 text-[9px] text-slate-500 font-semibold leading-normal">
                  <span className="font-black text-brand-red block mb-0.5 uppercase tracking-wider">⚠️ AI Limitations Warning</span>
                  Recommendations are generated based on local assessment metrics. These resources are placeholders designed to complement certified counselors.
                </div>
              </div>

              {/* CENTER AREA: Message Conversation stream */}
              <div className="flex-1 flex flex-col bg-white overflow-hidden justify-between">
                
                {/* Chat Header details */}
                <div className="h-12 border-b border-slate-200 px-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-black text-slate-900 uppercase">AI Career Mentor</span>
                    <span className="rounded-full bg-brand-pink border border-red-100 px-2 py-0.5 text-[8px] font-black text-brand-red uppercase">GPT-4o Connected</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (window.confirm("Clear all conversations history in this session?")) {
                        setChatMessages({
                          ...chatMessages,
                          [activeSessionId]: []
                        });
                      }
                    }}
                    className="text-[10px] font-bold text-slate-400 hover:text-brand-red cursor-pointer"
                  >
                    Clear History
                  </button>
                </div>

                {/* Conversation messages scroll area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-5 text-left">
                  
                  {/* If active message list is empty, show welcome prompts view */}
                  {(!chatMessages[activeSessionId] || chatMessages[activeSessionId].length === 0) && (
                    <div className="max-w-xl mx-auto text-center space-y-6 py-6">
                      <span className="text-3xl">👋</span>
                      <h4 className="text-xl font-black text-slate-900">Hello {studentName}! I'm your AI Coach</h4>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        I can help explain your RIASEC test results, recommend courses, practice mock interview STAR scenarios, or assist with resume reviews.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 text-left">
                        {[
                          'Explain my personality profile',
                          'Compare career options',
                          'Recommend certifications',
                          'Help me prepare for interviews',
                          'Help me build my resume',
                          'Create a learning plan'
                        ].map((prompt, prIdx) => (
                          <button
                            key={prIdx}
                            onClick={() => {
                              setChatInput(prompt);
                              handleSendChatMessage(prompt);
                            }}
                            className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-brand-red hover:bg-brand-pink/15 text-xs font-black text-slate-700 transition-all cursor-pointer"
                          >
                            💬 {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Render message list bubble items */}
                  {chatMessages[activeSessionId]?.map((msg) => {
                    const isUser = msg.sender === 'user';
                    
                    // Rich cards parsing checks
                    const textContent = msg.text;
                    const isPersonalityCard = textContent.startsWith('[PERSONALITY]');
                    const isComparisonCard = textContent.startsWith('[COMPARISON]');
                    const isInterviewCard = textContent.startsWith('[INTERVIEW]');
                    const isResumeCard = textContent.startsWith('[RESUME]');
                    const isRecommendCard = textContent.startsWith('[RECOMMENDATIONS]');
                    const isGoalCard = textContent.startsWith('[GOALS]');

                    return (
                      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-2xl rounded-2xl p-4 text-xs font-semibold leading-relaxed ${
                          isUser 
                            ? 'bg-slate-950 text-white shadow-sm' 
                            : 'bg-slate-50 border border-slate-200 text-slate-700'
                        }`}>
                          
                          {/* Parse custom rich visual cards */}
                          {!isUser && isPersonalityCard && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-1.5 text-brand-red font-black border-b border-slate-200 pb-2">
                                <BrainCircuit className="h-4.5 w-4.5" /> PERSONALITY DNA PROFILE
                              </div>
                              <p className="whitespace-pre-line">{textContent.replace('[PERSONALITY]', '')}</p>
                              
                              {/* Simple mini interest spectrum bar indicators */}
                              <div className="space-y-2 pt-1 font-bold text-[10px]">
                                <div className="flex justify-between"><span>Investigative</span> <span className="text-brand-red">95%</span></div>
                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand-red w-[95%]" /></div>
                                <div className="flex justify-between"><span>Conventional</span> <span className="text-brand-red">90%</span></div>
                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand-red w-[90%]" /></div>
                              </div>
                            </div>
                          )}

                          {!isUser && isComparisonCard && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-1.5 text-brand-red font-black border-b border-slate-200 pb-2">
                                <Sliders className="h-4.5 w-4.5" /> CAREER COMPARISON WORKSPACE
                              </div>
                              
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-[10px] font-bold text-slate-700">
                                  <thead>
                                    <tr className="border-b border-slate-200 uppercase text-slate-400">
                                      <th className="py-1">Metric</th>
                                      <th className="py-1">Software Engineer</th>
                                      <th className="py-1">Data Scientist</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                    <tr><td className="py-1.5 font-black">AI Match</td><td className="py-1.5 text-brand-red">96% Fit</td><td className="py-1.5">92% Fit</td></tr>
                                    <tr><td className="py-1.5 font-black">Core Skill</td><td className="py-1.5">Java, Cloud, Agile</td><td className="py-1.5">Python, Stats, SQL</td></tr>
                                    <tr><td className="py-1.5 font-black">Growth</td><td className="py-1.5">High</td><td className="py-1.5 text-emerald-600">Very High</td></tr>
                                    <tr><td className="py-1.5 font-black">Average Pay</td><td className="py-1.5">₹14L LPA</td><td className="py-1.5">₹15L LPA</td></tr>
                                  </tbody>
                                </table>
                              </div>
                              <p className="text-[10px] text-slate-500 italic mt-2">AI Suggestion: Software Engineering provides a slightly higher alignment with your structured Conventional interests.</p>
                            </div>
                          )}

                          {!isUser && isInterviewCard && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-1.5 text-brand-red font-black border-b border-slate-200 pb-2">
                                <Clock className="h-4.5 w-4.5 animate-pulse" /> MOCK INTERVIEW PREPARATION
                              </div>
                              <p className="whitespace-pre-line">{textContent.replace('[INTERVIEW]', '')}</p>
                              
                              <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 space-y-2">
                                <h5 className="text-[9px] font-black text-slate-400 uppercase">Preparation Checklist</h5>
                                <div className="space-y-1 text-[10px] font-semibold text-slate-500">
                                  <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Prepare 3 STAR project stories</div>
                                  <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Study quantitative data structures</div>
                                  <div className="flex items-center gap-1.5"><div className="h-3.5 w-3.5 rounded border border-slate-400" /> Practice public speaking gestures</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {!isUser && isResumeCard && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-1.5 text-brand-red font-black border-b border-slate-200 pb-2">
                                <FileText className="h-4.5 w-4.5" /> RESUME SCRIPTER ASSISTANT
                              </div>
                              
                              <div className="flex items-center gap-4 bg-slate-100 p-3 rounded-2xl border border-slate-250">
                                <div className="relative h-12 w-12 flex items-center justify-center rounded-full bg-brand-pink text-brand-red font-black text-xs">
                                  74%
                                </div>
                                <div>
                                  <h5 className="text-xs font-black text-slate-900">ATS Readiness: High</h5>
                                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Missing: AWS cert credentials</p>
                                </div>
                              </div>
                              <p className="whitespace-pre-line text-slate-500">{textContent.replace('[RESUME]', '')}</p>
                              
                              <button 
                                onClick={() => alert("Simulating AI Resume export download...")} 
                                className="w-full text-center py-2 bg-slate-950 hover:bg-black rounded-lg text-[9px] font-black text-white cursor-pointer"
                              >
                                Export ATS Resume
                              </button>
                            </div>
                          )}

                          {!isUser && isRecommendCard && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-1.5 text-brand-red font-black border-b border-slate-200 pb-2">
                                <Sparkles className="h-4.5 w-4.5" /> RECOMMENDED ACTIONS
                              </div>
                              <p className="whitespace-pre-line">{textContent.replace('[RECOMMENDATIONS]', '')}</p>
                              
                              <div className="grid grid-cols-2 gap-2 text-left text-[10px] font-bold text-slate-700">
                                <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                                  <span className="block text-[8px] text-slate-400 uppercase">Recommended Course</span>
                                  <span>Generative AI Fundamentals</span>
                                </div>
                                <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                                  <span className="block text-[8px] text-slate-400 uppercase">Certification</span>
                                  <span>Google Data Analytics</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {!isUser && isGoalCard && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-1.5 text-brand-red font-black border-b border-slate-200 pb-2">
                                <Target className="h-4.5 w-4.5" /> ACTIVE SMART GOALS
                              </div>
                              <p className="whitespace-pre-line">{textContent.replace('[GOALS]', '')}</p>
                              
                              <div className="space-y-1 pt-1 text-[10px]">
                                <div className="flex justify-between text-slate-400"><span>Progress</span> <span>75%</span></div>
                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand-red w-[75%]" /></div>
                              </div>
                            </div>
                          )}

                          {/* Fallback standard text message */}
                          {!isPersonalityCard && !isComparisonCard && !isInterviewCard && !isResumeCard && !isRecommendCard && !isGoalCard && (
                            <p className="whitespace-pre-line">{textContent}</p>
                          )}

                          {/* Message actions buttons */}
                          <div className={`flex justify-end gap-2 border-t mt-3 pt-2 text-[9px] font-bold uppercase tracking-wider ${
                            isUser ? 'border-white/10 text-white/50' : 'border-slate-200 text-slate-400'
                          }`}>
                            <button 
                              onClick={() => {
                                setBookmarkedMessages({ ...bookmarkedMessages, [msg.id]: !bookmarkedMessages[msg.id] });
                                alert(bookmarkedMessages[msg.id] ? "Removed bookmark!" : "Saved response to Bookmarks!");
                              }}
                              className="hover:text-brand-red cursor-pointer"
                            >
                              {bookmarkedMessages[msg.id] ? '★ Bookmarked' : '☆ Bookmark'}
                            </button>
                            <button 
                              onClick={() => {
                                setLikedMessages({ ...likedMessages, [msg.id]: true });
                                alert("Feedback logged: message liked.");
                              }}
                              className="hover:text-brand-red cursor-pointer"
                            >
                              {likedMessages[msg.id] ? '👍 Liked' : 'Like'}
                            </button>
                            <button 
                              onClick={() => {
                                setDislikedMessages({ ...dislikedMessages, [msg.id]: true });
                                alert("Feedback logged: message disliked.");
                              }}
                              className="hover:text-brand-red cursor-pointer"
                            >
                              {dislikedMessages[msg.id] ? '👎 Disliked' : 'Dislike'}
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}

                  {/* AI Typing loading indicator */}
                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-black text-slate-400 flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                        </div>
                        <span>Coach is typing...</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Chat message input form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (chatInput.trim()) {
                      handleSendChatMessage(chatInput);
                      setChatInput('');
                    }
                  }}
                  className="p-4 border-t border-slate-200 flex gap-2.5 bg-slate-50 shrink-0"
                >
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about your RIASEC profile, interview prep, resumes..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:outline-none focus:border-brand-red shadow-inner"
                  />
                  <button 
                    type="submit"
                    className="rounded-xl bg-brand-red hover:bg-brand-redhover px-5 py-2.5 text-xs font-bold text-white shadow flex items-center justify-center cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

              </div>

              {/* RIGHT CONTEXT PANEL: quick summaries */}
              <div className="w-full md:w-64 border-l border-slate-200 bg-slate-50 p-4 text-left space-y-4 overflow-y-auto no-scrollbar shrink-0">
                <div className="border-b border-slate-200 pb-2 mb-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Chat Context Panel</h4>
                  <p className="text-[8px] text-slate-400 font-bold uppercase mt-0.5"> Sarah Jenkins' assessment credentials</p>
                </div>

                {/* Personality Archetype summary */}
                <div className="bg-white border border-slate-250 p-3 rounded-2xl space-y-1 shadow-sm">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Career Target fit</span>
                  <p className="text-xs font-black text-slate-900">{targetCareer}</p>
                  <span className="rounded bg-brand-pink px-2 py-0.5 text-[8px] font-black text-brand-red inline-block mt-1">94% Fit Score</span>
                </div>

                {/* Skill radar score gauges */}
                <div className="bg-white border border-slate-250 p-3 rounded-2xl space-y-2 shadow-sm text-xs font-bold text-slate-700">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Diagnostics Levels</span>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between"><span>Problem Solving</span> <span className="font-black text-slate-950">90%</span></div>
                    <div className="flex justify-between"><span>Critical Thinking</span> <span className="font-black text-slate-950">85%</span></div>
                    <div className="flex justify-between"><span>Leadership Index</span> <span className="font-black text-slate-950">88%</span></div>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="bg-white border border-slate-250 p-3 rounded-2xl space-y-2 shadow-sm">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Milestone Achievements</span>
                  <div className="flex flex-wrap gap-1 text-[9px] font-black uppercase">
                    <span className="bg-emerald-50 text-emerald-600 rounded px-2 py-0.5 border border-emerald-100">🧭 Explorer</span>
                    <span className="bg-emerald-50 text-emerald-600 rounded px-2 py-0.5 border border-emerald-100">🧠 Skill Builder</span>
                  </div>
                </div>

                {/* Smart actions */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Smart actions workspace</span>
                  <button 
                    onClick={() => {
                      alert("Opening counseling slot scheduling panel...");
                      setActiveTab('counseling');
                    }}
                    className="w-full text-left py-2 px-3 bg-white border border-slate-200 hover:border-brand-red rounded-xl text-xs font-bold text-slate-700 block transition-colors cursor-pointer"
                  >
                    📅 Book Career Counseling
                  </button>
                  <button 
                    onClick={() => {
                      alert("Opening roadmap checklist details...");
                      setActiveTab('roadmap');
                    }}
                    className="w-full text-left py-2 px-3 bg-white border border-slate-200 hover:border-brand-red rounded-xl text-xs font-bold text-slate-700 block transition-colors cursor-pointer"
                  >
                    🧭 Open Learning Roadmap
                  </button>
                  <button 
                    onClick={() => {
                      alert("Opening diagnostics score certificates report...");
                      setActiveTab('reports');
                    }}
                    className="w-full text-left py-2 px-3 bg-white border border-slate-200 hover:border-brand-red rounded-xl text-xs font-bold text-slate-700 block transition-colors cursor-pointer"
                  >
                    🏆 View Diagnostics Report
                  </button>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="relative flex flex-col w-full max-w-xs bg-white h-full p-6 shadow-xl z-10 text-left justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red text-white">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <span className="font-sans text-sm font-black text-slate-900">
                      Torque <span className="text-brand-red">Insights</span>
                    </span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 cursor-pointer">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {[
                    { label: 'Dashboard', icon: BarChart2, tab: 'overview' },
                    { label: 'AI Career Report', icon: Sparkles, tab: 'reports' },
                    { label: 'Career Roadmap', icon: Compass, tab: 'roadmap' },
                    { label: 'AI Career Coach', icon: MessageSquare, tab: 'coach' },
                    { label: 'Career Counseling', icon: Calendar, tab: 'counseling' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => { setActiveTab(item.tab as any); setMobileMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                      >
                        <Icon className="h-4.5 w-4.5 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-red-50/50 hover:text-brand-red transition-all cursor-pointer">
                  <LogOut className="h-4.5 w-4.5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
