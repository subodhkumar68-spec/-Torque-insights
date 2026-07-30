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
  Phone, Smartphone, MessageCircle, AlertTriangle, HelpCircle, Server, Key, Globe, Shield, Terminal, Zap, Code, Lock, Palette
} from 'lucide-react';

export const SettingsCenter: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'auth' | 'security' | 'compliance' | 'audit' | 'backup' | 'monitoring' | 'flags' | 'developer'>('general');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Switchers / State mocks
  const [selectedEnv, setSelectedEnv] = useState('Production');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Branding Customizer States
  const [primaryColor, setPrimaryColor] = useState('#C62828');
  const [timezoneText, setTimezoneText] = useState('GMT+5:30 (India Standard Time)');

  // Feature Flags List
  const [featureFlags, setFeatureFlags] = useState([
    { name: 'Assessment Engine', status: 'Enabled' },
    { name: 'AI Career Coach', status: 'Enabled' },
    { name: 'Career Roadmap', status: 'Beta' },
    { name: 'Institution Portal', status: 'Enabled' },
    { name: 'Corporate Portal', status: 'Enabled' }
  ]);

  const handleToggleFlag = (name: string) => {
    setFeatureFlags(prev => prev.map(f => {
      if (f.name === name) {
        const nextStatus = f.status === 'Enabled' ? 'Beta' : f.status === 'Beta' ? 'Disabled' : 'Enabled';
        return { ...f, status: nextStatus };
      }
      return f;
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Chart data definitions
  const systemPerformanceData = [
    { time: '10:00', CPU: 12, Memory: 42 },
    { time: '11:00', CPU: 18, Memory: 45 },
    { time: '12:00', CPU: 15, Memory: 43 },
    { time: '13:00', CPU: 24, Memory: 48 },
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
            { label: 'General Settings', icon: Settings, tab: 'general' },
            { label: 'Branding Styling', icon: Palette, tab: 'branding' },
            { label: 'Authentication', icon: Lock, tab: 'auth' },
            { label: 'Security Center', icon: ShieldCheck, tab: 'security' },
            { label: 'Compliance Dashboard', icon: Shield, tab: 'compliance' },
            { label: 'Audit Logs Logs', icon: FileText, tab: 'audit' },
            { label: 'Backup Recovery', icon: Server, tab: 'backup' },
            { label: 'Monitoring Stats', icon: TrendingUp, tab: 'monitoring' },
            { label: 'Feature Flags', icon: Sliders, tab: 'flags' },
            { label: 'Developer Options', icon: Code, tab: 'developer' },
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
                placeholder="Search settings..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all"
              />
            </div>
            
            <button onClick={() => alert("Security threat dashboard alerts...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
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
                System Administration
              </span>
              <h1 className="text-2xl font-black tracking-tight">Security & Compliance Suite</h1>
              <p className="text-xs text-slate-455 font-semibold mt-1">
                Administered under representative: <span className="text-white font-black">{user.name}</span> | Authentication Status: <span className="text-emerald-450 font-black">92/100 Security Score</span>
              </p>
            </div>
          </div>

          {/* ==================== TAB 1: GENERAL SETTINGS ==================== */}
          {activeTab === 'general' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Global Platform Settings</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <p><strong>Platform Name:</strong> Torque Insights</p>
                  <p><strong>Support Contact:</strong> tech-support@torqueinsights.com</p>
                  <p><strong>System Timezone:</strong> {timezoneText}</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: BRANDING STYLING ==================== */}
          {activeTab === 'branding' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              {/* Branding configs */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Branding Customizer</h3>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Primary theme accent</label>
                    <div className="flex gap-2">
                      {['#C62828', '#1E3A8A', '#10B981'].map((color) => (
                        <button 
                          key={color} 
                          onClick={() => setPrimaryColor(color)}
                          className={`h-6 w-6 rounded-full border cursor-pointer ${primaryColor === color ? 'ring-2 ring-slate-800' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Styling Preview</h3>
                <div className="rounded-2xl p-5 border border-slate-100 shadow-inner flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded flex items-center justify-center text-white text-[10px] font-black" style={{ backgroundColor: primaryColor }}>T</div>
                    <span className="text-xs font-black text-slate-900">Accents Preview</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: AUTHENTICATION ==================== */}
          {activeTab === 'auth' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Identity & SSO Configuration</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <h5 className="text-xs font-black text-slate-950">Multi-Factor Authentication (MFA)</h5>
                      <p className="text-[10px] text-slate-400 font-semibold">Enforce MFA credentials for super admins.</p>
                    </div>
                    <button 
                      onClick={() => setMfaEnabled(!mfaEnabled)} 
                      className={`px-4.5 py-2.5 rounded-xl text-xs font-black uppercase cursor-pointer ${
                        mfaEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-brand-red'
                      }`}
                    >
                      {mfaEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: SECURITY CENTER ==================== */}
          {activeTab === 'security' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active security controls</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <p><strong>Failed logins:</strong> 0 attempts flagged in past 24 hours.</p>
                  <p><strong>Blocked accounts:</strong> 0 active lockouts.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: COMPLIANCE DASHBOARD ==================== */}
          {activeTab === 'compliance' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Compliance dashboards</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['GDPR Privacy Consent', 'FERPA Student Records Compliance', 'SOC 2 Security Framework'].map((comp, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex justify-between items-center gap-4">
                      <span>{comp}</span>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 rounded px-2.5 py-1 text-[9px] font-black uppercase">Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: AUDIT LOGS LOGS ==================== */}
          {activeTab === 'audit' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">System audit event logs</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {['10:15 AM - MFA policy updated to Enforce', '09:30 AM - Verification certificate generated for DPS School'].map((log, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">{log}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: BACKUP RECOVERY ==================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Backup Scheduling</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Frequency:</strong> Every 12 hours automatically.</p>
                  <p><strong>Latest snapshot point:</strong> Completed July 29, 2026, 09:00 PM.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 8: MONITORING STATS ==================== */}
          {activeTab === 'monitoring' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Platform resource trends</h4>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={systemPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="CPU" stroke="#C62828" name="CPU utilization" />
                      <Line type="monotone" dataKey="Memory" stroke="#1E293B" name="Memory utilization" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 9: FEATURE FLAGS ==================== */}
          {activeTab === 'flags' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Feature toggles</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featureFlags.map((flag) => (
                    <div key={flag.name} className="rounded-xl border border-slate-200 p-4 flex justify-between items-center gap-4 hover:border-brand-red transition-all">
                      <div>
                        <h5 className="text-xs font-black text-slate-950">{flag.name}</h5>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Status: {flag.status}</p>
                      </div>
                      <button 
                        onClick={() => handleToggleFlag(flag.name)}
                        className={`px-3 py-1.5 rounded-xl text-[9.5px] font-black uppercase cursor-pointer ${
                          flag.status === 'Enabled' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-brand-red'
                        }`}
                      >
                        Toggle flag
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 10: DEVELOPER OPTIONS ==================== */}
          {activeTab === 'developer' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Developer settings</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <h5 className="text-xs font-black text-slate-955">Platform Maintenance Mode</h5>
                      <p className="text-[10px] text-slate-400 font-semibold">Place client dashboards under maintenance.</p>
                    </div>
                    <button 
                      onClick={() => setMaintenanceMode(!maintenanceMode)} 
                      className={`px-4.5 py-2.5 rounded-xl text-xs font-black uppercase cursor-pointer ${
                        maintenanceMode ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-brand-red'
                      }`}
                    >
                      {maintenanceMode ? 'Enabled' : 'Disabled'}
                    </button>
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
                    { label: 'General Settings', icon: Settings, tab: 'general' },
                    { label: 'Branding Styling', icon: Palette, tab: 'branding' },
                    { label: 'Authentication', icon: Lock, tab: 'auth' },
                    { label: 'Security Center', icon: ShieldCheck, tab: 'security' },
                    { label: 'Compliance Dashboard', icon: Shield, tab: 'compliance' },
                    { label: 'Audit Logs Logs', icon: FileText, tab: 'audit' },
                    { label: 'Backup Recovery', icon: Server, tab: 'backup' },
                    { label: 'Monitoring Stats', icon: TrendingUp, tab: 'monitoring' },
                    { label: 'Feature Flags', icon: Sliders, tab: 'flags' },
                    { label: 'Developer Options', icon: Code, tab: 'developer' },
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
