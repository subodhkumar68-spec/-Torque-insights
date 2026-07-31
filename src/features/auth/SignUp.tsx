import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FREE_MVP_MODE } from '../../config';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Mail, ShieldAlert, ArrowRight, UserCheck, 
  ShieldCheck, Lock, CheckCircle, Sparkles, ChevronRight, 
  Eye, EyeOff, User, Phone, Check, Upload, Calendar, AlertCircle 
} from 'lucide-react';
import { User as UserType } from '../../services/dbService';

export const SignUp: React.FC = () => {
  const { signUp, session } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  // Wizard state: 'signup' | 'verify' | 'role' | 'profile' | 'welcome'
  const [step, setStep] = useState<'signup' | 'verify' | 'role' | 'profile' | 'welcome'>('signup');

  // Form states - Create Account
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation / Error states
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Role selection state
  const [selectedRole, setSelectedRole] = useState<UserType['role']>('student');

  // Profile setup states
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [educationLevel, setEducationLevel] = useState('Undergraduate');
  const [institution, setInstitution] = useState('');
  const [course, setCourse] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [language, setLanguage] = useState('English');

  // Password strength meter
  const getPasswordStrength = (): { label: string; color: string; width: string } => {
    if (!password) return { label: '', color: 'bg-slate-200', width: 'w-0' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    if (hasLetters && hasNumbers && hasSpecial && password.length >= 8) {
      return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
    }
    return { label: 'Medium', color: 'bg-amber-500', width: 'w-2/3' };
  };

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = 'Email address is required';
    else if (!emailRe.test(email)) newErrors.email = 'Please enter a valid email';

    const phoneRe = /^[6-9]\d{9}$/;
    if (!mobile) newErrors.mobile = 'Mobile number is required';
    else if (!phoneRe.test(mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!acceptPrivacy) newErrors.acceptPrivacy = 'You must accept the privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateSignup()) return;

    setLoading(true);
    // Move to verification step
    setLoading(false);
    setStep('verify');
  };

  const handleSimulateVerification = () => {
    // Progress user to role selection screen
    setStep('role');
  };

  const handleRoleSelectionSubmit = () => {
    setStep('profile');
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    // Save to context auth service
    try {
      const name = `${firstName} ${lastName}`;
      const res = await signUp(
        name,
        email,
        password,
        selectedRole,
        selectedRole === 'student' || selectedRole === 'school_admin' ? institution : undefined,
        selectedRole === 'college_admin' ? institution : undefined,
        selectedRole === 'corporate_hr' ? institution : undefined
      );

      if (res.success) {
        setStep('welcome');
      } else {
        setError(res.error || 'Failed to complete registration profile');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalRedirect = () => {
    navigate('/dashboard');
  };

  const handleMockPhotoUpload = () => {
    setProfilePhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80');
  };

  const roles = [
    { key: 'student', title: 'Student', desc: 'Discover stream alignments and career plans', emoji: '🧬' },
    { key: 'parent', title: 'Parent', desc: 'Support child academic roadmap logs', emoji: '👪' },
    { key: 'school_admin', title: 'School Coordinator', desc: 'Manage student seat keys and credentials', emoji: '🏫' },
    { key: 'college_admin', title: 'College Admin', desc: 'Benchmark placement readiness profiles', emoji: '🎓' },
    { key: 'counselor', title: 'Career Counselor', desc: 'Fuel advisor session metrics & diagnostics', emoji: '🧭' },
    { key: 'corporate_hr', title: 'Corporate HR', desc: 'Search and assess talent fit indices', emoji: '💼' },
    { key: 'admin', title: 'System Administrator', desc: 'Manage system settings and configurations', emoji: '⚙️' },
  ];

  const passStrength = getPasswordStrength();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white font-sans text-slate-800">
      
      {/* LEFT COLUMN: The Wizard Stepper Cards */}
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
          {step === 'signup' && (
            <p className="text-xs font-bold text-slate-400">
              Have an account?{' '}
              <Link to="/login" className="text-brand-red hover:underline font-black">
                Sign In
              </Link>
            </p>
          )}
        </div>

        {/* Dynamic Wizard Container */}
        <div className="my-auto max-w-lg w-full mx-auto py-10">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CREATE ACCOUNT */}
            {step === 'signup' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Create Account</h2>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Start your onboarding setup</p>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-100 p-3.5 flex items-center gap-2 text-xs font-semibold text-brand-red leading-relaxed">
                    <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleCreateAccount} className="space-y-4">
                  
                  {/* Name Fields Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                        />
                      </div>
                      {errors.firstName && <p className="text-[10px] text-brand-red font-bold mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      />
                      {errors.lastName && <p className="text-[10px] text-brand-red font-bold mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email & Phone fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                        />
                      </div>
                      {errors.email && <p className="text-[10px] text-brand-red font-bold mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                        />
                      </div>
                      {errors.mobile && <p className="text-[10px] text-brand-red font-bold mt-1">{errors.mobile}</p>}
                    </div>
                  </div>

                  {/* Passwords */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-slate-200 pl-9 pr-10 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-[10px] text-brand-red font-bold mt-1">{errors.password}</p>}
                      {/* Password strength meter */}
                      {password && (
                        <div className="mt-2 space-y-1">
                          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-300 ${passStrength.color} ${passStrength.width}`} />
                          </div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Strength: {passStrength.label}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      />
                      {errors.confirmPassword && <p className="text-[10px] text-brand-red font-bold mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  {/* Accept Privacy Checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer py-1 select-none">
                    <input
                      type="checkbox"
                      checked={acceptPrivacy}
                      onChange={(e) => setAcceptPrivacy(e.target.checked)}
                      className="rounded border-slate-300 text-brand-red focus:ring-brand-red h-4 w-4 mt-0.5"
                    />
                    <span className="text-[11px] font-bold text-slate-500 leading-tight">
                      I agree to the privacy processing guidelines and Torque Insights Terms of Use.
                    </span>
                  </label>
                  {errors.acceptPrivacy && <p className="text-[10px] text-brand-red font-bold">{errors.acceptPrivacy}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-xs font-bold text-white shadow-md hover:bg-brand-redhover transition-colors cursor-pointer"
                  >
                    {loading ? 'Creating Account...' : 'Create My Account'}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {!FREE_MVP_MODE && (
                    <>
                      <div className="relative py-1 flex items-center justify-center text-center">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-200" />
                        </div>
                        <span className="relative bg-white px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => alert("Connecting Google Sign-Up portal...")}
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        Sign Up with Google
                      </button>
                    </>
                  )}

                </form>
              </motion.div>
            )}

            {/* STEP 2: EMAIL VERIFICATION */}
            {step === 'verify' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-brand-red animate-pulse">
                  <Mail className="h-7 w-7" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">Verification Email Sent</h2>
                  <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
                    Check your inbox to verify your email. We've sent a secure setup link to <span className="text-brand-red font-black">{email}</span>.
                  </p>
                </div>

                <div className="space-y-3 pt-4 max-w-xs mx-auto">
                  <button 
                    onClick={() => window.open('https://mail.google.com', '_blank')}
                    className="w-full rounded-xl bg-brand-red hover:bg-brand-redhover py-2.5 text-xs font-bold text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Open Gmail
                  </button>
                  <button 
                    onClick={() => alert("Re-sending onboarding confirmation dispatch email...")}
                    className="w-full rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer text-center block"
                  >
                    Resend Email
                  </button>
                  <button 
                    onClick={() => setStep('signup')}
                    className="text-[10px] text-slate-400 font-bold hover:underline cursor-pointer block mx-auto"
                  >
                    Back to Login
                  </button>

                  <div className="border-t border-slate-100 pt-4 mt-2">
                    <button 
                      onClick={handleSimulateVerification}
                      className="w-full rounded-xl bg-slate-950 hover:bg-black py-2.5 text-xs font-black text-white cursor-pointer"
                    >
                      ★ Simulate Verification Confirmation
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: ROLE SELECTION */}
            {step === 'role' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Who are you?</h2>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Select the solution card that matches your needs</p>
                </div>

                {/* Role selection list */}
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
                  {roles.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => setSelectedRole(r.key as UserType['role'])}
                      className={`w-full flex items-center gap-4 text-left p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${selectedRole === r.key ? 'border-brand-red bg-brand-pink/20 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50'}`}
                    >
                      <span className="text-2xl shrink-0">{r.emoji}</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{r.title}</h4>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{r.desc}</p>
                      </div>
                      {selectedRole === r.key && (
                        <div className="ml-auto h-5 w-5 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleRoleSelectionSubmit}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-xs font-bold text-white shadow-md hover:bg-brand-redhover transition-colors cursor-pointer"
                >
                  Continue Setup
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 4: BASIC PROFILE SETUP */}
            {step === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Basic Profile Setup</h2>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Provide details to customize your diagnostics</p>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-100 p-3.5 flex items-center gap-2 text-xs font-semibold text-brand-red leading-relaxed">
                    <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="space-y-4 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
                  
                  {/* Photo Upload Placeholder */}
                  <div className="flex items-center gap-4 py-2 border-b border-slate-100">
                    <div className="h-14 w-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <button 
                        type="button" 
                        onClick={handleMockPhotoUpload}
                        className="rounded-lg bg-slate-50 border border-slate-200 hover:border-brand-red hover:bg-brand-pink/20 hover:text-brand-red px-3 py-1.5 text-[10px] font-black text-slate-600 transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Upload className="h-3.5 w-3.5" /> Upload Photo
                      </button>
                      <p className="text-[9px] text-slate-400 font-bold mt-1">PNG or JPG, max size 2MB</p>
                    </div>
                  </div>

                  {/* DOB & Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="date"
                          required
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Location grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g. Karnataka"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Bengaluru"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Institution parameters */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Education Level</label>
                      <select
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      >
                        <option>Class XI-XII</option>
                        <option>Undergraduate</option>
                        <option>MBA Candidate</option>
                        <option>Working Professional</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Current Institution</label>
                      <input
                        type="text"
                        required
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="School/College Name"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Goal and Course details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Class / Course</label>
                      <input
                        type="text"
                        required
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="e.g. BBA FinTech / Science"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Career Goal</label>
                      <input
                        type="text"
                        required
                        value={careerGoal}
                        onChange={(e) => setCareerGoal(e.target.value)}
                        placeholder="e.g. Product Manager"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold focus:border-brand-red focus:outline-none"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-xs font-bold text-white shadow-md hover:bg-brand-redhover transition-colors cursor-pointer"
                  >
                    Save & Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>

                </form>
              </motion.div>
            )}

            {/* STEP 5: WELCOME SCREEN */}
            {step === 'welcome' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
                  <CheckCircle className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">Welcome to Torque Insights</h2>
                  <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
                    Your AI-powered career intelligence journey begins now. Profile diagnostics verified!
                  </p>
                </div>

                {/* Profile Completion Bar */}
                <div className="border border-slate-200 bg-slate-50 rounded-2xl p-4 text-left max-w-sm mx-auto space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                    <span>Profile Setup Progress</span>
                    <span className="text-brand-red">100% Complete</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-red w-full" />
                  </div>
                </div>

                {/* Next steps list */}
                <div className="text-left max-w-sm mx-auto space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suggested Next Steps</p>
                  
                  <div className="flex gap-3 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-200/50">
                    <div className="h-4.5 w-4.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800">Verify Setup Parameters</p>
                      <p className="text-[9px] text-slate-400 font-bold">Successfully populated onboarding profiles</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-200/50">
                    <div className="h-4.5 w-4.5 rounded-full bg-brand-pink text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800">Select Career Assessments</p>
                      <p className="text-[9px] text-slate-400 font-bold">Initiate holistics Dutch psychometrics audits</p>
                    </div>
                  </div>

                </div>

                <button 
                  onClick={handleFinalRedirect}
                  className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-xs font-bold text-white shadow-md hover:bg-brand-redhover transition-colors cursor-pointer"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Security / Compliance Indicators */}
        <div className="flex justify-center gap-6 text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-red" /> Secure Account
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-brand-red" /> Encrypted Data
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-brand-red" /> Privacy Protected
          </span>
        </div>

      </div>

      {/* RIGHT COLUMN: Visual Onboarding pipeline illustration (same as login split screen) */}
      <div className="hidden lg:flex lg:col-span-6 bg-slate-900 relative flex-col justify-between p-16 text-left select-none overflow-hidden">
        
        {/* Glow ambient panels */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-800/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-red-900/10 blur-3xl" />

        {/* Right header */}
        <div className="relative text-white max-w-md space-y-2">
          <span className="rounded-full bg-red-950 border border-red-800 px-3.5 py-1 text-[10px] font-black uppercase text-brand-red tracking-widest">
            AI Onboarding Platform
          </span>
          <h3 className="text-2xl font-black tracking-tight leading-tight">Torque Onboarding Flow</h3>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
            Register your profile, authenticate credentials, declare solutions track parameters, and access personal diagnostic scoreboards instantly.
          </p>
        </div>

        {/* Middle: Progress Steps Roadmap visual connection diagram */}
        <div className="relative max-w-sm mx-auto w-full my-auto space-y-6 py-10 text-white">
          
          {/* Step 1 highlight */}
          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/50 rounded-2xl p-3 shadow-lg">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${step === 'signup' ? 'bg-brand-red text-white' : 'bg-emerald-500 text-white'}`}>
              {step !== 'signup' ? <Check className="h-4 w-4" /> : '1'}
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase">Step One</p>
              <p className="text-xs font-black">Fill account details profile registration</p>
            </div>
          </div>

          <div className="w-px h-6 bg-slate-700 mx-7" />

          {/* Step 2 highlight */}
          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/50 rounded-2xl p-3 shadow-lg">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${step === 'verify' ? 'bg-brand-red text-white' : (step === 'signup' ? 'bg-slate-700 text-slate-400' : 'bg-emerald-500 text-white')}`}>
              {step !== 'signup' && step !== 'verify' ? <Check className="h-4 w-4" /> : '2'}
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase">Step Two</p>
              <p className="text-xs font-black">Verify email inbox setup link token</p>
            </div>
          </div>

          <div className="w-px h-6 bg-slate-700 mx-7" />

          {/* Step 3 highlight */}
          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/50 rounded-2xl p-3 shadow-lg">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${step === 'role' ? 'bg-brand-red text-white' : ((step === 'profile' || step === 'welcome') ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400')}`}>
              {(step === 'profile' || step === 'welcome') ? <Check className="h-4 w-4" /> : '3'}
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase">Step Three</p>
              <p className="text-xs font-black">Select user alignment role solution</p>
            </div>
          </div>

        </div>

        {/* Floating Stat widget */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-16 right-16 rounded-2xl border border-slate-700 bg-slate-800/90 p-3 shadow-xl backdrop-blur-sm max-w-[160px] text-xs font-black text-white"
        >
          <p className="text-[8px] font-bold text-slate-400 uppercase">Setup Complete</p>
          <p className="text-emerald-400 mt-0.5">100% Verification</p>
        </motion.div>

        {/* Right footer */}
        <div className="relative text-[10px] font-bold text-slate-500">
          Torque Insights · Secure Onboarding pipeline
        </div>

      </div>

    </div>
  );
};
