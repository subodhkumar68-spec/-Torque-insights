import React from 'react';
import { Bookmark, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  prompt: string;
}

interface ReviewScreenProps {
  questions: Question[];
  answers: Record<string, any>;
  flagged: Record<string, boolean>;
  onSelectQuestion: (idx: number) => void;
  onSubmitClick: () => void;
  themeColor?: string;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  questions,
  answers,
  flagged,
  onSelectQuestion,
  onSubmitClick,
  themeColor = '#C62828'
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left max-w-3xl mx-auto">
      <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-black text-slate-900 leading-none">Review Your Answers</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1.5">Overview of test item states</p>
        </div>
        <button
          type="button"
          onClick={onSubmitClick}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
          style={{ backgroundColor: themeColor }}
        >
          Submit Test
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '';
          const isFlagged = flagged[q.id] || false;

          return (
            <div
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              className="p-4 bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-2xl cursor-pointer transition-all flex items-start gap-3"
            >
              <div className="h-6 w-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-500 shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs font-medium text-slate-650 line-clamp-1">{q.prompt}</p>
                <div className="flex items-center gap-2">
                  {isAnswered ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase">
                      <CheckCircle className="h-3 w-3" /> Answered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase">
                      <AlertCircle className="h-3 w-3" /> Unanswered
                    </span>
                  )}
                  {isFlagged && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-500 uppercase">
                      <Bookmark className="h-3 w-3 fill-amber-500/20" /> Flagged
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
