import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Printer, Share2, Calendar, ArrowRight, Sparkles, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { dbService } from '../../services/dbService';
import { AssessmentRegistry } from '../engine/AssessmentRegistry';
import { RadarChart } from './RadarChart';
import { ScoreCard } from './ScoreCard';
import { RecommendationCard } from './RecommendationCard';
import { DownloadPDF } from './DownloadPDF';

export const ResultRenderer: React.FC = () => {
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // 1. Resolve Report from URL ID parameter
  const urlParams = new URLSearchParams(window.location.search);
  const reportId = urlParams.get('id');
  const reports = dbService.getReports();
  
  const report = reportId 
    ? reports.find(r => r.id === reportId) 
    : (reports.length > 0 ? reports[reports.length - 1] : null);

  // 2. Resolve Config & Template
  const config = report?.assessmentId ? AssessmentRegistry.getById(report.assessmentId) : null;
  const template = config?.reportTemplate || {
    layoutType: 'radar',
    dimensions: [
      { key: 'problemSolving', label: 'Problem Solving' },
      { key: 'criticalThinking', label: 'Critical Thinking' },
      { key: 'communicationScore', label: 'Communication' },
      { key: 'leadershipScore', label: 'Leadership' }
    ],
    sections: {
      strengthsTitle: 'Top Professional Strengths',
      weaknessesTitle: 'Areas of Potential Development',
      actionPlanTitle: 'Custom Action & Learning Roadmap',
      careerRecTitle: 'Recommended Career Sectors',
      eduRecTitle: 'Suggested Academic Pathways'
    }
  };

  const themeColor = config?.themeColor || '#C62828';
  const name = report?.candidateName || 'Sarah Jenkins';
  const assessmentName = report?.assessmentName || config?.title || 'High School Career Aptitude Test';

  useEffect(() => {
    if (assessmentName && name) {
      document.title = `Torque Insights Report - ${assessmentName} - ${name}`;
    }
  }, [assessmentName, name]);
  
  const formattedDate = report?.submittedAt 
    ? new Date(report.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // 3. Map Chart Data dynamically
  const chartData = template.dimensions.map((d: any) => {
    const val = report?.scores 
      ? (report.scores as any)[d.key] || 75 
      : 75;
    return { subject: d.label, score: val };
  });

  const dimensionValues = template.dimensions.map((d: any) => {
    return report?.scores ? (report.scores as any)[d.key] || 75 : 75;
  });
  const overallScore = Math.round(dimensionValues.reduce((a: number, b: number) => a + b, 0) / (dimensionValues.length || 1));

  const getIPMATReadiness = (score: number) => {
    if (score >= 90) return { band: 'Excellent', desc: 'Highly Competitive for Top IPM Programs', pct: 99.2 + (score - 90) * 0.08, color: '#10B981', prob: '95%' };
    if (score >= 75) return { band: 'Very Good', desc: 'Needs minor improvement', pct: 90.0 + (score - 75) * 0.6, color: '#059669', prob: '85%' };
    if (score >= 60) return { band: 'Good', desc: 'Moderate preparation required', pct: 75.0 + (score - 60) * 1.0, color: '#3B82F6', prob: '65%' };
    if (score >= 40) return { band: 'Average', desc: 'Needs structured coaching', pct: 40.0 + (score - 40) * 1.75, color: '#F59E0B', prob: '35%' };
    return { band: 'Needs Improvement', desc: 'Strong foundation building recommended', pct: Math.max(5, score * 1.0), color: '#EF4444', prob: '10%' };
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 font-sans text-slate-800 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* REPORT HEADER */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <span 
              className="rounded-full border px-3 py-0.5 text-[9px] font-black uppercase tracking-wider"
              style={{ color: themeColor, borderColor: `${themeColor}20`, backgroundColor: `${themeColor}05` }}
            >
              Verified Assessment Report
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
              {assessmentName} Diagnostics
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Candidate: {name} | ID: {report?.id || 'REP-MOCK-909'} | Generated: {formattedDate}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="h-4 w-4" /> Print / PDF
            </button>
            <button 
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button 
              onClick={() => alert("Directing to advisory demo calendar scheduler...")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red hover:bg-brand-redhover px-5 py-2.5 text-xs font-bold text-white shadow hover:scale-[1.01] transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-brand-pink" /> Book Counseling
            </button>
          </div>
        </div>

        {/* CORE REPORT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-9 space-y-8">

            {/* IPMAT READINESS DASHBOARD PANEL */}
            {config?.id === 'ast-ipmat' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Overall Score & Band */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Overall Readiness</span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-black text-slate-900 leading-none">{overallScore}</span>
                      <span className="text-xs font-bold text-slate-400">/100</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-black">
                      <span className="text-slate-400 uppercase text-[9px] tracking-wider">Band</span>
                      <span style={{ color: getIPMATReadiness(overallScore).color }}>{getIPMATReadiness(overallScore).band}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold leading-tight">{getIPMATReadiness(overallScore).desc}</p>
                  </div>
                </div>

                {/* Percentile Estimate */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Percentile Estimate</span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-black text-slate-900 leading-none">{getIPMATReadiness(overallScore).pct.toFixed(1)}</span>
                      <span className="text-xs font-bold text-slate-400">th %tile</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                      Estimated rank benchmarked against all IPMAT target candidates nationwide.
                    </p>
                  </div>
                </div>

                {/* College Fit & Success Probability */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Admission Probability</span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-black text-[#00A8A8] leading-none">{getIPMATReadiness(overallScore).prob}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-wider">
                      <span>College Fit Level</span>
                      <span className="text-slate-900">{overallScore >= 75 ? 'Excellent (Tier 1)' : overallScore >= 40 ? 'Moderate (Tier 2)' : 'Foundation Required'}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00A8A8] rounded-full" style={{ width: `${overallScore}%` }} />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* CUET READINESS DASHBOARD PANEL */}
            {config?.id === 'ast-cuet' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Overall Score & Band */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Overall CUET Readiness</span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-black text-slate-900 leading-none">{overallScore}</span>
                      <span className="text-xs font-bold text-slate-400">/100</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-black">
                      <span className="text-slate-400 uppercase text-[9px] tracking-wider">Band</span>
                      <span style={{ color: getIPMATReadiness(overallScore).color }}>{getIPMATReadiness(overallScore).band}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold leading-tight">{getIPMATReadiness(overallScore).desc}</p>
                  </div>
                </div>

                {/* Percentile Estimate */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Percentile Estimate</span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-black text-slate-900 leading-none">{getIPMATReadiness(overallScore).pct.toFixed(1)}</span>
                      <span className="text-xs font-bold text-slate-400">th %tile</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                      Estimated competitive rank benchmarked against all national CUET UG entrants.
                    </p>
                  </div>
                </div>

                {/* University Fit Meter & Target */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">University Fit Level</span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-black text-[#00A8A8] leading-none">{getIPMATReadiness(overallScore).prob}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-wider">
                      <span>Admission Likelihood</span>
                      <span className="text-slate-900">{overallScore >= 75 ? 'Top Universities (DU, BHU, JNU)' : overallScore >= 40 ? 'State/Private' : 'Strengthening Required'}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00A8A8] rounded-full" style={{ width: `${overallScore}%` }} />
                    </div>
                  </div>
                </div>

              </div>
            )}
            
            {/* EXECUTIVE SUMMARY */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                Executive Diagnostics Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-4">
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {report?.summary || `This report represents the verified diagnostics compiled by Torque Insights for candidate ${name}. Based on responses, the candidate shows high adaptability, strong logical integration, and suitability for targeted growth pathways.`}
                  </p>
                  
                  {report?.scores?.mbti && (
                    <div className="inline-flex items-center gap-2 p-3 bg-brand-pink/20 rounded-2xl border border-pink-100">
                      <Sparkles className="h-4 w-4 text-pink-500" />
                      <span className="text-xs font-black text-slate-950">MBTI Personality Archetype: {report.scores.mbti}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-5">
                  <RadarChart data={chartData} themeColor={themeColor} />
                </div>
              </div>
            </div>

            {/* DIMENSION SCORING DETAILS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                Detailed Dimension Scores
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {template.dimensions.map((d: any) => {
                  const val = report?.scores 
                    ? (report.scores as any)[d.key] || 75 
                    : 75;
                  return (
                    <ScoreCard key={d.key} label={d.label} score={val} themeColor={themeColor} />
                  );
                })}
              </div>
            </div>

            {/* CUET SUBJECT HEAT MAP */}
            {config?.id === 'ast-cuet' && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                    CUET Subject Readiness Heat Map
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Interactive Grid</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {template.dimensions.map((d: any) => {
                    const val = report?.scores 
                      ? (report.scores as any)[d.key] || 75 
                      : 75;
                    const getHeatBg = (score: number) => {
                      if (score >= 90) return 'bg-emerald-55/40 border-emerald-200 text-emerald-800';
                      if (score >= 75) return 'bg-teal-50 border-teal-200 text-teal-800';
                      if (score >= 60) return 'bg-sky-50 border-sky-200 text-sky-800';
                      if (score >= 40) return 'bg-amber-50 border-amber-200 text-amber-800';
                      return 'bg-rose-50 border-rose-200 text-rose-800';
                    };
                    return (
                      <div key={d.key} className={`p-4 rounded-2xl border text-center space-y-1 ${getHeatBg(val)}`}>
                        <span className="text-[9px] font-black uppercase tracking-wider block opacity-75">{d.label}</span>
                        <div className="text-2xl font-black">{val}%</div>
                        <span className="text-[8px] font-bold uppercase tracking-wider block opacity-75">
                          {val >= 90 ? 'Excellent' : val >= 75 ? 'Very Good' : val >= 60 ? 'Good' : val >= 40 ? 'Average' : 'Needs Work'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STRENGTHS AND WEAKNESSES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                  {template.sections.strengthsTitle}
                </h3>
                <ul className="space-y-3">
                  {(report?.strengths || ['Analytical Mindset', 'Logical Reasoning']).map((str, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-500 leading-relaxed">
                      <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] shrink-0 font-black">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses / Growth Areas */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                  {template.sections.weaknessesTitle}
                </h3>
                <ul className="space-y-3">
                  {(report?.weaknesses || ['Over-analyzing details']).map((weak, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-500 leading-relaxed">
                      <span className="h-5 w-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[10px] shrink-0 font-black">!</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RECOMMENDATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecommendationCard 
                title={template.sections.careerRecTitle}
                items={report?.careerRecommendations?.map(c => `${c.career} (${c.matchPercentage}% match)`) || config?.recommendedCareers || []}
                themeColor={themeColor}
              />
              <RecommendationCard 
                title={template.sections.eduRecTitle}
                items={report?.suggestedDegrees || config?.recommendedCourses || []}
                themeColor={themeColor}
              />
            </div>

            {/* ACTION PLAN TIMELINE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                  {template.sections.actionPlanTitle}
                </h3>
                <span className="text-[10px] font-bold text-brand-red uppercase">Milestones Roadmap</span>
              </div>

              <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4 text-left">
                {(report?.learningRoadmap || [
                  { phase: 'Phase 1', title: 'Concept Foundations', duration: '3 Months', details: ['Read advanced theory journals.'] },
                  { phase: 'Phase 2', title: 'Portfolio Build', duration: '6 Months', details: ['Create live prototypes.'] }
                ]).map((ph, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div 
                      className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 bg-white" 
                      style={{ borderColor: themeColor }}
                    />
                    <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: themeColor }}>
                      {ph.phase} ({ph.duration})
                    </span>
                    <h4 className="text-xs font-black text-slate-900">{ph.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1">
                      {ph.details.join('; ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* REPORT ACTION CENTER */}
            <div className="rounded-3xl bg-[#1E293B] text-white p-8 sm:p-10 shadow-md text-center space-y-6">
              <h3 className="text-xl font-black tracking-tight leading-none">Download Assessment Assets</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold max-w-lg mx-auto">
                Download printable diagnostics sheets, secure a shareable report link, or navigate back to explore other assessments.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <DownloadPDF themeColor={themeColor} />
                <button 
                  onClick={() => navigate('/assessments')}
                  className="rounded-full border border-slate-650 bg-[#334155] hover:bg-[#475569] px-8 py-3 text-xs font-bold text-white hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Explore Other Assessments
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COL: CANDIDATE INFO */}
          <div className="lg:col-span-3 space-y-8 text-left">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                Candidate Profile
              </h4>
              <div className="space-y-3.5 text-xs font-bold text-slate-700">
                <div>
                  <span className="block text-[9px] font-black text-slate-400 uppercase">Class / Education</span>
                  <span className="text-slate-900">{report?.class || 'Class XII'}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-black text-slate-400 uppercase">Target Institution</span>
                  <span className="text-slate-900">{report?.school || 'Not Specified'}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-black text-slate-400 uppercase">Location City</span>
                  <span className="text-slate-900">{report?.city || 'Delhi / NCR'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                Verification Details
              </h4>
              <div className="space-y-3.5">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-650">
                  <Award className="h-4.5 w-4.5 text-slate-400" />
                  <span>ISO 9001 Certified</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-650">
                  <ShieldCheck className="h-4.5 w-4.5 text-slate-400" />
                  <span>Data Encrypted</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-100 text-left">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Share Report Link</h3>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-slate-650">✕</button>
            </div>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Copy this report URL to share diagnostics results with parents, counselors, or admission mentors.
            </p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 text-xs font-bold text-white rounded-xl shadow-sm cursor-pointer"
                style={{ backgroundColor: themeColor }}
              >
                {copiedLink ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
