import React, { useState } from 'react';
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
            
            {/* EXECUTIVE SUMMARY */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                Executive Diagnostics Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-4">
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    This report represents the verified diagnostics compiled by Torque Insights for candidate <strong className="text-slate-900">{name}</strong>. Based on responses, the candidate shows high adaptability, strong logical integration, and suitability for targeted growth pathways.
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
