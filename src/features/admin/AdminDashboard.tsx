import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  BrainCircuit, Users, Award, ShieldCheck, Ticket, Plus, ChevronRight, FileText, Check,
  Search, Bell, MessageSquare, Sun, Moon, Compass, Calendar, Clock, Sparkles, TrendingUp,
  Sliders, Target, ShieldAlert, GraduationCap, Building2, Eye, Download, Info, Settings, LogOut,
  Briefcase, GitPullRequest, LayoutGrid, Heart, BarChart2, Menu, X, BookOpen, Send, Lock, Zap, Server, Key,
  HelpCircle, Palette, Globe, Shield, RefreshCw, Upload
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'directory' | 'whitelabel' | 'domains' | 'licenses' | 'packages' | 'sso' | 'api' | 'templates' | 'migration' | 'compliance' | 'audit' | 'backup'>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Environment Switcher States
  const [selectedEnv, setSelectedEnv] = useState('Production');
  const [selectedTenant, setSelectedTenant] = useState('All Organizations');

  // White label customization states
  const [selectedColor, setSelectedColor] = useState('#C62828'); // Default Torque Accent
  const [selectedSecondary, setSelectedSecondary] = useState('#1E293B'); // Slate
  const [selectedFont, setSelectedFont] = useState('Outfit');
  const [customDomainText, setCustomDomainText] = useState('career.dps.edu');
  const [domainVerified, setDomainVerified] = useState(false);

  // Multi-tenant database directories
  const [tenants, setTenants] = useState([
    { id: 't-01', name: 'Delhi Public School', type: 'School', country: 'India', plan: 'Enterprise', users: 1450, storage: '12 GB', modules: 'Student, Parent, Advisor', status: 'Active', renewal: 'Jan 15, 2027' },
    { id: 't-02', name: 'Global Tech Corp', type: 'Corporate', country: 'USA', plan: 'Enterprise Pro', users: 850, storage: '28 GB', modules: 'Corporate, AI Intelligence', status: 'Active', renewal: 'Feb 10, 2027' },
    { id: 't-03', name: 'Greenwood Academy', type: 'College', country: 'UK', plan: 'Professional', users: 320, storage: '4.5 GB', modules: 'Student, Advisor', status: 'Suspended', renewal: 'Expired' }
  ]);

  const [activeFeatures, setActiveFeatures] = useState([
    { id: 'feat-1', name: 'Student Portal', enabled: true },
    { id: 'feat-2', name: 'Parent Portal', enabled: true },
    { id: 'feat-3', name: 'AI Career Coach', enabled: true },
    { id: 'feat-4', name: 'Corporate Portal', enabled: false },
    { id: 'feat-5', name: 'SSO Integrations', enabled: true },
    { id: 'feat-6', name: 'Custom SMTP Servers', enabled: false }
  ]);

  const handleToggleFeature = (id: string) => {
    setActiveFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Chart data definitions
  const storageMetrics = [
    { name: 'Delhi Public School', Used: 12, Limit: 50 },
    { name: 'Global Tech Corp', Used: 28, Limit: 100 },
    { name: 'Greenwood Academy', Used: 4.5, Limit: 20 },
  ];

  const subscriptionDistribution = [
    { name: 'Enterprise', value: 45, color: '#C62828' },
    { name: 'Professional', value: 35, color: '#1E293B' },
    { name: 'Free Trial', value: 20, color: '#94A3B8' }
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
            { label: 'Tenant Directory', icon: Building2, tab: 'directory' },
            { label: 'White Label Styling', icon: Palette, tab: 'whitelabel' },
            { label: 'Domains Manager', icon: Globe, tab: 'domains' },
            { label: 'Licenses Registry', icon: Users, tab: 'licenses' },
            { label: 'Feature Packages', icon: Sliders, tab: 'packages' },
            { label: 'SSO & Identity', icon: Lock, tab: 'sso' },
            { label: 'API Keys Registry', icon: Key, tab: 'api' },
            { label: 'Tenant Templates', icon: Briefcase, tab: 'templates' },
            { label: 'Migration Center', icon: RefreshCw, tab: 'migration' },
            { label: 'Compliance Audits', icon: Shield, tab: 'compliance' },
            { label: 'Audit Logs Log', icon: FileText, tab: 'audit' },
            { label: 'Backup Recovery', icon: Server, tab: 'backup' },
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
                value={selectedTenant} 
                onChange={(e) => setSelectedTenant(e.target.value)} 
                className="bg-slate-100 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-900 border-none cursor-pointer focus:outline-none uppercase"
              >
                <option value="All Organizations">All Organizations</option>
                <option value="Delhi Public School">Delhi Public School</option>
                <option value="Global Tech Corp">Global Tech Corp</option>
              </select>

              <select 
                value={selectedEnv} 
                onChange={(e) => setSelectedEnv(e.target.value)} 
                className="bg-slate-100 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-900 border-none cursor-pointer focus:outline-none uppercase"
              >
                <option value="Production">Production</option>
                <option value="Staging">Sandbox</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search organizations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all"
              />
            </div>
            
            <button onClick={() => alert("Platform alerts panel...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
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
          
          {/* Hero Header block */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md text-left">
            <div className="space-y-1">
              <span className="rounded bg-brand-red px-2.5 py-1 text-[10px] font-black uppercase text-white tracking-wider">
                Multi-Tenant Administration Panel
              </span>
              <h1 className="text-2xl font-black tracking-tight">SaaS Organization Console</h1>
              <p className="text-xs text-slate-450 font-semibold mt-1">
                Linked Operator: <span className="text-white font-black">{user.name}</span> | Cloud Integrity Status: <span className="text-brand-pink font-black">Verified Secure</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('whitelabel')}
                className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer uppercase tracking-wider font-black"
              >
                Configure Branding
              </button>
            </div>
          </div>

          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 text-left">
              
              {/* KPIs Summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Total SaaS Tenants', val: '4,200', desc: 'Organizations Active', col: 'text-slate-900' },
                  { title: 'Licensed User Seats', val: '1,45,000 Seats', desc: 'Assigned active pools', col: 'text-slate-900' },
                  { title: 'Monthly Active Users', val: '42,000 Users', desc: 'Active diagnostics logs', col: 'text-brand-red' },
                  { title: 'Platform Utilization', val: '99.98%', desc: 'Cloud Service SLA', col: 'text-emerald-600' },
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
                
                {/* Storage consumption */}
                <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Active Tenant Storage Consumption (GB)</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={storageMetrics} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                        <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Used" fill="#C62828" name="Used Space" radius={[4, 4, 0, 0]} barSize={25} />
                        <Bar dataKey="Limit" fill="#1E293B" name="Allowed Limit" radius={[4, 4, 0, 0]} barSize={25} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Subscriptions distribution Pie chart */}
                <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">SaaS Subscriptions distribution</h4>
                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subscriptionDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {subscriptionDistribution.map((entry, index) => (
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

          {/* ==================== TAB 2: TENANT DIRECTORY ==================== */}
          {activeTab === 'directory' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Active Tenant Subscriptions</h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-bold text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-200 uppercase text-slate-400 text-[10px]">
                        <th className="py-2.5">Tenant Name</th>
                        <th className="py-2.5">Type</th>
                        <th className="py-2.5">Country</th>
                        <th className="py-2.5">Plan</th>
                        <th className="py-2.5">Active Users</th>
                        <th className="py-2.5">Modules Enabled</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {tenants.map((org) => (
                        <tr key={org.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 text-slate-950 font-black">{org.name}</td>
                          <td className="py-3">{org.type}</td>
                          <td className="py-3">{org.country}</td>
                          <td className="py-3">{org.plan}</td>
                          <td className="py-3 text-slate-500 font-semibold">{org.users}</td>
                          <td className="py-3 text-slate-500 font-semibold">{org.modules}</td>
                          <td className="py-3">
                            <span className={`rounded px-2 py-0.5 text-[8.5px] font-black uppercase ${
                              org.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-brand-red animate-pulse'
                            }`}>{org.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: WHITE LABEL STYLING ==================== */}
          {activeTab === 'whitelabel' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
              {/* Styling customizers */}
              <div className="lg:col-span-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Custom branding themes</h3>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Primary color accent</label>
                    <div className="flex gap-2">
                      {['#C62828', '#1E3A8A', '#10B981', '#F59E0B'].map((color) => (
                        <button 
                          key={color} 
                          onClick={() => setSelectedColor(color)}
                          className={`h-6 w-6 rounded-full border cursor-pointer ${selectedColor === color ? 'ring-2 ring-slate-800' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Brand Typography font</label>
                    <select 
                      value={selectedFont} 
                      onChange={(e) => setSelectedFont(e.target.value)}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none"
                    >
                      <option value="Outfit">Outfit (Default)</option>
                      <option value="Inter">Inter (Canvas Style)</option>
                      <option value="Geist">Geist (Modern SaaS)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Real-time Theme Preview */}
              <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Theme Live Preview</h3>
                
                {/* Client Banner Preview */}
                <div className="rounded-2xl p-5 border border-slate-100 shadow-inner space-y-3" style={{ fontFamily: selectedFont }}>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded flex items-center justify-center text-white text-[10px] font-black" style={{ backgroundColor: selectedColor }}>
                        L
                      </div>
                      <span className="text-xs font-black text-slate-900">Custom Workspace Login</span>
                    </div>
                    <span className="text-[9px] font-black uppercase text-slate-400">Verifying custom domain settings...</span>
                  </div>

                  <div className="rounded-xl p-4 text-white text-xs font-bold text-left space-y-1" style={{ backgroundColor: selectedColor }}>
                    <h4>Welcome to Career portal!</h4>
                    <p className="text-[10px] text-white/80 font-normal">Shape your future with verified diagnostics matches.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: DOMAINS MANAGER ==================== */}
          {activeTab === 'domains' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">DNS Domain Configuration</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={customDomainText}
                      onChange={(e) => setCustomDomainText(e.target.value)}
                      placeholder="e.g. career.dps.edu"
                      className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                    />
                    <button 
                      onClick={() => {
                        setDomainVerified(true);
                        alert("Custom domain DNS verification checks passed! SSL Certificate issued.");
                      }}
                      className="px-4.5 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-black font-black uppercase tracking-wider cursor-pointer"
                    >
                      Verify DNS
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <div className={`h-2.5 w-2.5 rounded-full ${domainVerified ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span>SSL Certificate Status: {domainVerified ? 'Active (Verified)' : 'Pending Verification'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: LICENSES REGISTRY ==================== */}
          {activeTab === 'licenses' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Tenant License limits</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {tenants.map((t) => (
                    <div key={t.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                      <span>{t.name}</span>
                      <span className="font-mono font-bold text-slate-500">{t.users} / 5000 Seats Assigned</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: FEATURE PACKAGES ==================== */}
          {activeTab === 'packages' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Global Feature Packages matrix</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeFeatures.map((feat) => (
                    <div key={feat.id} className="rounded-xl border border-slate-200 p-4 flex justify-between items-center gap-4 hover:border-brand-red transition-all">
                      <div>
                        <h5 className="text-xs font-black text-slate-950">{feat.name}</h5>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Status: {feat.enabled ? 'Enabled' : 'Disabled'}</p>
                      </div>
                      <button 
                        onClick={() => handleToggleFeature(feat.id)}
                        className={`px-3 py-1.5 rounded-xl text-[9.5px] font-black uppercase cursor-pointer ${
                          feat.enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-brand-red'
                        }`}
                      >
                        {feat.enabled ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: SSO & IDENTITY ==================== */}
          {activeTab === 'sso' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Single Sign-On (SSO) configurations</h4>
                
                <div className="space-y-4 text-xs font-bold text-slate-700">
                  {['Google Workspace SSO', 'Microsoft Entra ID login', 'Okta Identity Provider'].map((sso, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex justify-between items-center gap-4">
                      <span>{sso}</span>
                      <button onClick={() => alert(`Configuring SSO credentials metadata for ${sso}`)} className="text-[10px] font-black text-brand-red hover:underline uppercase cursor-pointer">Configure</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 8: API KEYS REGISTRY ==================== */}
          {activeTab === 'api' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">API Developer Credentials</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Environment:</strong> Production Developer Gateway</p>
                  <p><strong>Rate limits:</strong> 1000 requests / minute default.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 9: TENANT TEMPLATES ==================== */}
          {activeTab === 'templates' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">SaaS tenant cloning templates</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['School template workspace', 'University custom portal template', 'Corporate onboarding blueprint'].map((temp, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl space-y-3 text-left">
                      <h5 className="text-xs font-black text-slate-950">{temp}</h5>
                      <p className="text-[10px] text-slate-450 font-semibold leading-relaxed">Default configuration mapped to appropriate portfolios and learning roadmap milestones.</p>
                      <button onClick={() => alert(`Cloned template: ${temp}`)} className="w-full py-2 rounded-xl bg-slate-950 hover:bg-black text-[9px] font-black text-white uppercase cursor-pointer">Apply settings</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 10: MIGRATION CENTER ==================== */}
          {activeTab === 'migration' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Tenant Migration logs</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Latest operation:</strong> Users import CSV file DPS-ClassXII.csv</p>
                  <p><strong>Migration Status:</strong> Completed (120 accounts synced successfully).</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 11: COMPLIANCE AUDITS ==================== */}
          {activeTab === 'compliance' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Regulatory compliance metrics</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p>GDPR consent controls verified across all independent European tenants workspaces.</p>
                  <p>FERPA compliance active for secondary education institution records.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 12: AUDIT LOGS LOG ==================== */}
          {activeTab === 'audit' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Operator Audit Logs</h4>
                
                <div className="space-y-2.5 text-xs font-semibold text-slate-700">
                  {['10:15 AM - Siddharth Roy changed default primary colors to #10B981', '09:30 AM - Verification verified DNS custom domain for Global Tech Corp'].map((log, idx) => (
                    <div key={idx} className="p-3 border border-slate-150 rounded-xl bg-slate-50/50">{log}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 13: BACKUP RECOVERY ==================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Database Backup Scheduling</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Frequency:</strong> Scheduled every 12 hours automatically.</p>
                  <p><strong>Latest snapshot point:</strong> Completed July 29, 2026, 09:00 PM.</p>
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
                    { label: 'Tenant Directory', icon: Building2, tab: 'directory' },
                    { label: 'White Label Styling', icon: Palette, tab: 'whitelabel' },
                    { label: 'Domains Manager', icon: Globe, tab: 'domains' },
                    { label: 'Licenses Registry', icon: Users, tab: 'licenses' },
                    { label: 'Feature Packages', icon: Sliders, tab: 'packages' },
                    { label: 'SSO & Identity', icon: Lock, tab: 'sso' },
                    { label: 'API Keys Registry', icon: Key, tab: 'api' },
                    { label: 'Tenant Templates', icon: Briefcase, tab: 'templates' },
                    { label: 'Migration Center', icon: RefreshCw, tab: 'migration' },
                    { label: 'Compliance Audits', icon: Shield, tab: 'compliance' },
                    { label: 'Audit Logs Log', icon: FileText, tab: 'audit' },
                    { label: 'Backup Recovery', icon: Server, tab: 'backup' },
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
