import React from 'react';
import { Target, Users, Landmark, BrainCircuit, ShieldCheck, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Vision Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-brand-pink px-3.5 py-1.5 text-xs font-bold text-brand-red uppercase tracking-wider">
            Our Mission
          </span>
          <h1 className="text-3xl font-black text-brand-slate sm:text-5xl leading-tight">
            Democratizing Career Intelligence across India
          </h1>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
            CareerDNA AI (powered by Torque Learning) merges psychometric science and modern Artificial Intelligence to take the guesswork out of education and hiring. We help individuals know themselves, choose better paths, and become extraordinary.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-white mb-6">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-slate">Targeted Assessments</h3>
            <p className="mt-2 text-sm text-brand-gray leading-relaxed">
              We separate diagnostics by student maturity—providing stream mappings for high schools, readiness metrics for graduates, and emotional intelligence maps for executives.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-white mb-6">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-slate">Psychometric Rigor</h3>
            <p className="mt-2 text-sm text-brand-gray leading-relaxed">
              Rooted in Holland's RIASEC codes, MBTI personality theory, and situational judgment benchmarks to produce mathematically validated results.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-white mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-slate">Unified Ecosystem</h3>
            <p className="mt-2 text-sm text-brand-gray leading-relaxed">
              Connecting students with parents, mentors, schools, and corporate HR teams inside a single unified dashboard architecture.
            </p>
          </div>
        </div>

        {/* About Torque Learning */}
        <div className="mt-20 rounded-3xl bg-brand-slate text-white p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-black md:text-3xl">Powered by Torque Learning</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Torque Learning is a premier cognitive diagnostics and education pioneer in India. Our mission is to scale evidence-based counseling to all 28 states, empowering schools, public institutions, and individuals with state-of-the-art diagnostic resources.
              </p>
              <div className="flex flex-wrap gap-6 pt-4 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1"><ShieldCheck className="h-4.5 w-4.5 text-brand-red" /> ISO 27001 Certified</span>
                <span className="flex items-center gap-1"><Landmark className="h-4.5 w-4.5 text-brand-red" /> National Career Registry Compliant</span>
                <span className="flex items-center gap-1"><Heart className="h-4.5 w-4.5 text-brand-red" /> Supporting 10,000+ Underprivileged Students</span>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="text-center p-6 border border-slate-700 rounded-3xl bg-slate-900/50 w-full max-w-sm">
                <p className="text-sm font-semibold uppercase text-brand-red tracking-widest">Our Vision</p>
                <p className="text-3xl font-extrabold text-white mt-2">1 Million</p>
                <p className="text-xs text-slate-400 mt-1">Careers mapped by the end of 2027</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
