import React from 'react';
import { Sparkles, BrainCircuit, ArrowRight, Star, Quote, Check, Calendar, AlertCircle } from 'lucide-react';

// ==========================================
// BUTTONS (Rounded 12px as per spec)
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyle = 'inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-3 text-sm font-bold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer';
  
  const variants = {
    primary: 'bg-brand-red text-white shadow-md shadow-red-500/10 hover:bg-brand-redhover',
    secondary: 'bg-[#222222] text-white hover:bg-black',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ==========================================
// INPUT FIELDS (Rounded 12px)
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="block text-xs font-black uppercase text-slate-400 tracking-wider">{label}</label>}
      <input
        className={`w-full rounded-[12px] border border-slate-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all ${
          error ? 'border-red-500 ring-2 ring-red-500/10' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-bold text-brand-red">{error}</p>}
    </div>
  );
};

// ==========================================
// DROPDOWNS (Rounded 12px)
// ==========================================
interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const SelectDropdown: React.FC<DropdownProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="block text-xs font-black uppercase text-slate-400 tracking-wider">{label}</label>}
      <select
        className={`w-full rounded-[12px] border border-slate-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// ==========================================
// CHECKBOXES & RADIO BUTTONS
// ==========================================
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        className={`h-5 w-5 rounded border-slate-300 text-brand-red focus:ring-brand-red/20 ${className}`}
        {...props}
      />
      <span className="text-sm font-bold text-slate-700">{label}</span>
    </label>
  );
};

export const RadioButton: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="radio"
        className={`h-5 w-5 border-slate-300 text-brand-red focus:ring-brand-red/20 ${className}`}
        {...props}
      />
      <span className="text-sm font-bold text-slate-700">{label}</span>
    </label>
  );
};

