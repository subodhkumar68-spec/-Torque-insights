import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { dbService } from '../services/dbService';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: number;
}

interface ChatContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  setIsOpen: (open: boolean) => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  quickAction: (action: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initial welcome message
  useEffect(() => {
    if (user) {
      const reports = dbService.getReports().filter(r => r.userId === user.id);
      const name = user.name.split(' ')[0];
      
      let welcomeText = `Hello ${name}! I'm your AI Career Coach. How can I help you shape your future today?`;
      if (reports.length > 0) {
        const latest = reports[reports.length - 1];
        welcomeText = `Welcome back, ${name}! I have reviewed your CareerDNA report for ${latest.category}. Your profile shows strong ${latest.scores.mbti} personality traits. Ask me anything about your recommended careers, suggested colleges, or certification programs!`;
      }
      
      setMessages([
        {
          id: 'welcome',
          sender: 'coach',
          text: welcomeText,
          timestamp: Date.now()
        }
      ]);
    } else {
      setMessages([
        {
          id: 'welcome-anon',
          sender: 'coach',
          text: "Hello! I am your AI Career Coach. Log in to get personalized assessment analysis, or ask me general questions about career options, MBA prep, or engineering streams!",
          timestamp: Date.now()
        }
      ]);
    }
  }, [user]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI thinking and typing latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Compile reports context
    const reports = user ? dbService.getReports().filter(r => r.userId === user.id) : [];
    const latestReport = reports.length > 0 ? reports[reports.length - 1] : null;

    let reply = '';
    const query = text.toLowerCase();

    if (query.includes('hello') || query.includes('hi ') || query.includes('hey')) {
      reply = `Hi there! I'm here to answer any questions about your career paths. What's on your mind?`;
    } else if (query.includes('counselor') || query.includes('appointment') || query.includes('book')) {
      reply = `I can help you schedule a counseling session! You can do this from your dashboard in the 'Counseling Sessions' section, or I can automatically log a mock booking for you with Dr. Sunita Mehta for tomorrow at 4 PM. Would you like me to book it?`;
    } else if (query.includes('yes') && messages[messages.length - 1]?.text.includes('book')) {
      if (user) {
        const bookings = dbService.getBookings();
        const newBooking = {
          id: `book-${Date.now()}`,
          studentId: user.id,
          studentName: user.name,
          counselorId: 'usr-counselor-1',
          counselorName: 'Dr. Sunita Mehta',
          dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T16:00:00',
          status: 'confirmed' as const,
          notes: 'Booked via AI Career Coach Chatbot'
        };
        dbService.saveBookings([...bookings, newBooking]);
        reply = `Awesome! I have scheduled your counseling session with Dr. Sunita Mehta for tomorrow at 4:00 PM. It is now registered in your student portal under 'Counseling Sessions'.`;
      } else {
        reply = `Please log in as a student to schedule an appointment with our career counselors.`;
      }
    } else if (query.includes('career') || query.includes('job') || query.includes('recommend')) {
      if (latestReport) {
        const recs = latestReport.careerRecommendations.map(c => `**${c.career}** (${c.matchPercentage}% match)`).join(', ');
        reply = `Based on your CareerDNA report, your top career recommendations are: ${recs}. Your logical MBTI type (${latestReport.scores.mbti}) indicates excellent capability for structured problem-solving and critical thinking!`;
      } else {
        reply = `To give you exact career suggestions, I recommend taking one of our CareerDNA assessments. For class XI-XII students, the Stream Selection and Career Interest tests are excellent starting points!`;
      }
    } else if (query.includes('college') || query.includes('university') || query.includes('where to study')) {
      if (latestReport && latestReport.suggestedColleges.length > 0) {
        reply = `For your profile, the recommended colleges are: ${latestReport.suggestedColleges.join(', ')}. These institutions offer excellent curriculum options for your suggested degree paths: ${latestReport.suggestedDegrees.join(', ')}.`;
      } else {
        reply = `Depending on your interests, India has outstanding institutes. For Engineering, IITs and BITS Pilani are premier. For Management, IIMs, XLRI, and Symbiosis are top-tier. Let me know what field you are targeting!`;
      }
    } else if (query.includes('certification') || query.includes('certify') || query.includes('course')) {
      if (latestReport && latestReport.suggestedCertifications.length > 0) {
        reply = `To bridges skills gaps and prepare for your chosen field, you should consider these certifications: ${latestReport.suggestedCertifications.map(c => `*${c}*`).join(', ')}.`;
      } else {
        reply = `Popular certifications to boost your resume:
* AI & ML: Google Data Analytics, AWS Cloud, TensorFlow Certificate
* Business & BBA: Agile Scrum Master, Google Project Management, HubSpot Sales
* MBA: CFA Level 1, PMP, Excel for Business Masterclass.`;
      }
    } else {
      reply = `I appreciate your question! Career planning involves multiple factors. For personalized insights, make sure you take our psychometric assessment, or you can book an appointment with our senior counselor Dr. Sunita Mehta. Let me know if you would like me to help schedule that call!`;
    }

    const coachMessage: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'coach',
      text: reply,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, coachMessage]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const quickAction = (action: string) => {
    sendMessage(action);
  };

  return (
    <ChatContext.Provider value={{
      isOpen,
      messages,
      setIsOpen,
      sendMessage,
      clearChat,
      quickAction
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
