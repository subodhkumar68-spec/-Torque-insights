import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { dbService, Question, AssessmentSession, CareerDNAReport } from '../services/dbService';
import { AssessmentRegistry } from '../assessment-engine/engine/AssessmentRegistry';
import { QuestionLoader } from '../assessment-engine/engine/QuestionLoader';
import { ReportGenerator } from '../assessment-engine/engine/ReportGenerator';
import { useAuth } from './AuthContext';

interface AssessmentContextType {
  activeSession: AssessmentSession | null;
  questions: Question[];
  currentQuestionIndex: number;
  timeLeft: number; // in seconds
  startAssessment: (category: string, subCategory?: string) => void;
  saveAnswer: (questionId: string, value: any) => void;
  submitAssessment: () => CareerDNAReport | null;
  setCurrentQuestionIndex: (index: number) => void;
  cancelAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [activeSession, setActiveSession] = useState<AssessmentSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  const timerRef = useRef<any>(null);

  // Check if there is an unfinished session on mount or user change
  useEffect(() => {
    const activeUser = user || JSON.parse(localStorage.getItem('careerdna_current_user') || 'null');
    if (activeUser) {
      const sessions = dbService.getSessions();
      const existing = sessions.find(s => s.userId === activeUser.id && !s.submitted);
      if (existing) {
        // Resume session
        setActiveSession(existing);
        const pool = dbService.getQuestions();
        const filtered = pool.filter(q => q.category === existing.category); // Filter by test type
        setQuestions(filtered);
        
        // Calculate remaining time
        const elapsedSeconds = Math.floor((Date.now() - existing.startTime) / 1000);
        const totalDurationSeconds = Math.floor(existing.durationMs / 1000);
        const remaining = Math.max(0, totalDurationSeconds - elapsedSeconds);
        
        if (remaining <= 0) {
          // Auto-submit since time has run out
          autoSubmitSession(existing, filtered);
        } else {
          setTimeLeft(remaining);
          setCurrentQuestionIndex(Object.keys(existing.answers).length); // Resume index
        }
      }
    } else {
      setActiveSession(null);
      setQuestions([]);
      setTimeLeft(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [user]);

  // Set up active timer tick
  useEffect(() => {
    if (activeSession && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            // Trigger auto-submit
            setTimeout(() => {
              autoSubmitSession(activeSession, questions);
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSession, questions]);

  const autoSubmitSession = (session: AssessmentSession, testQuestions: Question[]) => {
    const activeUser = user || JSON.parse(localStorage.getItem('careerdna_current_user') || 'null');
    if (!activeUser) return;
    
    // Auto fill empty answers
    const finalAnswers = { ...session.answers };
    testQuestions.forEach(q => {
      if (!finalAnswers[q.id]) {
        // Seed default answers based on types
        if (q.type === 'likert') finalAnswers[q.id] = '3'; // default neutral
        else if (q.type === 'single' && q.options) finalAnswers[q.id] = q.options[0].value;
        else if (q.type === 'multiple' && q.options) finalAnswers[q.id] = [q.options[0].value];
        else if (q.type === 'ranking' && q.options) finalAnswers[q.id] = q.options.map(o => o.value);
        else if (q.type === 'scenario' && q.options) finalAnswers[q.id] = q.options[0].value;
        else finalAnswers[q.id] = '';
      }
    });

    const config = AssessmentRegistry.getById(session.subCategory);
    if (config) {
      ReportGenerator.generateReport(activeUser.id, config, finalAnswers);
    }
    setActiveSession(null);
    setQuestions([]);
    setTimeLeft(0);
  };

  const startAssessment = (category: string, subCategory?: string) => {
    const activeUser = user || JSON.parse(localStorage.getItem('careerdna_current_user') || 'null');
    if (!activeUser) {
      console.warn('[AssessmentContext] Cannot start assessment: No user authenticated.');
      return;
    }

    // Resolve configuration object
    const config = AssessmentRegistry.getById(category) || AssessmentRegistry.getById(subCategory || '');
    if (!config) {
      console.warn(`[AssessmentContext] Configuration not resolved for: ${category}`);
      return;
    }

    const loadedQuestions = QuestionLoader.loadQuestions(config);
    setQuestions(loadedQuestions as any);

    const durationMs = (config.duration || 30) * 60 * 1000;
    const newSession: AssessmentSession = {
      id: `ses-${Date.now()}`,
      userId: activeUser.id,
      category: config.category,
      subCategory: config.title,
      startTime: Date.now(),
      durationMs,
      answers: {},
      submitted: false
    };

    const sessions = dbService.getSessions();
    // Invalidate prior unfinished ones
    const filteredSessions = sessions.filter(s => !(s.userId === activeUser.id && !s.submitted));
    dbService.saveSessions([...filteredSessions, newSession]);

    setActiveSession(newSession);
    setTimeLeft((config.duration || 30) * 60);
    setCurrentQuestionIndex(0);
  };

  const saveAnswer = (questionId: string, value: any) => {
    if (!activeSession) return;

    const updatedSession = {
      ...activeSession,
      answers: {
        ...activeSession.answers,
        [questionId]: value
      }
    };

    setActiveSession(updatedSession);
    
    // Save to localStorage
    const sessions = dbService.getSessions();
    const idx = sessions.findIndex(s => s.id === activeSession.id);
    if (idx !== -1) {
      sessions[idx] = updatedSession;
      dbService.saveSessions(sessions);
    }
  };

  const submitAssessment = (): CareerDNAReport | null => {
    const activeUser = user || JSON.parse(localStorage.getItem('careerdna_current_user') || 'null');
    if (!activeUser || !activeSession) return null;

    if (timerRef.current) clearInterval(timerRef.current);

    const config = AssessmentRegistry.getById(activeSession.subCategory);
    if (!config) {
      console.warn(`[AssessmentContext] Failed to find config on submit for: ${activeSession.subCategory}`);
      return null;
    }

    const report = ReportGenerator.generateReport(
      activeUser.id,
      config,
      activeSession.answers
    );

    setActiveSession(null);
    setQuestions([]);
    setTimeLeft(0);
    return report;
  };

  const cancelAssessment = () => {
    if (!activeSession) return;

    if (timerRef.current) clearInterval(timerRef.current);
    
    // Delete session from DB
    const sessions = dbService.getSessions();
    const filtered = sessions.filter(s => s.id !== activeSession.id);
    dbService.saveSessions(filtered);

    setActiveSession(null);
    setQuestions([]);
    setTimeLeft(0);
  };

  return (
    <AssessmentContext.Provider value={{
      activeSession,
      questions,
      currentQuestionIndex,
      timeLeft,
      startAssessment,
      saveAnswer,
      submitAssessment,
      setCurrentQuestionIndex,
      cancelAssessment
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
