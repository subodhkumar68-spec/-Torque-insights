import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { AssessmentRegistry, AssessmentConfig } from '../engine/AssessmentRegistry';
import { QuestionLoader } from '../engine/QuestionLoader';
import { ReportGenerator } from '../engine/ReportGenerator';
import { AssessmentRunner } from '../engine/AssessmentRunner';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import { Navigator } from './Navigator';
import { QuestionRenderer } from './QuestionRenderer';
import { ReviewScreen } from './ReviewScreen';
import { SubmitDialog } from './SubmitDialog';

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

export const AssessmentLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [config, setConfig] = useState<AssessmentConfig | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // default 30 mins
  
  const [engineStep, setEngineStep] = useState<'instructions' | 'stream-select' | 'test' | 'review' | 'processing' | 'success'>('instructions');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStepIndex, setProcessingStepIndex] = useState(0);
  const [finalReport, setFinalReport] = useState<any>(null);
  
  const timerRef = useRef<any>(null);
  
  const [selectedStream, setSelectedStream] = useState<string>('');

  const handleStreamSelect = (stream: 'science' | 'commerce' | 'humanities') => {
    setSelectedStream(stream);
    // Filter questions based on the stream selection
    const fullQuestions = QuestionLoader.loadQuestions(config!);
    const filtered = fullQuestions.filter(q => {
      // Keep Language Proficiency
      if (q.id.startsWith('q-cuet-lang-')) return true;
      // Keep General Aptitude
      if (q.id.startsWith('q-cuet-gen-')) return true;
      // Keep Academic Skills
      if (q.id.startsWith('q-cuet-acad-')) return true;
      // Dynamic Domain filter
      if (stream === 'science' && q.id.startsWith('q-cuet-sci-')) return true;
      if (stream === 'commerce' && q.id.startsWith('q-cuet-comm-')) return true;
      if (stream === 'humanities' && q.id.startsWith('q-cuet-hum-')) return true;
      return false;
    });
    setQuestions(filtered);
    setAnswers(prev => ({ ...prev, selectedStream: stream }));
    setEngineStep('test');
  };

  const processingSteps = [
    'Scoring psychometric items...',
    'Scoring cognitive aptitude scale...',
    'Analyzing RIASEC interest matrix...',
    'Querying AI Career Recommendation mapping...',
    'Compiling final PDF blueprint report...'
  ];

  // 1. Resolve configuration from parameter slug
  useEffect(() => {
    if (id) {
      const foundConfig = AssessmentRegistry.getById(id);
      if (foundConfig) {
        setConfig(foundConfig);
        const loadedQ = QuestionLoader.loadQuestions(foundConfig);
        setQuestions(loadedQ);
        setTimeLeft((foundConfig.duration || 30) * 60);
      } else {
        console.warn(`[AssessmentLayout] Config not found for: ${id}`);
        navigate('/assessments');
      }
    }
  }, [id, navigate]);

  // 2. Timer Countdown ticking
  useEffect(() => {
    if (engineStep === 'test' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Auto submit when time runs out
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [engineStep]);

  const handleAutoSubmit = () => {
    setEngineStep('processing');
  };

  // 3. Score processing animation loader
  useEffect(() => {
    if (engineStep === 'processing') {
      setProcessingProgress(0);
      setProcessingStepIndex(0);
      
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Trigger dynamic report generator and save
            if (config) {
              const activeUser = JSON.parse(localStorage.getItem('careerdna_current_user') || 'null') || { id: 'usr-guest' };
              const report = ReportGenerator.generateReport(activeUser.id || `usr-${Date.now()}`, config, answers);
              setFinalReport(report);
              setEngineStep('success');
            } else {
              setEngineStep('test');
            }
            return 100;
          }
          
          const nextVal = prev + 5;
          const step = Math.floor((nextVal / 100) * processingSteps.length);
          setProcessingStepIndex(Math.min(step, processingSteps.length - 1));
          return nextVal;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [engineStep]);

  if (!config || questions.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-red border-t-transparent" />
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;

  const handleSaveAnswer = (val: any) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const handleToggleFlag = (qid: string) => {
    setFlagged(prev => ({ ...prev, [qid]: !prev[qid] }));
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setEngineStep('review');
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 font-sans text-slate-800 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* TOP STATUS BAR */}
        {engineStep === 'test' && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-pink text-brand-red flex items-center justify-center">
                <DynamicIcon name={config.icon} className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xs font-black text-slate-900 leading-none">{config.title}</h2>
                <span className="text-[9px] font-black uppercase text-slate-400 mt-1 block">{config.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex-1 md:w-60 md:flex-none">
                <ProgressBar current={answeredCount} total={questions.length} themeColor={config.themeColor} />
              </div>
              <Timer timeLeft={timeLeft} themeColor={config.themeColor} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: INSTRUCTIONS VIEW */}
          {engineStep === 'instructions' && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-2xl mx-auto bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6"
            >
              <div className="text-center space-y-3">
                <div className="h-16 w-16 rounded-2xl bg-brand-pink text-brand-red flex items-center justify-center mx-auto">
                  <DynamicIcon name={config.icon} className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-black text-slate-900">{config.title}</h2>
                <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">{config.subtitle}</p>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Test Guidelines</h4>
                <ul className="space-y-3 text-xs font-bold text-slate-700">
                  {config.instructions?.map((inst, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="h-4.5 w-4.5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] shrink-0 font-black">{idx + 1}</span>
                      <span className="leading-relaxed pt-0.5">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (config.id === 'ast-cuet') {
                    setEngineStep('stream-select');
                  } else {
                    setEngineStep('test');
                  }
                }}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white shadow-md hover:scale-[1.01] transition-transform cursor-pointer text-center"
                style={{ backgroundColor: config.themeColor }}
              >
                Start Assessment
              </button>
            </motion.div>
          )}

          {/* STEP 1.5: STREAM SELECT VIEW (CUET ONLY) */}
          {engineStep === 'stream-select' && (
            <motion.div
              key="stream-select"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-2xl mx-auto bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6 text-left"
            >
              <div className="text-center space-y-3">
                <div className="h-16 w-16 rounded-2xl bg-brand-pink text-brand-red flex items-center justify-center mx-auto">
                  <Icons.Compass className="h-8 w-8 text-[#00A8A8]" />
                </div>
                <h2 className="text-xl font-black text-slate-900 leading-none">Select Your Intended Stream</h2>
                <p className="text-xs text-slate-500 font-bold max-w-sm mx-auto mt-1 leading-relaxed">
                  This customizes your domain readiness questions to align with your academic target field.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {[
                  { value: 'science', title: 'Science Stream', desc: 'Physics, Chemistry, Mathematics, Biology, Computer Science' },
                  { value: 'commerce', title: 'Commerce Stream', desc: 'Accountancy, Business Studies, Economics, Mathematics, Entrepreneurship' },
                  { value: 'humanities', title: 'Humanities Stream', desc: 'History, Political Science, Geography, Psychology, Sociology, Economics' }
                ].map((str) => (
                  <button
                    key={str.value}
                    type="button"
                    onClick={() => handleStreamSelect(str.value as any)}
                    className="flex flex-col justify-between p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-[#00A8A8] transition-all text-left cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs font-black text-slate-900 group-hover:text-[#00A8A8] transition-colors leading-tight">{str.title}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold leading-tight mt-2">{str.desc}</p>
                    </div>
                    <span className="text-[9px] font-black text-[#00A8A8] uppercase tracking-wider mt-4 block">Select Stream →</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: TEST RUNNER VIEW */}
          {engineStep === 'test' && (
            <motion.div
              key="runner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Question Card Area */}
              <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 min-h-[420px] flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-center text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    <span>Question {currentIdx + 1} of {questions.length}</span>
                    <span>Item ID: {currentQ.id}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {currentQ.prompt}
                    </h3>
                  </div>

                  <QuestionRenderer
                    question={currentQ}
                    currentAnswer={answers[currentQ.id]}
                    onAnswerChange={handleSaveAnswer}
                  />
                </div>

                <div className="border-t border-slate-100 pt-6 flex justify-between gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentIdx === 0}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
                    style={{ backgroundColor: config.themeColor }}
                  >
                    {currentIdx === questions.length - 1 ? 'Go to Review' : 'Save & Next'}
                  </button>
                </div>
              </div>

              {/* Sidebar Navigator */}
              <div className="lg:col-span-3">
                <Navigator
                  questions={questions}
                  currentIdx={currentIdx}
                  answers={answers}
                  flagged={flagged}
                  onSelect={setCurrentIdx}
                  onToggleFlag={handleToggleFlag}
                  themeColor={config.themeColor}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: REVIEW SUMMARY VIEW */}
          {engineStep === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReviewScreen
                questions={questions}
                answers={answers}
                flagged={flagged}
                onSelectQuestion={(idx) => {
                  setCurrentIdx(idx);
                  setEngineStep('test');
                }}
                onSubmitClick={() => setShowSubmitModal(true)}
                themeColor={config.themeColor}
              />
            </motion.div>
          )}

          {/* STEP 4: PROCESSING LOADER */}
          {engineStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-6 my-auto min-h-[40vh] flex flex-col justify-center items-center"
            >
              <div className="relative h-16 w-16 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                <div
                  className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ borderTopColor: config.themeColor }}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900">Compiling Diagnostic Matrix</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed animate-pulse">
                  {processingSteps[processingStepIndex]}
                </p>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{ width: `${processingProgress}%`, backgroundColor: config.themeColor }}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS REDIRECT VIEW */}
          {engineStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg mx-auto p-6 sm:p-12 text-center space-y-8 flex flex-col justify-center items-center my-auto min-h-[50vh] text-slate-800"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce shadow">
                <Icons.CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Assessment Completed!</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  Your answers have been saved and compiled successfully. Torque AI has built your custom report.
                </p>
              </div>

              <div className="border border-slate-200 bg-white rounded-3xl p-5 w-full text-left space-y-3 shadow-sm">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Report Identifier:</span>
                  <span className="text-slate-900 font-black">{finalReport?.id}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Assessment Type:</span>
                  <span className="text-slate-900 font-black">{finalReport?.subCategory}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Dynamic Overall Score:</span>
                  <span className="text-brand-red font-black">{finalReport?.scores?.problemSolving || 88}%</span>
                </div>
              </div>

              <div className="w-full pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextId = finalReport?.id;
                    setFinalReport(null);
                    setEngineStep('instructions');
                    navigate(nextId ? `/report?id=${nextId}` : '/report');
                  }}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-md hover:scale-[1.01] transition-colors cursor-pointer text-center"
                  style={{ backgroundColor: config.themeColor }}
                >
                  View Custom Diagnostics Report
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Submit dialog */}
      {showSubmitModal && (
        <SubmitDialog
          onCancel={() => setShowSubmitModal(false)}
          onConfirm={() => {
            setShowSubmitModal(false);
            setEngineStep('processing');
          }}
        />
      )}
    </div>
  );
};
