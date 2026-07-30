import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dbService, Blog as BlogType } from '../../services/dbService';
import { useAuth } from '../../context/AuthContext';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen, Plus } from 'lucide-react';

export const Blog: React.FC = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    setBlogs(dbService.getBlogs());
  }, []);

  const categories = [
    'All',
    'Career Guidance',
    'Study Abroad',
    'Entrance Exams',
    'Leadership',
    'MBA',
    'AI Careers',
    'Resume',
    'Interview'
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="rounded-full bg-brand-pink px-3 py-1 text-xs font-bold text-brand-red uppercase tracking-wider">
              Resources Hub
            </span>
            <h1 className="text-3xl font-black text-brand-slate sm:text-4xl tracking-tight mt-2">
              Career & Study Intelligence
            </h1>
            <p className="text-sm text-brand-gray mt-1 max-w-sm">
              Discover academic pathways, resume enhancements, and leadership frameworks written by counselors.
            </p>
          </div>

          {/* Admin Create Link */}
          {user?.role === 'admin' && (
            <Link
              to="/dashboard/admin"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-red px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-red-500/10 hover:bg-brand-redhover transition-colors"
            >
              <Plus className="h-4.5 w-4.5" />
              Manage & Add Blogs
            </Link>
          )}
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-6 border-b border-slate-200">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:max-w-xl pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-slate text-white'
                    : 'bg-white border border-slate-200 text-brand-slate hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-brand-gray" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guides, exams, tips..."
              className="w-full rounded-2xl border border-slate-200 pl-9 pr-4 py-2 text-sm focus:border-brand-red focus:outline-none bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="h-48 overflow-hidden bg-slate-100 relative">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-brand-slate/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      {blog.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] font-semibold mb-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {blog.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {blog.readTime}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-brand-slate leading-snug line-clamp-2">
                      <Link to={`/blog/${blog.id}`} className="hover:text-brand-red transition-colors">
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs text-brand-gray leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                {/* Footer read action */}
                <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-brand-slate text-[9px] font-bold">
                      {blog.author.charAt(0)}
                    </div>
                    <span className="text-[10px] font-bold text-brand-slate truncate max-w-[120px]">{blog.author}</span>
                  </div>
                  
                  <Link
                    to={`/blog/${blog.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:gap-1.5 transition-all"
                  >
                    Read Guide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl">
            <BookOpen className="h-10 w-10 text-brand-gray mx-auto mb-3" />
            <h3 className="text-base font-bold text-brand-slate">No guides match your query</h3>
            <p className="text-xs text-brand-gray mt-1">Try refining your search keyword or clearing the filters.</p>
          </div>
        )}

      </div>
    </div>
  );
};
