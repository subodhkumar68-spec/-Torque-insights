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
  Briefcase, GitPullRequest, LayoutGrid, Heart, BarChart2, Menu, X, BookOpen, Send, CreditCard, DollarSign, ArrowUpRight, Percent, ShieldQuestion, HelpCircle
} from 'lucide-react';

export const BillingDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Navigation states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'subscriptions' | 'plans' | 'payments' | 'history' | 'invoices' | 'licenses' | 'coupons' | 'contracts' | 'usage' | 'renewals' | 'reports'>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Switchers / Settings
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Coupon Generator States
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponValue, setCouponValue] = useState(15);
  const [couponsList, setCouponsList] = useState([
    { code: 'TORQUE20', type: 'Percentage', value: 20, validity: 'Dec 31, 2026', usage: '1,240 uses', status: 'Active' },
    { code: 'INSTITUTION50', type: 'Percentage', value: 50, validity: 'Oct 15, 2026', usage: '45 uses', status: 'Active' },
    { code: 'CORPFREE', type: 'Trial Upgrade', value: 100, validity: 'Expired', usage: '12 uses', status: 'Deactivated' }
  ]);

  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pm-1', type: 'Credit Card', name: 'Visa ending in 4242', default: true },
    { id: 'pm-2', type: 'UPI', name: 'torque@razorpay', default: false }
  ]);

  // Invoices Directory
  const invoicesList = [
    { number: 'INV-2026-001', date: 'July 28, 2026', amount: '₹12,500', status: 'Paid', due: 'Paid', download: '#' },
    { number: 'INV-2026-002', date: 'July 25, 2026', amount: '₹84,000', status: 'Paid', due: 'Paid', download: '#' },
    { number: 'INV-2026-003', date: 'July 18, 2026', amount: '₹2,50,000', status: 'Overdue', due: 'July 28, 2026', download: '#' }
  ];

  // Enterprise Contracts
  const contractsList = [
    { org: 'Delhi Public School', value: '₹1,45,000', duration: '12 Months', renewal: 'Jan 15, 2027', manager: 'Amit Roy', status: 'Active' },
    { org: 'Global Tech Corp', value: '₹2,85,000', duration: '12 Months', renewal: 'Feb 10, 2027', manager: 'Sunita Mehta', status: 'Active' }
  ];

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;

    setCouponsList(prev => [
      ...prev,
      { code: couponCodeInput.toUpperCase(), type: 'Percentage', value: couponValue, validity: 'Dec 31, 2026', usage: '0 uses', status: 'Active' }
    ]);
    setCouponCodeInput('');
    alert(`Coupon code ${couponCodeInput.toUpperCase()} generated successfully!`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Chart data definitions
  const monthlyRevenueData = [
    { month: 'Jan', Individual: 120000, Institution: 280000, Corporate: 150000 },
    { month: 'Feb', Individual: 150000, Institution: 310000, Corporate: 180000 },
    { month: 'Mar', Individual: 180000, Institution: 340000, Corporate: 250000 },
    { month: 'Apr', Individual: 220000, Institution: 450000, Corporate: 320000 },
  ];

  const subscriptionDistribution = [
    { name: 'Professional Student', value: 55, color: '#C62828' },
    { name: 'Institution Pro', value: 30, color: '#1E293B' },
    { name: 'Enterprise Corporate', value: 15, color: '#94A3B8' }
  ];

  const licensesUtilization = [
    { name: 'DPS Main', Assigned: 420, Available: 500 },
    { name: 'Global Tech', Assigned: 780, Available: 1000 },
    { name: 'Greenwood', Assigned: 45, Available: 50 },
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
            { label: 'Billing Dashboard', icon: BarChart2, tab: 'overview' },
            { label: 'Subscriptions', icon: Users, tab: 'subscriptions' },
            { label: 'Plans Catalog', icon: Award, tab: 'plans' },
            { label: 'Payment Methods', icon: CreditCard, tab: 'payments' },
            { label: 'Payment History', icon: Compass, tab: 'history' },
            { label: 'Invoice Center', icon: FileText, tab: 'invoices' },
            { label: 'Licenses Registry', icon: Sliders, tab: 'licenses' },
            { label: 'Coupons Manager', icon: Ticket, tab: 'coupons' },
            { label: 'Enterprise Contracts', icon: Briefcase, tab: 'contracts' },
            { label: 'Usage Analytics', icon: TrendingUp, tab: 'usage' },
            { label: 'Renewal Center', icon: Clock, tab: 'renewals' },
            { label: 'Revenue Reports', icon: FileText, tab: 'reports' },
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

            {/* Active Subscription badge peek */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <DollarSign className="h-4 w-4 text-brand-red" />
              <span>Current Plan: <strong>Enterprise Elite</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search invoices..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-transparent transition-all"
              />
            </div>
            
            <button onClick={() => alert("Billing alerts & invoice reminders...")} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
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
                Fintech Billing Console
              </span>
              <h1 className="text-2xl font-black tracking-tight">Subscription & Billing Suite</h1>
              <p className="text-xs text-slate-455 font-semibold mt-1">
                Administered under representative: <span className="text-white font-black">{user.name}</span> | API Integrations status: <span className="text-brand-pink font-black">Razorpay Sandboxed</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('plans')}
                className="rounded-xl bg-brand-red hover:bg-brand-redhover px-4.5 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer uppercase tracking-wider font-black"
              >
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 text-left">
              
              {/* KPIs Fintech Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Active Subscriptions', val: '1,240 Plans', desc: 'Tenants active', col: 'text-slate-900' },
                  { title: 'Monthly Revenue', val: '₹42,50,000', desc: 'SaaS Invoices', col: 'text-slate-900' },
                  { title: 'Pending Payments', val: '8 Invoices', desc: 'Outstanding dues', col: 'text-brand-red' },
                  { title: 'License Utilization', val: '82% seats', desc: 'Allocated count', col: 'text-emerald-600' },
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
                
                {/* Monthly revenue bar chart */}
                <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Monthly SaaS Billing Revenue (INR)</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                        <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Individual" fill="#C62828" name="Students/Parents" stackId="a" />
                        <Bar dataKey="Institution" fill="#1E293B" name="Institutions" stackId="a" />
                        <Bar dataKey="Corporate" fill="#94A3B8" name="Corporate Groups" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Subscriptions distribution Pie chart */}
                <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">SaaS subscriptions distribution</h4>
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

          {/* ==================== TAB 2: SUBSCRIPTIONS ==================== */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active Subscription overview</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-700">
                  <p><strong>Current Active Plan:</strong> Enterprise Elite</p>
                  <p><strong>Billing Cycle:</strong> Annual Auto-renewal active</p>
                  <p><strong>Next Renewal Date:</strong> Jan 15, 2027</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: PLANS CATALOG ==================== */}
          {activeTab === 'plans' && (
            <div className="space-y-8 text-left">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Pricing Plan Catalog</h4>
                <p className="text-xs text-slate-500 font-semibold mt-1">Upgrade or scale your licensing boundaries.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Starter Plan', price: '₹999/mo', users: '1 User', assessments: 'Full personality inventory', coach: 'Standard AI Assistant' },
                  { name: 'Institution Plan', price: '₹12,500/mo', users: 'Up to 500 Seats', assessments: 'Full diagnostic campaigns', coach: 'High-priority AI Coach' },
                  { name: 'Enterprise Corporate', price: 'Custom Quote', users: 'Unlimited Users', assessments: 'Full API suite integrations', coach: 'Dedicated Counselor channels' }
                ].map((plan, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 flex flex-col justify-between hover:border-brand-red transition-all">
                    <div className="space-y-3">
                      <h5 className="text-base font-black text-slate-900">{plan.name}</h5>
                      <div className="text-2xl font-black text-brand-red">{plan.price}</div>
                      <div className="text-xs font-semibold text-slate-500 space-y-2 pt-2">
                        <p className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> {plan.users}</p>
                        <p className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> {plan.assessments}</p>
                        <p className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> {plan.coach}</p>
                      </div>
                    </div>
                    <button onClick={() => alert(`Upgrading package subscription: ${plan.name}`)} className="w-full text-center py-2.5 bg-slate-950 hover:bg-black rounded-xl text-xs font-black text-white cursor-pointer uppercase tracking-wider">Choose Plan</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 4: PAYMENT METHODS ==================== */}
          {activeTab === 'payments' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Verified Payment profiles</h4>
                
                <div className="space-y-3">
                  {paymentMethods.map((pm) => (
                    <div key={pm.id} className="rounded-xl border border-slate-200 p-4.5 flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-slate-455" />
                        <div>
                          <h5 className="text-xs font-black text-slate-955">{pm.name}</h5>
                          <span className="text-[9.5px] text-slate-400 font-bold uppercase mt-0.5">{pm.type}</span>
                        </div>
                      </div>
                      {pm.default ? (
                        <span className="rounded bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-0.5 text-[8.5px] font-black uppercase">Default</span>
                      ) : (
                        <button onClick={() => alert("Set payment profile default")} className="text-[9px] font-black text-brand-red hover:underline uppercase cursor-pointer">Set Default</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: PAYMENT HISTORY ==================== */}
          {activeTab === 'history' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Razorpay checkout transaction logs</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {invoicesList.map((inv, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                      <div>
                        <p className="font-bold text-slate-955">{inv.number}</p>
                        <p className="text-[9.5px] text-slate-400 font-bold uppercase mt-0.5">Date: {inv.date}</p>
                      </div>
                      <span className="font-mono font-bold text-brand-red">{inv.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: INVOICE CENTER ==================== */}
          {activeTab === 'invoices' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Download billing invoices</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {invoicesList.map((inv, idx) => (
                    <div key={idx} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                      <span>{inv.number} ({inv.amount})</span>
                      <div className="flex gap-2">
                        <button onClick={() => alert(`Downloading Invoice: ${inv.number}`)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-[10px] font-black rounded-lg cursor-pointer">PDF</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: LICENSES REGISTRY ==================== */}
          {activeTab === 'licenses' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active License allocations</h4>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={licensesUtilization} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10, fontWeight: 750 }} />
                      <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Assigned" fill="#C62828" name="Assigned Seats" radius={[4, 4, 0, 0]} barSize={25} />
                      <Bar dataKey="Available" fill="#1E293B" name="Maximum Limit" radius={[4, 4, 0, 0]} barSize={25} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 8: COUPONS MANAGER ==================== */}
          {activeTab === 'coupons' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
              {/* Generator Form */}
              <div className="lg:col-span-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Generate coupon keys</h3>
                
                <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Coupon code key</label>
                    <input 
                      type="text" 
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      placeholder="e.g. SUMMER25"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Discount value %</label>
                    <input 
                      type="number" 
                      value={couponValue}
                      onChange={(e) => setCouponValue(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-black text-xs font-bold text-white uppercase cursor-pointer">Generate Code</button>
                </form>
              </div>

              {/* Coupons Registry directory list */}
              <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Active discount coupons</h3>
                
                <div className="divide-y divide-slate-100">
                  {couponsList.map((cp) => (
                    <div key={cp.code} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                      <div>
                        <h4 className="text-xs font-black text-slate-955">{cp.code}</h4>
                        <p className="text-[9.5px] text-slate-400 font-bold uppercase mt-0.5">Discount: {cp.value}% · Validity: {cp.validity}</p>
                      </div>
                      <span className={`rounded px-2.5 py-1 text-[9px] font-black uppercase ${
                        cp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-brand-red'
                      }`}>{cp.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 9: ENTERPRISE CONTRACTS ==================== */}
          {activeTab === 'contracts' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Enterprise Contract schedules</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-bold text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-200 uppercase text-slate-400 text-[10px]">
                        <th className="py-2.5">Organization</th>
                        <th className="py-2.5">Value (INR)</th>
                        <th className="py-2.5">Duration</th>
                        <th className="py-2.5">Renewal Date</th>
                        <th className="py-2.5">Account Manager</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {contractsList.map((cont, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 text-slate-955 font-black">{cont.org}</td>
                          <td className="py-3 text-brand-red font-black">{cont.value}</td>
                          <td className="py-3 font-semibold">{cont.duration}</td>
                          <td className="py-3 font-semibold">{cont.renewal}</td>
                          <td className="py-3 text-slate-500 font-semibold">{cont.manager}</td>
                          <td className="py-3">
                            <span className="rounded bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-0.5 text-[8.5px] font-black uppercase">{cont.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 10: USAGE ANALYTICS ==================== */}
          {activeTab === 'usage' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Tenant API calls usage limits</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-650">
                  <p><strong>Monthly API calls:</strong> 25,400 requests compiled.</p>
                  <p><strong>AI credits spent:</strong> 4,200 requests from daily counselor chats.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 11: RENEWAL CENTER ==================== */}
          {activeTab === 'renewals' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Upcoming Renewals tracker</h4>
                
                <div className="space-y-3 font-semibold text-xs text-slate-655">
                  <p>No billing accounts renewals due within the next 30 days.</p>
                  <p>All active enterprise contracts status verified.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 12: REVENUE REPORTS ==================== */}
          {activeTab === 'reports' && (
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Export billing transaction sheets</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  {['Monthly Revenue Trend Sheet', 'Payment Success Rate Audits', 'Failed Transaction Ledger'].map((rep, idx) => (
                    <div key={idx} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                      <span>{rep}</span>
                      <div className="flex gap-2">
                        <button onClick={() => alert(`Exporting report: ${rep}`)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-[10px] font-black rounded-lg cursor-pointer">CSV</button>
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
                    { label: 'Billing Dashboard', icon: BarChart2, tab: 'overview' },
                    { label: 'Subscriptions', icon: Users, tab: 'subscriptions' },
                    { label: 'Plans Catalog', icon: Award, tab: 'plans' },
                    { label: 'Payment Methods', icon: CreditCard, tab: 'payments' },
                    { label: 'Payment History', icon: Compass, tab: 'history' },
                    { label: 'Invoice Center', icon: FileText, tab: 'invoices' },
                    { label: 'Licenses Registry', icon: Sliders, tab: 'licenses' },
                    { label: 'Coupons Manager', icon: Ticket, tab: 'coupons' },
                    { label: 'Enterprise Contracts', icon: Briefcase, tab: 'contracts' },
                    { label: 'Usage Analytics', icon: TrendingUp, tab: 'usage' },
                    { label: 'Renewal Center', icon: Clock, tab: 'renewals' },
                    { label: 'Revenue Reports', icon: FileText, tab: 'reports' },
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
