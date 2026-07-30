import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  BrainCircuit, Users, Award, ShieldCheck, Ticket, Plus, ChevronRight, FileText, Check,
  Search, Bell, MessageSquare, Sun, Moon, Compass, Calendar, Clock, Sparkles, TrendingUp,
  Sliders, Target, ShieldAlert, GraduationCap, Building2, Eye, Download, Info, Settings, LogOut,
  Briefcase, GitPullRequest, LayoutGrid, Heart, BarChart2, Menu, X, BookOpen, Send, CreditCard, DollarSign,
  Phone, Smartphone, MessageCircle, AlertTriangle, HelpCircle, Server, Key, Globe, Shield, Terminal, Zap, Code, Lock
} from 'lucide-react';

export const DeveloperMarketplace: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'browse' | 'installed' | 'api' | 'webhooks' | 'oauth' | 'logs' | 'docs' | 'sandbox'>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Category filter
  const [filterCategory, setFilterCategory] = useState('All');

  // Interactive Sandbox console states
  const [sandboxEndpoint, setSandboxEndpoint] = useState('https://api.yourdomain.com/v1/webhooks');
  const [sandboxResponse, setSandboxResponse] = useState('{\n  "status": "waiting_for_trigger",\n  "message": "Click Send Test Payload"\n}');

  // Mock Integrations Directory
  const [integrations, setIntegrations] = useState([
    { id: 'app-01', name: 'Google Classroom', cat: 'Education', desc: 'Sync student lists and diagnostics tasks with Classroom rosters.', status: 'Connected', logo: 'G' },
    { id: 'app-02', name: 'Canvas LMS', cat: 'Education', desc: 'Sync career intelligence profiles directly into grades records.', status: 'Install', logo: 'C' },
    { id: 'app-03', name: 'Microsoft Teams', cat: 'Communication', desc: 'Schedule Zoom-like consultation calls directly in Teams channels.', status: 'Connected', logo: 'T' },
    { id: 'app-04', name: 'Slack Workplace', cat: 'Communication', desc: 'Notify student advisors and HR recruiters when reports are ready.', status: 'Install', logo: 'S' },
    { id: 'app-05', name: 'Salesforce CRM', cat: 'CRM', desc: 'Push placement readiness indicators to executive leads portfolios.', status: 'Install', logo: 'SF' },
    { id: 'app-06', name: 'Razorpay Business', cat: 'Payments', desc: 'Coordinate student licensing checkouts billing systems.', status: 'Connected', logo: 'R' },
    { id: 'app-07', name: 'OpenAI API Core', cat: 'AI', desc: 'Configure LLM prompt templates and scoring rules benchmarks.', status: 'Connected', logo: 'O' }
  ]);

  const handleToggleConnect = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'Connected' ? 'Install' : 'Connected' };
      }
      return item;
    }));
  };

  const handleSendTestWebhook = () => {
    setSandboxResponse(JSON.stringify({
      event: 'assessment.completed',
      timestamp: new Date().toISOString(),
      data: {
        studentId: 'st-101',
        name: 'Rohan Sharma',
        readinessIndex: 85,
        matchArchetype: 'Software Product Manager'
      },
      response: {
        status: 200,
        message: 'Webhook payload delivered successfully'
      }
    }, null, 2));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Chart data definitions
  const apiRequestsData = [
    { hour: '09:00', Requests: 45000 },
    { hour: '11:00', Requests: 85000 },
    { hour: '13:00', Requests: 60000 },
    { hour: '15:00', Requests: 95000 },
    { hour: '17:00', Requests: 120000 },
  ];

  const integrationAdoption = [
    { name: 'Education', value: 40, color: '#C62828' },
    { name: 'Communication', value: 30, color: '#1E293B' },
    { name: 'AI Engines', value: 20, color: '#64748B' },
    { name: 'Payments', value: 10, color: '#94A3B8' }
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
            { label: 'Marketplace Dashboard', icon: BarChart2, tab: 'overview' },
            { label: 'Browse Integrations', icon: Compass, tab: 'browse' },
            { label: 'Installed Apps', icon: Briefcase, tab: 'installed' },
            { label: 'API Keys Management', icon: Key, tab: 'api' },
            { label: 'Webhook Webhooks', icon: Sliders, tab: 'webhooks' },
            { label: 'OAuth Applications', icon: Lock, tab: 'oauth' },
            { label: 'Sandbox Tester', icon: Terminal, tab: 'sandbox' },
            { label: 'Developer Docs', icon: BookOpen, tab: 'docs' },
            { label: 'Platform Event Logs', icon: FileText, tab: 'logs' },
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

            {/* Switcher badge preview */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <Terminal className="h-4 w-4 text-brand-red" />
              <span>Developer Environment: <strong>Sandbox API</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search integrations catalog..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all"
              />
            </div>
            
            <button onClick={() => alert("Developer console status updates...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
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
                Developer Directory Center
              </span>
              <h1 className="text-2xl font-black tracking-tight">Integrations & API Marketplace</h1>
              <p className="text-xs text-slate-455 font-semibold mt-1">
                Operator Workspace: <span className="text-white font-black">{user.name}</span> | API Integrations Status: <span className="text-brand-pink font-black">All Systems Operational</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('browse')}
                className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer uppercase tracking-wider font-black"
              >
                Browse Marketplace
              </button>
            </div>
          </div>

          {/* ==================== TAB 1: MARKETPLACE OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 text-left">
              
              {/* KPIs Fintech Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Installed Integrations', val: '12 Active Apps', desc: 'Tenants custom setup', col: 'text-slate-900' },
                  { title: 'Available Integrations', val: '48 Modules', desc: 'App directory catalog', col: 'text-slate-900' },
                  { title: 'API Requests Volume', val: '2.4M requests', desc: 'Monthly limits', col: 'text-brand-red' },
                  { title: 'Webhook Success SLA', val: '99.98% Delivered', desc: 'Events relay', col: 'text-emerald-600' },
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
                
                {/* Hourly API requests bar chart */}
                <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Hourly API requests volume (developer portal)</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={apiRequestsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="hour" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                        <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="Requests" fill="#C62828" radius={[4, 4, 0, 0]} barSize={25} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Integration adoption Pie chart */}
                <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Client integration adoption</h4>
                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={integrationAdoption}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {integrationAdoption.map((entry, index) => (
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

          {/* ==================== TAB 2: BROWSE INTEGRATIONS ==================== */}
          {activeTab === 'browse' && (
            <div className="space-y-6 text-left">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Integrations App Catalog</h4>
                
                <select 
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-slate-100 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-700 border-none cursor-pointer focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Education">Education</option>
                  <option value="Communication">Communication</option>
                  <option value="CRM">CRM</option>
                  <option value="Payments">Payments</option>
                  <option value="AI">AI Providers</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {integrations
                  .filter(item => filterCategory === 'All' || item.cat === filterCategory)
                  .map((app) => (
                    <div key={app.id} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 flex flex-col justify-between hover:border-brand-red transition-all">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded bg-brand-pink text-brand-red font-black flex items-center justify-center border border-red-100">
                            {app.logo}
                          </div>
                          <div>
                            <h5 className="text-xs font-black text-slate-950 leading-none">{app.name}</h5>
                            <span className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 block">{app.cat}</span>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 leading-relaxed">{app.desc}</p>
                      </div>

                      <button 
                        onClick={() => handleToggleConnect(app.id)} 
                        className={`w-full py-2.5 rounded-xl text-xs font-black uppercase cursor-pointer ${
                          app.status === 'Connected' 
                            ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' 
                            : 'bg-slate-950 hover:bg-black text-white'
                        }`}
                      >
                        {app.status === 'Connected' ? 'Disconnect' : 'Connect App'}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 3: INSTALLED APPS ==================== */}
          {activeTab === 'installed' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Installed Apps workspace</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {integrations.filter(item => item.status === 'Connected').map((app) => (
                    <div key={app.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                      <span>{app.name} ({app.cat})</span>
                      <button onClick={() => handleToggleConnect(app.id)} className="text-[10px] font-black text-brand-red hover:underline uppercase cursor-pointer">Uninstall</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: API KEYS ==================== */}
          {activeTab === 'api' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">API Developer Credentials</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700 leading-relaxed">
                  <p><strong>Environment:</strong> Production Developer Gateway</p>
                  <p><strong>Client ID ID:</strong> client_torque_prod_88229</p>
                  <p><strong>Client Secret Key:</strong> ******************************** (Hidden)</p>
                  <p><strong>Rate limits:</strong> 1000 requests / minute default.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: WEBHOOKS ==================== */}
          {activeTab === 'webhooks' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Webhook events endpoints</h4>
                
                <div className="space-y-4 text-xs font-bold text-slate-700">
                  {['Assessment Event Webhook', 'Billing Payment Webhook'].map((web, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex justify-between items-center gap-4">
                      <span>{web}</span>
                      <button onClick={() => alert(`Configuring webhook payload metrics for ${web}`)} className="text-[10px] font-black text-brand-red hover:underline uppercase cursor-pointer">Configure</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: OAUTH APPLICATIONS ==================== */}
          {activeTab === 'oauth' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">OAuth callback Redirect URIs</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Registered redirect URI:</strong> https://callback.torqueinsights.com/oauth2/callback</p>
                  <p><strong>Configured scopes:</strong> profile:read, assessment:write</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: SANDBOX TESTER ==================== */}
          {activeTab === 'sandbox' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              {/* Webhook tester form */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Simulate webhook events</h3>
                
                <div className="space-y-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Developer test endpoint</label>
                    <input 
                      type="text" 
                      value={sandboxEndpoint}
                      onChange={(e) => setSandboxEndpoint(e.target.value)}
                      placeholder="e.g. https://api.yourdomain.com/v1/webhooks"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={handleSendTestWebhook}
                    className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-black text-xs font-bold text-white uppercase cursor-pointer"
                  >
                    Send Test Payload
                  </button>
                </div>
              </div>

              {/* Console logs */}
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 shadow-sm space-y-3 font-mono text-xs text-emerald-400">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-emerald-400 animate-pulse" />
                  Terminal logs output
                </h3>
                <pre className="overflow-x-auto select-all whitespace-pre-wrap">{sandboxResponse}</pre>
              </div>
            </div>
          )}

          {/* ==================== TAB 8: DEVELOPER DOCS ==================== */}
          {activeTab === 'docs' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Getting started advisory manuals</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                  {['SDK downloads instructions', 'REST API endpoints query documentation', 'OAuth integration callbacks checklist'].map((res, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex justify-between items-center gap-4 hover:border-brand-red transition-all">
                      <span>{res}</span>
                      <button onClick={() => alert(`Opening resource: ${res}`)} className="text-[10px] font-black text-brand-red hover:underline uppercase cursor-pointer">Open</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 9: PLATFORM EVENT LOGS ==================== */}
          {activeTab === 'logs' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">System audit event logs</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {['10:15 AM - Webhook event payload delivered to Google Classroom', '09:30 AM - API Key generated by DPS Administrator'].map((log, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">{log}</div>
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
                    { label: 'Marketplace Dashboard', icon: BarChart2, tab: 'overview' },
                    { label: 'Browse Integrations', icon: Compass, tab: 'browse' },
                    { label: 'Installed Apps', icon: Briefcase, tab: 'installed' },
                    { label: 'API Keys Management', icon: Key, tab: 'api' },
                    { label: 'Webhook Webhooks', icon: Sliders, tab: 'webhooks' },
                    { label: 'OAuth Applications', icon: Lock, tab: 'oauth' },
                    { label: 'Sandbox Tester', icon: Terminal, tab: 'sandbox' },
                    { label: 'Developer Docs', icon: BookOpen, tab: 'docs' },
                    { label: 'Platform Event Logs', icon: FileText, tab: 'logs' },
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
