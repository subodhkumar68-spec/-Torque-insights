import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Sparkles, BrainCircuit, FileText, Download, Award, ShieldCheck, CheckCircle2, 
  Share2, Calendar, Phone, ArrowRight, Star, TrendingUp, Info, User, HelpCircle, 
  Shield, Briefcase, GraduationCap, BookOpen, AlertCircle, Send, Copy, Mail, Printer,
  X, Check
} from 'lucide-react';

export const AIReports: React.FC = () => {
  const navigate = useNavigate();
  // Share Modal & Print/Export UI states
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  // Mock Candidate Details
  const activeUser = JSON.parse(localStorage.getItem('careerdna_current_user') || 'null');
  const candidateName = activeUser?.name || "Sarah Jenkins";

  const reportMetadata = {
    name: candidateName,
    id: "REP-90A07-2026",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    status: "Verified AI Report",
    overallScore: 92
  };

  // Recharts Datasets
  const personalityRadar = [
    { subject: 'Realistic', score: 65 },
    { subject: 'Investigative', score: 95 },
    { subject: 'Artistic', score: 75 },
    { subject: 'Social', score: 80 },
    { subject: 'Enterprising', score: 85 },
    { subject: 'Conventional', score: 90 },
  ];

  const skillGapData = [
    { subject: 'Critical Thinking', Current: 85, Target: 95 },
    { subject: 'Communication', Current: 70, Target: 90 },
    { subject: 'Leadership', Current: 60, Target: 85 },
    { subject: 'AI Literacy', Current: 50, Target: 80 },
    { subject: 'Problem Solving', Current: 90, Target: 95 },
  ];

  const leadershipSpider = [
    { subject: 'Teamwork', value: 85 },
    { subject: 'Conflict Resolution', value: 75 },
    { subject: 'Influencing', value: 80 },
    { subject: 'Decision Making', value: 90 },
    { subject: 'Public Speaking', value: 70 },
    { subject: 'Negotiation', value: 78 },
  ];

  const learningStylePie = [
    { name: 'Visual', value: 40, color: '#C62828' },
    { name: 'Auditory', value: 20, color: '#F43F5E' },
    { name: 'Reading', value: 25, color: '#FDA4AF' },
    { name: 'Kinesthetic', value: 15, color: '#E2E8F0' },
  ];

  // Career Recommendations (8 records)
  const careerRecommendations = [
    { name: 'Software Product Manager', match: 94, growth: 'High', demand: 'Very High', edu: 'B.Tech/BBA + MBA', skills: 'Agile, Roadmap, User Diagnostics' },
    { name: 'Consulting Strategy Analyst', match: 91, growth: 'Very High', demand: 'High', edu: 'Undergrad + MBA', skills: 'Analytics, Modeling, Slide deck' },
    { name: 'UX Researcher', match: 88, growth: 'High', demand: 'High', edu: 'UG Design/Psychology', skills: 'Wireframing, User audits, Persona' },
    { name: 'Data Scientist', match: 86, growth: 'Very High', demand: 'Very High', edu: 'B.Tech/M.Sc Stats', skills: 'Python, SQL, Regression model' },
    { name: 'Agile Scrum Master', match: 83, growth: 'Medium', demand: 'High', edu: 'UG + Scrum Cert', skills: 'Agile sprints, JIRA, Standups' },
    { name: 'Hiring Operations Partner', match: 81, growth: 'Medium', demand: 'Medium', edu: 'UG + HR diploma', skills: 'Talent sourcing, Pipeline log' },
    { name: 'Systems Engineer', match: 79, growth: 'High', demand: 'High', edu: 'B.Tech Computer Sci', skills: 'Java, Cloud AWS, System design' },
    { name: 'Business Strategy Lead', match: 77, growth: 'Medium', demand: 'High', edu: 'BBA/MBA', skills: 'Marketing metrics, Acquisition' },
  ];

  const strengthsDataset = [
    { name: 'Critical Thinking', score: 92, desc: 'Logical evaluation of data models.', tip: 'Practice auditing complex systems logic.' },
    { name: 'Communication', score: 86, desc: 'Coordinating cross-functional messages.', tip: 'Present briefs in outline structures.' },
    { name: 'Problem Solving', score: 90, desc: 'Resolving agile product roadblocks.', tip: 'Tackle open-ended sandbox test cases.' },
    { name: 'Collaboration', score: 85, desc: 'Aligning department task goals.', tip: 'Run collaborative group design sessions.' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://torqueinsights.com/report/REP-90A07-2026");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 font-sans text-slate-800 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ==================== PAGE HEADER ==================== */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-0.5 text-[9px] font-black uppercase text-brand-red tracking-wider">
              {reportMetadata.status}
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">
              AI Career Intelligence Report
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Candidate: {reportMetadata.name} | ID: {reportMetadata.id} | Generated: {reportMetadata.date}
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
              <Calendar className="h-4 w-4 text-brand-pink animate-pulse" /> Book Counseling
            </button>
          </div>
        </div>

        {/* ==================== CORE CONTENT GRID ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT AREA: Report Modules (Section 1 to 12) */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* SECTION 1: EXECUTIVE SUMMARY */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-brand-red animate-pulse" />
                <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">Executive Summary</h3>
              </div>

              {/* Progress rings row */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 text-center">
                {[
                  { label: 'Career IQ', val: 92, color: 'stroke-brand-red' },
                  { label: 'Readiness', val: 88, color: 'stroke-brand-red' },
                  { label: 'Confidence', val: 94, color: 'stroke-brand-red' },
                  { label: 'Employability', val: 86, color: 'stroke-brand-red' },
                  { label: 'Leadership', val: 88, color: 'stroke-brand-red' },
                  { label: 'Learning Agility', val: 90, color: 'stroke-brand-red' },
                ].map((ring, idx) => (
                  <div key={idx} className="space-y-2 flex flex-col items-center">
                    <div className="relative h-14 w-14">
                      <svg className="h-full w-full transform -rotate-90">
                        <circle cx="28" cy="28" r="24" fill="transparent" stroke="#F1F5F9" strokeWidth="4" />
                        <circle cx="28" cy="28" r="24" fill="transparent" className={ring.color} strokeWidth="4" strokeDasharray="150" strokeDashoffset={150 - (150 * ring.val) / 100} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-900">
                        {ring.val}%
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block leading-tight">{ring.label}</span>
                  </div>
                ))}
              </div>

              <div className="bg-brand-pink/20 rounded-2xl p-5 border border-brand-red/10 text-xs sm:text-sm leading-relaxed text-slate-600 font-semibold">
                <strong>AI Profile Analysis:</strong> Sarah Jenkins demonstrates exceptional aptitude in analytical problem execution and system design. Her Holland RIASEC profile highlights a strong mix of <em>Investigative</em> and <em>Conventional</em> preferences. She is highly suited for structured technology operations, agile product design pipelines, and analytical executive paths.
              </div>
            </div>

            {/* SECTION 2: PERSONALITY PROFILE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-red" />
                <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">Personality DNA Profile</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Radar chart */}
                <div className="border border-slate-150 rounded-2xl p-4 bg-slate-50/50 flex flex-col items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">Holland RIASEC Interest Profile</span>
                  <div className="h-56 w-full max-w-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={personalityRadar}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 9, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                        <Radar name="Interest Score" dataKey="score" stroke="#C62828" fill="#C62828" fillOpacity={0.2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Spectrum sliders */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">Primary Personality Type: INTJ (Logical Architect)</h4>
                    <p className="text-[11px] text-slate-400 font-bold leading-normal">Myers-Briggs cognitive construct representation</p>
                  </div>
                  
                  <div className="space-y-3.5 text-xs font-bold text-slate-700">
                    {[
                      { left: 'Extrovert', right: 'Introvert', val: '78%', active: 'right' },
                      { left: 'Sensing', right: 'Intuitive', val: '64%', active: 'right' },
                      { left: 'Thinking', right: 'Feeling', val: '82%', active: 'left' },
                      { left: 'Judging', right: 'Perceiving', val: '70%', active: 'left' },
                    ].map((spec, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                          <span>{spec.left}</span>
                          <span className="text-brand-red">{spec.val} {spec.active === 'left' ? spec.left : spec.right}</span>
                          <span>{spec.right}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
                          <div className={`h-full bg-brand-red rounded-full transition-all`} style={{
                            width: spec.val,
                            marginLeft: spec.active === 'right' ? `calc(100% - ${spec.val})` : '0px'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: CAREER MATCH ANALYSIS (8 Recommendations) */}
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">Recommended Career Matches</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {careerRecommendations.map((c, i) => (
                  <div 
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-black text-slate-950 truncate max-w-[70%]">{c.name}</h4>
                        <span className="rounded bg-brand-pink px-2 py-0.5 text-[9px] font-black text-brand-red shrink-0">{c.match}%</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Demand: {c.demand} · Growth: {c.growth}</p>
                      
                      <div className="h-px bg-slate-100 my-1" />

                      <div className="text-[10px] font-semibold text-slate-500 space-y-1">
                        <p><strong>Edu Path:</strong> {c.edu}</p>
                        <p><strong>Top Skills:</strong> {c.skills}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Exploring detailed roadmap details for ${c.name}...`)}
                      className="w-full text-center py-2 rounded-lg border border-slate-200 hover:border-brand-red hover:bg-brand-pink/20 hover:text-brand-red text-[10px] font-black text-slate-600 transition-all cursor-pointer"
                    >
                      Explore Career Path
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: TOP STRENGTHS (4 Cards) */}
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">Top Identified Strengths</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strengthsDataset.map((s, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-left flex gap-4 items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-pink text-brand-red font-black text-sm">
                      {s.score}%
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">{s.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                      <p className="text-[10px] text-slate-400 font-bold italic mt-1">💡 Tip: {s.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: SKILL GAP ANALYSIS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Skill Gap Diagnostic Matrix</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Target benchmark: Project Manager</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Radar chart */}
                <div className="border border-slate-150 rounded-2xl p-4 bg-slate-50/50 flex flex-col items-center">
                  <div className="h-56 w-full max-w-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillGapData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 9, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                        <Radar name="Current" dataKey="Current" stroke="#C62828" fill="#C62828" fillOpacity={0.15} />
                        <Radar name="Target" dataKey="Target" stroke="#1E293B" fill="#1E293B" fillOpacity={0.05} />
                        <Legend wrapperStyle={{ fontSize: 9, fontWeight: 700 }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3.5 text-xs font-bold text-slate-700">
                  {skillGapData.map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                        <span>{s.subject}</span>
                        <span>{s.Current}% ➔ {s.Target}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
                        <div className="absolute left-0 top-0 h-full bg-slate-300" style={{ width: `${s.Current}%` }} />
                        <div className="absolute left-0 top-0 h-full bg-brand-red opacity-80" style={{ width: `${s.Target}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 6: LEARNING STYLE (Donut VARK modalities) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-brand-red" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Cognitive Learning Style Modal</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Donut chart */}
                <div className="flex flex-col items-center justify-center">
                  <div className="h-44 w-full max-w-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={learningStylePie}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {learningStylePie.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex gap-4 text-[9px] font-black uppercase text-slate-400 mt-2">
                    {learningStylePie.map((style, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: style.color }} />
                        <span>{style.name} ({style.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation text */}
                <div className="space-y-4 text-xs leading-relaxed text-slate-500 font-semibold">
                  <p>
                    <strong>Primary Modality: Visual (40%)</strong> — You absorb concepts best through wireframes, timeline matrix charts, and strategic mapping documents.
                  </p>
                  <p>
                    <strong>Recommended Study technique:</strong> Utilize structural summaries, color-coded checklists, and flowcharts. Highlight milestone roadmaps rather than reading pure blocks of text in textbooks.
                  </p>
                </div>

              </div>
            </div>

            {/* SECTION 7: LEADERSHIP & COMMUNICATION */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-black">Leadership & Teamwork Spider Matrix</h3>
                <span className="text-[10px] font-bold text-brand-red uppercase">Leadership: 88/100 · Communication: 86/100</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Radar chart */}
                <div className="border border-slate-150 rounded-2xl p-4 bg-slate-50/50 flex flex-col items-center">
                  <div className="h-56 w-full max-w-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={leadershipSpider}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 9, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                        <Radar name="Quotient Score" dataKey="value" stroke="#C62828" fill="#C62828" fillOpacity={0.2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Detail cards */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  {[
                    { label: 'Decision Making', val: '90%', col: 'bg-red-50 text-brand-red border-red-100' },
                    { label: 'Teamwork Integrity', val: '85%', col: 'bg-slate-50 text-slate-900 border-slate-200' },
                    { label: 'Conflict Resolution', val: '75%', col: 'bg-slate-50 text-slate-900 border-slate-200' },
                    { label: 'Public Speaking', val: '70%', col: 'bg-slate-50 text-slate-900 border-slate-200' },
                  ].map((card, cIdx) => (
                    <div key={cIdx} className={`rounded-xl border p-3 flex flex-col justify-between ${card.col}`}>
                      <span className="text-[9px] font-black uppercase text-slate-400 block leading-tight">{card.label}</span>
                      <span className="text-base font-black mt-2">{card.val}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* SECTION 8: EMOTIONAL INTELLIGENCE (EQ) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Emotional Intelligence (EQ) Audit</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">EQ Strengths</h4>
                  <p className="text-slate-500 font-semibold leading-relaxed">
                    <strong>Self Awareness (90%):</strong> Highly cognizant of individual emotional triggers during product delays. Excellent self-regulation habits.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Opportunities</h4>
                  <p className="text-slate-500 font-semibold leading-relaxed">
                    <strong>Relationship Management (75%):</strong> Focus on checking in with team members proactively to prevent friction over task deliverables.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 9: CAREER ROADMAP PREVIEW */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Custom Career Roadmap Preview</h3>
                <span className="text-[10px] font-bold text-brand-red uppercase">Milestones Timeline</span>
              </div>

              <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4 text-left">
                {[
                  { step: 'Phase 1', title: 'Stream & Skills Development', date: '6 Months', desc: 'Focus on advanced logic, database modeling, and agile credentials.' },
                  { step: 'Phase 2', title: 'Target Certifications', date: '1 Year', desc: 'Acquire certified Scrum Master status or product design portfolio elements.' },
                  { step: 'Phase 3', title: 'Corporate Internships', date: '1.5 Years', desc: 'Secure junior analyst placement or project coordinator projects.' },
                  { step: 'Phase 4', title: 'Dream Placement Strategy', date: '2.5 Years', desc: 'Align hiring pipelines to land Software Product Associate titles.' },
                ].map((ph, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-brand-red bg-white" />
                    <span className="text-[10px] font-black text-brand-red uppercase tracking-wider">{ph.step} ({ph.date})</span>
                    <h4 className="text-xs font-black text-slate-900">{ph.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1">{ph.desc}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => alert("Redirecting to the complete learning roadmap dashboards tracker...")}
                className="w-full text-center py-2.5 rounded-xl border border-slate-200 hover:border-brand-red hover:bg-brand-pink/20 hover:text-brand-red text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                View Complete Roadmap
              </button>
            </div>

            {/* SECTION 10: AI RECOMMENDATIONS */}
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">AI Prescriptive Action Recommendations</h3>
              
              <div className="overflow-x-auto border border-slate-250 bg-white rounded-3xl p-4 sm:p-6 shadow-sm">
                <table className="w-full text-left border-collapse text-xs font-bold text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-black uppercase text-[9px] tracking-widest">
                      <th className="py-2.5 px-3">Recommendation</th>
                      <th className="py-2.5 px-3">Priority</th>
                      <th className="py-2.5 px-3 text-center">Effort</th>
                      <th className="py-2.5 px-3 text-right">Expected Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { rec: 'Acquire Agile Scrum Master credential', priority: 'High', effort: 'Medium', impact: 'Very High' },
                      { rec: 'Develop Python & SQL data modeling scripts', priority: 'High', effort: 'Hard', impact: 'High' },
                      { rec: 'Deploy mock product requirement document (PRD) portfolios', priority: 'Medium', effort: 'Medium', impact: 'High' },
                      { rec: 'Attend next monthly AI careers counseling webinars', priority: 'Medium', effort: 'Easy', impact: 'Medium' },
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-3 text-slate-950 font-black">{row.rec}</td>
                        <td className="py-3 px-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase ${
                            row.priority === 'High' ? 'bg-red-50 text-brand-red border border-red-100' : 'bg-slate-50 text-slate-500 border border-slate-200'
                          }`}>{row.priority}</span>
                        </td>
                        <td className="py-3 px-3 text-center text-slate-500">{row.effort}</td>
                        <td className="py-3 px-3 text-right text-brand-slate font-black">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 11: COMPARATIVE INSIGHTS (Percentile Benchmarking) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Comparative Benchmarking Insights</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Benchmarked against 5,000+ candidate evaluations in India</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                {[
                  { label: 'Problem Solving', val: 'Top 8%' },
                  { label: 'Leadership', val: 'Top 12%' },
                  { label: 'Learning Agility', val: 'Top 10%' },
                  { label: 'Communication', val: 'Top 15%' },
                  { label: 'Career Readiness', val: 'Top 9%' },
                ].map((bench, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block leading-tight">{bench.label}</span>
                    <span className="text-lg font-black text-brand-red block mt-2">{bench.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 12: REPORT ACTION CENTER */}
            <div className="rounded-3xl bg-[#1E293B] text-white p-8 sm:p-10 shadow-md text-center space-y-6">
              <h3 className="text-2xl font-black tracking-tight leading-none">Complete Report Actions Workspace</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold max-w-lg mx-auto">
                Download printable diagnostics sheets, secure a secure report sharing URL, or enroll in recommended skill learning programs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => window.print()}
                  className="rounded-full bg-brand-red px-8 py-3 text-xs font-bold text-white shadow hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Download Report PDF
                </button>
                <button 
                  onClick={() => alert("Starting recommended certified program course index...")}
                  className="rounded-full bg-white hover:bg-slate-50 px-8 py-3 text-xs font-bold text-slate-800 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Start Learning Plan
                </button>
                <button 
                  onClick={() => navigate('/assessments')}
                  className="rounded-full border border-slate-650 bg-[#334155] hover:bg-[#475569] px-8 py-3 text-xs font-bold text-white hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Retake Assessment
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN SIDEBAR: tips, quick tests */}
          <div className="lg:col-span-3 space-y-8 text-left">
            
            {/* Career Tip */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <span className="text-[9px] font-black text-brand-red uppercase tracking-wider block">Today's Career Tip</span>
              <h4 className="text-xs font-black text-slate-900">Build interactive PRD portfolios</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Rather than just noting Scrum on resumes, compose draft Product Requirement Documents on Notion. Link these directly to your profile.
              </p>
            </div>

            {/* Recommended Assessments */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Recommended Next Tests</h4>
              <div className="space-y-3">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl cursor-pointer hover:border-brand-red transition-all" onClick={() => navigate('/assessments')}>
                  <h5 className="text-xs font-black text-slate-900">Cognitive Logic Diagnostic</h5>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">35 Mins · Hard Difficulty</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl cursor-pointer hover:border-brand-red transition-all" onClick={() => navigate('/assessments')}>
                  <h5 className="text-xs font-black text-slate-900">Emotional Intelligence (EQ)</h5>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">30 Mins · Medium Difficulty</p>
                </div>
              </div>
            </div>

            {/* Counseling Reminder */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Upcoming Advisory</h4>
              <div className="flex gap-3 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                <Calendar className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-slate-800">Mentor Slot: Dr. Sunita</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">Aug 2nd, 02:00 PM (Confirmed)</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ==================== SECURE SHARING MODAL ==================== */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => { setShowShareModal(false); setShowEmailDialog(false); }} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-6 text-left z-10"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Share Career Report</h3>
                <button onClick={() => { setShowShareModal(false); setShowEmailDialog(false); }} className="text-slate-400 cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {!showEmailDialog ? (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Share a secure, read-only link to your AI Career Report with recruiters, schools, or counselors.
                  </p>

                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value="https://torqueinsights.com/report/REP-90A07-2026"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:outline-none"
                    />
                    <button 
                      onClick={handleCopyLink}
                      className="px-4 py-2 bg-brand-red hover:bg-brand-redhover rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedLink ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={() => setShowEmailDialog(true)}
                      className="py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="h-4 w-4 text-brand-red" /> Email Report
                    </button>
                    <button 
                      onClick={() => alert("Report successfully saved to your cloud drive profile!")}
                      className="py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Shield className="h-4 w-4 text-brand-red" /> Save to Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Directly dispatch this verified AI Career DNA Report to a coordinator or parent email.
                  </p>
                  
                  <form onSubmit={(e) => { e.preventDefault(); alert("AI Report dispatch successfully sent!"); setShowShareModal(false); setShowEmailDialog(false); }} className="space-y-3">
                    <input 
                      type="email" 
                      required 
                      placeholder="Recipient Email address" 
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:outline-none focus:border-brand-red"
                    />
                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-slate-950 hover:bg-black rounded-xl text-xs font-bold text-white shadow cursor-pointer text-center block"
                    >
                      Dispatch Report
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
