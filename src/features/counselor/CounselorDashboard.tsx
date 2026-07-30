import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dbService, CounselingSession, User, CareerDNAReport } from '../../services/dbService';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  BrainCircuit, Users, Award, ShieldCheck, Ticket, Plus, ChevronRight, FileText, Check,
  Search, Bell, MessageSquare, Sun, Moon, Compass, Calendar, Clock, Sparkles, TrendingUp,
  Sliders, Target, ShieldAlert, GraduationCap, Building2, Eye, Download, Info, Settings, LogOut,
  HelpCircle, Save, Edit, Phone, Mic, Play, Trash2, BarChart2, Menu, X, BookOpen, Send
} from 'lucide-react';

export const CounselorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'appointments' | 'reports' | 'roadmaps' | 'actions' | 'notes' | 'tasks' | 'messages' | 'parents' | 'resources' | 'analytics'>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Counselor metadata
  const [selectedStudentId, setSelectedStudentId] = useState<'st-101' | 'st-102' | 'st-103'>('st-101');

  // Student filtering states
  const [filterInstitution, setFilterInstitution] = useState('All');
  const [filterRisk, setFilterRisk] = useState('All');

  // Interactive local states
  const [counselorTasks, setCounselorTasks] = useState([
    { id: 1, title: "Review Rohan's resume draft suggestions", priority: 'High', due: 'Today', status: 'Pending' },
    { id: 2, title: "Call Kabir's parent regarding stream changes", priority: 'Critical', due: 'Today', status: 'Pending' },
    { id: 3, title: "Submit institutional progress report to DPS Principal", priority: 'Medium', due: 'Tomorrow', status: 'Pending' },
  ]);

  const [studentsList, setStudentsList] = useState([
    { id: 'st-101', name: 'Rohan Sharma', schoolName: 'Delhi Public School', status: 'Completed', readiness: 85, progress: 75, risk: 'Low', lastSession: 'July 20, 2026', goal: 'Software Product Manager' },
    { id: 'st-102', name: 'Ananya Sharma', schoolName: 'Delhi Public School', status: 'Completed', readiness: 72, progress: 60, risk: 'Medium', lastSession: 'July 25, 2026', goal: 'UX/UI Designer' },
    { id: 'st-103', name: 'Kabir Verma', schoolName: 'Greenwood High', status: 'In Progress', readiness: 45, progress: 10, risk: 'High', lastSession: 'None', goal: 'Investment Banker' }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'parent', text: "Hello Dr. Mehta, I reviewed Rohan's AWS Cloud recommendations. We will discuss this with him tonight.", date: '10:15 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Active student object helper
  const activeStudent = studentsList.find(s => s.id === selectedStudentId) || studentsList[0];

  // Notes editor form state
  const [sessionNotesText, setSessionNotesText] = useState('');
  const [discussionPoints, setDiscussionPoints] = useState('');
  const [homeworkChecklist, setHomeworkChecklist] = useState('');

  // Action plan builder states
  const [actionPlanList, setActionPlanList] = useState([
    { id: '1', title: 'Complete AI Fundamentals Course', priority: 'High', date: 'Aug 12, 2026', status: 'In Progress' },
    { id: '2', title: 'Improve Public Speaking Briefs', priority: 'Medium', date: 'Aug 18, 2026', status: 'In Progress' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { id: `msg-${Date.now()}`, sender: 'user', text: chatInput, date: 'Just now' }
    ]);
    setChatInput('');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Chart data definitions
  const effectivenessData = [
    { name: 'Self-Awareness', PreCounseling: 40, PostCounseling: 85 },
    { name: 'Goal Clarity', PreCounseling: 30, PostCounseling: 90 },
    { name: 'Roadmap Progress', PreCounseling: 20, PostCounseling: 75 },
    { name: 'Interview Confidence', PreCounseling: 35, PostCounseling: 80 },
  ];

  const counselorWorkload = [
    { day: 'Mon', Sessions: 4 },
    { day: 'Tue', Sessions: 6 },
    { day: 'Wed', Sessions: 3 },
    { day: 'Thu', Sessions: 5 },
    { day: 'Fri', Sessions: 4 },
  ];

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
            { label: 'Student Case Files', icon: Users, tab: 'students' },
            { label: 'Session Scheduler', icon: Calendar, tab: 'appointments' },
            { label: 'AI Report Interpreter', icon: Sparkles, tab: 'reports' },
            { label: 'Timeline Roadmaps', icon: Compass, tab: 'roadmaps' },
            { label: 'Action Plan Builder', icon: Sliders, tab: 'actions' },
            { label: 'Case Session Notes', icon: FileText, tab: 'notes' },
            { label: 'Tasks Checklist', icon: Target, tab: 'tasks' },
            { label: 'Collaborator Chat', icon: MessageSquare, tab: 'messages' },
            { label: 'Resources Library', icon: BookOpen, tab: 'resources' },
            { label: 'Practice Analytics', icon: TrendingUp, tab: 'analytics' },
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
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block text-slate-400 hover:text-slate-600 cursor-pointer">
              <Menu className="h-5.5 w-5.5" />
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer">
              <Menu className="h-5.5 w-5.5" />
            </button>

            {/* Selector Dropdown to Peek Specific Student files */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <Users className="h-4 w-4 text-slate-450" />
              <select 
                value={selectedStudentId} 
                onChange={(e) => setSelectedStudentId(e.target.value as any)}
                className="bg-transparent text-xs font-black text-slate-900 border-none cursor-pointer focus:outline-none uppercase"
              >
                <option value="st-101">File: Rohan Sharma</option>
                <option value="st-102">File: Ananya Sharma</option>
                <option value="st-103">File: Kabir Verma</option>
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
            
            <button onClick={() => alert("Reminder alerts details...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 h-2.5 w-2.5 bg-brand-red rounded-full animate-ping" />
            </button>

            <div className="h-9 w-9 rounded-full bg-brand-pink text-brand-red font-black flex items-center justify-center border border-red-100 uppercase">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* ==================== WORKSPACE SCROLL AREA ==================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Greeting Hero Block */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md text-left">
            <div className="space-y-1">
              <span className="rounded bg-brand-red px-2.5 py-1 text-[10px] font-black uppercase text-white tracking-wider">
                Senior Advisory Workspace
              </span>
              <h1 className="text-2xl font-black tracking-tight">Counseling Hub: Dr. {user.name}</h1>
              <p className="text-xs text-slate-450 font-semibold mt-1">
                Currently reviewing diagnostics roadmap parameters for <span className="text-white font-black">{activeStudent.name}</span>.
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('appointments')}
                className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer uppercase tracking-wider font-black"
              >
                Schedule Session
              </button>
            </div>
          </div>

          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 text-left">
              
              {/* KPIs Summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Assigned Students', val: '24 Cases', desc: 'Active Portfolios', col: 'text-slate-900' },
                  { title: "Today's Schedule", val: '3 Sessions', desc: 'Virtual Calendars', col: 'text-brand-red' },
                  { title: 'Action Plans Builder', val: '18 Plans', desc: 'Milestone Outlines', col: 'text-slate-900' },
                  { title: 'Pending Reports Review', val: '2 Profiles', desc: 'Diagnostics Check', col: 'text-emerald-600' },
                ].map((stat, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-2">{stat.title}</span>
                    <h3 className="text-base font-black text-slate-900">{stat.val}</h3>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">{stat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Today's Schedule timeline preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Active calendar schedule list */}
                <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Today's schedule appointments</h4>
                  
                  <div className="space-y-3">
                    {[
                      { time: '09:30 AM', student: 'Kabir Verma', type: 'Diagnostic interpretation', status: 'Confirmed' },
                      { time: '11:30 AM', student: 'Rohan Sharma', type: 'Roadmap checkpoint review', status: 'Confirmed' },
                      { time: '02:00 PM', student: 'Ananya Sharma', type: 'Stream Selection advising', status: 'Scheduled' },
                    ].map((slot, idx) => (
                      <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 flex justify-between items-center gap-4 hover:border-brand-red transition-all">
                        <div>
                          <span className="font-mono text-xs font-black text-brand-red block">{slot.time}</span>
                          <h5 className="text-xs font-black text-slate-950 mt-0.5">{slot.student}</h5>
                          <span className="text-[9px] text-slate-400 uppercase font-semibold">{slot.type}</span>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedStudentId(studentsList.find(s => s.name === slot.student)?.id as any || 'st-101');
                            setActiveTab('notes');
                          }} 
                          className="rounded-xl bg-slate-950 hover:bg-black text-[10px] font-black text-white px-4 py-2 uppercase cursor-pointer"
                        >
                          Join Call
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Follow-up tasks panel */}
                <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Urgent advisory tasks</h4>
                  
                  <div className="space-y-3">
                    {counselorTasks.map((task) => (
                      <div key={task.id} className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="rounded bg-brand-pink border border-red-100 text-brand-red px-2 py-0.5 text-[8px] font-black uppercase">{task.priority}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase">{task.due}</span>
                        </div>
                        <h5 className="text-xs font-black text-slate-950">{task.title}</h5>
                        <button onClick={() => alert(`Task completed: ${task.title}`)} className="text-[9px] font-black text-brand-red hover:underline uppercase block">Complete</button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================== TAB 2: STUDENT CASE FILES ==================== */}
          {activeTab === 'students' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Enrolled Student Case Directory</h4>
                  
                  <div className="flex gap-2">
                    <select 
                      value={filterRisk} 
                      onChange={(e) => setFilterRisk(e.target.value)}
                      className="bg-slate-105 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-700 border-none cursor-pointer focus:outline-none"
                    >
                      <option value="All">All Risks</option>
                      <option value="Low">Low Risk</option>
                      <option value="Medium">Medium Risk</option>
                      <option value="High">High Risk</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-bold text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-200 uppercase text-slate-400 text-[10px]">
                        <th className="py-2.5">Student ID</th>
                        <th className="py-2.5">Name</th>
                        <th className="py-2.5">Institution</th>
                        <th className="py-2.5">Assessment Status</th>
                        <th className="py-2.5 text-center">Readiness Index</th>
                        <th className="py-2.5">Risk Factor</th>
                        <th className="py-2.5">Last Session</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentsList
                        .filter(s => filterRisk === 'All' || s.risk === filterRisk)
                        .map((student) => (
                          <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 font-mono">{student.id}</td>
                            <td className="py-3 text-slate-950 font-black">{student.name}</td>
                            <td className="py-3">{student.schoolName}</td>
                            <td className="py-3">
                              <span className={`rounded-full px-2 py-0.5 text-[8.5px] font-black uppercase ${
                                student.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'
                              }`}>{student.status}</span>
                            </td>
                            <td className="py-3 text-center text-brand-red font-black">{student.readiness}%</td>
                            <td className="py-3">
                              <span className={`rounded px-2 py-0.5 text-[8.5px] font-black uppercase ${
                                student.risk === 'Low' ? 'bg-emerald-50 text-emerald-600' :
                                student.risk === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-brand-red animate-bounce'
                              }`}>{student.risk}</span>
                            </td>
                            <td className="py-3">{student.lastSession}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: SESSION SCHEDULER ==================== */}
          {activeTab === 'appointments' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Calendar booking sessions</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {studentsList.map((st, idx) => (
                    <div key={idx} className="bg-slate-55 border border-slate-200 p-4.5 rounded-2xl space-y-3">
                      <h5 className="text-xs font-black text-slate-950">{st.name}</h5>
                      <p className="text-[10px] text-slate-500 font-semibold">Latest session logs: {st.lastSession}</p>
                      <button onClick={() => alert(`Booking session scheduler for ${st.name}`)} className="w-full text-center py-2 bg-slate-950 hover:bg-black rounded-xl text-[9px] font-black text-white cursor-pointer uppercase">Book slot</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: AI REPORT INTERPRETER ==================== */}
          {activeTab === 'reports' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">AI Diagnostics summary preview: {activeStudent.name}</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Primary Suitability Archetype:</strong> {activeStudent.goal} ({activeStudent.readiness}% Readiness)</p>
                  <p><strong>Workplace Strengths:</strong> Quantitative logic architecture, conventional problem structures.</p>
                  <p><strong>AI Recommendations:</strong> Encourage the student to bridge AWS Cloud Practitioner gaps and practice presentation gestures.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: TIMELINE ROADMAPS ==================== */}
          {activeTab === 'roadmaps' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Career development roadmap timelines: {activeStudent.name}</h4>
                
                <div className="space-y-4 pt-2">
                  <div className="relative pl-6">
                    <div className="absolute -left-[5px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-emerald-600 bg-emerald-600" />
                    <h5 className="text-xs font-black text-slate-950">Diagnostic Stream Matches (Class XII)</h5>
                    <span className="text-[9px] text-slate-450 uppercase font-semibold">Completed July 2026</span>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[5px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-brand-red bg-brand-red animate-pulse" />
                    <h5 className="text-xs font-black text-slate-950">AI Course Modules Development</h5>
                    <span className="text-[9px] text-slate-450 uppercase font-semibold">In Progress (August 2026)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: ACTION PLAN BUILDER ==================== */}
          {activeTab === 'actions' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Assign structured action plan tasks: {activeStudent.name}</h4>
                
                <div className="space-y-4">
                  {actionPlanList.map((plan) => (
                    <div key={plan.id} className="rounded-xl border border-slate-200 p-4.5 flex justify-between items-center gap-4">
                      <div>
                        <h5 className="text-xs font-black text-slate-950">{plan.title}</h5>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Deadline: {plan.date} · Priority: {plan.priority}</p>
                      </div>
                      <span className="bg-brand-pink border border-red-100 text-brand-red rounded px-2.5 py-1 text-[9px] font-black uppercase">{plan.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: CASE SESSION NOTES ==================== */}
          {activeTab === 'notes' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-150 pb-3">
                <h3 className="text-xl font-black text-slate-900 leading-none">Counselor Observation Workspace</h3>
                <p className="text-xs text-slate-450 font-bold uppercase mt-1">Student: {activeStudent.name} · Diagnostic: {activeStudent.goal}</p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Counselor observation case logs compiled successfully!");
                  setSessionNotesText('');
                  setDiscussionPoints('');
                  setHomeworkChecklist('');
                }}
                className="space-y-4 text-xs font-bold text-slate-700"
              >
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Session notes & Observations</label>
                  <textarea 
                    value={sessionNotesText}
                    onChange={(e) => setSessionNotesText(e.target.value)}
                    placeholder="Enter observations..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none h-20"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Discussion points</label>
                  <textarea 
                    value={discussionPoints}
                    onChange={(e) => setDiscussionPoints(e.target.value)}
                    placeholder="Enter discussion points..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none h-20"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Assign student homework checklist</label>
                  <input 
                    type="text" 
                    value={homeworkChecklist}
                    onChange={(e) => setHomeworkChecklist(e.target.value)}
                    placeholder="e.g. Complete AWS sample quiz"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>

                <button type="submit" className="w-full py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-sm cursor-pointer uppercase font-black">Save case notes</button>
              </form>
            </div>
          )}

          {/* ==================== TAB 8: TASKS CHECKLIST ==================== */}
          {activeTab === 'tasks' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Advisor Todo Checklist</h4>
                
                <div className="space-y-3">
                  {counselorTasks.map((t) => (
                    <div key={t.id} className="rounded-xl border border-slate-200 p-4.5 flex justify-between items-center gap-4">
                      <div>
                        <h5 className="text-xs font-black text-slate-950">{t.title}</h5>
                        <p className="text-[9.5px] text-slate-400 font-bold uppercase mt-0.5">Due: {t.due} · Priority: {t.priority}</p>
                      </div>
                      <button onClick={() => {
                        setCounselorTasks(counselorTasks.filter(item => item.id !== t.id));
                        alert("Completed task!");
                      }} className="text-[10px] font-black text-brand-red hover:underline uppercase cursor-pointer">Resolve</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 9: COLLABORATOR CHAT ==================== */}
          {activeTab === 'messages' && (
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)] min-h-[400px]">
              
              <div className="h-12 border-b border-slate-200 px-4 flex items-center justify-between shrink-0 bg-slate-50 text-left">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-black text-slate-900 uppercase">Parent-Counselor chat channel</span>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4 text-left">
                {chatMessages.map((msg) => {
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

              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 flex gap-2.5 bg-slate-50 shrink-0">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message to the parent..."
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

          {/* ==================== TAB 10: RESOURCES LIBRARY ==================== */}
          {activeTab === 'resources' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Academic advisory guides library</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                  {['Class XII stream choices playbook', 'UX/UI wireframing design paths checklist', 'CSM Scrum certification study guide'].map((res, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex justify-between items-center gap-4 hover:border-brand-red transition-all">
                      <span>{res}</span>
                      <button onClick={() => alert(`Opening resource: ${res}`)} className="text-[10px] font-black text-brand-red hover:underline uppercase cursor-pointer">Open</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 11: PRACTICE ANALYTICS ==================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 text-left">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Effectiveness Recharts */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Counseling advisory effectiveness index</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={effectivenessData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="PreCounseling" fill="#94A3B8" name="Pre-Advisory" />
                        <Bar dataKey="PostCounseling" fill="#C62828" name="Post-Advisory" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Workload sessions Recharts */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Weekly workload session trends</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={counselorWorkload}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="Sessions" stroke="#C62828" strokeWidth={3} name="Weekly Sessions" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ==================== MOBILE MENU DRAWER ==================== */}
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
                    { label: 'Student Case Files', icon: Users, tab: 'students' },
                    { label: 'Session Scheduler', icon: Calendar, tab: 'appointments' },
                    { label: 'AI Report Interpreter', icon: Sparkles, tab: 'reports' },
                    { label: 'Timeline Roadmaps', icon: Compass, tab: 'roadmaps' },
                    { label: 'Action Plan Builder', icon: Sliders, tab: 'actions' },
                    { label: 'Case Session Notes', icon: FileText, tab: 'notes' },
                    { label: 'Tasks Checklist', icon: Target, tab: 'tasks' },
                    { label: 'Collaborator Chat', icon: MessageSquare, tab: 'messages' },
                    { label: 'Resources Library', icon: BookOpen, tab: 'resources' },
                    { label: 'Practice Analytics', icon: TrendingUp, tab: 'analytics' },
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
