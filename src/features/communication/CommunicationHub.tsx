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
  Phone, Smartphone, MessageCircle, AlertTriangle, HelpCircle
} from 'lucide-react';

export const CommunicationHub: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'inbox' | 'notifications' | 'announcements' | 'campaigns' | 'templates' | 'automation' | 'history' | 'audience' | 'reports'>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Inbox & composing states
  const [inboxMessages, setInboxMessages] = useState([
    { id: 1, sender: 'Siddharth Roy', recipient: 'Dr. Sunita Mehta', subject: 'VARK Learning Style review', channel: 'In-App', priority: 'High', date: '10:15 AM', status: 'Unread' },
    { id: 2, sender: 'DPS Principal', recipient: 'Super Admin', subject: 'Integration of Google SSO', channel: 'Email', priority: 'Medium', date: '09:30 AM', status: 'Read' },
    { id: 3, sender: 'Sarah Jenkins', recipient: 'Recruiter Intake', subject: 'Hiring Campaign metrics export', channel: 'WhatsApp', priority: 'High', date: 'Yesterday', status: 'Read' }
  ]);

  const [campaignsList, setCampaignsList] = useState([
    { name: 'Class XII Streams Assessment Reminders', audience: 'Delhi Public School', channel: 'SMS', status: 'Active', scheduled: 'Aug 05, 2026' },
    { name: 'MBA Placement Registration Openings', audience: 'University Students', channel: 'Email', status: 'Draft', scheduled: 'Aug 10, 2026' }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Chart data definitions
  const channelDistribution = [
    { name: 'Email', value: 45, color: '#C62828' },
    { name: 'SMS', value: 25, color: '#1E293B' },
    { name: 'WhatsApp', value: 20, color: '#64748B' },
    { name: 'Push', value: 10, color: '#94A3B8' }
  ];

  const deliverySuccessMetrics = [
    { month: 'Jan', SuccessRate: 99.2 },
    { month: 'Feb', SuccessRate: 99.5 },
    { month: 'Mar', SuccessRate: 99.8 },
    { month: 'Apr', SuccessRate: 99.9 },
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
            { label: 'Communication Hub', icon: BarChart2, tab: 'overview' },
            { label: 'Inbox', icon: MessageSquare, tab: 'inbox' },
            { label: 'Notifications Center', icon: Bell, tab: 'notifications' },
            { label: 'Announcements', icon: Target, tab: 'announcements' },
            { label: 'Broadcast Campaigns', icon: Briefcase, tab: 'campaigns' },
            { label: 'Templates Library', icon: BookOpen, tab: 'templates' },
            { label: 'Automation Rules', icon: Sliders, tab: 'automation' },
            { label: 'Audience Directory', icon: Users, tab: 'audience' },
            { label: 'Delivery Reports', icon: FileText, tab: 'reports' },
            { label: 'Audits Logs', icon: Compass, tab: 'history' },
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
              <MessageSquare className="h-4 w-4 text-brand-red" />
              <span>Inbox Status: <strong>{inboxMessages.filter(m => m.status === 'Unread').length} Unread Messages</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search inbox logs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all"
              />
            </div>
            
            <button onClick={() => alert("Notification alerts history...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
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
                Enterprise Communication Center
              </span>
              <h1 className="text-2xl font-black tracking-tight">Notifications & Messaging Hub</h1>
              <p className="text-xs text-slate-455 font-semibold mt-1">
                Administered under representative: <span className="text-white font-black">{user.name}</span> | Cloud Integrity Status: <span className="text-brand-pink font-black">Online</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('campaigns')}
                className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer uppercase tracking-wider font-black"
              >
                Compose Campaign
              </button>
            </div>
          </div>

          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 text-left">
              
              {/* KPIs Fintech Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Messages Sent', val: '18,450 Sent', desc: 'All channels', col: 'text-slate-900' },
                  { title: 'Unread Messages', val: '12 Messages', desc: 'Inbox actions', col: 'text-slate-900' },
                  { title: 'Scheduled Campaigns', val: '2 Active', desc: 'Outbox queue', col: 'text-brand-red' },
                  { title: 'Delivery Success Rate', val: '99.9%', desc: 'SMTP / SMS Gateway', col: 'text-emerald-600' },
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
                
                {/* Channel distribution pie chart */}
                <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Delivery success trend (%)</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={deliverySuccessMetrics} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C62828" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#C62828" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                        <YAxis domain={[99, 100]} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="SuccessRate" stroke="#C62828" fillOpacity={1} fill="url(#colorSuccess)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Subscriptions distribution Pie chart */}
                <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Channel distribution</h4>
                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={channelDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {channelDistribution.map((entry, index) => (
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

          {/* ==================== TAB 2: INBOX ==================== */}
          {activeTab === 'inbox' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active Inbox list</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-bold text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-200 uppercase text-slate-400 text-[10px]">
                        <th className="py-2.5">Sender</th>
                        <th className="py-2.5">Recipient</th>
                        <th className="py-2.5">Subject</th>
                        <th className="py-2.5">Channel</th>
                        <th className="py-2.5">Priority</th>
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inboxMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 text-slate-950 font-black">{msg.sender}</td>
                          <td className="py-3">{msg.recipient}</td>
                          <td className="py-3 font-semibold">{msg.subject}</td>
                          <td className="py-3">{msg.channel}</td>
                          <td className="py-3">
                            <span className={`rounded px-2.5 py-0.5 text-[9px] font-black uppercase ${
                              msg.priority === 'High' ? 'bg-red-50 text-brand-red' : 'bg-slate-100 text-slate-700'
                            }`}>{msg.priority}</span>
                          </td>
                          <td className="py-3 font-semibold">{msg.date}</td>
                          <td className="py-3 font-semibold text-brand-red">{msg.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: NOTIFICATIONS CENTER ==================== */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Grouped platform alerts</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {[
                    'Assessment completed by Rohan Sharma (Rohan-X-A)',
                    'AI report compiled & available for Ananya Sharma',
                    'Zoom advisory appointment confirmed for Kabir Verma with Dr. Sunita Mehta'
                  ].map((notif, idx) => (
                    <div key={idx} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                      <span>{notif}</span>
                      <span className="rounded bg-brand-pink text-brand-red px-2 py-0.5 text-[9.5px] font-black uppercase border border-red-100">Notification</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: ANNOUNCEMENTS ==================== */}
          {activeTab === 'announcements' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Global system announcements</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  {['Platform server upgrades planned for Sunday, Aug 2, 2026', 'New Holland RIASEC matrix update available'].map((ann, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex justify-between items-center gap-4">
                      <span>{ann}</span>
                      <button onClick={() => alert("Publish announcement")} className="text-[10px] font-black text-brand-red hover:underline uppercase cursor-pointer">Publish</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: BROADCAST CAMPAIGNS ==================== */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active broadcast campaigns</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {campaignsList.map((camp, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl space-y-3">
                      <h5 className="text-xs font-black text-slate-950">{camp.name}</h5>
                      <div className="text-[10px] font-semibold text-slate-500 space-y-1">
                        <p><strong>Audience:</strong> {camp.audience}</p>
                        <p><strong>Channel:</strong> {camp.channel}</p>
                        <p><strong>Scheduled:</strong> {camp.scheduled}</p>
                      </div>
                      <button onClick={() => alert(`Starting Broadcast Campaign: ${camp.name}`)} className="w-full text-center py-2 bg-slate-950 hover:bg-black rounded-xl text-[9px] font-black text-white cursor-pointer uppercase">Send Now</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: TEMPLATES LIBRARY ==================== */}
          {activeTab === 'templates' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Message template directories</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {['Welcome Email template', 'Assessment Invitation SMS template', 'Report Available WhatsApp template'].map((temp, idx) => (
                    <div key={idx} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                      <span>{temp}</span>
                      <button onClick={() => alert(`Editing template: ${temp}`)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-[10px] font-black rounded-lg cursor-pointer">Edit</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: AUTOMATION RULES ==================== */}
          {activeTab === 'automation' && (
            <div className="space-y-8 text-left">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Visual workflow automation builder</h4>
                <p className="text-xs text-slate-500 font-semibold mt-1">Configure automated cross-channel notification sequences.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { trigger: 'Assessment Completed', steps: ['Generate AI Report', 'Notify Student via App', 'Email Report Link to Parent', 'Assign Advisory Session'] },
                  { trigger: 'Payment Success', steps: ['Generate Razorpay invoice PDF', 'Email Receipt to User', 'Activate Account Subscription Dashboard'] }
                ].map((rule, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm text-left">
                    <span className="rounded bg-brand-pink text-brand-red border border-red-100 px-2.5 py-1 text-[9px] font-black uppercase">Trigger: {rule.trigger}</span>
                    <div className="space-y-4 pt-3 pl-2 border-l-2 border-slate-150">
                      {rule.steps.map((st, sIdx) => (
                        <div key={sIdx} className="relative pl-6">
                          <div className="absolute -left-[23px] top-1.5 h-3 w-3 rounded-full bg-slate-950 border border-white" />
                          <h6 className="text-xs font-black text-slate-950 leading-none">{st}</h6>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 8: AUDIENCE DIRECTORY ==================== */}
          {activeTab === 'audience' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Audience Segments</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {['Students - 1,450 active profiles', 'Parents - 1,200 active profiles', 'Counselors - 24 case supervisors'].map((aud, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                      <span>{aud}</span>
                      <button onClick={() => alert(`Reviewing segment: ${aud}`)} className="text-[10px] font-black text-brand-red hover:underline uppercase cursor-pointer">Manage</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 9: DELIVERY REPORTS ==================== */}
          {activeTab === 'reports' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Delivery and Open rates audits</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {['Average Email Open Rate - 48%', 'SMS Delivery Rate - 99.8%', 'WhatsApp Response Rate - 32%'].map((rep, idx) => (
                    <div key={idx} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">{rep}</div>
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
                    { label: 'Communication Hub', icon: BarChart2, tab: 'overview' },
                    { label: 'Inbox', icon: MessageSquare, tab: 'inbox' },
                    { label: 'Notifications Center', icon: Bell, tab: 'notifications' },
                    { label: 'Announcements', icon: Target, tab: 'announcements' },
                    { label: 'Broadcast Campaigns', icon: Briefcase, tab: 'campaigns' },
                    { label: 'Templates Library', icon: BookOpen, tab: 'templates' },
                    { label: 'Automation Rules', icon: Sliders, tab: 'automation' },
                    { label: 'Audience Directory', icon: Users, tab: 'audience' },
                    { label: 'Delivery Reports', icon: FileText, tab: 'reports' },
                    { label: 'Audits Logs', icon: Compass, tab: 'history' },
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
