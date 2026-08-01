import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import studentAssessment from '../../assets/student_assessment.jpg';
import studentCollaboration from '../../assets/student_collaboration.jpg';
import studentGraduate from '../../assets/student_graduate.jpg';
import academicCampusBg from '../../assets/academic_campus_bg.jpg';
import hero169 from '../../assets/hero_16_9.jpg';
import { 
  Sparkles, BrainCircuit, GraduationCap, ClipboardCheck, ArrowRight, 
  Star, ChevronDown, Check, Building, BookOpen, Key, Users, 
  Calendar, Award, ShieldCheck, Play, Briefcase, BarChart as BarChartIcon, Target, Rocket,
  User, Timer, Compass, Globe, Mail
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mock report data for AI Reports showcase section
  const radarData = [
    { subject: 'Strategy', score: 95 },
    { subject: 'Leadership', score: 88 },
    { subject: 'Creativity', score: 75 },
    { subject: 'Analytical', score: 92 },
    { subject: 'Empathy', score: 80 },
    { subject: 'Execution', score: 85 },
  ];

  const careerMatches = [
    { name: 'Strategy Consultant', score: 94 },
    { name: 'Product Manager', score: 89 },
    { name: 'Data Scientist', score: 86 },
    { name: 'UX Researcher', score: 81 },
    { name: 'Entrepreneur', score: 78 }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Immersive Academic Grid Background */}
      <div className="absolute inset-0 bg-dot-grid -z-10 pointer-events-none" />

      {/* Cinematic Campus Background Image with Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 -z-20 h-[820px] w-full overflow-hidden pointer-events-none">
        <img
          src={academicCampusBg}
          alt="Torque Insights University Campus Backdrop"
          className="w-full h-full object-cover opacity-15 mix-blend-multiply dark:mix-blend-normal dark:opacity-[0.06] transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950" />
      </div>

      {/* Royal Blue & Teal Soft Ambient Glows */}
      <div className="absolute top-[10%] right-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#00A8A8]/10 blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#0F4C81]/15 blur-[160px] pointer-events-none" />

      {/* FULL WIDTH HERO SECTION (100% Viewport Width, 100vh Min Height Layout) */}
      <section className="relative w-full min-h-screen flex flex-col justify-center pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 gap-16 lg:grid-cols-12 items-center">
          
          {/* LEFT COLUMN: Harvard/Stanford Copywriting & Academic Formatting */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0F4C81]/10 dark:bg-[#00A8A8]/10 border border-[#0F4C81]/20 px-3.5 py-1.5 text-xs font-black text-[#0F4C81] dark:text-[#00A8A8] uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Torque Insights · Academic & AI Diagnostics Portal
            </div>
            
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-[#0F4C81] dark:text-white leading-[1.08]">
              Transform Student Potential <br />
              Through <span className="text-[#00A8A8]">Scientific</span> <br />
              Career Intelligence
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              World-class AI-powered psychometric mapping, cognitive evaluations, and course-stream diagnostics. Specially built to guide students, schools, colleges, counselors, and corporate groups with downloadable career roadmap blueprints.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/assessments"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00A8A8] hover:bg-[#0D9488] px-8 py-4 text-base font-black text-white shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
              >
                Start Free Assessment
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/report"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 py-4 text-base font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
              >
                <Compass className="h-4.5 w-4.5" />
                View Sample AI Report
              </Link>
            </div>

            {/* Premium Trust Badges */}
            <div className="pt-6 flex flex-wrap justify-center lg:justify-start items-center gap-4 text-xs font-black text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="text-[#00A8A8] text-base">✔</span>
                <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#00A8A8] text-base">✔</span>
                <span>Psychometric Integrity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#00A8A8] text-base">✔</span>
                <span>Downloadable Reports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#00A8A8] text-base">✔</span>
                <span>School Ready</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Premium 16:9 Photography Visual Showcase */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center py-10 min-h-[560px] lg:pr-8">
            
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="h-[450px] w-[450px] rounded-full bg-brand-pink/10 blur-3xl animate-pulse pointer-events-none" />
              <div className="absolute h-[320px] w-[320px] rounded-full bg-red-100/10 blur-2xl pointer-events-none" />
            </div>

            {/* 16:9 Image Frame Container */}
            <div className="relative w-full max-w-xl p-2 bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[2rem] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.01]">
              <div className="aspect-video w-full rounded-[1.8rem] overflow-hidden shadow-inner bg-slate-100">
                <img
                  src={hero169}
                  alt="Torque Insights Student AI Collaboration Diagnostics"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Glassmorphic Overlay Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-[2rem]" />
            </div>

            {/* Orbiting dynamic widgets and seals */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="absolute -top-4 -right-2 w-36 rounded-2xl border border-slate-200/50 bg-white/95 dark:bg-slate-900/95 p-3 shadow-xl backdrop-blur-md z-20 text-left"
            >
              <p className="text-[8px] font-black text-[#0F4C81] dark:text-[#38BDF8] uppercase tracking-widest leading-none">Diagnostic Fit</p>
              <h4 className="text-xs font-black text-slate-900 dark:text-white mt-1.5 leading-none">Stanford Global</h4>
              <p className="text-[9px] font-semibold text-slate-400 mt-1 leading-none">94% Fit compatibility</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute top-[45%] -left-10 w-38 rounded-2xl border border-slate-200/50 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md z-20 text-left"
            >
              <p className="text-[8px] font-black text-[#00A8A8] uppercase tracking-widest leading-none">Aptitude Score</p>
              <div className="flex items-baseline gap-0.5 mt-1.5 leading-none">
                <span className="text-base font-black text-slate-950 dark:text-white">98</span>
                <span className="text-[8px] font-bold text-slate-400">/100</span>
              </div>
              <p className="text-[9px] text-emerald-600 font-bold mt-1 leading-none">Exceptional decile</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-6 -left-4 w-36 rounded-2xl border border-slate-200/50 bg-white/95 dark:bg-slate-900/95 p-3 shadow-xl backdrop-blur-md z-20 text-left"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8] inline-block mr-1 animate-pulse" />
              <span className="text-[8px] font-black text-slate-450 uppercase tracking-widest leading-none">System Status</span>
              <h4 className="text-[10px] font-black text-slate-900 dark:text-white mt-1.5 leading-none">Report Compiled</h4>
            </motion.div>

          </div>

        </div>
      </section>

      {/* STATISTICS METRICS BAR */}
      <div className="w-full bg-white dark:bg-slate-950 py-10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center border-t border-slate-200/50 dark:border-slate-800/50 pt-10">
            {[
              { stat: '35+', label: 'Career Assessments', sub: 'Comprehensive domains' },
              { stat: '50,000+', label: 'Students Guided', sub: 'Across 15 countries' },
              { stat: '500+', label: 'Partner Schools', sub: 'Colleges & universities' },
              { stat: '98%', label: 'Student Satisfaction', sub: 'Verified recommendations' },
              { stat: 'AI Powered', label: 'Career Reports', sub: 'Blueprints resolved' }
            ].map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F4C81] dark:text-[#00A8A8]">{metric.stat}</h3>
                <p className="text-xs font-black text-slate-800 dark:text-white leading-none">{metric.label}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 leading-none">{metric.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF: SCROLLING UNIVERSITY & SCHOOL LOGOS MARQUEE */}
      <div className="w-full bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200/40 dark:border-slate-800/40 py-6 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 flex items-center gap-6">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">TRUSTED ACROSS</span>
          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex gap-12 items-center">
              {[
                { name: 'Stanford College of Adv Studies', icon: GraduationCap },
                { name: 'Delhi Public School (DPS)', icon: Building },
                { name: 'Oxford Global Prep Academy', icon: BookOpen },
                { name: 'MIT Tech Labs', icon: BrainCircuit },
                { name: 'Kendriya Vidyalaya (KVS)', icon: Building },
                { name: 'Harvard Club Education Network', icon: GraduationCap },
                { name: 'National Institute of Education', icon: BookOpen },
                { name: 'DAV Public School', icon: Building },
              ].map((logo, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-400 dark:text-slate-600 font-black tracking-wide text-xs uppercase hover:text-slate-500 transition-colors">
                  <logo.icon className="h-4 w-4 shrink-0" />
                  <span>{logo.name}</span>
                </div>
              ))}
              {[
                { name: 'Stanford College of Adv Studies', icon: GraduationCap },
                { name: 'Delhi Public School (DPS)', icon: Building },
                { name: 'Oxford Global Prep Academy', icon: BookOpen },
                { name: 'MIT Tech Labs', icon: BrainCircuit },
                { name: 'Kendriya Vidyalaya (KVS)', icon: Building },
                { name: 'Harvard Club Education Network', icon: GraduationCap },
                { name: 'National Institute of Education', icon: BookOpen },
                { name: 'DAV Public School', icon: Building },
              ].map((logo, idx) => (
                <div key={`dup-${idx}`} className="flex items-center gap-2 text-slate-400 dark:text-slate-600 font-black tracking-wide text-xs uppercase hover:text-slate-500 transition-colors">
                  <logo.icon className="h-4 w-4 shrink-0" />
                  <span>{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT SUCCESS SHOWCASE */}
      <section className="bg-slate-50/50 dark:bg-slate-900/50 py-16 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Empowering Every Student to Discover Their Future
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-semibold">
              Thousands of students are building confidence through AI-powered assessments, personalized career intelligence, and expert guidance.
            </p>
          </div>

          {/* Desktop, Tablet, Mobile responsive layout for student showcase cards */}
          <div className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-8 no-scrollbar pb-4 md:pb-0 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Card 1 */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[70vw] md:w-auto md:shrink group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={studentAssessment} 
                  alt="AI Career Assessment"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 rounded-xl bg-white/30 backdrop-blur-md px-3.5 py-1.5 text-xs font-black text-white uppercase tracking-wider">
                  AI Career Assessment
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Focused & Motivated Assessment</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Take scientifically designed online aptitude or career assessment tests from a bright, modern learning workspace.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[70vw] md:w-auto md:shrink group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={studentCollaboration} 
                  alt="Future Ready"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 rounded-xl bg-white/30 backdrop-blur-md px-3.5 py-1.5 text-xs font-black text-white uppercase tracking-wider">
                  Future Ready
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Collaborative Student Network</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  A diverse group of university students collaborating, discussing career opportunities and celebrating success together.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[70vw] md:w-auto md:shrink md:col-span-2 lg:col-span-1 group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={studentGraduate} 
                  alt="Career Intelligence"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 rounded-xl bg-white/30 backdrop-blur-md px-3.5 py-1.5 text-xs font-black text-white uppercase tracking-wider">
                  Career Intelligence
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Aspirational Intelligence Reports</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  A young graduate smiling confidently holding a tablet with visual analytics detailing student matching options.
                </p>
              </div>
            </div>

          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              to="/assessments"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-slate hover:to-brand-red px-8 py-4 text-base font-bold text-white shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              Start Your Assessment
            </Link>
            <Link
              to="/reports"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-8 py-4 text-base font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              Explore Career Reports
            </Link>
          </div>

        </div>
      </section>

      {/* HORIZONTAL TRUST STRIP WITH MINIMAL ICONS */}
      <div className="border-y border-slate-200 bg-slate-50/50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center items-center text-slate-500 font-bold text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-brand-red shrink-0" />
              <span>AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-4.5 w-4.5 text-brand-red shrink-0" />
              <span>Scientifically Designed</span>
            </div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4.5 w-4.5 text-brand-red shrink-0" />
              <span>Career Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-brand-red shrink-0" />
              <span>Data Privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-brand-red shrink-0" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4.5 w-4.5 text-brand-red shrink-0" />
              <span>Responsive Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: TRUSTED BY SCHOOLS */}
      <section className="py-12 border-t border-b border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
            Trusted by leading educational and corporate networks in India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <span className="font-extrabold text-lg text-slate-500">DPS School</span>
            <span className="font-extrabold text-lg text-slate-500">Symbiosis</span>
            <span className="font-extrabold text-lg text-slate-500">IIM Alumni Association</span>
            <span className="font-extrabold text-lg text-slate-500">Tata Recruits</span>
            <span className="font-extrabold text-lg text-slate-500">Torque Learning</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: ASSESSMENT CATEGORIES */}
      <section className="py-16 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-extrabold tracking-wider uppercase text-brand-red">
            Assessment Categories
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl leading-tight">
            Discover the Right Assessment for Every Stage of Your Journey
          </h2>
          <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-2xl mx-auto">
            Whether you're choosing a career, preparing for college, planning higher studies, or building leadership skills, Torque Insights offers scientifically designed AI-powered assessments tailored to your goals.
          </p>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* CARD 1: School Career Assessment */}
          <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-slate-350 transition-all duration-300">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-snug">School Career Assessment</h3>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider bg-slate-50 border border-slate-100 rounded px-2.5 py-0.5 mt-1.5 inline-block">
                Class XI–XII Students
              </span>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium">
                Discover your personality, interests, learning style, multiple intelligence, aptitude, and ideal academic stream.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Personality Profile</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Interest Mapping</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Aptitude Assessment</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Learning Style</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> AI Career Report</li>
              </ul>
            </div>
            <Link to="/assessments" className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              Explore Assessment
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* CARD 2: Undergraduate Success Assessment */}
          <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-slate-350 transition-all duration-300">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-snug">Undergraduate Success Assessment</h3>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider bg-slate-50 border border-slate-100 rounded px-2.5 py-0.5 mt-1.5 inline-block">
                BBA, BCom, BA, BSc Students
              </span>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium">
                Measure business aptitude, communication, leadership potential, innovation mindset, and MBA readiness.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Leadership Potential</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Business Aptitude</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Communication Skills</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Entrepreneurial Mindset</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Roadmap</li>
              </ul>
            </div>
            <Link to="/assessments" className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              Explore Assessment
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* CARD 3: MBA Leadership Assessment */}
          <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-slate-350 transition-all duration-300">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChartIcon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-snug">MBA Leadership Assessment</h3>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider bg-slate-50 border border-slate-100 rounded px-2.5 py-0.5 mt-1.5 inline-block">
                MBA Students & Professionals
              </span>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium">
                Evaluate strategic thinking, consulting readiness, emotional intelligence, decision-making, and executive leadership potential.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Leadership Index</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Emotional Intelligence</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Strategic Thinking</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Consulting Readiness</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Executive Growth Plan</li>
              </ul>
            </div>
            <Link to="/assessments" className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              Explore Assessment
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* CARD 4: Career Aptitude Assessment */}
          <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-slate-350 transition-all duration-300">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-snug">Career Aptitude Assessment</h3>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider bg-slate-50 border border-slate-100 rounded px-2.5 py-0.5 mt-1.5 inline-block">
                Students & Professionals
              </span>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium">
                Identify your strongest abilities, problem-solving skills, logical reasoning, and career suitability.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Cognitive Ability</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Numerical Reasoning</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Verbal Ability</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Analytical Thinking</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Match</li>
              </ul>
            </div>
            <Link to="/assessments" className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              Explore Assessment
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* CARD 5: Employability Assessment */}
          <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-slate-350 transition-all duration-300">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-snug">Employability Assessment</h3>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider bg-slate-50 border border-slate-100 rounded px-2.5 py-0.5 mt-1.5 inline-block">
                College Students & Fresh Graduates
              </span>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium">
                Evaluate workplace readiness, communication, teamwork, adaptability, leadership, and interview preparedness.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Employability Score</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Workplace Behaviour</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Communication</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Teamwork</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Interview Readiness</li>
              </ul>
            </div>
            <Link to="/assessments" className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              Explore Assessment
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* CARD 6: Corporate Talent Assessment */}
          <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-slate-350 transition-all duration-300">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-snug">Corporate Talent Assessment</h3>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider bg-slate-50 border border-slate-100 rounded px-2.5 py-0.5 mt-1.5 inline-block">
                Organizations & HR Teams
              </span>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium">
                Assess employee competencies, leadership capability, behavioral strengths, succession planning, and talent development.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Leadership Analytics</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Behaviour Analysis</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Talent Mapping</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Team Insights</li>
                <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Performance Potential</li>
              </ul>
            </div>
            <button onClick={() => alert("Contacting enterprise partnerships team...")} className="mt-6 w-full py-2.5 rounded-xl border border-slate-900 bg-slate-950 text-white hover:bg-black text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              Book Enterprise Demo
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

        {/* BOTTOM CTA: Not Sure Helper Card */}
        <div className="mt-20 rounded-[24px] border border-red-100 bg-gradient-to-br from-brand-pink/50 via-white to-white p-8 sm:p-10 shadow-lg text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white shadow-md shadow-red-500/10">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-brand-slate tracking-tight">Not Sure Which Assessment is Right for You?</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl mx-auto">
              Our AI Career Advisor helps you choose the most suitable assessment based on your education, goals, and aspirations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => alert("Launching AI advisor conversation module...")}
              className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
            >
              Talk to AI Advisor
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
            <Link 
              to="/assessments"
              className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 text-sm font-bold text-slate-700 hover:scale-[1.02] transition-all cursor-pointer"
            >
              View All Assessments
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE TORQUE INSIGHTS */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] border-t border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-bold text-brand-red uppercase tracking-wider">
              Why Us
            </span>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight leading-tight">
              Why Choose Torque Insights?
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-2xl mx-auto">
              More than just an assessment. Experience AI-powered career intelligence that transforms data into meaningful career decisions.
            </p>
          </div>

          {/* 8 Feature Cards Grid (4 columns × 2 rows on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: AI-Powered Insights */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                  <BrainCircuit className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">AI-Powered Insights</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Advanced AI analyzes assessment responses to generate personalized career recommendations, strengths, and development opportunities.
                </p>
              </div>
            </div>

            {/* Card 2: Scientifically Designed Assessments */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                  <ClipboardCheck className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Scientifically Designed Assessments</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Built on established psychometric principles to provide structured, meaningful, and consistent career insights.
                </p>
              </div>
            </div>

            {/* Card 3: Interactive Career Reports */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                  <BarChartIcon className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Interactive Career Reports</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Receive visually rich dashboards instead of static reports, making insights easier to understand and act upon.
                </p>
              </div>
            </div>

            {/* Card 4: Personalized Career Roadmaps */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                  <Target className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Personalized Career Roadmaps</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Receive recommendations for career paths, higher education, certifications, and future skill development.
                </p>
              </div>
            </div>

            {/* Card 5: Secure & Private */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Secure & Private</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Your assessment data remains protected with enterprise-grade security and privacy standards.
                </p>
              </div>
            </div>

            {/* Card 6: Continuous Progress Tracking */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                  <Timer className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Continuous Tracking</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Monitor your development over time through repeat assessments and evolving AI recommendations.
                </p>
              </div>
            </div>

            {/* Card 7: Institution Ready */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                  <Building className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Institution Ready</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Schools, colleges, counselors, and organizations can manage users, analytics, and reports through dedicated dashboards.
                </p>
              </div>
            </div>

            {/* Card 8: Future-Ready Platform */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                  <Globe className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Future-Ready Platform</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Designed to grow with emerging technologies, AI innovations, and evolving career landscapes.
                </p>
              </div>
            </div>

          </div>

          {/* COMPARISON CARDS SECTION */}
          <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Traditional Platforms */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <h3 className="text-base font-black text-slate-400 uppercase tracking-widest text-center">Traditional Platforms</h3>
                <div className="h-px bg-slate-100" />
                <ul className="space-y-3.5 text-xs font-bold text-slate-500">
                  <li className="flex items-center gap-2"><span className="text-slate-350">✗</span> Static PDF Reports</li>
                  <li className="flex items-center gap-2"><span className="text-slate-350">✗</span> Generic Recommendations</li>
                  <li className="flex items-center gap-2"><span className="text-slate-350">✗</span> Limited Career Guidance</li>
                  <li className="flex items-center gap-2"><span className="text-slate-350">✗</span> No AI Interpretation</li>
                  <li className="flex items-center gap-2"><span className="text-slate-350">✗</span> Minimal Personalization</li>
                  <li className="flex items-center gap-2"><span className="text-slate-350">✗</span> One-Time Assessment</li>
                </ul>
              </div>
            </div>

            {/* Torque Insights */}
            <div className="rounded-3xl border border-red-200 bg-gradient-to-br from-brand-pink/50 via-white to-white p-6 sm:p-8 flex flex-col justify-between shadow-lg relative">
              <div className="absolute top-4 right-4 rounded-full bg-brand-red px-2.5 py-0.5 text-[9px] font-black uppercase text-white tracking-widest">
                AI Driven
              </div>
              <div className="space-y-6">
                <h3 className="text-base font-black text-brand-red uppercase tracking-widest text-center">Torque Insights</h3>
                <div className="h-px bg-red-100" />
                <ul className="space-y-3.5 text-xs font-bold text-slate-800">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> AI-Powered Analysis</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Interactive Career Dashboard</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Personalized Career Roadmap</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Skill Gap Analysis</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Leadership & Employability Scores</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Continuous Progress Tracking</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> AI Career Coach</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Institution Dashboards</li>
                </ul>
              </div>
            </div>

          </div>

          {/* TRUST INDICATORS BADGES */}
          <div className="mt-20 border-t border-slate-200 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center items-center text-slate-500 font-bold text-xs uppercase tracking-wider text-center">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Scientifically Designed</span>
              </div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Career Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Institution Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Future Ready</span>
              </div>
            </div>
          </div>

          {/* SUCCESS METRICS STATS */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-brand-slate">100+</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Career Pathways</p>
            </motion.div>
            
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-brand-slate">30 Min</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Assessment Duration</p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-brand-red">AI</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Personalized Matches</p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-brand-slate">24×7</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Digital Guidance</p>
            </motion.div>
          </div>

          {/* CALL TO ACTION */}
          <div className="mt-20 rounded-[32px] border border-red-100 bg-gradient-to-br from-brand-pink/50 via-white to-white p-10 sm:p-12 shadow-xl text-center max-w-4xl mx-auto space-y-6">
            <h3 className="text-3xl font-black text-brand-slate tracking-tight leading-none">Experience the Future of Career Intelligence</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl mx-auto">
              Join students, educators, counselors, and organizations using AI to make smarter career decisions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <Link 
                to="/assessments"
                className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                Start Your Assessment
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              <button 
                onClick={() => alert("Connecting consultation scheduling page...")}
                className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 text-sm font-bold text-slate-700 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Schedule a Demo
              </button>
            </div>
          </div>

        </div>
      </section>
      
      {/* SECTION: SOLUTIONS DESIGNED FOR EVERY STAGE OF SUCCESS */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-bold text-brand-red uppercase tracking-wider">
              Platform Solutions
            </span>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight leading-tight">
              Solutions Designed for Every Stage of Success
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-2xl mx-auto">
              Whether you're a student planning your future, a parent seeking guidance, an educator supporting learners, or an organization developing talent, Torque Insights provides personalized AI-powered career intelligence.
            </p>
          </div>

          {/* Grid of 6 Premium Glassmorphic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* CARD 1: Students */}
            <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-snug">Students</h3>
                <p className="mt-2.5 text-xs text-slate-500 leading-relaxed font-medium">
                  Discover your strengths, personality, aptitude, and ideal career path through AI-powered assessments.
                </p>
                <div className="h-px bg-slate-100 my-4" />
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Personality Analysis</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Matching</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> AI Reports</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Learning Style</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Roadmap</li>
                </ul>
              </div>
              <Link to="/assessments" className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                Explore Student Solutions
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* CARD 2: Parents */}
            <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-snug">Parents</h3>
                <p className="mt-2.5 text-xs text-slate-500 leading-relaxed font-medium">
                  Support your child's academic and career journey with detailed insights and personalized recommendations.
                </p>
                <div className="h-px bg-slate-100 my-4" />
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Child Progress</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Guidance</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Counseling Support</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Reports</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Decision Making</li>
                </ul>
              </div>
              <button onClick={() => alert("Loading Parent Solutions Dashboard...")} className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                Explore Parent Solutions
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* CARD 3: Schools */}
            <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform">
                  <Building className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-snug">Schools</h3>
                <p className="mt-2.5 text-xs text-slate-500 leading-relaxed font-medium">
                  Empower students with scientific career guidance while helping educators understand learning potential.
                </p>
                <div className="h-px bg-slate-100 my-4" />
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Student Analytics</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Readiness</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Class Reports</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Institutional Dashboard</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Assessment Management</li>
                </ul>
              </div>
              <Link to="/schools" className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                Explore School Solutions
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* CARD 4: Colleges & Universities */}
            <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-950 leading-snug">Colleges & Universities</h3>
                <p className="mt-2.5 text-xs text-slate-500 leading-relaxed font-medium">
                  Improve employability, placement readiness, and leadership development through institutional analytics.
                </p>
                <div className="h-px bg-slate-100 my-4" />
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Employability Score</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Placement Readiness</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Skill Gap Analysis</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Student Analytics</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Intelligence</li>
                </ul>
              </div>
              <Link to="/colleges" className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                Explore College Solutions
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* CARD 5: Career Counselors */}
            <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-snug">Career Counselors</h3>
                <p className="mt-2.5 text-xs text-slate-500 leading-relaxed font-medium">
                  Deliver data-driven counseling sessions with AI-generated reports and personalized career recommendations.
                </p>
                <div className="h-px bg-slate-100 my-4" />
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Student Reports</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> AI Insights</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Counseling Notes</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Planning</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Recommendation Engine</li>
                </ul>
              </div>
              <button onClick={() => alert("Loading Counselor Dashboard Panel...")} className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-brand-pink hover:text-brand-red hover:border-brand-pink text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                Explore Counselor Solutions
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* CARD 6: Corporate HR */}
            <div className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink text-brand-red mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-snug">Corporate HR & Organizations</h3>
                <p className="mt-2.5 text-xs text-slate-500 leading-relaxed font-medium">
                  Assess talent, identify leadership potential, support hiring decisions, and build future-ready teams.
                </p>
                <div className="h-px bg-slate-100 my-4" />
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Talent Analytics</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Leadership Assessment</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Hiring Intelligence</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Succession Planning</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Performance Insights</li>
                </ul>
              </div>
              <button onClick={() => alert("Contacting enterprise partnerships team...")} className="mt-6 w-full py-2.5 rounded-xl border border-slate-900 bg-slate-950 text-white hover:bg-black text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                Book Enterprise Demo
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

          {/* BOTTOM FEATURE STRIP */}
          <div className="mt-20 border-t border-slate-200 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center items-center text-slate-500 font-bold text-xs uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Scientifically Designed</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Institution Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Scalable SaaS</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Actionable Insights</span>
              </div>
            </div>
          </div>

          {/* SUCCESS METRICS ANIMATED STATS */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-brand-slate">50+</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Assessment Parameters</p>
            </motion.div>
            
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-brand-red">100+</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Career Pathways</p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-brand-slate">10+</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Industry Sectors</p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-brand-slate">24×7</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">AI Career Guidance</p>
            </motion.div>
          </div>

          {/* CALL TO ACTION */}
          <div className="mt-20 rounded-[32px] border border-red-100 bg-gradient-to-br from-brand-pink/50 via-white to-white p-10 sm:p-12 shadow-xl text-center max-w-4xl mx-auto space-y-6">
            <h3 className="text-3xl font-black text-brand-slate tracking-tight leading-none">Find the Right Solution for Your Journey</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl mx-auto">
              Choose the experience built specifically for your goals and unlock personalized career intelligence powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <button 
                onClick={() => alert("Exploring custom user tracks solutions...")}
                className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                Explore Solutions
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
              <button 
                onClick={() => alert("Consulting demo scheduling calendar...")}
                className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 text-sm font-bold text-slate-700 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Schedule a Demo
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: AI CAREER REPORTS (INTERACTIVE PREVIEW) */}
      <section className="py-20 sm:py-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-bold text-brand-red uppercase tracking-wider">
            Diagnostic Reports
          </span>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight leading-tight">
            Your Personalized AI Career Intelligence Report
          </h2>
          <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-2xl mx-auto">
            Receive a comprehensive, AI-powered report that analyzes your personality, aptitude, strengths, career interests, leadership potential, and future opportunities.
          </p>
        </div>

        {/* Two Column Layout: Left Laptop Preview / Right Modules Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: Laptop mockup & floating cards */}
          <div className="lg:col-span-7 relative py-12 flex justify-center">
            
            {/* Ambient Red Glow in Background */}
            <div className="absolute top-[20%] left-[20%] right-[20%] bottom-[20%] rounded-full bg-red-100/30 blur-3xl -z-10" />

            {/* Laptop Body Shell */}
            <div className="w-full max-w-[580px] shadow-2xl rounded-t-2xl border-[12px] border-slate-900 bg-slate-900 overflow-hidden relative">
              
              {/* Laptop Screen Content (Dashboard Preview) */}
              <div className="h-[360px] bg-white overflow-y-auto no-scrollbar p-4 space-y-4 text-left select-none text-slate-800">
                
                {/* Dashboard Header */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Career Intelligence Dashboard</h4>
                    <p className="text-[9px] text-slate-400 font-semibold">Candidate Profile: Aarav Sharma</p>
                  </div>
                  <span className="rounded-full bg-brand-pink border border-red-100 px-2 py-0.5 text-[8px] font-black text-brand-red uppercase">
                    ★ AI Brain Validated
                  </span>
                </div>

                {/* Grid 1: Radar & Aptitude */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Mini Radar Card */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <h5 className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-2">Personality DNA Radar</h5>
                    <div className="h-32 w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 7, fontWeight: '700' }} />
                          <Radar name="Aarav" dataKey="score" stroke="#C62828" fill="#C62828" fillOpacity={0.2} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Career Suitability Matches */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 space-y-3">
                    <div>
                      <h5 className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Top Aligned Careers</h5>
                      <p className="text-[8px] text-slate-400 font-medium">Primary suitability matches</p>
                    </div>
                    <div className="space-y-1.5">
                      {careerMatches.slice(0, 3).map((c) => (
                        <div key={c.name} className="space-y-0.5">
                          <div className="flex justify-between text-[9px] font-bold">
                            <span className="text-slate-700">{c.name}</span>
                            <span className="text-brand-red">{c.score}%</span>
                          </div>
                          <div className="h-1 w-full rounded-full bg-slate-200 overflow-hidden">
                            <div className="h-full bg-brand-red" style={{ width: `${c.score}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Dashboard Metrics Row */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Leadership Index</p>
                    <p className="text-sm font-black text-slate-900">89/100</p>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Learning Style</p>
                    <p className="text-[9px] font-black text-brand-red mt-0.5">Visual Learner</p>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Employability</p>
                    <p className="text-[9px] font-black text-emerald-600 mt-0.5">Top 5%</p>
                  </div>
                </div>

                {/* AI Coaching Insights */}
                <div className="rounded-xl border border-red-100 bg-gradient-to-br from-brand-pink/40 to-white p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-brand-red">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-wider">AI Insight Coach Recommendation</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                    Aarav exhibits strong quantitative and logical capacity. We recommend pursuing Consulting or Product Management tracks, utilizing his natural strategic thinking metrics.
                  </p>
                </div>

              </div>

              {/* Laptop Screen Bottom Frame Notch */}
              <div className="h-[12px] bg-slate-800 border-t border-slate-700/50 flex items-center justify-center">
                <div className="h-1.5 w-16 rounded-full bg-slate-600" />
              </div>
            </div>

            {/* Laptop Base (Keyboard Plate) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[620px] h-[8px] bg-slate-800 rounded-b-xl shadow-xl -z-10" />

            {/* FLOATING AI INSIGHT CARDS */}
            
            {/* Card A: Career Match */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="absolute top-4 -left-6 w-32 rounded-2xl border border-slate-200 bg-white/90 p-2.5 shadow-lg backdrop-blur-sm z-20 text-xs font-black"
            >
              <p className="text-[8px] font-bold text-slate-400 uppercase">Career Match</p>
              <p className="text-brand-red mt-0.5">92% Match</p>
            </motion.div>

            {/* Card B: Leadership */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute top-[25%] -right-8 w-32 rounded-2xl border border-slate-200 bg-white/90 p-2.5 shadow-lg backdrop-blur-sm z-20 text-xs font-black"
            >
              <p className="text-[8px] font-bold text-slate-400 uppercase">Leadership</p>
              <p className="text-slate-800 mt-0.5">88 Index Score</p>
            </motion.div>

            {/* Card C: Communication */}
            <motion.div 
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-[52%] -left-8 w-32 rounded-2xl border border-slate-200 bg-white/90 p-2.5 shadow-lg backdrop-blur-sm z-20 text-xs font-black"
            >
              <p className="text-[8px] font-bold text-slate-400 uppercase">Communication</p>
              <p className="text-emerald-600 mt-0.5">91% Percentile</p>
            </motion.div>

            {/* Card D: Learning Style */}
            <motion.div 
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
              className="absolute bottom-16 -right-6 w-36 rounded-2xl border border-slate-200 bg-white/90 p-2.5 shadow-lg backdrop-blur-sm z-20 text-xs font-black"
            >
              <p className="text-[8px] font-bold text-slate-400 uppercase">Learning Style</p>
              <p className="text-slate-800 mt-0.5">Visual Learner</p>
            </motion.div>

            {/* Card E: Career Recommendation */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-2 -left-4 w-40 rounded-2xl border border-slate-200 bg-slate-900 p-2.5 shadow-xl z-20 text-xs font-black text-white"
            >
              <p className="text-[8px] font-bold text-red-400 uppercase">AI Recommendation</p>
              <p className="mt-0.5">Product Manager</p>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Feature Explanatory Modules (Grid of 6) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
              <span className="text-lg">🧬</span>
              <h4 className="font-black text-slate-900 text-xs mt-2">Personality DNA</h4>
              <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Discover your behavioral style and natural strengths.</p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
              <span className="text-lg">🎯</span>
              <h4 className="font-black text-slate-900 text-xs mt-2">Career Match Analysis</h4>
              <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Identify careers that best align with your personality and interests.</p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
              <span className="text-lg">👑</span>
              <h4 className="font-black text-slate-900 text-xs mt-2">Leadership & EQ</h4>
              <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Measure leadership potential, collaboration, and adaptability.</p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
              <span className="text-lg">📚</span>
              <h4 className="font-black text-slate-900 text-xs mt-2">Learning Style</h4>
              <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Understand how you absorb knowledge and maximize performance.</p>
            </div>

            {/* Card 5 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
              <span className="text-lg">⚡</span>
              <h4 className="font-black text-slate-900 text-xs mt-2">Skill Gap Analysis</h4>
              <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Identify the key skills you need to achieve your desired career.</p>
            </div>

            {/* Card 6 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
              <span className="text-lg">🗺️</span>
              <h4 className="font-black text-slate-900 text-xs mt-2">AI Career Roadmap</h4>
              <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Receive personalized recommendations for certifications and courses.</p>
            </div>

          </div>

        </div>

        {/* 6 Premium Feature Metric Icons */}
        <div className="mt-20 border-t border-slate-200 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center items-center text-center">
            
            <div className="space-y-2 group">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <BrainCircuit className="h-5.5 w-5.5" />
              </div>
              <h5 className="text-xs font-black text-slate-900">AI-Powered Analysis</h5>
            </div>

            <div className="space-y-2 group">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <ClipboardCheck className="h-5.5 w-5.5" />
              </div>
              <h5 className="text-xs font-black text-slate-900">Scientifically Designed</h5>
            </div>

            <div className="space-y-2 group">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <Sparkles className="h-5.5 w-5.5" />
              </div>
              <h5 className="text-xs font-black text-slate-900">Interactive Dashboard</h5>
            </div>

            <div className="space-y-2 group">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <Check className="h-5.5 w-5.5" />
              </div>
              <h5 className="text-xs font-black text-slate-900">Download PDF Report</h5>
            </div>

            <div className="space-y-2 group">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <Target className="h-5.5 w-5.5" />
              </div>
              <h5 className="text-xs font-black text-slate-900">Career Matches</h5>
            </div>

            <div className="space-y-2 group">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <GraduationCap className="h-5.5 w-5.5" />
              </div>
              <h5 className="text-xs font-black text-slate-900">Actionable Growth Plan</h5>
            </div>

          </div>

          {/* Action buttons under metrics */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
            <button 
              onClick={() => alert("Loading mock sample report dashboard...")}
              className="rounded-full bg-brand-red px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer"
            >
              View Sample Report
            </button>
            <Link 
              to="/assessments"
              className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3 text-sm font-bold text-slate-700 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Take Assessment
            </Link>
          </div>
        </div>

        {/* COMPARISON BENEFIT TABLE */}
        <div className="mt-24 max-w-4xl mx-auto border border-slate-200 bg-white rounded-3xl p-6 sm:p-8 shadow-md">
          <h3 className="text-xl font-black text-brand-slate text-center mb-6 uppercase tracking-wider">Traditional vs Torque Insights Report</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-bold text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-black uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Feature Parameters</th>
                  <th className="py-3 px-4 text-slate-400">Traditional Psychometrics</th>
                  <th className="py-3 px-4 text-brand-red">Torque Insights AI Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 text-slate-900">Format Structure</td>
                  <td className="py-3 px-4 text-slate-400">✗ Static PDF</td>
                  <td className="py-3 px-4 text-brand-red">✓ AI Interpretation</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-900">User Interface</td>
                  <td className="py-3 px-4 text-slate-400">✗ Basic score metrics</td>
                  <td className="py-3 px-4 text-brand-red">✓ Interactive Dashboard</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-900">Aptitude Pathways</td>
                  <td className="py-3 px-4 text-slate-400">✗ Generic Suggestions</td>
                  <td className="py-3 px-4 text-brand-red">✓ Personalized Career Roadmap</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-900">Competency Tracking</td>
                  <td className="py-3 px-4 text-slate-400">✗ No gap assessment</td>
                  <td className="py-3 px-4 text-brand-red">✓ Skill Gap Analysis</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-900">Executive Diagnostics</td>
                  <td className="py-3 px-4 text-slate-400">✗ Traits checklists only</td>
                  <td className="py-3 px-4 text-brand-red">✓ Leadership Insights</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-900">Alumni Aligned Scoring</td>
                  <td className="py-3 px-4 text-slate-400">✗ Manual alignment checking</td>
                  <td className="py-3 px-4 text-brand-red">✓ Career Recommendations</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-900">Shareability Logs</td>
                  <td className="py-3 px-4 text-slate-400">✓ Downloadable PDF</td>
                  <td className="py-3 px-4 text-brand-red">✓ Downloadable PDF & Counselor Ready</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM CTA: Ready to Unlock Your Career Intelligence */}
        <div className="mt-24 rounded-[32px] border border-red-100 bg-gradient-to-br from-brand-pink/50 via-white to-white p-10 sm:p-12 shadow-xl text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-3xl font-black text-brand-slate tracking-tight leading-none">Ready to Unlock Your Career Intelligence?</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl mx-auto">
            Take your assessment today and receive a personalized AI-powered report designed to help you make smarter academic and career decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link 
              to="/assessments"
              className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
            >
              Start Free Assessment
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            <button 
              onClick={() => alert("Loading mock sample report dashboard...")}
              className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 text-sm font-bold text-slate-700 hover:scale-[1.02] transition-all cursor-pointer"
            >
              View Sample Report
            </button>
          </div>
        </div>

      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] border-t border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-extrabold tracking-wider uppercase text-brand-red">
              Process Flow
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
              How Torque Insights Works
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-2xl mx-auto">
              Complete your assessment in just 30 minutes and receive an AI-powered career intelligence report designed specifically for you.
            </p>
          </div>

          {/* Main Layout: 2 Columns (Timeline Grid vs Career Flow Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* COLUMN 1: The 6-Step Journey */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* DESKTOP: Horizontal / Grid Journey (Flowing 1-2-3, then 4-5-6) */}
              <div className="hidden md:grid grid-cols-3 gap-6 relative">
                
                {/* Connecting SVG Path Line for Desktop */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t border-dashed border-slate-300 -translate-y-1/2 -z-10" />

                {/* STEP 1: Create Your Profile */}
                <div className="group rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:scale-105 transition-transform">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 01</span>
                    <h4 className="text-sm font-black text-slate-900">Create Your Profile</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Register securely and create your personalized career profile with your academic background, interests, and aspirations.
                    </p>
                  </div>
                </div>

                {/* STEP 2: Choose Your Assessment */}
                <div className="group rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                      <ClipboardCheck className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 02</span>
                    <h4 className="text-sm font-black text-slate-900">Choose Your Assessment</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Select the assessment that matches your education level and career goals.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="rounded bg-slate-50 border border-slate-100 px-1.5 py-0.5 text-[8px] font-bold text-slate-500">School</span>
                      <span className="rounded bg-slate-50 border border-slate-100 px-1.5 py-0.5 text-[8px] font-bold text-slate-500">UG / MBA</span>
                      <span className="rounded bg-slate-50 border border-slate-100 px-1.5 py-0.5 text-[8px] font-bold text-slate-500">Aptitude</span>
                    </div>
                  </div>
                </div>

                {/* STEP 3: Complete the Assessment */}
                <div className="group rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                      <Timer className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 03</span>
                    <h4 className="text-sm font-black text-slate-900">Complete the Assessment</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Answer scientifically designed psychometric questions within approximately 30 minutes.
                    </p>
                    {/* Mock Progress Indicator Widget */}
                    <div className="rounded-lg bg-slate-50 p-2 border border-slate-150 space-y-1">
                      <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase">
                        <span>Items: 12 / 45</span>
                        <span>18m Left</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-brand-red" style={{ width: '30%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 4: AI Intelligence Engine */}
                <div className="group rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white group-hover:scale-105 transition-transform">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 04</span>
                    <h4 className="text-sm font-black text-slate-900">AI Intelligence Engine</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Our AI analyzes personality traits, behavioral patterns, aptitude scores, and career interests.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[8px] font-black text-brand-red uppercase tracking-wider">Personality</span>
                      <span className="text-[8px] font-black text-brand-slate uppercase tracking-wider">Leadership</span>
                    </div>
                  </div>
                </div>

                {/* STEP 5: Receive Your Report */}
                <div className="group rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 05</span>
                    <h4 className="text-sm font-black text-slate-900">Career Intelligence Report</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Instantly access an interactive report with detailed insights, strengths, and recommended pathways.
                    </p>
                    {/* Mock Report Badge */}
                    <div className="rounded-lg border border-red-100 bg-red-50/50 p-2 text-center text-[9px] font-black text-brand-red">
                      ★ Strategy Consultant - 96% Match
                    </div>
                  </div>
                </div>

                {/* STEP 6: Take the Next Step */}
                <div className="group rounded-3xl border border-slate-200/60 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 06</span>
                    <h4 className="text-sm font-black text-slate-900">Take the Next Step</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Book a counseling session, explore recommended careers, download your report, and grow.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded bg-brand-pink text-brand-red px-1.5 py-0.5 text-[8px] font-black uppercase">PDF Roadmap</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* MOBILE: Vertical Timeline Layout */}
              <div className="md:hidden space-y-6 relative border-l-2 border-dashed border-slate-200 pl-6 ml-3">
                
                {/* Mobile Step 1 */}
                <div className="relative space-y-2">
                  <div className="absolute -left-9.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black">1</div>
                  <h4 className="text-sm font-black text-slate-900">Create Your Profile</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Register securely and map your aspirations and backgrounds.</p>
                </div>

                {/* Mobile Step 2 */}
                <div className="relative space-y-2">
                  <div className="absolute -left-9.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white text-xs font-black">2</div>
                  <h4 className="text-sm font-black text-slate-900">Choose Your Assessment</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Select school, undergrad, MBA, or corporate diagnostic tracks.</p>
                </div>

                {/* Mobile Step 3 */}
                <div className="relative space-y-2">
                  <div className="absolute -left-9.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white text-xs font-black">3</div>
                  <h4 className="text-sm font-black text-slate-900">Complete the Assessment</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">30-minute adaptive psychometric and aptitude testing sessions.</p>
                </div>

                {/* Mobile Step 4 */}
                <div className="relative space-y-2">
                  <div className="absolute -left-9.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white text-xs font-black">4</div>
                  <h4 className="text-sm font-black text-slate-900">AI Intelligence Engine</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Calculating six-axis RIASEC scales, MBTI metrics, and leadership indexes.</p>
                </div>

                {/* Mobile Step 5 */}
                <div className="relative space-y-2">
                  <div className="absolute -left-9.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white text-xs font-black">5</div>
                  <h4 className="text-sm font-black text-slate-900">Receive Your Career Report</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Instant access to comprehensive score dashboard maps and study majors.</p>
                </div>

                {/* Mobile Step 6 */}
                <div className="relative space-y-2">
                  <div className="absolute -left-9.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white text-xs font-black">6</div>
                  <h4 className="text-sm font-black text-slate-900">Take the Next Step</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Book live counselor scheduling consultations and download PDF roadmaps.</p>
                </div>

              </div>

            </div>

            {/* COLUMN 2: Career Intelligence Flow Sidebar */}
            <div className="lg:col-span-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-md space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Torque Data Pipeline</h3>
              
              <div className="space-y-4">
                
                {/* Node 1 */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-2.5">
                  <span className="text-lg">👤</span>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase">Input Node</p>
                    <p className="text-xs font-black text-slate-800">Student Profile</p>
                  </div>
                </div>

                <div className="flex justify-center -my-2">
                  <span className="text-[10px] text-slate-350">▼</span>
                </div>

                {/* Node 2 */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-2.5">
                  <span className="text-lg">📝</span>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase">Input diagnostic</p>
                    <p className="text-xs font-black text-slate-800">Aptitude & Psychometrics</p>
                  </div>
                </div>

                <div className="flex justify-center -my-2">
                  <span className="text-[10px] text-brand-red">▼</span>
                </div>

                {/* Node 3 */}
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-md shadow-red-500/10">
                  <span className="text-lg animate-spin">⚙️</span>
                  <div>
                    <p className="text-[8px] font-black text-red-400 uppercase">Processing</p>
                    <p className="text-xs font-black text-white">AI Brain Engine</p>
                  </div>
                </div>

                <div className="flex justify-center -my-2">
                  <span className="text-[10px] text-brand-red">▼</span>
                </div>

                {/* Node 4 */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-2.5">
                  <span className="text-lg">📊</span>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase">Outputs</p>
                    <p className="text-xs font-black text-slate-800">Career Insights Report</p>
                  </div>
                </div>

                <div className="flex justify-center -my-2">
                  <span className="text-[10px] text-slate-355">▼</span>
                </div>

                {/* Node 5 */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-2.5">
                  <span className="text-lg">🎓</span>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase">Placement Ready</p>
                    <p className="text-xs font-black text-slate-800">Future Professional Success</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Section 2: Four Feature Highlights Statistic Cards */}
          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-2xl sm:text-3xl font-black text-brand-slate">30 Min</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Average Assessment Time</p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-2xl sm:text-3xl font-black text-brand-red">98%</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">AI Report Accuracy</p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-2xl sm:text-3xl font-black text-brand-slate">100+</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Career Paths Covered</p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-2xl sm:text-3xl font-black text-brand-slate">24×7</p>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">AI Career Guidance</p>
            </motion.div>

          </div>

          {/* Section 3: Bottom CTA Section */}
          <div className="mt-24 rounded-[32px] border border-red-100 bg-gradient-to-br from-brand-pink/50 via-white to-white p-10 sm:p-12 shadow-xl text-center max-w-4xl mx-auto space-y-6">
            <h3 className="text-3xl font-black text-brand-slate tracking-tight leading-none">Ready to Discover Your Potential?</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl mx-auto">
              Start your AI-powered assessment today and unlock personalized career insights backed by psychometric science and artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <Link 
                to="/assessments"
                className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                Start Free Assessment
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              <button 
                onClick={() => alert("Booking a demo consultation...")}
                className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 text-sm font-bold text-slate-700 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Book a Free Demo
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: SUCCESS STORIES & TESTIMONIALS */}
      <section className="py-20 sm:py-28 bg-white border-t border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-bold text-brand-red uppercase tracking-wider">
              Success Stories
            </span>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight leading-tight">
              Trusted by Learners, Educators & Organizations
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-2xl mx-auto">
              Discover how AI-powered career intelligence is helping people make confident academic and career decisions.
            </p>
          </div>

          {/* Testimonial Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Student */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-2xl text-red-200 font-black">“</span>
                  <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-600 uppercase">
                    ✓ Verified User
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  "The report helped me understand my strengths and choose the right undergraduate program with much more confidence."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink text-brand-red font-black text-xs uppercase shadow-sm">
                  AS
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Aarav S.</h4>
                  <p className="text-[10px] text-slate-400 font-bold">University Student</p>
                </div>
              </div>
            </div>

            {/* Card 2: Parent */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-2xl text-red-200 font-black">“</span>
                  <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-600 uppercase">
                    ✓ Verified User
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  "The insights made career discussions at home much easier because they were based on data rather than assumptions."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink text-brand-red font-black text-xs uppercase shadow-sm">
                  PM
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Priya M.</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Parent</p>
                </div>
              </div>
            </div>

            {/* Card 3: School Counselor */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-2xl text-red-200 font-black">“</span>
                  <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-600 uppercase">
                    ✓ Verified User
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  "The dashboard gives us a structured way to guide students using personalized assessment results."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink text-brand-red font-black text-xs uppercase shadow-sm">
                  RK
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Rahul K.</h4>
                  <p className="text-[10px] text-slate-400 font-bold">School Counselor</p>
                </div>
              </div>
            </div>

            {/* Card 4: University Student */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-2xl text-red-200 font-black">“</span>
                  <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-600 uppercase">
                    ✓ Verified User
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  "I particularly liked the AI recommendations and career roadmap. It made the results practical instead of theoretical."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink text-brand-red font-black text-xs uppercase shadow-sm">
                  NP
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Neha P.</h4>
                  <p className="text-[10px] text-slate-400 font-bold">University Student</p>
                </div>
              </div>
            </div>

            {/* Card 5: Corporate HR */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-2xl text-red-200 font-black">“</span>
                  <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-600 uppercase">
                    ✓ Verified User
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  "The assessment framework provides meaningful insights that support hiring and leadership development."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink text-brand-red font-black text-xs uppercase shadow-sm">
                  HR
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">HR Manager</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Corporate HR</p>
                </div>
              </div>
            </div>

            {/* Card 6: Career Counselor */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-2xl text-red-200 font-black">“</span>
                  <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-600 uppercase">
                    ✓ Verified User
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  "The reports save valuable counseling time while giving students clear and actionable recommendations."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink text-brand-red font-black text-xs uppercase shadow-sm">
                  CC
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Career Mentor</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Career Counselor</p>
                </div>
              </div>
            </div>

          </div>

          {/* VIDEO TESTIMONIAL PLACEHOLDER */}
          <div className="mt-24 max-w-4xl mx-auto border border-slate-200 bg-slate-50 rounded-3xl p-8 shadow-sm text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-500/5 backdrop-blur-2xl -z-10" />
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">See How Torque Insights Transforms Career Decisions</h3>
              <p className="text-xs text-slate-500 font-semibold max-w-lg mx-auto">
                Replace with customer success videos after launch. Play our overview preview to see the dashboard diagnostics.
              </p>
            </div>
            
            {/* Mock Video Laptop / Player Frame */}
            <div className="max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-lg group relative overflow-hidden flex items-center justify-center h-60">
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-white select-none">
                <div className="text-center space-y-4">
                  <button 
                    onClick={() => alert("Playing introductory Torque Insights product roadmap video...")}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white hover:scale-110 shadow-md cursor-pointer transition-transform"
                  >
                    <Play className="h-6 w-6 fill-current ml-1" />
                  </button>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Torque Insights Product Video Preview</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert("Playing product intro walkthrough video...")}
              className="rounded-full bg-brand-red px-8 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              Watch Demo
              <Play className="h-3.5 w-3.5 fill-current" />
            </button>
          </div>

          {/* SUCCESS METRICS: 6 Statistic Cards */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-2xl font-black text-brand-slate">100+</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Career Paths</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-2xl font-black text-brand-red">30 Min</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Assessment Time</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-2xl font-black text-brand-slate">AI</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Career Intel</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-2xl font-black text-brand-slate">24×7</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Digital Guidance</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-2xl font-black text-brand-slate">Multi-Level</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Assessments</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-2xl font-black text-brand-slate">Future Ready</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Personalized Roadmaps</p>
            </div>
          </div>

          {/* TRUST SECTION: Built for Long-Term Success */}
          <div className="mt-24 text-center space-y-12">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">Built for Long-Term Success</h3>
              <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">Our structural integrity principles ensure security, science, and scale.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center items-center text-slate-500 font-bold text-[10px] uppercase tracking-wider">
              <div className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-150 rounded-2xl p-4 w-full">
                <Sparkles className="h-5 w-5 text-brand-red" />
                <span>AI Powered</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-150 rounded-2xl p-4 w-full">
                <ClipboardCheck className="h-5 w-5 text-brand-red" />
                <span>Scientifically Designed</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-150 rounded-2xl p-4 w-full">
                <ShieldCheck className="h-5 w-5 text-brand-red" />
                <span>Secure Platform</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-150 rounded-2xl p-4 w-full">
                <Building className="h-5 w-5 text-brand-red" />
                <span>Institution Ready</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-150 rounded-2xl p-4 w-full">
                <Key className="h-5 w-5 text-brand-red" />
                <span>Privacy First</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-150 rounded-2xl p-4 w-full">
                <Award className="h-5 w-5 text-brand-red" />
                <span>Scalable SaaS</span>
              </div>
            </div>
          </div>

          {/* PARTNER LOGO CAROUSEL */}
          <div className="mt-24 border-t border-slate-200 pt-16">
            <h3 className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Our Intended Integration Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-60 filter grayscale hover:opacity-80 transition-opacity">
              <div className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-400 font-black text-xs tracking-wider border-dashed flex items-center justify-center h-12 w-36 select-none uppercase text-center">
                School Partner
              </div>
              <div className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-400 font-black text-xs tracking-wider border-dashed flex items-center justify-center h-12 w-36 select-none uppercase text-center">
                University Partner
              </div>
              <div className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-400 font-black text-xs tracking-wider border-dashed flex items-center justify-center h-12 w-36 select-none uppercase text-center">
                Corporate Partner
              </div>
              <div className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-400 font-black text-xs tracking-wider border-dashed flex items-center justify-center h-12 w-36 select-none uppercase text-center">
                Career Partner
              </div>
              <div className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-400 font-black text-xs tracking-wider border-dashed flex items-center justify-center h-12 w-36 select-none uppercase text-center">
                Institution Partner
              </div>
              <div className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-400 font-black text-xs tracking-wider border-dashed flex items-center justify-center h-12 w-36 select-none uppercase text-center">
                Training Partner
              </div>
            </div>
          </div>

          {/* BOTTOM CTA: Be Among the First to Experience Torque Insights */}
          <div className="mt-24 rounded-[32px] border border-red-100 bg-gradient-to-br from-brand-pink/50 via-white to-white p-10 sm:p-12 shadow-xl text-center max-w-4xl mx-auto space-y-6">
            <h3 className="text-3xl font-black text-brand-slate tracking-tight leading-none">Be Among the First to Experience Torque Insights</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl mx-auto">
              Start your assessment today and discover personalized career intelligence powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <Link 
                to="/assessments"
                className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                Start Free Assessment
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              <button 
                onClick={() => alert("Booking early slot consultation with advisor team...")}
                className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 text-sm font-bold text-slate-700 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Book a Demo
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: PRICING & SUBSCRIPTION PLANS */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] border-t border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-bold text-brand-red uppercase tracking-wider">
              Plans & Pricing
            </span>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight leading-tight">
              Simple Plans for Every Need
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-2xl mx-auto">
              Whether you're an individual, a school, a college, or an organization, choose the plan that fits your career intelligence journey.
            </p>
          </div>

          {/* 4 Premium Pricing Cards (4 columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            
            {/* PLAN 1: Individual */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between h-full relative">
              <div className="absolute top-4 right-4 rounded-full bg-brand-red px-2.5 py-0.5 text-[9px] font-black uppercase text-white tracking-widest">
                Most Popular
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Individual</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Ideal For: Students, Young Professionals, Career Seekers</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black text-slate-950">Starting From</span>
                </div>
                <div className="h-px bg-slate-100" />
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> One Assessment</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> AI Career Report</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Personality Analysis</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Match</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Skill Gap Analysis</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Downloadable Report</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Email Support</li>
                </ul>
              </div>
              <Link 
                to="/assessments" 
                className="w-full mt-6 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition-all cursor-pointer text-center block"
              >
                Start Assessment
              </Link>
            </div>

            {/* PLAN 2: Student Plus */}
            <div className="group rounded-3xl border border-red-200 bg-gradient-to-br from-brand-pink/50 via-white to-white p-6 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-brand-red">Student Plus</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Ideal For: Students Preparing for Higher Education</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black text-slate-950">Starting From</span>
                </div>
                <div className="h-px bg-red-100" />
                <ul className="space-y-2 text-xs font-bold text-slate-800">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Everything in Individual</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Multiple Assessments</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Roadmap</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Counseling Session</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> AI Career Coach</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Progress Tracking</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Priority Support</li>
                </ul>
              </div>
              <button 
                onClick={() => alert("Redirecting to Student Plus checkout module...")}
                className="w-full mt-6 rounded-xl bg-brand-red hover:bg-brand-redhover py-2.5 text-xs font-bold text-white transition-all cursor-pointer text-center"
              >
                Get Started
              </button>
            </div>

            {/* PLAN 3: Institution */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Institution</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Ideal For: Schools, Colleges, Universities</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black text-slate-950">Custom Pricing</span>
                </div>
                <div className="h-px bg-slate-100" />
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Institution Dashboard</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Student Management</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Bulk Assessments</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Analytics</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Career Reports</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Admin Controls</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Dedicated Support</li>
                </ul>
              </div>
              <button 
                onClick={() => alert("Opening demo scheduler for institutions...")}
                className="w-full mt-6 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-brand-red transition-all cursor-pointer text-center"
              >
                Request Demo
              </button>
            </div>

            {/* PLAN 4: Enterprise */}
            <div className="group rounded-3xl border border-slate-200 bg-slate-950 text-white p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white">Enterprise</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Ideal For: Corporate HR, Organizations, Training Companies</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black text-white">Contact Sales</span>
                </div>
                <div className="h-px bg-slate-800" />
                <ul className="space-y-2 text-xs font-bold text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Talent Assessment</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Leadership Analytics</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Hiring Intelligence</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Employee Dashboard</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> API Integration Ready</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Account Manager</li>
                  <li className="flex items-center gap-2"><span className="text-brand-red font-black">✓</span> Enterprise Support</li>
                </ul>
              </div>
              <button 
                onClick={() => alert("Connecting enterprise sales desk...")}
                className="w-full mt-6 rounded-xl bg-brand-red hover:bg-brand-redhover py-2.5 text-xs font-bold text-white transition-all cursor-pointer text-center"
              >
                Contact Sales
              </button>
            </div>

          </div>

          {/* PLAN COMPARISON TABLE */}
          <div className="mt-24 max-w-5xl mx-auto border border-slate-200 bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-black text-brand-slate text-center mb-6 uppercase tracking-wider">Detailed Feature Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-bold text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-black uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Features</th>
                    <th className="py-3 px-4 text-slate-500">Individual</th>
                    <th className="py-3 px-4 text-brand-red bg-brand-pink/20 rounded-t-xl border-x border-t border-red-100">Student Plus</th>
                    <th className="py-3 px-4 text-slate-500">Institution</th>
                    <th className="py-3 px-4 text-slate-500">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 text-slate-950">AI Reports</td>
                    <td className="py-3 px-4 text-slate-400">✓ Yes</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50">✓ Advanced AI</td>
                    <td className="py-3 px-4 text-slate-500">✓ Yes</td>
                    <td className="py-3 px-4 text-slate-500">✓ Enterprise</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-950">Career Roadmap</td>
                    <td className="py-3 px-4 text-slate-400">✗ Basic suggestions</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50">✓ Personalized</td>
                    <td className="py-3 px-4 text-slate-500">✓ Yes</td>
                    <td className="py-3 px-4 text-slate-500">✓ Custom Roadmap</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-950">Multiple Assessments</td>
                    <td className="py-3 px-4 text-slate-400">✗ One-Time</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50">✓ Multiple Attempts</td>
                    <td className="py-3 px-4 text-slate-500">✓ Bulk Seat Credits</td>
                    <td className="py-3 px-4 text-slate-500">✓ Unlimited Logs</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-950">Counseling</td>
                    <td className="py-3 px-4 text-slate-400">✗ Add-on only</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50">✓ 1 Session Included</td>
                    <td className="py-3 px-4 text-slate-500">✓ Group Webinars</td>
                    <td className="py-3 px-4 text-slate-500">✗ Not Applicable</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-950">Institution Dashboard</td>
                    <td className="py-3 px-4 text-slate-400">✗ No</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50">✗ No</td>
                    <td className="py-3 px-4 text-slate-500">✓ Included</td>
                    <td className="py-3 px-4 text-slate-500">✓ Custom Dashboard</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-950">Bulk Assessments</td>
                    <td className="py-3 px-4 text-slate-400">✗ No</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50">✗ No</td>
                    <td className="py-3 px-4 text-slate-500">✓ Cohort License Key</td>
                    <td className="py-3 px-4 text-slate-500">✓ Integration API</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-950">Analytics</td>
                    <td className="py-3 px-4 text-slate-400">✗ No</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50">✓ Personal Metrics</td>
                    <td className="py-3 px-4 text-slate-500">✓ Department Grid</td>
                    <td className="py-3 px-4 text-slate-500">✓ Corporate Talent Stats</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-950">API Access</td>
                    <td className="py-3 px-4 text-slate-400">✗ No</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50">✗ No</td>
                    <td className="py-3 px-4 text-slate-500">✗ No</td>
                    <td className="py-3 px-4 text-slate-500">✓ Full API Access</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-950">Priority Support</td>
                    <td className="py-3 px-4 text-slate-400">✗ Standard Support</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50">✓ Priority Email</td>
                    <td className="py-3 px-4 text-slate-500">✓ Slack/Email Channels</td>
                    <td className="py-3 px-4 text-slate-500">✓ 24/7 Hotline Desk</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-950">Dedicated Manager</td>
                    <td className="py-3 px-4 text-slate-400">✗ No</td>
                    <td className="py-3 px-4 text-brand-red bg-brand-pink/10 border-x border-red-50 rounded-b-xl border-b border-red-100">✗ No</td>
                    <td className="py-3 px-4 text-slate-500">✓ Dedicated Partner</td>
                    <td className="py-3 px-4 text-slate-500">✓ Strategic Manager</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FEATURE HIGHLIGHTS BADGES */}
          <div className="mt-20 border-t border-slate-200 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center items-center text-slate-500 font-bold text-xs uppercase tracking-wider text-center">
              <div className="flex items-center gap-2">
                <Check className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>No Hidden Charges</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Instant AI Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Flexible Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Scalable Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span>Institution Ready</span>
              </div>
            </div>
          </div>

          {/* FAQ PREVIEW ACCORDION (5 pricing questions) */}
          <div className="mt-24 max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-bold tracking-wider uppercase text-brand-red">
                Common Questions
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Can I upgrade later?",
                  a: "Yes, individual plans can be upgraded to Student Plus at any time to unlock multiple assessments, career roadmap trackers, and AI counselor session packages."
                },
                {
                  q: "Can schools purchase in bulk?",
                  a: "Absolutely. We offer customizable seat licenses for school and university cohorts with dedicated central coordinator dashboards and progress logs."
                },
                {
                  q: "Do you provide custom enterprise pricing?",
                  a: "Yes. For corporate talent diagnostics, employee leadership alignment audits, and recruiter pipeline integration, contact our sales desk for pricing."
                },
                {
                  q: "How are assessments delivered?",
                  a: "Assessments are delivered digitally. Candidates receive unique access links valid across any browser session, allowing student states to save progress."
                },
                {
                  q: "Can institutions request a demo?",
                  a: "Yes. Click the 'Request Demo' button on the pricing card above to schedule a live walkthrough of the school/college dashboard with our team."
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-100 bg-slate-50/50"
                      >
                        <p className="p-5 text-sm text-slate-500 leading-relaxed font-medium">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA: Ready to Unlock Your Career Potential? */}
          <div className="mt-24 rounded-[32px] border border-red-100 bg-gradient-to-br from-brand-pink/50 via-white to-white p-10 sm:p-12 shadow-xl text-center max-w-4xl mx-auto space-y-6">
            <h3 className="text-3xl font-black text-brand-slate tracking-tight leading-none">Ready to Unlock Your Career Potential?</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl mx-auto">
              Join individuals and institutions using AI-powered career intelligence to make smarter academic and professional decisions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <Link 
                to="/assessments"
                className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                Start Free Assessment
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              <button 
                onClick={() => alert("Directing to advisory demo calendar scheduler...")}
                className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 text-sm font-bold text-slate-700 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Schedule a Demo
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-bold text-brand-red uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-2xl mx-auto">
              Everything you need to know before taking your first AI-powered career assessment.
            </p>
          </div>

          {/* Two-Column Accordion Layout (desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* Left Column (Q1-Q4) */}
            <div className="space-y-4">
              <FaqItem 
                q="What is Torque Insights?" 
                a="Torque Insights is an AI-powered Career Intelligence Platform that combines psychometric science, behavioral analytics, aptitude assessment, and artificial intelligence to help individuals make informed academic and career decisions." 
              />
              <FaqItem 
                q="Who can take the assessments?" 
                a="Students, parents, schools, colleges, universities, career counselors, professionals, and corporate organizations can all access tailored tracks." 
              />
              <FaqItem 
                q="How long does an assessment take?" 
                a="Most assessments are completed within approximately 30 minutes and can be paused and resumed at any point." 
              />
              <FaqItem 
                q="Will I receive a report immediately?" 
                a="Yes. Once the assessment is completed, an AI-powered Career Intelligence Report is generated and compiled instantly." 
              />
            </div>

            {/* Right Column (Q5-Q8) */}
            <div className="space-y-4">
              <FaqItem 
                q="Are the assessments scientifically designed?" 
                a="Yes. The platform follows structured psychometric methodologies mapped to standard validation scales combined with AI-driven interpretation." 
              />
              <FaqItem 
                q="Can schools and colleges use Torque Insights?" 
                a="Yes. Dedicated institutional dashboards, cohort statistics, license key management, and bulk assessments are fully supported." 
              />
              <FaqItem 
                q="Is my data secure?" 
                a="Yes. Your personal information is protected using enterprise-grade security and strict data privacy compliance practices." 
              />
              <FaqItem 
                q="Can I book a career counseling session?" 
                a="Yes. Users can schedule one-on-one virtual counseling sessions with verified career mentors after receiving their AI dashboard reports." 
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: FINAL CALL TO ACTION */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[36px] border border-red-100 bg-white bg-gradient-to-br from-brand-pink/30 via-white to-white p-12 sm:p-16 shadow-xl text-center space-y-8 relative overflow-hidden">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <h3 className="text-3xl sm:text-4xl font-black text-brand-slate tracking-tight leading-none">Your Future Starts with Better Insights</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-semibold">
                Take the first step toward smarter academic and career decisions through AI-powered career intelligence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                to="/assessments"
                className="rounded-full bg-brand-red px-10 py-4 text-sm font-bold text-white shadow-md hover:bg-brand-redhover hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                Start Free Assessment
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              <button 
                onClick={() => alert("Redirecting to advisory demo calendar scheduler...")}
                className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-10 py-4 text-sm font-bold text-slate-700 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Book a Free Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-brand-red" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-red" />
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Timer className="h-4 w-4 text-brand-red" />
                <span>30-Minute Assessment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BrainCircuit className="h-4 w-4 text-brand-red" />
                <span>Instant Career Report</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: NEWSLETTER */}
      <section className="py-20 sm:py-24 bg-white border-t border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-slate-900">Stay Ahead with Career Intelligence</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-xl mx-auto leading-relaxed">
              Receive career guidance, assessment updates, AI insights, admission trends, and employability resources directly in your inbox.
            </p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); alert("Successfully subscribed to newsletter catalog!"); }}
            className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto"
          >
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              className="w-full px-5 py-3 rounded-full border border-slate-200 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red text-xs font-bold transition-all bg-slate-50"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto shrink-0 rounded-full bg-slate-950 text-white hover:bg-black px-8 py-3 text-xs font-bold transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-[10px] font-bold text-slate-400">"We respect your privacy."</p>
        </div>
      </section>

      {/* SECTION: CONTACT QUICK LINKS */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Link 1 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-start space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Book Demo</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Schedule a custom walkthrough of Torque dashboards.</p>
              </div>
              <button onClick={() => alert("Opening demo calendar scheduler...")} className="text-[10px] font-black text-brand-red hover:underline flex items-center gap-1 cursor-pointer">
                Schedule Call <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Link 2 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-start space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Email Support</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Get answer inquiries regarding keys or test operations.</p>
              </div>
              <button onClick={() => alert("Opening email composer to support@torqueinsights.com...")} className="text-[10px] font-black text-brand-red hover:underline flex items-center gap-1 cursor-pointer">
                Email Us <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Link 3 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-start space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Career Counseling</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Consult seasoned mentors to align report roadmaps.</p>
              </div>
              <button onClick={() => alert("Consulting catalog index...")} className="text-[10px] font-black text-brand-red hover:underline flex items-center gap-1 cursor-pointer">
                Learn More <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Link 4 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-start space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink text-brand-red group-hover:scale-105 transition-transform">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Institution Partnerships</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Bulk deployment models custom built for streams choice.</p>
              </div>
              <button onClick={() => alert("Contacting school partnerships department...")} className="text-[10px] font-black text-brand-red hover:underline flex items-center gap-1 cursor-pointer">
                Partner With Us <ArrowRight className="h-3 w-3" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* PREMIUM FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-slate-200 pb-12">
            
            {/* Col 1 */}
            <div className="col-span-2 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <span className="font-sans text-lg font-black tracking-tight text-slate-950">
                  Torque <span className="text-brand-red">Insights</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-bold max-w-xs leading-relaxed">
                AI-Powered Career Intelligence Platform helping learners and organizations make confident career decisions.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a href="#linkedin" className="h-7 w-7 rounded-lg bg-white border border-slate-200 hover:border-brand-red hover:text-brand-red flex items-center justify-center text-xs font-bold transition-all">IN</a>
                <a href="#instagram" className="h-7 w-7 rounded-lg bg-white border border-slate-200 hover:border-brand-red hover:text-brand-red flex items-center justify-center text-xs font-bold transition-all">IG</a>
                <a href="#facebook" className="h-7 w-7 rounded-lg bg-white border border-slate-200 hover:border-brand-red hover:text-brand-red flex items-center justify-center text-xs font-bold transition-all">FB</a>
                <a href="#youtube" className="h-7 w-7 rounded-lg bg-white border border-slate-200 hover:border-brand-red hover:text-brand-red flex items-center justify-center text-xs font-bold transition-all">YT</a>
              </div>
            </div>

            {/* Col 2: Platform */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Platform</h4>
              <ul className="space-y-2 text-xs font-bold text-slate-500">
                <li><Link to="/assessments" className="hover:text-brand-red transition-all">Assessments</Link></li>
                <li><a href="#reports" className="hover:text-brand-red transition-all">AI Reports</a></li>
                <li><a href="#roadmap" className="hover:text-brand-red transition-all">Career Roadmap</a></li>
                <li><a href="#pricing" className="hover:text-brand-red transition-all">Pricing</a></li>
                <li><a href="#resources" className="hover:text-brand-red transition-all">Resources</a></li>
              </ul>
            </div>

            {/* Col 3: Solutions */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Solutions</h4>
              <ul className="space-y-2 text-xs font-bold text-slate-500">
                <li><Link to="/assessments" className="hover:text-brand-red transition-all">Students</Link></li>
                <li><a href="#parents" className="hover:text-brand-red transition-all">Parents</a></li>
                <li><Link to="/schools" className="hover:text-brand-red transition-all">Schools</Link></li>
                <li><Link to="/colleges" className="hover:text-brand-red transition-all">Colleges</Link></li>
                <li><a href="#corporates" className="hover:text-brand-red transition-all">Corporates</a></li>
                <li><a href="#counselors" className="hover:text-brand-red transition-all">Career Counselors</a></li>
              </ul>
            </div>

            {/* Col 4: Company */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Company</h4>
              <ul className="space-y-2 text-xs font-bold text-slate-500">
                <li><a href="#about" className="hover:text-brand-red transition-all">About</a></li>
                <li><a href="#blog" className="hover:text-brand-red transition-all">Blog</a></li>
                <li><a href="#privacy" className="hover:text-brand-red transition-all">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-brand-red transition-all">Terms of Use</a></li>
                <li><a href="#contact" className="hover:text-brand-red transition-all">Contact</a></li>
                <li><a href="#careers" className="hover:text-brand-red transition-all">Careers</a></li>
                <li><a href="#support" className="hover:text-brand-red transition-all">Support</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Legal Links */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400">
            <p>
              © 2026 Torque Insights. Powered by Torque Learning.
            </p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-brand-red transition-all">Privacy Policy</a>
              <a href="#terms" className="hover:text-brand-red transition-all">Terms</a>
              <a href="#cookies" className="hover:text-brand-red transition-all">Cookies</a>
              <a href="#accessibility" className="hover:text-brand-red transition-all">Accessibility</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

{/* FaqItem accordion helper */}
const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
      >
        <span className="text-xs sm:text-sm">{q}</span>
        <ChevronDown className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 bg-slate-50/50"
          >
            <p className="p-5 text-xs text-slate-500 leading-relaxed font-semibold">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
