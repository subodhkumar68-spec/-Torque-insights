import React, { useState } from 'react';
import { ShieldCheck, BookOpen, Key, Users, Sparkles, Building } from 'lucide-react';

export const Schools: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', school: '', email: '', count: '100' });
  const [demoCode, setDemoCode] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.school) return;
    
    // Simulate generation of seat license activation codes
    const randCode = 'DPS-' + Math.floor(1000 + Math.random() * 9000) + '-TRQ';
    setDemoCode(randCode);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3.5 py-1.5 text-xs font-bold text-brand-red uppercase tracking-wider">
              K-12 School Solutions
            </span>
            <h1 className="text-4xl font-black text-brand-slate tracking-tight sm:text-5xl leading-tight">
              Empower Students with <span className="text-brand-red">NEP 2020</span> Stream Selection
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Help your Class IX-XII students discover the optimal balance of Science, Commerce, and Humanities. Connect parent expectations with student strengths using AI diagnostics.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2 items-center">
                <ShieldCheck className="h-5 w-5 text-brand-red" />
                <span className="text-sm font-bold text-slate-700">Validated RIASEC Hexagons</span>
              </div>
              <div className="flex gap-2 items-center">
                <Building className="h-5 w-5 text-brand-red" />
                <span className="text-sm font-bold text-slate-700">Detailed Batch Analytics</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-black text-brand-slate mb-4">Request a School Pilot</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-6">Instantly simulate trial license key codes</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 uppercase mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Principal Anita Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 uppercase mb-1">School Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi Public School"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-500 uppercase mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="principal@school.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-500 uppercase mb-1">Student Seats</label>
                    <select
                      value={formData.count}
                      onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                    >
                      <option value="50">50 Seats</option>
                      <option value="100">100 Seats</option>
                      <option value="250">250 Seats</option>
                      <option value="500">500+ Seats</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand-red py-3 text-sm font-bold text-white shadow-md shadow-red-500/20 hover:bg-brand-redhover transition-all"
                >
                  Generate Free License Code
                </button>
              </form>

              {demoCode && (
                <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 space-y-2 text-emerald-800 animate-fade-in-up">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <Sparkles className="h-5 w-5 text-emerald-600 shrink-0" />
                    Trial School License Generated!
                  </div>
                  <p className="text-xs">Copy this activation code and submit it in the sign-up form:</p>
                  <div className="flex items-center justify-between bg-white border border-emerald-200 rounded-xl px-4 py-2.5 font-mono text-sm font-bold text-emerald-900 shadow-sm">
                    <span>{demoCode}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(demoCode);
                        alert("License code copied to clipboard!");
                      }}
                      className="text-xs text-emerald-600 underline font-sans font-bold cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature suite */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4">
              <Key className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-slate">Bulk Seat Generators</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Administrators can issue activation keys, bypassing card checkouts so students log in and take tests immediately.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-slate">Counselor Console</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Equip in-house counselors with real-time student reports, meeting schedulers, and session notes editors.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-slate">Analytics Dashboard</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Principals monitor cohort stream distributions, career matching aggregates, and school-wide suitability trends.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
