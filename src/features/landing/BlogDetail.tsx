import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dbService, Blog as BlogType } from '../../services/dbService';
import { Calendar, User, Clock, ArrowLeft, Share2, MessageSquare, BookOpen } from 'lucide-react';

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [related, setRelated] = useState<BlogType[]>([]);

  useEffect(() => {
    if (id) {
      const allBlogs = dbService.getBlogs();
      const currentBlog = allBlogs.find(b => b.id === id);
      if (currentBlog) {
        setBlog(currentBlog);
        // Find 2 other related blogs
        setRelated(allBlogs.filter(b => b.id !== id).slice(0, 2));
      } else {
        navigate('/blog');
      }
    }
  }, [id, navigate]);

  if (!blog) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Article link copied to clipboard!');
  };

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gray hover:text-brand-slate mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Resources
        </Link>

        {/* Title */}
        <div className="space-y-4">
          <span className="rounded-full bg-brand-pink px-3 py-1 text-xs font-bold text-brand-red uppercase tracking-wider">
            {blog.category}
          </span>
          <h1 className="text-2xl font-black text-brand-slate sm:text-4xl leading-tight">
            {blog.title}
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-6 gap-4">
            <div className="flex items-center gap-4 text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {blog.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {blog.readTime}</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {blog.author}</span>
            </div>
            
            {/* Share button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-brand-slate hover:bg-slate-50 transition-colors"
            >
              <Share2 className="h-4 w-4 text-brand-red" />
              Share Guide
            </button>
          </div>
        </div>

        {/* Banner Image */}
        <div className="mt-8 h-80 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-sm border border-slate-200">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="mt-10 font-sans text-brand-slate leading-relaxed space-y-6 text-sm md:text-base border-b border-slate-200 pb-12">
          {blog.content.split('\n\n').map((para, idx) => (
            <p key={idx} className="first-letter:text-3xl first-letter:font-extrabold first-letter:text-brand-red first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none" style={idx > 0 ? { float: 'none', margin: '0' } : {}}>
              {/* Reset float effect for rest of elements */}
              {idx > 0 ? para : para.slice(0)}
            </p>
          ))}
          
          <p className="p-4 bg-slate-50 border-l-4 border-brand-red rounded-r-2xl italic text-xs text-brand-slate/80 leading-relaxed">
            Note: This article is curated by Torque Learning academic mentors. Psychometric diagnostics provide reference baselines; we suggest booking counseling slots to align recommendations with regional exam matrices.
          </p>
        </div>

        {/* Related posts */}
        <div className="mt-12 space-y-6">
          <h3 className="text-lg font-black text-brand-slate flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-red" />
            Recommended Reading
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-16 w-16 rounded-xl object-cover shrink-0 border border-slate-200"
                />
                <div>
                  <span className="text-[9px] font-bold text-brand-red uppercase tracking-wider">{post.category}</span>
                  <h4 className="text-xs font-bold text-brand-slate leading-snug line-clamp-2 mt-0.5">{post.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
