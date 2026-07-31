import React from 'react';
import { Check } from 'lucide-react';

interface QuestionOption {
  value: string;
  label: string;
}

interface Question {
  id: string;
  type: 'single' | 'multiple' | 'likert' | 'ranking' | 'scenario' | 'behavioral' | 'true-false' | 'image' | string;
  prompt: string;
  options?: QuestionOption[];
  minLabel?: string;
  maxLabel?: string;
  imageUrl?: string;
}

interface QuestionRendererProps {
  question: Question;
  currentAnswer: any;
  onAnswerChange: (value: any) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  currentAnswer,
  onAnswerChange
}) => {
  // 1. Single Choice / Scenario / Behavioral / True-False Option lists
  const handleSingleSelect = (val: string) => {
    onAnswerChange(val);
  };

  // 2. Multiple Choice arrays
  const handleMultiSelect = (val: string) => {
    const arr = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    const idx = arr.indexOf(val);
    if (idx !== -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(val);
    }
    onAnswerChange(arr);
  };

  // 3. Likert Scale values (1 to 5)
  const renderLikert = () => {
    const val = Number(currentAnswer || 0);
    const options = [
      { label: question.minLabel || 'Strongly Disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: question.maxLabel || 'Strongly Agree', value: 5 }
    ];

    return (
      <div className="space-y-4 pt-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onAnswerChange(opt.value)}
              className={`flex-1 min-w-[80px] py-4 px-2 rounded-2xl border text-center transition-all cursor-pointer ${val === opt.value ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-red-500/20 scale-[1.02]' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}`}
            >
              <span className="block text-lg font-black">{opt.value}</span>
              <span className="block text-[10px] font-bold mt-1 uppercase tracking-wider leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // 4. Ranking options
  const renderRanking = () => {
    const options = question.options || [];
    const currentRankMap = (currentAnswer as Record<string, number>) || {};

    const handleRankSelect = (optValue: string, rank: number) => {
      const nextMap = { ...currentRankMap };
      if (rank === 0) {
        delete nextMap[optValue];
      } else {
        // Clear previous item that had this rank
        Object.keys(nextMap).forEach(key => {
          if (nextMap[key] === rank) {
            delete nextMap[key];
          }
        });
        nextMap[optValue] = rank;
      }
      onAnswerChange(nextMap);
    };

    return (
      <div className="space-y-4 pt-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assign ranks (1st, 2nd, etc.) to each option:</p>
        <div className="space-y-3">
          {options.map((opt) => {
            const currentRank = currentRankMap[opt.value] || 0;
            return (
              <div key={opt.value} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl gap-4">
                <span className="text-xs font-bold text-slate-700">{opt.label}</span>
                <select
                  value={currentRank}
                  onChange={(e) => handleRankSelect(opt.value, Number(e.target.value))}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:outline-none focus:border-brand-red cursor-pointer"
                >
                  <option value={0}>Unranked</option>
                  {options.map((_, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      {idx + 1}
                      {idx === 0 ? 'st' : idx === 1 ? 'nd' : idx === 2 ? 'rd' : 'th'} Rank
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Switch layouts based on question type
  switch (question.type) {
    case 'likert':
      return renderLikert();

    case 'ranking':
      return renderRanking();

    case 'multiple':
      return (
        <div className="space-y-3 pt-2">
          {question.options?.map((opt) => {
            const isChecked = Array.isArray(currentAnswer) && currentAnswer.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleMultiSelect(opt.value)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${isChecked ? 'bg-brand-pink/30 border-brand-red text-slate-900' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                <span className="text-xs font-bold">{opt.label}</span>
                <div className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-brand-red border-brand-red text-white' : 'border-slate-300'}`}>
                  {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      );

    case 'image':
      return (
        <div className="space-y-4 pt-2">
          {question.imageUrl && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 max-h-[240px] flex justify-center bg-slate-50">
              <img src={question.imageUrl} alt="Question figure" className="object-contain h-full" />
            </div>
          )}
          <div className="space-y-3">
            {question.options?.map((opt) => {
              const isSelected = currentAnswer === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSingleSelect(opt.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${isSelected ? 'bg-brand-pink/30 border-brand-red text-slate-900' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}`}
                >
                  <span className="text-xs font-bold">{opt.label}</span>
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-brand-red border-brand-red text-white' : 'border-slate-300'}`}>
                    {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );

    case 'true-false':
      return (
        <div className="flex gap-4 pt-4">
          {['True', 'False'].map((val) => {
            const isSelected = currentAnswer === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => handleSingleSelect(val)}
                className={`flex-1 py-4 rounded-2xl border text-center text-xs font-bold transition-all cursor-pointer ${isSelected ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-red-500/20' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                {val}
              </button>
            );
          })}
        </div>
      );

    case 'single':
    case 'scenario':
    case 'behavioral':
    default:
      return (
        <div className="space-y-3 pt-2">
          {question.options?.map((opt) => {
            const isSelected = currentAnswer === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSingleSelect(opt.value)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${isSelected ? 'bg-brand-pink/30 border-brand-red text-slate-900' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                <span className="text-xs font-bold">{opt.label}</span>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-brand-red border-brand-red text-white' : 'border-slate-300'}`}>
                  {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
      );
  }
};
