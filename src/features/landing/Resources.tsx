import React, { useState } from 'react';
import { Search, Download, BookOpen, FileText, Sparkles, Star } from 'lucide-react';

export const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      title: "NEP 2020 High School Stream Handbook",
      desc: "Comprehensive roadmap details for stream selections (Science vs Commerce vs Humanities) and subject alignments.",
      type: "PDF Guide",
      size: "4.2 MB",
      category: "K-12"
    },
    {
      title: "MBTI Personality & Career Suitability Blueprint",
      desc: "Understand how your 16 Myers-Briggs personality indicators map to real-world corporate industries and leadership scopes.",
      type: "E-Book",
      size: "8.5 MB",
      category: "Personality"
    },
    {
      title: "Placement Aptitude Test Preparatory Toolkit",
      desc: "Mock sample questions, math shortcuts, logical reasoning items, and key syllabus guides for campus placement drives.",
      type: "Practice Kit",
      size: "12.1 MB",
      category: "Colleges"
    },
    {
      title: "Consulting Case Interview Playbook",
      desc: "Cracking consulting role interviews for MBA candidates. Frameworks, structural charts, and logical metrics.",
      type: "Interview Guide",
      size: "6.7 MB",
      category: "MBA"
    }
  ];

  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (title: string) => {
    alert(`Initializing download for: "${title}". File delivery triggered successfully!`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <span className="rounded-full bg-brand-pink border border-red-100 px-3.5 py-1.5 text-xs font-bold text-brand-red uppercase tracking-wider">
            Resources & Materials
          </span>
          <h1 className="text-4xl font-black text-brand-slate tracking-tight sm:text-5xl">
            Career Guide <span className="text-brand-red">Library</span>
          </h1>
          <p className="text-lg text-slate-600">
            Download our scientifically designed booklets, syllabus guides, and psychometric handbooks for free.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides, handbooks, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red shadow-sm"
            />
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide, idx) => (
              <div 
                key={idx} 
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[10px] font-extrabold uppercase text-slate-600 tracking-wider">
                      {guide.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{guide.size}</span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-slate leading-tight">{guide.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{guide.desc}</p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center">
                  <span className="text-xs font-extrabold text-slate-400 uppercase">{guide.type}</span>
                  <button
                    onClick={() => handleDownload(guide.title)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-brand-slate cursor-pointer transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 rounded-3xl border border-dashed border-slate-300 bg-slate-100/50">
              <BookOpen className="h-10 w-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-500">No resources matches found for your search query.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
