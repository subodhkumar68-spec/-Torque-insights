import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Mail, ShieldAlert, ArrowRight, UserCheck, 
  ShieldCheck, Lock, CheckCircle, Sparkles, ChevronRight, Eye, EyeOff 
} from 'lucide-react';

export const Login: React.FC = () => {
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  
  // Views: 'login' | 'forgot' | 'forgot_success'
  const [view, setView] = useState<'login' | 'forgot' | 'forgot_success'>('login');
  
  // Form fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation / Loading states
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Email Validation helper
  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      setEmailError('Email address is required');
      return false;
    } else if (!re.test(val)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError(null);
    return true;
  };

  // Password Validation helper
  const validatePassword = (val: string) => {
    if (!val) {
      setPasswordError('Password is required');
      return false;
    } else if (val.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const isEmailValid = validateEmail(email);
    const isPassValid = validatePassword(password);
    
    if (!isEmailValid || !isPassValid) return;

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.error || 'Invalid credentials or user does not exist');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateEmail(email)) return;
    
    setLoading(true);
    try {
      const res = await resetPassword(email);
      if (res.success) {
        setView('forgot_success');
      } else {
        setError(res.error || 'Failed to send reset link.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (quickEmail: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await login(quickEmail, 'password123');
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.error || 'Quick login failed');
      }
    } catch (err) {
      setError('Error signing in.');
    } finally {
      setLoading(false);
    }
  };

  const redirectUser = (role: string) => {
    switch (role) {
      case 'student': navigate('/dashboard/student'); break;
      case 'parent': navigate('/dashboard/parent'); break;
      case 'counselor': navigate('/dashboard/counselor'); break;
      case 'school_admin': navigate('/dashboard/school'); break;
      case 'college_admin': navigate('/dashboard/college'); break;
      case 'corporate_hr': navigate('/dashboard/corporate'); break;
      case 'admin': navigate('/dashboard/admin'); break;
      default: navigate('/');
    }
  };

  const quickRoles = [
    { label: 'Student', email: 'rohan@example.com' },
    { label: 'Parent', email: 'alok@example.com' },
    { label: 'Counselor', email: 'sunita@example.com' },
    { label: 'School Admin', email: 'dps@example.com' },
    { label: 'College Admin', email: 'dean@iim.edu' },
    { label: 'Corporate HR', email: 'megha.recruiter@tata.com' },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white font-sans text-slate-800">
      
      {/* LEFT COLUMN: Login Screen / Forgot Password Forms */}
      <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-12 lg:p-20 relative bg-white">
        
        {/* Top Logo */}
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white shadow-sm shadow-red-500/10">
              <BrainCircuit className="h-5.5 w-5.5" />
            </div>
            <span className="font-sans text-lg font-black tracking-tight text-slate-950">
              Torque <span className="text-brand-red">Insights</span>
            </span>
          </Link>
          {view === 'login' && (
            <p className="text-xs font-bold text-slate-400">
              New to Torque?{' '}
              <Link to="/signup" className="text-brand-red hover:underline font-black">
                Create Account
              </Link>
            </p>
          )}
        </div>

        {/* Form Container */}
        <div className="my-auto max-w-md w-full mx-auto py-12">
          <AnimatePresence mode="wait">
            
            {/* LOGIN FORM VIEW */}
            {view === 'login' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Welcome Back</h2>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Continue your journey with Torque Insights</p>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-100 p-3.5 flex items-center gap-2 text-xs font-semibold text-brand-red leading-relaxed">
                    <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onBlur={() => validateEmail(email)}
                        onChange={(e) => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }}
                        placeholder="e.g. name@domain.com"
                        className={`w-full rounded-xl border pl-9 pr-4 py-2 text-xs font-bold focus:outline-none focus:ring-1 ${emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-slate-200 focus:border-brand-red focus:ring-brand-red'}`}
                      />
                    </div>
                    {emailError && <p className="text-[10px] text-brand-red font-bold mt-1">{emailError}</p>}
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-semibold text-slate-700">Password</label>
                      <button 
                        type="button" 
                        onClick={() => setView('forgot')} 
                        className="text-[10px] text-brand-red font-bold hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onBlur={() => validatePassword(password)}
                        onChange={(e) => { setPassword(e.target.value); if (passwordError) validatePassword(e.target.value); }}
                        placeholder="••••••••"
                        className={`w-full rounded-xl border pl-9 pr-10 py-2 text-xs font-bold focus:outline-none focus:ring-1 ${passwordError ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-slate-200 focus:border-brand-red focus:ring-brand-red'}`}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                      </button>
                    </div>
                    {passwordError && <p className="text-[10px] text-brand-red font-bold mt-1">{passwordError}</p>}
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-300 text-brand-red focus:ring-brand-red h-4 w-4"
                      />
                      <span className="text-[11px] font-bold text-slate-500">Remember Me</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-xs font-bold text-white shadow-md hover:bg-brand-redhover transition-colors cursor-pointer"
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="relative py-2 flex items-center justify-center text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <span className="relative bg-white px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or</span>
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={async () => {
                      setError(null);
                      setLoading(true);
                      try {
                        await loginWithGoogle();
                      } catch (err: any) {
                        setError(err.message || 'Google authentication failed.');
                        setLoading(false);
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Continue with Google
                  </button>

                </form>

                {/* Quick Logins for Development Audits */}
                <div className="border-t border-slate-100 pt-5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 justify-center">
                    <UserCheck className="h-3.5 w-3.5 text-brand-red" /> Quick demo credentials
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {quickRoles.map((role) => (
                      <button
                        key={role.email}
                        type="button"
                        onClick={() => handleQuickLogin(role.email)}
                        className="rounded-full bg-slate-50 border border-slate-200 hover:border-brand-red hover:bg-brand-pink/20 hover:text-brand-red px-2.5 py-1 text-[9px] font-black text-slate-500 transition-all cursor-pointer"
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* FORGOT PASSWORD VIEW */}
            {view === 'forgot' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Forgot Password?</h2>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Provide your registered email to reset passwords</p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@domain.com"
                        className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-xs font-bold text-white shadow-md hover:bg-brand-redhover transition-colors cursor-pointer"
                  >
                    {loading ? 'Sending link...' : 'Send Reset Link'}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setView('login')}
                    className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Back to Sign In
                  </button>
                </form>
              </motion.div>
            )}

            {/* FORGOT PASSWORD SUCCESS VIEW */}
            {view === 'forgot_success' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">Password Reset Link Sent</h2>
                  <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto">
                    We've emailed a password recovery verification link to <span className="text-brand-red font-black">{email}</span>. Click the link to complete reset.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => setView('login')}
                    className="w-full rounded-xl bg-slate-950 hover:bg-black py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Return to Login
                  </button>
                  <button 
                    onClick={() => alert("Re-dispatching secure password reset token...")}
                    className="text-[10px] text-brand-red font-bold hover:underline cursor-pointer block mx-auto"
                  >
                    Didn't receive email? Resend Link
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Security / Compliance Indicators */}
        <div className="flex justify-center gap-6 text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-red" /> Secure Login
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-brand-red" /> Encrypted Data
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-brand-red" /> Privacy Protected
          </span>
        </div>

      </div>

      {/* RIGHT COLUMN: Visual Pipeline Dashboard Illustration */}
      <div className="hidden lg:flex lg:col-span-6 bg-slate-900 relative flex-col justify-between p-16 text-left select-none overflow-hidden">
        
        {/* Glow ambient panels */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-800/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-red-900/10 blur-3xl" />

        {/* Right header */}
        <div className="relative text-white max-w-md space-y-2">
          <span className="rounded-full bg-red-950 border border-red-800 px-3.5 py-1 text-[10px] font-black uppercase text-brand-red tracking-widest">
            AI Platform Onboarding
          </span>
          <h3 className="text-2xl font-black tracking-tight leading-tight">Torque Career Intelligence</h3>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
            Move beyond simple scores. Deploy scientific diagnostics with custom neural processing engines to lock in academic stream and corporate recruiter alignment.
          </p>
        </div>

        {/* Middle: Onboarding Process Pipeline Visual Diagram */}
        <div className="relative max-w-sm mx-auto w-full my-auto space-y-6 py-10">
          
          {/* Node 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/50 rounded-2xl p-3 text-white shadow-lg backdrop-blur-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-red text-white text-xs font-black">1</div>
            <div>
              <p className="text-[8px] font-bold text-red-400 uppercase">Input Node</p>
              <p className="text-xs font-black">Student Registrations & Credentials</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-500 ml-auto" />
          </motion.div>

          {/* Connection Vector */}
          <div className="w-0.5 h-6 bg-slate-700 border-l border-dashed border-slate-600 mx-6" />

          {/* Node 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/50 rounded-2xl p-3 text-white shadow-lg backdrop-blur-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-red text-white text-xs font-black">2</div>
            <div>
              <p className="text-[8px] font-bold text-red-400 uppercase">Diagnostic Track</p>
              <p className="text-xs font-black">30-Minute AI Assessment Session</p>
            </div>
            <Sparkles className="h-4 w-4 text-red-400 ml-auto animate-pulse" />
          </motion.div>

          {/* Connection Vector */}
          <div className="w-0.5 h-6 bg-slate-700 border-l border-dashed border-slate-600 mx-6" />

          {/* Node 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/50 rounded-2xl p-3 text-white shadow-lg backdrop-blur-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-red text-white text-xs font-black">3</div>
            <div>
              <p className="text-[8px] font-bold text-red-400 uppercase">Engine Processing</p>
              <p className="text-xs font-black">Career DNA Diagnostic Dashboard</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-500 ml-auto" />
          </motion.div>

          {/* Connection Vector */}
          <div className="w-0.5 h-6 bg-slate-700 border-l border-dashed border-slate-600 mx-6" />

          {/* Node 4 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-3 bg-slate-900 border-2 border-brand-red rounded-2xl p-3.5 text-white shadow-xl"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-red text-white text-xs font-black">4</div>
            <div>
              <p className="text-[8px] font-bold text-red-400 uppercase">Output Node</p>
              <p className="text-xs font-black">Future Professional Growth Roadmap</p>
            </div>
            <CheckCircle className="h-4 w-4 text-brand-red ml-auto" />
          </motion.div>

        </div>

        {/* Floating KPI Stat widget */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-16 rounded-2xl border border-slate-700 bg-slate-800/90 p-3 shadow-xl backdrop-blur-sm max-w-[160px] text-xs font-black text-white"
        >
          <p className="text-[8px] font-bold text-slate-400 uppercase">Onboarding Speed</p>
          <p className="text-brand-red mt-0.5">&lt; 90 Seconds</p>
        </motion.div>

        {/* Right footer */}
        <div className="relative text-[10px] font-bold text-slate-500">
          Torque Insights · GDPR Safe Assessment Channels
        </div>

      </div>

    </div>
  );
};