// ==========================================
// PROGRESS BARS
// ==========================================
interface ProgressBarProps {
  percentage: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex justify-between text-xs font-bold text-slate-700">
          <span>{label}</span>
          <span className="text-brand-red">{percentage}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-slate-200/80 overflow-hidden">
        <div 
          className="h-full bg-brand-red rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ==========================================
// BADGES
// ==========================================
interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'muted';
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', label }) => {
  const styles = {
    primary: 'bg-brand-pink text-brand-red border border-red-100',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    info: 'bg-blue-50 text-blue-700 border border-blue-100',
    muted: 'bg-slate-100 text-slate-600 border border-slate-200'
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${styles[variant]}`}>
      {label}
    </span>
  );
};

// ==========================================
// GLASS CARDS & CORE CARDS (Radius 16px/20px)
// ==========================================
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`glass-card rounded-[16px] border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
};

export const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; className?: string }> = ({ icon, title, desc, className = '' }) => {
  return (
    <div className={`rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 ${className}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4">
        {icon}
      </div>
      <h3 className="text-base font-black text-brand-slate">{title}</h3>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
};

export const PricingCard: React.FC<{ tier: string; price: string; period?: string; desc: string; features: string[]; buttonText: string; isPopular?: boolean }> = 
  ({ tier, price, period, desc, features, buttonText, isPopular }) => {
    return (
      <div className={`rounded-[20px] border p-6 flex flex-col justify-between ${
        isPopular ? 'border-brand-red bg-slate-900 text-white shadow-xl scale-[1.01]' : 'border-slate-200 bg-white text-slate-800'
      }`}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isPopular ? 'text-red-400' : 'text-slate-400'}`}>{tier}</span>
            {isPopular && <span className="rounded-full bg-brand-red px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white">Popular</span>}
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-black">{price}</span>
            {period && <span className={`text-[10px] font-bold ml-1 ${isPopular ? 'text-slate-400' : 'text-slate-400'}`}>{period}</span>}
          </div>
          <p className={`text-xs font-medium ${isPopular ? 'text-slate-300' : 'text-slate-500'}`}>{desc}</p>
          <div className={`h-px ${isPopular ? 'bg-slate-800' : 'bg-slate-100'}`} />
          <ul className="space-y-2 text-xs font-bold">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className={`h-4 w-4 shrink-0 ${isPopular ? 'text-red-400' : 'text-brand-red'}`} />
                <span className={isPopular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className={`w-full mt-6 rounded-[12px] py-2.5 text-xs font-bold transition-all cursor-pointer ${
          isPopular ? 'bg-brand-red hover:bg-brand-redhover text-white' : 'border border-slate-200 hover:bg-slate-50 text-brand-red bg-white'
        }`}>
          {buttonText}
        </button>
      </div>
  );
};

export const TestimonialCard: React.FC<{ quote: string; author: string; title: string }> = ({ quote, author, title }) => {
  return (
    <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <Quote className="h-6 w-6 text-slate-300 fill-current" />
      <p className="text-xs font-medium italic text-slate-600 leading-relaxed">"{quote}"</p>
      <div>
        <p className="text-xs font-black text-slate-900">{author}</p>
        <p className="text-[10px] font-bold text-slate-400">{title}</p>
      </div>
    </div>
  );
};

export const AssessmentCard: React.FC<{ title: string; category: string; questions: number; duration: number }> = 
  ({ title, category, questions, duration }) => {
    return (
      <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200">
        <div className="space-y-3">
          <Badge label={category} />
          <h3 className="text-base font-black text-brand-slate leading-tight">{title}</h3>
        </div>
        <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
          <span>{questions} items</span>
          <span>{duration} min</span>
        </div>
      </div>
  );
};

// ==========================================
// NOTIFICATION & AI CARDS
// ==========================================
interface NotificationProps {
  title: string;
  message: string;
  type?: 'success' | 'warning' | 'info';
}

export const NotificationCard: React.FC<NotificationProps> = ({ title, message, type = 'info' }) => {
  const borders = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    warning: 'border-amber-200 bg-amber-50 text-amber-900',
    info: 'border-blue-200 bg-blue-50 text-blue-900'
  };

  return (
    <div className={`rounded-[16px] border p-4 flex gap-3 shadow-sm ${borders[type]}`}>
      <AlertCircle className="h-5 w-5 shrink-0" />
      <div>
        <h4 className="text-sm font-black">{title}</h4>
        <p className="text-xs font-medium mt-0.5 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export const AIInsightCard: React.FC<{ prompt: string; insight: string }> = ({ prompt, insight }) => {
  return (
    <div className="rounded-[16px] border border-red-100 bg-gradient-to-br from-brand-pink/50 to-white p-6 shadow-md shadow-red-500/5 space-y-4">
      <div className="flex items-center gap-2 text-brand-red">
        <Sparkles className="h-5 w-5 animate-pulse" />
        <span className="text-xs font-black uppercase tracking-wider">AI Career Coach Diagnostic</span>
      </div>
      <div className="space-y-2">
        <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 inline-block">
          " {prompt} "
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {insight}
        </p>
      </div>
    </div>
  );
};

// ==========================================
// STAT & DASHBOARD CARDS
// ==========================================
export const StatCard: React.FC<{ num: string; label: string; change?: string; isPositive?: boolean }> = ({ num, label, change, isPositive = true }) => {
  return (
    <div className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm space-y-1">
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black text-slate-900">{num}</span>
        {change && (
          <span className={`text-[10px] font-black ${isPositive ? 'text-emerald-600' : 'text-slate-400'}`}>
            {isPositive ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
    </div>
  );
};

export const DashboardCard: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({ title, subtitle, children }) => {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-black text-brand-slate uppercase tracking-widest">{title}</h3>
        {subtitle && <p className="text-[10px] text-slate-400 font-bold mt-0.5">{subtitle}</p>}
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export const FAQCard: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  return (
    <div className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm space-y-2">
      <h4 className="font-bold text-slate-900 text-sm">{q}</h4>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">{a}</p>
    </div>
  );
};
