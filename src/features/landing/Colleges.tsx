import React, { useState } from 'react';
import { Award, ShieldCheck, ChevronRight, Calculator, CheckCircle2, Star } from 'lucide-react';

export const Colleges: React.FC = () => {
  const [studentsCount, setStudentsCount] = useState<number>(120);

  const calculateEstimate = (count: number) => {
    // Pricing multiplier
    const rate = count > 200 ? 499 : 699;
    const subtotal = count * rate;
    const gst = Math.round(subtotal * 0.18);
    return {
      rate,
      subtotal: subtotal.toLocaleString('en-IN'),
      gst: gst.toLocaleString('en-IN'),
      total: (subtotal + gst).toLocaleString('en-IN')
    };
  };

  const pricing = calculateEstimate(studentsCount);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3.5 py-1.5 text-xs font-bold text-brand-red uppercase tracking-wider">
              College & MBA Solutions
            </span>
            <h1 className="text-4xl font-black text-brand-slate tracking-tight sm:text-5xl leading-tight">
              Boost Campus Placements & <span className="text-brand-red">Map Skill Gaps</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Equip your placement department with analytical tools to compare placement readiness across departments, identify business aptitudes, and benchmark candidates against elite recruiters.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-700">Pre-placement Readiness Benchmark</span>
              </div>
              <div className="flex gap-2 items-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-700">Recruitment pipeline search logs for Corporate HR partners</span>
              </div>
              <div className="flex gap-2 items-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-700">Detailed skill gap reviews for B-School accreditations</span>
              </div>
            </div>
          </div>

          {/* Pricing Calculator Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-brand-slate">
                <Calculator className="h-6 w-6 text-brand-red" />
                <h2 className="text-xl font-black">Licensing Estimator</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 uppercase mb-2">
                    Batch Size: <span className="text-brand-red font-black text-sm">{studentsCount} Students</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={studentsCount}
                    onChange={(e) => setStudentsCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                    <span>50</span>
                    <span>200</span>
                    <span>500</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2 text-sm font-bold text-slate-600">
                  <div className="flex justify-between">
                    <span>License Rate:</span>
                    <span className="text-brand-slate">₹{pricing.rate} / student</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-brand-slate">₹{pricing.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>GST (18%):</span>
                    <span>₹{pricing.gst}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-black text-brand-slate">
                    <span>Estimated Cost:</span>
                    <span className="text-brand-red">₹{pricing.total}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Redirecting to torque college license request system...")}
                  className="w-full rounded-xl bg-brand-red py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 hover:bg-brand-redhover transition-all"
                >
                  Book Consultation Call
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Core modules */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-md">
          <h2 className="text-2xl font-black text-brand-slate text-center mb-10">Institutional Core Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-red uppercase tracking-wider">Module 01</span>
              <h3 className="text-lg font-bold text-brand-slate">Corporate Talent Filters</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Invite hiring recruiters to view your student placement dashboards, enabling them to search candidates by MBTI type, RIASEC dimensions, and logical reasoning benchmarks.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-red uppercase tracking-wider">Module 02</span>
              <h3 className="text-lg font-bold text-brand-slate">Placement Gap Audits</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Benchmark student aptitudes against actual corporate hiring averages, pinpointing which departments require critical thinking, quantitative prep, or coding modules.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-red uppercase tracking-wider">Module 03</span>
              <h3 className="text-lg font-bold text-brand-slate">Executive Resumes</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Students build career resumes containing their AI competency indices, offering placement recruiters verified cognitive proof during campus interviews.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
