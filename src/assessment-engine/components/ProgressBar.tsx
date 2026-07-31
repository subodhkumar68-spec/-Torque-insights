import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  themeColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  themeColor = '#C62828'
}) => {
  const percentage = Math.round((current / total) * 100) || 0;

  return (
    <div className="w-full space-y-1 text-left">
      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <span>Progress Status</span>
        <span>{percentage}% Completed ({current}/{total} Answered)</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <div
          className="h-full transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: themeColor }}
        />
      </div>
    </div>
  );
};
