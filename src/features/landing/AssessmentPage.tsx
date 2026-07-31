import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAssessment } from '../../context/AssessmentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Type, Eye, EyeOff, HelpCircle, X, ChevronLeft, ChevronRight, 
  Sparkles, CheckCircle, BookmarkCheck, Bookmark, Award, Clock, ArrowRight, 
  AlertCircle, Check, RotateCcw, CheckCircle2 
} from 'lucide-react';
import { dbService } from '../../services/dbService';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    activeSession, questions, currentQuestionIndex, timeLeft, 
    saveAnswer, submitAssessment, setCurrentQuestionIndex, cancelAssessment 
  } = useAssessment();

  const [engineStep, setEngineStep] = useState<'instructions' | 'test' | 'review' | 'processing' | 'success'>('instructions');
  const [zoomText, setZoomText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({});
  const [finalReport, setFinalReport] = useState<any>(null);
  
  // Submit confirmation modal
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  // AI report compiler progress states
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStepIndex, setProcessingStepIndex] = useState(0);
  
  const processingSteps = [
    'Scoring psychometric items...',
    'Scoring cognitive aptitude scale...',
    'Analyzing RIASEC interest matrix...',
    'Querying AI Career Recommendation mapping...',
    'Compiling final PDF blueprint report...'
  ];

  // If no active session exists and no report generated, take them back to the catalog
  useEffect(() => {
    if (!activeSession && !finalReport) {
      navigate('/assessments');
    }
  }, [activeSession, finalReport, navigate]);

  // Track visited questions
  useEffect(() => {
    if (activeSession && questions.length > 0) {
      const currentQ = questions[currentQuestionIndex];
      if (currentQ) {
        setVisitedQuestions(prev => ({ ...prev, [currentQ.id]: true }));
      }
    }
  }, [currentQuestionIndex, questions, activeSession]);

  // Format timer
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    if (!activeSession) return 0;
    return Object.keys(activeSession.answers).length;
  };

  const getMotivationalMessage = () => {
    if (!activeSession) return '';
    const total = questions.length;
    const answered = getAnsweredCount();
    if (answered === 0) return 'Take your time. Answer honestly!';
    if (answered === Math.floor(total / 2)) return "Keep going! You're exactly halfway there.";
    if (answered === total - 1) return 'Almost finished! Just one final question.';
    return 'Doing great! Progress is automatically saved.';
  };

  // Run mock processing loader cycle
  useEffect(() => {
    if (engineStep === 'processing') {
      setProcessingProgress(0);
      setProcessingStepIndex(0);
      
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Trigger actual submission logic
            const report = submitAssessment();
            if (report) {
              setFinalReport(report);
              setEngineStep('success');
            } else {
              setEngineStep('test');
            }
            return 100;
          }
          const nextVal = prev + 5;
          const nextStepIdx = Math.floor((nextVal / 100) * processingSteps.length);
          setProcessingStepIndex(Math.min(nextStepIdx, processingSteps.length - 1));
          return nextVal;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [engineStep]);

  if (!activeSession && !finalReport) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = getAnsweredCount();
  const remainingCount = totalQuestions - answeredCount;
  const completionPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-300 pt-20 ${
      highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Top Header of Assessment Engine */}
      <header className={`h-16 flex items-center justify-between px-6 border-b shrink-0 bg-white ${
        highContrast ? 'bg-zinc-950 border-zinc-800 text-white' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white shadow-sm">
            <BrainCircuit className="h-5.5 w-5.5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 leading-none">
              {activeSession?.subCategory || finalReport?.subCategory || 'AI Career Assessment'}
            </h1>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Powered by Torque Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setZoomText(!zoomText)}
              title="Zoom Text"
              className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-red cursor-pointer bg-slate-50"
            >
              <Type className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setHighContrast(!highContrast)}
              title="Contrast Toggle"
              className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-red cursor-pointer bg-slate-50"
            >
              {highContrast ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>

          {activeSession && !finalReport && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              timeLeft < 300 
                ? 'bg-red-50 border-red-200 text-brand-red animate-pulse' 
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <Clock className="h-4 w-4 shrink-0" />
              <span className="font-mono text-xs font-bold leading-none">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-start relative">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: GUIDELINES OVERVIEW */}
          {engineStep === 'instructions' && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-2xl mx-auto p-6 sm:p-12 text-left space-y-8"
            >
              <div className="space-y-2">
                <span className="rounded bg-brand-pink px-2.5 py-1 text-[10px] font-black uppercase text-brand-red tracking-wider">
                  Diagnostic Guidelines
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Assessment Environment Setup
                </h2>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Welcome to the Torque Insights AI diagnostics. Before starting, verify that your testing environment aligns with the scientific rules.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Time Requirement', desc: 'Allow 30 minutes of uninterrupted study time. The clock cannot be paused once started.', icon: Clock },
                  { title: 'Nature of Items', desc: 'There are no correct or wrong answers. Choose the option mapping your natural traits.', icon: HelpCircle },
                  { title: 'Scientific Framework', desc: 'Designed on the RIASEC matrix & NEP 6-axis stream alignment parameters.', icon: BrainCircuit },
                  { title: 'AI Recommendation Map', desc: 'Completing all items is required to build correct candidate reports.', icon: Sparkles }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl flex gap-3 shadow-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-pink text-brand-red shrink-0 mt-0.5">
                      <item.icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 font-bold mt-1 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-150">
                <button 
                  onClick={() => { cancelAssessment(); navigate('/assessments'); }}
                  className="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                >
                  Back to Catalog
                </button>
                <button 
                  onClick={() => setEngineStep('test')}
                  className="flex-1 py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-md transition-all cursor-pointer text-center"
                >
                  Begin Assessment
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: ACTIVE DIAGNOSTIC TEST */}
          {engineStep === 'test' && activeSession && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col md:flex-row"
            >
              <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between max-w-3xl mx-auto space-y-6">
                
                {/* Question Area */}
                <div className="space-y-6 text-left w-full">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Item {currentQuestionIndex + 1} of {totalQuestions}</span>
                      <span className="text-brand-red">{completionPercent}% Complete</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-red transition-all duration-300" style={{ width: `${completionPercent}%` }} />
                    </div>
                  </div>

                  <div className="bg-brand-pink/20 border border-brand-red/10 rounded-2xl p-3 text-xs font-black text-brand-red flex items-center gap-1.5 justify-center">
                    <Sparkles className="h-4.5 w-4.5" />
                    {getMotivationalMessage()}
                  </div>

                  {currentQuestion && (
                    <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {currentQuestion.subCategory}
                        </span>
                        <button 
                          onClick={() => setFlaggedQuestions({ ...flaggedQuestions, [currentQuestion.id]: !flaggedQuestions[currentQuestion.id] })}
                          className={`flex items-center gap-1 text-[10px] font-black uppercase cursor-pointer transition-colors ${
                            flaggedQuestions[currentQuestion.id] ? 'text-brand-red' : 'text-slate-400 hover:text-slate-650'
                          }`}
                        >
                          {flaggedQuestions[currentQuestion.id] ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                          Mark for Review
                        </button>
                      </div>

                      <p className={`font-black text-slate-900 leading-normal ${zoomText ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>
                        {currentQuestion.prompt}
                      </p>

                      <div className="pt-2">
                        {currentQuestion.type === 'likert' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-5 gap-2">
                              {[1, 2, 3, 4, 5].map((val) => {
                                const isSel = Number(activeSession?.answers[currentQuestion.id]) === val;
                                return (
                                  <button
                                    key={val}
                                    onClick={() => saveAnswer(currentQuestion.id, val.toString())}
                                    className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border font-bold transition-all cursor-pointer ${
                                      isSel 
                                        ? 'bg-brand-red border-brand-red text-white' 
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                    }`}
                                  >
                                    <span className="text-sm">{val}</span>
                                  </button>
                                );
                              })}
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 uppercase tracking-wider">
                              <span>{currentQuestion.minLabel || 'Disagree'}</span>
                              <span>{currentQuestion.maxLabel || 'Agree'}</span>
                            </div>
                          </div>
                        )}

                        {currentQuestion.type === 'single' && currentQuestion.options && (
                          <div className="space-y-2.5">
                            {currentQuestion.options.map((opt) => {
                              const isSel = activeSession?.answers[currentQuestion.id] === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  onClick={() => saveAnswer(currentQuestion.id, opt.value)}
                                  className={`w-full text-left rounded-2xl border p-4 text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer ${
                                    isSel 
                                      ? 'bg-brand-red border-brand-red text-white' 
                                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  <div className={`h-4.5 w-4.5 shrink-0 rounded-full border flex items-center justify-center mt-0.5 ${isSel ? 'border-white bg-white/20' : 'border-slate-500'}`}>
                                    {isSel && <div className="h-2 w-2 rounded-full bg-white" />}
                                  </div>
                                  <span>{opt.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions footer buttons */}
                <div className="flex flex-wrap justify-between items-center gap-3 pt-6 border-t border-slate-200 w-full mt-6">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        if (currentQuestion) {
                          saveAnswer(currentQuestion.id, '');
                        }
                      }}
                      className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-500 cursor-pointer"
                    >
                      Clear Response
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEngineStep('review')}
                      className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4.5 py-2.5 text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      Review Answers
                    </button>

                    {currentQuestionIndex < totalQuestions - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                        className="rounded-xl bg-slate-950 hover:bg-black px-6 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
                      >
                        Save & Next
                      </button>
                    ) : (
                      <button
                        onClick={() => setEngineStep('review')}
                        className="rounded-xl bg-brand-red hover:bg-brand-redhover px-6 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
                      >
                        Review & Submit
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Sidebar Question Navigator Panel */}
              <div className="w-full md:w-64 border-l border-slate-200 bg-white p-6 text-left flex flex-col justify-between shrink-0">
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Question Navigator</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Click index to jump to question</p>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, idx) => {
                      const isCurrent = idx === currentQuestionIndex;
                      const isAnswered = activeSession?.answers[q.id] !== undefined && activeSession?.answers[q.id] !== '';
                      const isFlagged = flaggedQuestions[q.id];
                      const isVisited = visitedQuestions[q.id];

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`h-9 w-9 rounded-xl border flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative ${
                            isCurrent ? 'border-brand-red bg-brand-pink/30 text-brand-red font-black ring-1 ring-brand-red' :
                            isAnswered ? 'bg-slate-900 border-slate-900 text-white' :
                            isVisited ? 'bg-slate-50 border-slate-300 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          {idx + 1}
                          {isFlagged && (
                            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-brand-red border border-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Saved Successfully</span>
                </div>
              </div>

            </motion.div>
          )}

          {/* STEP 3: REVIEW SUMMARIZATION */}
          {engineStep === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-4xl mx-auto p-6 sm:p-12 overflow-y-auto text-left space-y-8"
            >
              <div className="space-y-2">
                <span className="rounded bg-brand-pink px-2.5 py-1 text-[10px] font-black uppercase text-brand-red tracking-wider">
                  Summary Verification
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Review Your Answers
                </h2>
                <p className="text-xs text-slate-500 font-semibold">
                  Ensure all questions have been addressed. Click any option card to return to editing.
                </p>
              </div>

              {remainingCount > 0 && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 text-xs font-bold text-amber-800 leading-relaxed">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black">Unanswered Questions Detected</p>
                    <p className="font-medium text-amber-700 mt-0.5">
                      You have {remainingCount} questions left unanswered. We highly recommend filling out all diagnostic options to get complete AI reports.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions.map((q, idx) => {
                  const isAnswered = activeSession?.answers[q.id] !== undefined && activeSession?.answers[q.id] !== '';
                  const isFlagged = flaggedQuestions[q.id];
                  return (
                    <button 
                      key={q.id}
                      onClick={() => { setCurrentQuestionIndex(idx); setEngineStep('test'); }}
                      className="w-full text-left rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-355 transition-all flex justify-between items-center cursor-pointer"
                    >
                      <div className="space-y-0.5 truncate max-w-[80%]">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Question {idx + 1}</p>
                        <p className="text-xs font-bold text-slate-900 truncate">{q.prompt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isFlagged && <Bookmark className="h-4 w-4 text-brand-red" />}
                        <span className={`rounded-full px-2.5 py-0.5 text-[8px] font-black uppercase ${isAnswered ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-brand-red'}`}>
                          {isAnswered ? 'Answered' : 'Empty'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-150">
                <button 
                  onClick={() => setEngineStep('test')}
                  className="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                >
                  Continue Assessment
                </button>
                <button 
                  onClick={() => setShowSubmitModal(true)}
                  className="flex-1 py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-md transition-all cursor-pointer text-center font-black uppercase tracking-wider"
                >
                  Submit Assessment
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PROCESSING LOADER */}
          {engineStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md mx-auto p-6 sm:p-12 text-center space-y-8 flex flex-col justify-center items-center my-auto min-h-[50vh]"
            >
              <div className="relative h-24 w-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-brand-red animate-spin" />
                <Sparkles className="h-10 w-10 text-brand-red animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">Analyzing Your Responses</h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Our AI Career Intelligence Engine is compiling and scoring your personalized diagnostic indices.
                </p>
              </div>

              <div className="w-full space-y-1">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>Compiling Report</span>
                  <span className="text-brand-red">{processingProgress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-red transition-all duration-150" style={{ width: `${processingProgress}%` }} />
                </div>
              </div>

              <div className="w-full text-left space-y-2.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                {processingSteps.map((stepName, sIdx) => {
                  const isDone = processingStepIndex > sIdx;
                  const isActive = processingStepIndex === sIdx;
                  return (
                    <div key={sIdx} className="flex items-center justify-between">
                      <span className={isDone ? 'text-slate-400 line-through' : (isActive ? 'text-brand-red font-black' : 'text-slate-500')}>{stepName}</span>
                      {isDone ? (
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      ) : (
                        isActive && <div className="h-2 w-2 rounded-full bg-brand-red animate-ping" />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS & VIEW REPORT */}
          {engineStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg mx-auto p-6 sm:p-12 text-center space-y-8 flex flex-col justify-center items-center my-auto min-h-[50vh] text-slate-800"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce shadow">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Assessment Completed Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                  Your responses have been processed. Our AI Career Intelligence Engine has generated your full CareerDNA Report.
                </p>
              </div>

              <div className="border border-slate-200 bg-white rounded-3xl p-5 w-full text-left space-y-3 shadow-sm">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Generated Report ID:</span>
                  <span className="text-slate-900 font-black">{finalReport?.id || `rep-${Date.now().toString().slice(-6)}`}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Assessment Category:</span>
                  <span className="text-brand-red font-black">{finalReport?.category || 'Career Aptitude'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Assessment Name:</span>
                  <span className="text-slate-900 font-black">{finalReport?.subCategory || 'High School Career Aptitude Test'}</span>
                </div>
              </div>

              <div className="space-y-3 w-full pt-2">
                <button 
                  onClick={() => {
                    const nextId = finalReport?.id;
                    setFinalReport(null);
                    setEngineStep('instructions');
                    navigate(nextId ? `/report?id=${nextId}` : '/report');
                  }}
                  className="w-full py-3 rounded-xl bg-brand-red hover:bg-brand-redhover text-xs font-bold text-white shadow-md transition-colors cursor-pointer"
                >
                  View AI Interactive Report
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Submit Confirmation dialog */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-100 text-left">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Confirm Test Submission</h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Are you sure you want to finish and submit your answers? You cannot change responses after submission.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer"
              >
                Go Back
              </button>
              <button 
                onClick={() => { setShowSubmitModal(false); setEngineStep('processing'); }}
                className="px-5 py-2 bg-brand-red hover:bg-brand-redhover rounded-xl text-xs font-bold text-white cursor-pointer"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
