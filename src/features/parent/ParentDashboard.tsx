import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dbService, CareerDNAReport, CounselingSession } from '../../services/dbService';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar 
} from 'recharts';
import { 
  BrainCircuit, Search, Bell, MessageSquare, Sun, Moon, ChevronDown, Check, 
  Award, BookOpen, Calendar, Clock, Sparkles, Star, TrendingUp, ArrowRight, 
  Menu, X, HelpCircle, Settings, LogOut, Compass, FileText, BarChart2, ShieldCheck, Zap,
  AlertCircle, ChevronRight, CheckCircle2, Bookmark, Sliders, Target, Flame, Medal, Download, Send, Users, ShieldAlert
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation tabs
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'assessments' | 'insights' | 'learning' | 'roadmap' | 'counseling' | 'documents' | 'messages'>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Child selector data states
  const [selectedChildId, setSelectedChildId] = useState<'rohan' | 'ananya'>('rohan');

  const childrenData = {
    rohan: {
      name: 'Rohan Sharma',
      class: 'Class XII (Science Stream)',
      age: 17,
      institution: 'Delhi Public School, RK Puram',
      targetCareer: 'Software Product Manager',
      readiness: 85,
      engagement: 'High',
      aiScore: 94,
      assessmentStatus: 'Completed (July 20th)',
      lastDate: 'July 20, 2026',
      nextSuggested: 'Aptitude & Logical Skills',
      streak: 7,
      learningHours: 24,
      completedCourses: 3,
      riasec: [
        { subject: 'Investigative', Current: 95 },
        { subject: 'Conventional', Current: 90 },
        { subject: 'Social', Current: 80 },
        { subject: 'Artistic', Current: 75 },
        { subject: 'Enterprising', Current: 65 },
        { subject: 'Realistic', Current: 65 },
      ],
      skills: [
        { subject: 'Coding', Current: 85, Target: 95 },
        { subject: 'Design', Current: 60, Target: 80 },
        { subject: 'Speech', Current: 40, Target: 90 },
        { subject: 'Agile', Current: 75, Target: 95 },
      ],
      roadmap: [
        { id: 1, title: 'Class XII Diagnostic Assessment', status: 'Completed', date: 'July 2026' },
        { id: 2, title: 'AI Foundations Course Module', status: 'In Progress', date: 'August 2026' },
        { id: 3, title: 'AWS Cloud Certification Exam', status: 'Pending', date: 'September 2026' },
        { id: 4, title: 'Software Sandbox PRD Portfolio', status: 'Pending', date: 'October 2026' },
      ],
      actionPlan: [
        { title: 'Discuss AI stream recommendations together', priority: 'Critical', benefit: 'Solidifies class XII stream choice', time: '30m' },
        { title: 'Encourage public speaking practice brief', priority: 'High', benefit: 'Improves presentation skills', time: '15m' },
        { title: 'Schedule follow-up counseling slot', priority: 'Medium', benefit: 'Bridges active milestones', time: '10m' }
      ]
    },
    ananya: {
      name: 'Ananya Sharma',
      class: 'Class X (CBSE Board)',
      age: 15,
      institution: 'Delhi Public School, RK Puram',
      targetCareer: 'UX/UI Product Designer',
      readiness: 72,
      engagement: 'Medium',
      aiScore: 89,
      assessmentStatus: 'Completed (July 25th)',
      lastDate: 'July 25, 2026',
      nextSuggested: 'VARK Learning Styles test',
      streak: 4,
      learningHours: 12,
      completedCourses: 1,
      riasec: [
        { subject: 'Investigative', Current: 70 },
        { subject: 'Conventional', Current: 60 },
        { subject: 'Social', Current: 75 },
        { subject: 'Artistic', Current: 95 },
        { subject: 'Enterprising', Current: 80 },
        { subject: 'Realistic', Current: 50 },
      ],
      skills: [
        { subject: 'Coding', Current: 50, Target: 75 },
        { subject: 'Design', Current: 85, Target: 95 },
        { subject: 'Speech', Current: 65, Target: 85 },
        { subject: 'Agile', Current: 40, Target: 80 },
      ],
      roadmap: [
        { id: 1, title: 'Class X Career Interest Test', status: 'Completed', date: 'July 2026' },
        { id: 2, title: 'Visual Wireframe UI Foundations', status: 'In Progress', date: 'August 2026' },
        { id: 3, title: 'Figma Prototyping Workshop', status: 'Pending', date: 'September 2026' },
        { id: 4, title: 'UX Design Portfolio Submission', status: 'Pending', date: 'October 2026' },
      ],
      actionPlan: [
        { title: 'Explore visual wireframe learning resources', priority: 'High', benefit: 'Develops UI layouts skills', time: '20m' },
        { title: 'Review Figma tutorial modules outline', priority: 'Medium', benefit: 'Ensures workspace readiness', time: '15m' },
        { title: 'Discuss creative stream preferences', priority: 'Critical', benefit: 'Aids Class XI stream choice', time: '30m' }
      ]
    }
  };

  const activeChild = childrenData[selectedChildId];

  // Messaging hub states
  const [messagesList, setMessagesList] = useState([
    { id: '1', sender: 'counselor', text: "Hello Mr. Sharma, I have uploaded Rohan's post-session notes in the Documents tab. Let me know if you would like to discuss his AWS target prep.", timestamp: Date.now() - 3600000 }
  ]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageInput,
      timestamp: Date.now()
    };

    setMessagesList(prev => [...prev, userMsg]);
    setMessageInput('');

    // Simulated counselor reply after 1.5 seconds
    setTimeout(() => {
      setMessagesList(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'counselor',
          text: `Thank you for your update. I will review this context with ${activeChild.name} during our next session scheduled for August 18th.`,
          timestamp: Date.now()
        }
      ]);
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

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
            { label: 'Overview', icon: BarChart2, tab: 'overview' },
            { label: 'Assessments', icon: FileText, tab: 'assessments' },
            { label: 'Career Insights', icon: Sparkles, tab: 'insights' },
            { label: 'Learning Progress', icon: BookOpen, tab: 'learning' },
            { label: 'Career Roadmap', icon: Compass, tab: 'roadmap' },
            { label: 'Counseling Sessions', icon: Calendar, tab: 'counseling' },
            { label: 'Documents Center', icon: Award, tab: 'documents' },
            { label: 'Communication Hub', icon: MessageSquare, tab: 'messages' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.tab as any)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-brand-red text-white shadow-sm shadow-red-500/10' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1.5 shrink-0">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            {sidebarOpen && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-red-50 hover:text-brand-red transition-all cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT WRAPPER ==================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ==================== TOP NAVIGATION ==================== */}
        <header className={`h-16 border-b shrink-0 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block text-slate-400 hover:text-slate-600 cursor-pointer">
              <Menu className="h-5.5 w-5.5" />
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer">
              <Menu className="h-5.5 w-5.5" />
            </button>

            {/* Child Selector dropdown */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <Users className="h-4 w-4 text-slate-400" />
              <select 
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(e.target.value as any)}
                className="bg-transparent text-xs font-black text-slate-900 border-none focus:outline-none focus:ring-0 cursor-pointer uppercase"
              >
                <option value="rohan">Child: Rohan Sharma</option>
                <option value="ananya">Child: Ananya Sharma</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search diagnostics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all"
              />
            </div>
            
            <button onClick={() => alert("Notification center details...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 h-2.5 w-2.5 rounded-full bg-brand-red" />
            </button>

            <div className="h-9 w-9 rounded-full bg-brand-pink text-brand-red font-black flex items-center justify-center border border-red-100">
              P
            </div>
          </div>
        </header>

        {/* ==================== WORKSPACE SCROLL AREA ==================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Greeting Hero Block */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md text-left">
            <div className="space-y-1">
              <span className="rounded bg-brand-red px-2.5 py-1 text-[10px] font-black uppercase text-white tracking-wider">
                Family Insights Dashboard
              </span>
              <h1 className="text-2xl font-black tracking-tight">Welcome back, Mr. Sharma 👋</h1>
              <p className="text-xs text-slate-450 font-semibold mt-1">
                Currently reviewing learning developments for <span className="text-white font-black">{activeChild.name} ({activeChild.class})</span>.
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('counseling')}
                className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer uppercase tracking-wider"
              >
                Schedule Session
              </button>
            </div>
          </div>

          {/* Privacy Notice Card */}
          <div className="rounded-2xl border border-rose-200 bg-red-50/50 p-4.5 text-left flex gap-3.5 items-start">
            <ShieldAlert className="h-5.5 w-5.5 text-brand-red shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">Privacy notice regarding sensitive responses</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                To foster authenticity, raw psychometric response matrices remain confidential to the student. This dashboard displays synthesized summaries, action plan benchmarks, and milestone recommendations designed to support healthy planning.
              </p>
            </div>
          </div>

          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 text-left">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Readiness Index', val: `${activeChild.readiness}%`, desc: 'Career Competencies', col: 'text-slate-900' },
                  { title: 'Last Diagnostic Complete', val: activeChild.lastDate, desc: 'Assessments History', col: 'text-slate-900' },
                  { title: 'Active Weekly Streak', val: `${activeChild.streak} Days 🔥`, desc: 'Learning Engagement', col: 'text-brand-red' },
                  { title: 'AI Match Confidence', val: `${activeChild.aiScore}%`, desc: 'Roadmap Fit Index', col: 'text-emerald-600' },
                ].map((stat, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-2">{stat.title}</span>
                    <h3 className={`text-base font-black ${stat.col}`}>{stat.val}</h3>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">{stat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Child Profile summary & charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Child profile card */}
                <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="h-14 w-14 rounded-full bg-brand-pink text-brand-red flex items-center justify-center font-black border border-red-100 text-lg">
                      {activeChild.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-950">{activeChild.name}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">{activeChild.class}</p>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="text-[10px] font-semibold text-slate-500 space-y-1.5">
                    <p><strong>Age:</strong> {activeChild.age} Years</p>
                    <p><strong>Institution:</strong> {activeChild.institution}</p>
                    <p><strong>Target Goal:</strong> {activeChild.targetCareer}</p>
                    <p><strong>Diagnostics Status:</strong> {activeChild.assessmentStatus}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => setActiveTab('insights')} className="flex-1 text-center py-2.5 rounded-xl bg-slate-950 text-[10px] font-black text-white hover:bg-black transition-all cursor-pointer uppercase">View Insights</button>
                    <button onClick={() => setActiveTab('messages')} className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 text-[10px] font-black text-slate-700 hover:bg-slate-50 transition-all cursor-pointer uppercase">Chat Counselor</button>
                  </div>
                </div>

                {/* Progress Visualizations */}
                <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Holland Interest Profile Matrix</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={activeChild.riasec}>
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94A3B8' }} />
                        <Radar name="Interest Score" dataKey="Current" stroke="#C62828" fill="#C62828" fillOpacity={0.2} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Smart actions checklist from Parent Action Center */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Parent Suggested Follow-up Actions</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeChild.actionPlan.map((action, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase ${
                            action.priority === 'Critical' ? 'bg-red-50 text-brand-red' : 'bg-slate-200 text-slate-700'
                          }`}>{action.priority}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase">{action.time} Est</span>
                        </div>
                        <h5 className="text-xs font-black text-slate-950">{action.title}</h5>
                        <p className="text-[10px] text-slate-500 font-medium mt-1 leading-normal">Benefit: {action.benefit}</p>
                      </div>
                      <button 
                        onClick={() => alert(`Marked: ${action.title} discussed with child!`)}
                        className="w-full text-center py-2 bg-slate-950 hover:bg-black rounded-lg text-[9px] font-black text-white cursor-pointer uppercase"
                      >
                        Log completion
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ==================== TAB 2: ASSESSMENTS ==================== */}
          {activeTab === 'assessments' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Diagnostics Assessment Checklist</h4>
                
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 p-4 flex justify-between items-center gap-4">
                    <div>
                      <h5 className="text-xs font-black text-slate-900">Career Stream Interest Inventory</h5>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Completed on: {activeChild.lastDate}</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 rounded px-2.5 py-1 text-[9px] font-black uppercase border border-emerald-100">Completed</span>
                  </div>
                  
                  <div className="rounded-2xl border border-slate-200 p-4 flex justify-between items-center gap-4">
                    <div>
                      <h5 className="text-xs font-black text-slate-900">Aptitude & Cognitive Ability Test</h5>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Suggested Next Target</p>
                    </div>
                    <button 
                      onClick={() => alert("Exposing recommendation invite template...")}
                      className="bg-brand-red hover:bg-brand-redhover rounded-xl px-4 py-2 text-[10px] font-bold text-white shadow-sm cursor-pointer uppercase"
                    >
                      Invite Child
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: CAREER INSIGHTS ==================== */}
          {activeTab === 'insights' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Top Suited Professional Directions</h4>
                
                <div className="space-y-3 font-bold text-xs text-slate-700">
                  <p><strong>Primary Suitability Match:</strong> {activeChild.targetCareer} ({activeChild.aiScore}% Match)</p>
                  <p><strong>Learning Typology:</strong> VARK Visual Architect</p>
                  <p><strong>Key Strengths:</strong> Structured analytical deduction, quantitative modeling.</p>
                  <p><strong>Skill Development focus:</strong> Presentation briefs, oral communications under strict parameters.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: LEARNING PROGRESS ==================== */}
          {activeTab === 'learning' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Skill Improvement Milestones</h4>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activeChild.skills}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Current" fill="#64748B" name="Current Skill Level" />
                      <Bar dataKey="Target" fill="#C62828" name="Target Proficiency" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: CAREER ROADMAP ==================== */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Milestone Development Timeline</h4>
                
                <div className="space-y-4">
                  {activeChild.roadmap.map((mStep) => (
                    <div key={mStep.id} className="relative pl-6">
                      <div className={`absolute -left-[5px] top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-white ${
                        mStep.status === 'Completed' ? 'border-emerald-600 bg-emerald-600' :
                        mStep.status === 'In Progress' ? 'border-brand-red animate-pulse' : 'border-slate-300'
                      }`} />
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h5 className="text-xs font-black text-slate-900">{mStep.title}</h5>
                          <span className="text-[9px] text-slate-400 font-bold uppercase">{mStep.date}</span>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase ${
                          mStep.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                          mStep.status === 'In Progress' ? 'bg-red-50 text-brand-red' : 'bg-slate-100 text-slate-500'
                        }`}>{mStep.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: COUNSELING OVERVIEW ==================== */}
          {activeTab === 'counseling' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Assigned Advisory Logs</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Primary Advisor:</strong> Dr. Sunita Mehta (Senior Career Psychologist)</p>
                  <p><strong>Next Appointment:</strong> August 18, 2026 @ 03:30 PM</p>
                  <p><strong>Status:</strong> Confirmed</p>
                  <p><strong>Meeting Mode:</strong> Zoom Video Session</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: DOCUMENT CENTER ==================== */}
          {activeTab === 'documents' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Downloadable Diagnostic Credentials</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {[
                    { label: 'AI Diagnostic Assessment Stream Report', date: 'July 2026', size: '2.4 MB' },
                    { label: 'Verified Career Development Learning Roadmap', date: 'August 2026', size: '1.8 MB' },
                    { label: 'Mentor Advisory Action Plan Summary', date: 'July 2026', size: '450 KB' },
                  ].map((doc, idx) => (
                    <div key={idx} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                      <div>
                        <h5 className="text-xs font-black text-slate-950">{doc.label}</h5>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Uploaded: {doc.date} · File: {doc.size}</p>
                      </div>
                      <button 
                        onClick={() => alert(`Simulating file download: ${doc.label}`)}
                        className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200 text-slate-600 cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 8: COMMUNICATION HUB ==================== */}
          {activeTab === 'messages' && (
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)] min-h-[400px]">
              
              {/* Communication Header */}
              <div className="h-12 border-b border-slate-200 px-4 flex items-center justify-between shrink-0 bg-slate-50 text-left">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-black text-slate-900 uppercase">Chat with Dr. Sunita Mehta</span>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 text-left">
                {messagesList.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md rounded-2xl p-4 text-xs font-semibold leading-relaxed ${
                        isUser 
                          ? 'bg-slate-950 text-white shadow-sm' 
                          : 'bg-slate-50 border border-slate-200 text-slate-700'
                      }`}>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 flex gap-2.5 bg-slate-50 shrink-0">
                <input 
                  type="text" 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message to the advisor..."
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
          )}

        </main>
      </div>

      {/* ==================== MOBILE DRAWER MENU ==================== */}
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
                    { label: 'Overview', icon: BarChart2, tab: 'overview' },
                    { label: 'Assessments', icon: FileText, tab: 'assessments' },
                    { label: 'Career Insights', icon: Sparkles, tab: 'insights' },
                    { label: 'Learning Progress', icon: BookOpen, tab: 'learning' },
                    { label: 'Career Roadmap', icon: Compass, tab: 'roadmap' },
                    { label: 'Counseling Sessions', icon: Calendar, tab: 'counseling' },
                    { label: 'Documents Center', icon: Award, tab: 'documents' },
                    { label: 'Communication Hub', icon: MessageSquare, tab: 'messages' },
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
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-red-50 hover:text-brand-red transition-all cursor-pointer">
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
