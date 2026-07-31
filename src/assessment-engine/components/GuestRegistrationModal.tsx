import React, { useState } from 'react';
import { X, Mail, Phone, User, GraduationCap, Globe } from 'lucide-react';

interface GuestRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { name: string; email: string; phone: string; educationClass: string; city: string }) => void;
  assessmentTitle: string;
}

export const GuestRegistrationModal: React.FC<GuestRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  assessmentTitle
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [educationClass, setEducationClass] = useState('Class XII');
  const [city, setCity] = useState('');

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !city) {
      alert('Please fill out all required fields.');
      return;
    }
    onSubmit({ name, email, phone, educationClass, city });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-1.5 pr-6">
          <span className="rounded bg-brand-pink text-brand-red px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">Guest Access</span>
          <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Start {assessmentTitle}</h3>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Please register your candidate details to immediately begin the diagnostic test. Your results report is generated completely free.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-850 dark:text-white text-xs font-bold focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah.jenkins@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-850 dark:text-white text-xs font-bold focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          {/* Mobile Phone */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-850 dark:text-white text-xs font-bold focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Education Class */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Class / College</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                <select
                  value={educationClass}
                  onChange={(e) => setEducationClass(e.target.value)}
                  className="w-full pl-9 pr-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-850 dark:text-white text-xs font-bold focus:outline-none focus:border-brand-red cursor-pointer"
                >
                  <option value="Class XI">Class XI</option>
                  <option value="Class XII">Class XII</option>
                  <option value="Undergraduate">Undergrad student</option>
                  <option value="MBA candidate">MBA candidate</option>
                  <option value="Professional">Working professional</option>
                </select>
              </div>
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">City</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="New Delhi"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-850 dark:text-white text-xs font-bold focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-md hover:scale-[1.01] transition-all cursor-pointer text-center block"
          >
            Continue to Assessment
          </button>
        </form>
      </div>
    </div>
  );
};
