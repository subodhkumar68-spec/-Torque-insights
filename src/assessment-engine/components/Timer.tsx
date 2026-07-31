import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number; // in seconds
  themeColor?: string;
}

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  themeColor = '#C62828'
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 60; // Less than 1 minute

  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider transition-all duration-300 ${isLowTime ? 'border-red-200 bg-red-50 text-red-600 animate-pulse' : 'border-slate-200 bg-white text-slate-700'}`}
      style={!isLowTime ? { color: themeColor, borderColor: `${themeColor}20`, backgroundColor: `${themeColor}05` } : {}}
    >
      <Clock className="h-4.5 w-4.5" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};
