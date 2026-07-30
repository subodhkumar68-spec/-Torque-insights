import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-[#FAFAFA] py-16 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Logo & Socials */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <span className="font-sans text-lg font-black tracking-tight text-brand-slate">
                Torque <span className="text-brand-red">Insights</span>
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-xs">
              Torque Insights is a premium AI-powered Career Intelligence Platform. We leverage psychometric validities, aptitude audits, and behavior metrics to map optimal growth trajectories.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-brand-red hover:text-brand-red transition-all shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.87c0-.26.05-.52.13-.7a1.11 1.11 0 0 1 .98-.7c.56 0 .8.43.8.1v5.17h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5.2v8.37H8z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-brand-red hover:text-brand-red transition-all shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m8.4 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2m-4 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-brand-red hover:text-brand-red transition-all shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23 12a2.86 2.86 0 0 0-2-2C19.26 9.5 12 9.5 12 9.5s-7.26 0-9 .5a2.86 2.86 0 0 0-2 2 29 29 0 0 0 0 3.5 2.86 2.86 0 0 0 2 2c1.74.5 9 .5 9 .5s7.26 0 9-.5a2.86 2.86 0 0 0 2-2 29 29 0 0 0 0-3.5zM9.75 14.25V9.75L14.25 12l-4.5 2.25z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-brand-red hover:text-brand-red transition-all shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black text-brand-slate uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li><Link to="/assessments" className="hover:text-brand-red transition-all">Assessments</Link></li>
              <li><Link to="/reports" className="hover:text-brand-red transition-all">Reports</Link></li>
              <li><Link to="/reports" className="hover:text-brand-red transition-all">AI Career Coach</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-red transition-all">Pricing</Link></li>
              <li><Link to="/about" className="hover:text-brand-red transition-all">Features</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-brand-slate uppercase tracking-widest">Solutions</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li><Link to="/assessments" className="hover:text-brand-red transition-all">Students</Link></li>
              <li><Link to="/about" className="hover:text-brand-red transition-all">Parents</Link></li>
              <li><Link to="/schools" className="hover:text-brand-red transition-all">Schools</Link></li>
              <li><Link to="/colleges" className="hover:text-brand-red transition-all">Colleges</Link></li>
              <li><Link to="/colleges" className="hover:text-brand-red transition-all">Corporates</Link></li>
              <li><Link to="/colleges" className="hover:text-brand-red transition-all">Counsellors</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-brand-slate uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li><Link to="/about" className="hover:text-brand-red transition-all">About</Link></li>
              <li><Link to="/blog" className="hover:text-brand-red transition-all">Blog</Link></li>
              <li><a href="https://careers.torquelearning.com" className="hover:text-brand-red transition-all">Careers</a></li>
              <li><Link to="/about" className="hover:text-brand-red transition-all">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-brand-red transition-all">Terms</Link></li>
              <li><Link to="/contact" className="hover:text-brand-red transition-all">Contact</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400">
          <p>© 2026 Torque Insights. All rights reserved.</p>
          <p>Powered by Torque Learning.</p>
        </div>
      </div>
    </footer>
  );
};
