import React from 'react';

interface ScoreCardProps {
  label: string;
  score: number;
  themeColor?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  label,
  score,
  themeColor = '#C62828'
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm text-left">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
          {label}
        </span>
        <span className="text-xs font-black" style={{ color: themeColor }}>
          {score}%
        </span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-250/20">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${score}%`, backgroundColor: themeColor }}
        />
      </div>
    </div>
  );
};
