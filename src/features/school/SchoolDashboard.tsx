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
  Sliders, Target, ShieldAlert, GraduationCap, Building2, Eye, Download, Info, Settings, LogOut, HelpCircle, BarChart2, Menu, X
} from 'lucide-react';

export const SchoolDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'classes' | 'campaigns' | 'counseling' | 'faculty' | 'analytics' | 'reports'>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Multi-tenant Switcher States
  const [selectedCampus, setSelectedCampus] = useState('Main Campus');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2025-26');
  const [selectedRole, setSelectedRole] = useState('Institution Administrator');

  // Student filtering states
  const [filterClass, setFilterClass] = useState('All');
  const [filterRisk, setFilterRisk] = useState('All');

  // Bulk coupon code seat generator states
  const [numSeats, setNumSeats] = useState(10);
  const [bulkCodes, setBulkCodes] = useState<string[]>([]);

  // Local data templates
  const [studentsList, setStudentsList] = useState([
    { id: 'ST-101', name: 'Rohan Sharma', class: 'Class XII-A', dept: 'Science (PCM)', status: 'Completed', readiness: 85, counseling: 'Scheduled', risk: 'Low', goal: 'Software Product Manager' },
    { id: 'ST-102', name: 'Ananya Sharma', class: 'Class X-B', dept: 'General', status: 'Completed', readiness: 72, counseling: 'Pending', risk: 'Medium', goal: 'UX/UI Designer' },
    { id: 'ST-103', name: 'Kabir Verma', class: 'Class XII-C', dept: 'Commerce', status: 'In Progress', readiness: 45, counseling: 'Required', risk: 'High', goal: 'Investment Banker' },
    { id: 'ST-104', name: 'Meera Sen', class: 'Class XI-A', dept: 'Humanities', status: 'Completed', readiness: 88, counseling: 'Completed', risk: 'Low', goal: 'Journalist' },
    { id: 'ST-105', name: 'Aarav Patel', class: 'Class XII-A', dept: 'Science (PCB)', status: 'In Progress', readiness: 30, counseling: 'Required', risk: 'High', goal: 'Doctor' }
  ]);

  const handleGenerateSeats = () => {
    const codes = [];
    const prefix = user?.schoolName?.split(' ').map(w => w.charAt(0)).join('').toUpperCase() || 'SCH';
    for (let i = 0; i < numSeats; i++) {
      codes.push(`${prefix}-SEAT-${Math.floor(1000 + Math.random() * 9000)}`);
    }
    setBulkCodes(codes);
    alert(`Successfully generated ${numSeats} seat keys!`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Chart data definitions
  const streamSuitabilityData = [
    { name: 'Science (PCM)', Students: 45, averageReadiness: 82 },
    { name: 'Science (PCB)', Students: 25, averageReadiness: 78 },
    { name: 'Commerce', Students: 35, averageReadiness: 80 },
    { name: 'Humanities', Students: 20, averageReadiness: 85 },
  ];

  const learningStyleData = [
    { name: 'Visual', value: 40, color: '#C62828' },
    { name: 'Auditory', value: 25, color: '#1E293B' },
    { name: 'Read/Write', value: 20, color: '#64748B' },
    { name: 'Kinesthetic', value: 15, color: '#94A3B8' },
  ];

  const progressOverTime = [
    { month: 'Jan', DiagnosticComplete: 60, CounselingBooked: 20 },
    { month: 'Feb', DiagnosticComplete: 75, CounselingBooked: 35 },
    { month: 'Mar', DiagnosticComplete: 88, CounselingBooked: 55 },
    { month: 'Apr', DiagnosticComplete: 95, CounselingBooked: 80 },
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
            { label: 'Students List', icon: Users, tab: 'students' },
            { label: 'Classrooms', icon: GraduationCap, tab: 'classes' },
            { label: 'Assessment Campaigns', icon: Ticket, tab: 'campaigns' },
            { label: 'Counseling Desk', icon: Calendar, tab: 'counseling' },
            { label: 'Faculty Roster', icon: Compass, tab: 'faculty' },
            { label: 'Campus Analytics', icon: TrendingUp, tab: 'analytics' },
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

            {/* Switchers block */}
            <div className="flex items-center gap-2">
              <select 
                value={selectedCampus} 
                onChange={(e) => setSelectedCampus(e.target.value)} 
                className="bg-slate-100 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-900 border-none cursor-pointer focus:outline-none uppercase"
              >
                <option value="Main Campus">Main Campus</option>
                <option value="North Annex">North Annex</option>
              </select>

              <select 
                value={selectedAcademicYear} 
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="bg-slate-100 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-900 border-none cursor-pointer focus:outline-none uppercase"
              >
                <option value="2025-26">AY 2025-26</option>
                <option value="2024-25">AY 2024-25</option>
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
                placeholder="Search students..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all"
              />
            </div>
            
            <button onClick={() => alert("Announcements checklist...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
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
          
          {/* Dashboard Title Card */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md text-left">
            <div className="space-y-1">
              <span className="rounded bg-brand-red px-2.5 py-1 text-[10px] font-black uppercase text-white tracking-wider">
                Multi-Tenant Administration Portal
              </span>
              <h1 className="text-2xl font-black tracking-tight">{user.schoolName || 'Torque Partner School'}</h1>
              <p className="text-xs text-slate-450 font-semibold mt-1">
                Representative: <span className="text-white font-black">{user.name}</span> | Linked Advisor: <span className="text-brand-pink font-black">Dr. Sunita Mehta</span>
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
                  { title: 'Total Enrolled Students', val: '1,450', desc: 'Active Seats', col: 'text-slate-900' },
                  { title: 'Completion Index', val: '88%', desc: 'Assessment Campaigns', col: 'text-slate-900' },
                  { title: 'Counseling Sessions', val: '42 slots', desc: 'Scheduled This Week', col: 'text-brand-red' },
                  { title: 'Composite Readiness', val: '84/100', desc: 'Institutional Rating', col: 'text-emerald-600' },
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
                
                {/* Visual suitability distribution chart */}
                <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Class Stream suitability distribution</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={streamSuitabilityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                        <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="Students" fill="#C62828" radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Donut chart for learning style */}
                <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Learning styles distribution</h4>
                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={learningStyleData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {learningStyleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{ fontSize: 10, fontWeight: 'bold' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* License Seat Key Generator section */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Institutional Licenses & Access Seats</h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Generate keys for students to complete checkout registrations automatically mapped to your dashboard records.
                </p>
                
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={numSeats} 
                    onChange={(e) => setNumSeats(Number(e.target.value))} 
                    className="w-20 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                  />
                  <button 
                    onClick={handleGenerateSeats}
                    className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2.5 text-xs font-bold text-white shadow-sm cursor-pointer uppercase"
                  >
                    Generate Keys
                  </button>
                </div>

                {bulkCodes.length > 0 && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Access Keys:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {bulkCodes.map((code) => (
                        <span key={code} className="rounded border border-slate-200 bg-white px-2 py-1 text-[9px] font-mono font-black text-slate-800 text-center select-all cursor-pointer">{code}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================== TAB 2: STUDENTS LIST ==================== */}
          {activeTab === 'students' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Enrolled Student Directory</h4>
                  
                  <div className="flex gap-2">
                    <select 
                      value={filterClass} 
                      onChange={(e) => setFilterClass(e.target.value)}
                      className="bg-slate-105 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-700 border-none cursor-pointer focus:outline-none"
                    >
                      <option value="All">All Classes</option>
                      <option value="Class XII-A">Class XII-A</option>
                      <option value="Class X-B">Class X-B</option>
                      <option value="Class XI-A">Class XI-A</option>
                    </select>

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

                {/* Table representation */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-bold text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-200 uppercase text-slate-400 text-[10px]">
                        <th className="py-2.5">Student ID</th>
                        <th className="py-2.5">Name</th>
                        <th className="py-2.5">Class Section</th>
                        <th className="py-2.5">AI Projection</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5 text-center">Readiness Index</th>
                        <th className="py-2.5">Risk Factor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentsList
                        .filter(s => filterClass === 'All' || s.class === filterClass)
                        .filter(s => filterRisk === 'All' || s.risk === filterRisk)
                        .map((student) => (
                          <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 font-mono">{student.id}</td>
                            <td className="py-3 text-slate-950 font-black">{student.name}</td>
                            <td className="py-3">{student.class}</td>
                            <td className="py-3 text-slate-500 font-semibold">{student.dept}</td>
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
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: CLASSROOMS ==================== */}
          {activeTab === 'classes' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Classrooms Structure</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { section: 'Class XII-A', count: 42, supervisor: 'Prof. Anupama Nair', completion: 92 },
                    { section: 'Class XII-B', count: 38, supervisor: 'Mr. David Miller', completion: 74 },
                    { section: 'Class XI-A', count: 45, supervisor: 'Ms. Shalini Iyer', completion: 88 },
                  ].map((cls, idx) => (
                    <div key={idx} className="bg-slate-55 border border-slate-200 p-4.5 rounded-2xl space-y-3.5">
                      <h5 className="text-xs font-black text-slate-950">{cls.section}</h5>
                      <div className="text-[10px] font-semibold text-slate-500 space-y-1">
                        <p><strong>Faculty:</strong> {cls.supervisor}</p>
                        <p><strong>Students count:</strong> {cls.count} registered</p>
                      </div>
                      <div className="space-y-1 text-[9.5px]">
                        <div className="flex justify-between text-slate-400"><span>Progress</span> <span>{cls.completion}%</span></div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand-red" style={{ width: `${cls.completion}%` }} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: CAMPAIGNS ==================== */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active campaigns</h4>
                
                <div className="space-y-3.5">
                  {[
                    { name: 'Class XII Science Stream Mapping', target: 'Science Division', comp: 92 },
                    { name: 'Class X Interests Inventory Screening', target: 'Class X students', comp: 65 },
                  ].map((camp, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 p-4.5 space-y-2">
                      <h5 className="text-xs font-black text-slate-950">{camp.name}</h5>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Target group: {camp.target}</span>
                      <div className="space-y-1 text-[9.5px]">
                        <div className="flex justify-between text-slate-400"><span>Campaign completion</span> <span>{camp.comp}%</span></div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand-red" style={{ width: `${camp.comp}%` }} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: COUNSELING ==================== */}
          {activeTab === 'counseling' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Campus Counselor Desk</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Assigned Advisor:</strong> Dr. Sunita Mehta</p>
                  <p><strong>High priority checklist:</strong> 3 students flagged with high risk factors requiring immediate slots.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: FACULTY ==================== */}
          {activeTab === 'faculty' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Faculty Registry</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {['Prof. Anupama Nair (Science Supervisor)', 'Mr. David Miller (Commerce Lead)', 'Ms. Shalini Iyer (Humanities Lead)'].map((fac, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">{fac}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: ANALYTICS ==================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active completion progression</h4>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="DiagnosticComplete" stroke="#C62828" name="Diagnostics Complete" />
                      <Line type="monotone" dataKey="CounselingBooked" stroke="#1E293B" name="Advisories booked" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 8: REPORT CENTER ==================== */}
          {activeTab === 'reports' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Export campus metrics data</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {['Campus composite score report', 'Department comparative index report', 'Student active completion matrix'].map((rep, idx) => (
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
                    { label: 'Students List', icon: Users, tab: 'students' },
                    { label: 'Classrooms', icon: GraduationCap, tab: 'classes' },
                    { label: 'Assessment Campaigns', icon: Ticket, tab: 'campaigns' },
                    { label: 'Counseling Desk', icon: Calendar, tab: 'counseling' },
                    { label: 'Faculty Roster', icon: Compass, tab: 'faculty' },
                    { label: 'Campus Analytics', icon: TrendingUp, tab: 'analytics' },
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
