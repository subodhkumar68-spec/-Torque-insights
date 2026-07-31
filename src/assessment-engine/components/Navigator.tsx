import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface Question {
  id: string;
}

interface NavigatorProps {
  questions: Question[];
  currentIdx: number;
  answers: Record<string, any>;
  flagged: Record<string, boolean>;
  onSelect: (idx: number) => void;
  onToggleFlag: (qid: string) => void;
  themeColor?: string;
}

export const Navigator: React.FC<NavigatorProps> = ({
  questions,
  currentIdx,
  answers,
  flagged,
  onSelect,
  onToggleFlag,
  themeColor = '#C62828'
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 text-left space-y-4 shadow-sm h-full flex flex-col justify-between">
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question Navigator</h4>
        </div>
        
        <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-1">
          {questions.map((q, idx) => {
            const isCurrent = currentIdx === idx;
            const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '';
            const isFlagged = flagged[q.id] || false;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelect(idx)}
                className={`h-9 w-9 rounded-xl border text-xs font-black transition-all relative flex items-center justify-center cursor-pointer ${isCurrent ? 'text-white' : isAnswered ? 'bg-slate-100 border-slate-300 text-slate-900 font-bold' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-400'}`}
                style={isCurrent ? { backgroundColor: themeColor, borderColor: themeColor } : {}}
              >
                {idx + 1}
                {isFlagged && (
                  <div className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-amber-500 text-white flex items-center justify-center border border-white">
                    <BookmarkCheck className="h-2.5 w-2.5 fill-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
          <div className="h-3 w-3 rounded bg-slate-100 border border-slate-300" />
          <span>Answered Item</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
          <div className="h-3 w-3 rounded-full bg-amber-500 border border-white" />
          <span>Flagged for Review</span>
        </div>
        
        {questions[currentIdx] && (
          <button
            type="button"
            onClick={() => onToggleFlag(questions[currentIdx].id)}
            className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 border border-dashed border-slate-200 hover:border-amber-500 hover:bg-amber-50 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <Bookmark className="h-3.5 w-3.5" />
            {flagged[questions[currentIdx].id] ? 'Unflag Question' : 'Flag for Review'}
          </button>
        )}
      </div>
    </div>
  );
};
