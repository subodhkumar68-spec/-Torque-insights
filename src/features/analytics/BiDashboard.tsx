import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  BrainCircuit, Users, Award, ShieldCheck, Ticket, Plus, ChevronRight, FileText, Check,
  Search, Bell, MessageSquare, Sun, Moon, Compass, Calendar, Clock, Sparkles, TrendingUp,
  Sliders, Target, ShieldAlert, GraduationCap, Building2, Eye, Download, Info, Settings, LogOut,
  Briefcase, GitPullRequest, LayoutGrid, Heart, BarChart2, Menu, X, BookOpen, Send, CreditCard, DollarSign,
  Phone, Smartphone, MessageCircle, AlertTriangle, HelpCircle, Server, Key
} from 'lucide-react';

export const BiDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'student' | 'institution' | 'corporate' | 'assessments' | 'counseling' | 'learning' | 'revenue' | 'builder' | 'forecasting' | 'benchmarks'>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Report Builder State Mocks
  const [builderChartType, setBuilderChartType] = useState('Bar');
  const [builderMetric, setBuilderMetric] = useState('Readiness Index');

  // Multi-tenant Switcher States
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days');
  const [selectedOrg, setSelectedOrg] = useState('All Organizations');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Chart data definitions
  const careerInterestsDistribution = [
    { name: 'Technology', value: 45, color: '#C62828' },
    { name: 'Finance', value: 25, color: '#1E293B' },
    { name: 'Creative Arts', value: 18, color: '#64748B' },
    { name: 'Healthcare', value: 12, color: '#94A3B8' }
  ];

  const platformActivityTrends = [
    { month: 'Jan', ActiveUsers: 12000, Assessments: 1500 },
    { month: 'Feb', ActiveUsers: 18000, Assessments: 2200 },
    { month: 'Mar', ActiveUsers: 24000, Assessments: 3100 },
    { month: 'Apr', ActiveUsers: 32000, Assessments: 4200 },
  ];

  const counselingEffectiveness = [
    { subject: 'Self-Awareness', Current: 85 },
    { subject: 'Goal Clarity', Current: 90 },
    { subject: 'Roadmap Progress', Current: 75 },
    { subject: 'Confidence', Current: 80 },
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
            { label: 'Executive Overview', icon: BarChart2, tab: 'overview' },
            { label: 'Student Analytics', icon: Users, tab: 'student' },
            { label: 'Institution Outcomes', icon: Building2, tab: 'institution' },
            { label: 'Corporate Analytics', icon: Briefcase, tab: 'corporate' },
            { label: 'Assessment Analytics', icon: Ticket, tab: 'assessments' },
            { label: 'Counseling Metrics', icon: Calendar, tab: 'counseling' },
            { label: 'Learning Progress', icon: BookOpen, tab: 'learning' },
            { label: 'Revenue Analytics', icon: DollarSign, tab: 'revenue' },
            { label: 'Custom Report Builder', icon: Sliders, tab: 'builder' },
            { label: 'AI Forecasting', icon: Sparkles, tab: 'forecasting' },
            { label: 'Benchmarks', icon: Compass, tab: 'benchmarks' },
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
                value={selectedDateRange} 
                onChange={(e) => setSelectedDateRange(e.target.value)} 
                className="bg-slate-100 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-900 border-none cursor-pointer focus:outline-none uppercase"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 6 Months">Last 6 Months</option>
              </select>

              <select 
                value={selectedOrg} 
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="bg-slate-100 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-900 border-none cursor-pointer focus:outline-none uppercase"
              >
                <option value="All Organizations">All Orgs</option>
                <option value="Delhi Public School">Delhi Public School</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search analytics reports..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all"
              />
            </div>
            
            <button onClick={() => alert("System performance updates...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
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
          
          {/* Title Hero card */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md text-left">
            <div className="space-y-1">
              <span className="rounded bg-brand-red px-2.5 py-1 text-[10px] font-black uppercase text-white tracking-wider">
                Enterprise Business Intelligence
              </span>
              <h1 className="text-2xl font-black tracking-tight">Executive Analytics Suite</h1>
              <p className="text-xs text-slate-455 font-semibold mt-1">
                Administered under representative: <span className="text-white font-black">{user.name}</span> | Cloud Integrity Status: <span className="text-brand-pink font-black">Operational</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('builder')}
                className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer uppercase tracking-wider font-black"
              >
                Custom Report Builder
              </button>
            </div>
          </div>

          {/* ==================== TAB 1: EXECUTIVE OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 text-left">
              
              {/* KPIs Fintech Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Active Platform Users', val: '32,000 Users', desc: 'Daily active count', col: 'text-slate-900' },
                  { title: 'Assessments Completed', val: '4,200 Tests', desc: 'SaaS diagnostics', col: 'text-slate-900' },
                  { title: 'AI Reports Generated', val: '3,800 Reports', desc: 'Output matrices', col: 'text-brand-red' },
                  { title: 'CSAT Score Index', val: '94% Rating', desc: 'Advisory feedback', col: 'text-emerald-600' },
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
                
                {/* Platform activity area chart */}
                <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Platform growth active user metrics</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={platformActivityTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C62828" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#C62828" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                        <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="ActiveUsers" stroke="#C62828" fillOpacity={1} fill="url(#colorUsers)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Subscriptions distribution Pie chart */}
                <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Career interests distribution</h4>
                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={careerInterestsDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {careerInterestsDistribution.map((entry, index) => (
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

            </div>
          )}

          {/* ==================== TAB 2: STUDENT ANALYTICS ==================== */}
          {activeTab === 'student' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Student Career Readiness scores</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <p><strong>Average Composite Readiness Index:</strong> 85/100</p>
                  <p><strong>Top Career suitability Match:</strong> Software Product Manager (45% cohort match)</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: INSTITUTION OUTCOMES ==================== */}
          {activeTab === 'institution' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Educational Institutions performance indicators</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <p><strong>Total Partner Schools:</strong> 42 campuses active.</p>
                  <p><strong>Participation index:</strong> 92% assessment completion target achieved.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: CORPORATE ANALYTICS ==================== */}
          {activeTab === 'corporate' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Corporate Hiring recruitment funnels</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-750">
                  <p><strong>Active HR tenants:</strong> 15 enterprise clients onboarding.</p>
                  <p><strong>Benchmark score:</strong> Average candidate score 78% placement compatibility.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: ASSESSMENT ANALYTICS ==================== */}
          {activeTab === 'assessments' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Assessment category stats</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <p><strong>Most Popular Diagnostic:</strong> Holland RIASEC Interests Inventory (85% selection rate)</p>
                  <p><strong>Aptitude Difficulty Index:</strong> Quantitative logic (Medium-Hard benchmark score)</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: COUNSELING METRICS ==================== */}
          {activeTab === 'counseling' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Counselor consultation benchmarks</h4>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={counselingEffectiveness}>
                      <PolarGrid stroke="#E2E8F0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94A3B8' }} />
                      <Radar name="Index" dataKey="Current" stroke="#C62828" fill="#C62828" fillOpacity={0.2} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: LEARNING PROGRESS ==================== */}
          {activeTab === 'learning' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">L&D course completions</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {['AI Core Fundamentals Course - 85% completion', 'AWS practitioner credentials prep - 42% completion'].map((course, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">{course}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 8: REVENUE ANALYTICS ==================== */}
          {activeTab === 'revenue' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Revenue analytics logs</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Total Annual Recurring Revenue:</strong> ₹5,10,00,000 ARR</p>
                  <p><strong>Average renewal conversion rate:</strong> 94% subscription renewals.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 9: CUSTOM REPORT BUILDER ==================== */}
          {activeTab === 'builder' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
              {/* Designer controls */}
              <div className="lg:col-span-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Configure report parameters</h3>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Visual component layout</label>
                    <select 
                      value={builderChartType} 
                      onChange={(e) => setBuilderChartType(e.target.value)}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="Bar">Bar Chart (Comparisons)</option>
                      <option value="Line">Line Plot (Trends)</option>
                      <option value="Area">Area Chart (Growth)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Data metric query</label>
                    <select 
                      value={builderMetric} 
                      onChange={(e) => setBuilderMetric(e.target.value)}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="Readiness Index">Readiness Index (%)</option>
                      <option value="Completion Rate">Assessment Completion (%)</option>
                      <option value="Active Users">Daily Active Users</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preview Canvas */}
              <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Custom Canvas Preview</h3>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {builderChartType === 'Bar' ? (
                      <BarChart data={platformActivityTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                        <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="ActiveUsers" fill="#C62828" name="Active Users" radius={[4, 4, 0, 0]} barSize={25} />
                      </BarChart>
                    ) : builderChartType === 'Line' ? (
                      <LineChart data={platformActivityTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="ActiveUsers" stroke="#C62828" name="Active Users" strokeWidth={3} />
                      </LineChart>
                    ) : (
                      <AreaChart data={platformActivityTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                        <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="ActiveUsers" stroke="#C62828" fill="#C62828" fillOpacity={0.2} />
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 10: AI FORECASTING ==================== */}
          {activeTab === 'forecasting' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">AI predictive growth forecasting</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Predicted Q3 User Registrations:</strong> 45,000 active students (Growth: +18%).</p>
                  <p><strong>Expected corporate placement intake requests:</strong> +32% increase this quarter.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 11: BENCHMARKS ==================== */}
          {activeTab === 'benchmarks' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Platform comparative benchmarks</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p>Your institutional readiness index (85%) exceeds the regional average benchmark score by 8%.</p>
                  <p>Your corporate placement response speed outperforms the industry average standard.</p>
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
                    { label: 'Executive Overview', icon: BarChart2, tab: 'overview' },
                    { label: 'Student Analytics', icon: Users, tab: 'student' },
                    { label: 'Institution Outcomes', icon: Building2, tab: 'institution' },
                    { label: 'Corporate Analytics', icon: Briefcase, tab: 'corporate' },
                    { label: 'Assessment Analytics', icon: Ticket, tab: 'assessments' },
                    { label: 'Counseling Metrics', icon: Calendar, tab: 'counseling' },
                    { label: 'Learning Progress', icon: BookOpen, tab: 'learning' },
                    { label: 'Revenue Analytics', icon: DollarSign, tab: 'revenue' },
                    { label: 'Custom Report Builder', icon: Sliders, tab: 'builder' },
                    { label: 'AI Forecasting', icon: Sparkles, tab: 'forecasting' },
                    { label: 'Benchmarks', icon: Compass, tab: 'benchmarks' },
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
