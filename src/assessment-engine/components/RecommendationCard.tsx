import React from 'react';
import { ArrowRight } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  items: string[];
  themeColor?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  items,
  themeColor = '#C62828'
}) => {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-3xl text-left space-y-4 shadow-sm">
      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
            <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: themeColor }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
