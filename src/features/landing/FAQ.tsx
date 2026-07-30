import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQ: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: 'What is psychometric testing and how accurate is CareerDNA AI?',
      a: 'Psychometric testing evaluates cognitive functions, values, RIASEC interests, and MBTI personality structures. CareerDNA AI applies scientifically validated models standardized for Indian high school, undergrad, and professional benchmarks. While extremely accurate as a diagnostic baseline, we recommend consulting our mentors to cross-verify choices with local academic realities.'
    },
    {
      q: 'Can I change my answers during the active assessment session?',
      a: 'Yes. The testing dashboard allows you to navigate backward and forward, changing answers freely before the 30-minute timer expires. Answers are saved locally in real-time, ensuring zero data loss if your connection drops.'
    },
    {
      q: 'How do I download my CareerDNA PDF report?',
      a: 'Upon test completion, the platform generates a comprehensive report panel. Click the "Print / Download PDF" button inside the report viewer. Your browser will automatically format the page using specialized CSS print layouts for a clean, professional download.'
    },
    {
      q: 'How does school and college licensing work?',
      a: 'Educational institutions purchase license blocks under the "Institution Plan". The school admin dashboard compiles active seat keys, which are shared with students. Students register, enter the license keys to bypass checkout, and school dashboards track their progress and aggregate class matrices.'
    },
    {
      q: 'What is the refund policy for assessment seat purchases?',
      a: 'Due to the computational resources allocated to AI reports, seat purchases are non-refundable once a test session starts. Unused seats remain valid for 12 months. Contact support@careerdna.ai for custom invoice billing adjustments.'
    }
  ];

  const toggleFAQ = (idx: number) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <HelpCircle className="h-10 w-10 text-brand-red mx-auto" />
          <h1 className="text-3xl font-black text-brand-slate tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-brand-gray">
            Quick help guides regarding psychometric testing, payment gateways, and school panels.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-brand-slate hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm md:text-base leading-tight">{faq.q}</span>
                  {isOpen ? <ChevronUp className="h-5 w-5 text-brand-red shrink-0" /> : <ChevronDown className="h-5 w-5 text-brand-slate shrink-0" />}
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-brand-gray border-t border-slate-100 bg-slate-50/50 leading-relaxed animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
