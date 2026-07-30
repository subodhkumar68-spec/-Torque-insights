import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dbService, User, CareerDNAReport } from '../../services/dbService';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  BrainCircuit, Users, Award, ShieldCheck, Ticket, Plus, ChevronRight, FileText, Check,
  Search, Bell, MessageSquare, Sun, Moon, Compass, Calendar, Clock, Sparkles, TrendingUp,
  Sliders, Target, ShieldAlert, GraduationCap, Building2, Eye, Download, Info, Settings, LogOut,
  Briefcase, GitPullRequest, LayoutGrid, Heart, BarChart2, Menu, X, BookOpen
} from 'lucide-react';

export const CorporateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'employees' | 'assessments' | 'campaigns' | 'leadership' | 'succession' | 'learning' | 'analytics' | 'reports'>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Switchers States
  const [selectedBU, setSelectedBU] = useState('APAC Division');
  const [selectedRole, setSelectedRole] = useState('HR Manager');

  // Candidate filtering states
  const [filterJobRole, setFilterJobRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Local data templates
  const [candidatesList, setCandidatesList] = useState([
    { id: 'CAN-801', name: 'Siddharth Roy', role: 'Senior Software Engineer', status: 'Completed', score: 88, leadership: 80, skillMatch: 92, interview: 'Scheduled', rec: 'Strong Hire' },
    { id: 'CAN-802', name: 'Aishwarya Sen', role: 'Product Manager', status: 'Completed', score: 92, leadership: 94, skillMatch: 88, interview: 'Completed', rec: 'Strong Hire' },
    { id: 'CAN-803', name: 'Rahul Verma', class: 'Semester II', status: 'In Progress', score: 55, leadership: 40, skillMatch: 60, interview: 'Required', rec: 'Hold', role: 'Data Scientist' },
    { id: 'CAN-804', name: 'Priyanka Nair', class: 'Semester VI', status: 'Completed', score: 85, leadership: 78, skillMatch: 85, interview: 'Offer Stage', rec: 'Hire', role: 'UX Designer' }
  ]);

  const [employeesList, setEmployeesList] = useState([
    { name: 'Sarah Jenkins', dept: 'Product & Tech', role: 'Product Lead', rating: 'Outstanding', readiness: 88, learning: 75, leadership: 'Critical', risk: 'Low' },
    { name: 'Vikram Malhotra', dept: 'Finance', role: 'Senior Analyst', rating: 'Exceeds', readiness: 82, learning: 90, leadership: 'High', risk: 'Low' },
    { name: 'Karan Johar', dept: 'Operations', role: 'Operations Manager', rating: 'Meets', readiness: 65, learning: 40, leadership: 'Medium', risk: 'High' }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Chart data definitions
  const recruitmentFunnel = [
    { stage: 'Applied', Count: 120 },
    { stage: 'Screened', Count: 85 },
    { stage: 'Assessed', Count: 60 },
    { stage: 'Interview', Count: 30 },
    { stage: 'Offered', Count: 12 },
  ];

  const skillGapsData = [
    { subject: 'Valuation Finance', Gap: 30 },
    { subject: 'Agile Scrum', Gap: 18 },
    { subject: 'Neural Networks', Gap: 42 },
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
            { label: 'Candidates Desk', icon: Users, tab: 'candidates' },
            { label: 'Employee Registry', icon: Users, tab: 'employees' },
            { label: 'Assessments Catalog', icon: Ticket, tab: 'assessments' },
            { label: 'Hiring Campaigns', icon: Briefcase, tab: 'campaigns' },
            { label: 'Leadership Pipeline', icon: Award, tab: 'leadership' },
            { label: 'Succession Matrix', icon: Sliders, tab: 'succession' },
            { label: 'L&D Programs', icon: BookOpen, tab: 'learning' },
            { label: 'Workforce Analytics', icon: TrendingUp, tab: 'analytics' },
            { label: 'Report Center', icon: FileText, tab: 'reports' },
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

            {/* Switchers */}
            <div className="flex items-center gap-2">
              <select 
                value={selectedBU} 
                onChange={(e) => setSelectedBU(e.target.value)} 
                className="bg-slate-100 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-900 border-none cursor-pointer focus:outline-none uppercase"
              >
                <option value="APAC Division">BU: APAC Division</option>
                <option value="Global Operations">BU: Global Operations</option>
              </select>

              <span className="hidden sm:inline-block rounded-full bg-red-50 border border-red-100 text-brand-red px-2 py-0.5 text-[9px] font-black uppercase">
                {selectedRole}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search candidates..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all"
              />
            </div>
            
            <button onClick={() => alert("Talent alerts dashboard...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 h-2 w-2 bg-brand-red rounded-full" />
            </button>

            <div className="h-9 w-9 rounded-full bg-brand-pink text-brand-red font-black flex items-center justify-center border border-red-100 uppercase">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* ==================== WORKSPACE SCROLL AREA ==================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Title Hero Block */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md text-left">
            <div className="space-y-1">
              <span className="rounded bg-brand-red px-2.5 py-1 text-[10px] font-black uppercase text-white tracking-wider">
                Talent Intelligence Suite
              </span>
              <h1 className="text-2xl font-black tracking-tight">{user.companyName || 'Torque Corporate Portal'}</h1>
              <p className="text-xs text-slate-450 font-semibold mt-1">
                Representative: <span className="text-white font-black">{user.name}</span> | Verified Assessment Standards: <span className="text-brand-pink font-black">Torque Science Group</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('campaigns')}
                className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer uppercase tracking-wider font-black"
              >
                Create Campaign
              </button>
            </div>
          </div>

          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 text-left">
              
              {/* KPIs Summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Open Positions', val: '18 Active', desc: 'Recruitment pipelines', col: 'text-slate-900' },
                  { title: 'Candidates Assessed', val: '320 Profiles', desc: 'Screening Funnel', col: 'text-slate-900' },
                  { title: 'Succession Pipeline', val: '14 Leaders', desc: 'Bench Strength', col: 'text-brand-red' },
                  { title: 'Workforce Readiness', val: '86/100', desc: 'Skills Benchmark', col: 'text-emerald-600' },
                ].map((stat, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-2">{stat.title}</span>
                    <h3 className="text-base font-black text-slate-900">{stat.val}</h3>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">{stat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Progress charts */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual hiring funnel */}
                <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Hiring candidate funnel</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={recruitmentFunnel} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="stage" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                        <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="Count" fill="#C62828" radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Skill Gaps Summary */}
                <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Emerging workforce skill gaps</h4>
                  
                  <div className="space-y-4">
                    {skillGapsData.map((gap, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{gap.subject}</span>
                          <span className="text-brand-red">Gap: {gap.Gap}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand-red h-full" style={{ width: `${gap.Gap}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================== TAB 2: CANDIDATES DESK ==================== */}
          {activeTab === 'candidates' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Screened Candidate Pipeline</h4>
                  
                  <div className="flex gap-2">
                    <select 
                      value={filterJobRole} 
                      onChange={(e) => setFilterJobRole(e.target.value)}
                      className="bg-slate-105 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-700 border-none cursor-pointer focus:outline-none"
                    >
                      <option value="All">All Applied Roles</option>
                      <option value="Senior Software Engineer">Software Engineer</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="UX Designer">UX Designer</option>
                    </select>

                    <select 
                      value={filterStatus} 
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-slate-105 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-700 border-none cursor-pointer focus:outline-none"
                    >
                      <option value="All">All Stages</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Offer Stage">Offer Stage</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-bold text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-200 uppercase text-slate-400 text-[10px]">
                        <th className="py-2.5">Candidate ID</th>
                        <th className="py-2.5">Name</th>
                        <th className="py-2.5">Applied Role</th>
                        <th className="py-2.5">Aptitude Score</th>
                        <th className="py-2.5">Interview Status</th>
                        <th className="py-2.5 text-center">Skill Fit</th>
                        <th className="py-2.5">Rec Index</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {candidatesList
                        .filter(s => filterJobRole === 'All' || s.role === filterJobRole)
                        .filter(s => filterStatus === 'All' || s.interview === filterStatus)
                        .map((candidate) => (
                          <tr key={candidate.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 font-mono">{candidate.id}</td>
                            <td className="py-3 text-slate-950 font-black">{candidate.name}</td>
                            <td className="py-3">{candidate.role}</td>
                            <td className="py-3 text-slate-500 font-semibold">{candidate.score}%</td>
                            <td className="py-3">
                              <span className={`rounded-full px-2 py-0.5 text-[8.5px] font-black uppercase ${
                                candidate.interview === 'Completed' || candidate.interview === 'Offer Stage' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'
                              }`}>{candidate.interview}</span>
                            </td>
                            <td className="py-3 text-center text-brand-red font-black">{candidate.skillMatch}%</td>
                            <td className="py-3">
                              <span className={`rounded px-2 py-0.5 text-[8.5px] font-black uppercase ${
                                candidate.rec.includes('Strong') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-700'
                              }`}>{candidate.rec}</span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: EMPLOYEE REGISTRY ==================== */}
          {activeTab === 'employees' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active Employee Registry</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {employeesList.map((emp, idx) => (
                    <div key={idx} className="bg-slate-55 border border-slate-200 p-4.5 rounded-2xl space-y-3.5">
                      <h5 className="text-xs font-black text-slate-950">{emp.name}</h5>
                      <div className="text-[10px] font-semibold text-slate-500 space-y-1">
                        <p><strong>Department:</strong> {emp.dept}</p>
                        <p><strong>Current Role:</strong> {emp.role}</p>
                        <p><strong>Performance Rating:</strong> {emp.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: ASSESSMENTS CATALOG ==================== */}
          {activeTab === 'assessments' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Available assessment categories</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: 'Cognitive Ability', duration: '45 mins', audience: 'All candidates' },
                    { name: 'Leadership & Executive Potential', duration: '60 mins', audience: 'BU Managers' },
                    { name: 'Technical Skills Assessment', duration: '90 mins', audience: 'Engineering intakes' },
                  ].map((ass, idx) => (
                    <div key={idx} className="bg-slate-55 border border-slate-200 p-4.5 rounded-2xl space-y-3">
                      <h5 className="text-xs font-black text-slate-950">{ass.name}</h5>
                      <p className="text-[10px] text-slate-500 font-semibold">Duration: {ass.duration} | Target: {ass.audience}</p>
                      <button onClick={() => alert(`Assigned assessment: ${ass.name}`)} className="w-full text-center py-2 bg-slate-950 hover:bg-black rounded-xl text-[9px] font-black text-white cursor-pointer uppercase">Assign seats</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: HIRING CAMPAIGNS ==================== */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active hiring campaigns</h4>
                
                <div className="space-y-3.5">
                  {[
                    { name: 'Q3 Technical Graduate Program Intake', BU: 'APAC Division', count: 42, completion: 92 },
                    { name: 'Senior Leadership Manager Selection', BU: 'Global Operations', count: 12, completion: 65 },
                  ].map((camp, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 p-4.5 space-y-2">
                      <h5 className="text-xs font-black text-slate-950">{camp.name}</h5>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Business Unit: {camp.BU}</span>
                      <div className="space-y-1 text-[9.5px]">
                        <div className="flex justify-between text-slate-400"><span>Campaign completion</span> <span>{camp.completion}%</span></div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand-red" style={{ width: `${camp.completion}%` }} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: LEADERSHIP PIPELINE ==================== */}
          {activeTab === 'leadership' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">High Potential Employee benchmarking</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {['Sarah Jenkins (Product Lead) - Successor for Product Director', 'Vikram Malhotra (Senior Analyst) - Successor for Finance Manager'].map((lead, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">{lead}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: SUCCESSION MATRIX ==================== */}
          {activeTab === 'succession' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Succession 9-Box Matrix representation</h4>
                
                {/* 9-Box Grid Layout */}
                <div className="grid grid-cols-3 gap-2.5 max-w-xl mx-auto bg-slate-50 p-4 rounded-3xl border border-slate-200">
                  {/* Row 1: High Potential */}
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-bold text-slate-700 text-center">
                    <span className="block text-[8px] text-slate-400 uppercase">Enigma</span>
                    <span>High Pot / Low Perf</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-bold text-slate-700 text-center">
                    <span className="block text-[8px] text-slate-400 uppercase">Growth Potential</span>
                    <span>High Pot / Mod Perf</span>
                  </div>
                  <div className="bg-brand-pink/20 border border-brand-red/30 p-3 rounded-2xl text-[10px] font-black text-brand-red text-center">
                    <span className="block text-[8px] text-brand-red/60 uppercase">Star Leader</span>
                    <span>High Pot / High Perf</span>
                  </div>

                  {/* Row 2: Mod Potential */}
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-bold text-slate-700 text-center">
                    <span className="block text-[8px] text-slate-400 uppercase">Dilemma</span>
                    <span>Mod Pot / Low Perf</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-bold text-slate-700 text-center">
                    <span className="block text-[8px] text-slate-400 uppercase">Key Player</span>
                    <span>Mod Pot / Mod Perf</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-bold text-slate-700 text-center">
                    <span className="block text-[8px] text-slate-400 uppercase">High Performer</span>
                    <span>Mod Pot / High Perf</span>
                  </div>

                  {/* Row 3: Low Potential */}
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-bold text-slate-700 text-center">
                    <span className="block text-[8px] text-slate-400 uppercase">Risk Factor</span>
                    <span>Low Pot / Low Perf</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-bold text-slate-700 text-center">
                    <span className="block text-[8px] text-slate-400 uppercase">Solid Professional</span>
                    <span>Low Pot / Mod Perf</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-bold text-slate-700 text-center">
                    <span className="block text-[8px] text-slate-400 uppercase">Trusted Specialist</span>
                    <span>Low Pot / High Perf</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 8: L&D PROGRAMS ==================== */}
          {activeTab === 'learning' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Learning development milestones</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {['Generative AI Enterprise Fundamentals', 'Scrum Agile Team leadership Cert', 'ATS Resume Improvement'].map((path, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">{path}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 9: ANALYTICS ==================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active hiring campaigns analytics</h4>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={recruitmentFunnel} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="stage" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                      <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="Count" fill="#C62828" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 10: REPORT CENTER ==================== */}
          {activeTab === 'reports' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Export workforce metrics data</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {['Hiring campaign composite metrics report', 'Workforce talent mapping index report', 'Leadership bench strength matrix'].map((rep, idx) => (
                    <div key={idx} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                      <span>{rep}</span>
                      <div className="flex gap-2">
                        <button onClick={() => alert(`Exporting ${rep} as PDF`)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-[10px] font-black rounded-lg cursor-pointer">PDF</button>
                        <button onClick={() => alert(`Exporting ${rep} as EXCEL`)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-[10px] font-black rounded-lg cursor-pointer">EXCEL</button>
                      </div>
                    </div>
                  ))}
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
                    { label: 'Candidates Desk', icon: Users, tab: 'candidates' },
                    { label: 'Employee Registry', icon: Users, tab: 'employees' },
                    { label: 'Assessments Catalog', icon: Ticket, tab: 'assessments' },
                    { label: 'Hiring Campaigns', icon: Briefcase, tab: 'campaigns' },
                    { label: 'Leadership Pipeline', icon: Award, tab: 'leadership' },
                    { label: 'Succession Matrix', icon: Sliders, tab: 'succession' },
                    { label: 'L&D Programs', icon: BookOpen, tab: 'learning' },
                    { label: 'Workforce Analytics', icon: TrendingUp, tab: 'analytics' },
                    { label: 'Report Center', icon: FileText, tab: 'reports' },
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
