import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, X, Send, Sparkles, User, RefreshCw } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const { isOpen, setIsOpen, messages, sendMessage, clearChat, quickAction } = useChat();
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText('');
    setIsTyping(true);
    await sendMessage(text);
    setIsTyping(false);
  };

  const handleQuickAction = async (text: string) => {
    setIsTyping(true);
    await quickAction(text);
    setIsTyping(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-lg shadow-red-500/30 hover:scale-105 hover:bg-brand-redhover transition-all duration-300 animate-pulse-glow"
        title="Open AI Career Coach"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex w-96 flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl animate-fade-in-up overflow-hidden max-h-[500px]">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-brand-red to-brand-slate px-4 py-3.5 text-white">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm">
            <Sparkles className="h-4.5 w-4.5 text-red-200" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">AI Career Coach</h3>
            <span className="text-[10px] text-red-200 font-medium">CareerDNA Core Agent</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="rounded-lg p-1.5 hover:bg-white/10 text-white transition-colors"
            title="Clear conversation"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 hover:bg-white/10 text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px] max-h-[350px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[10px] font-bold ${
                msg.sender === 'user'
                  ? 'bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-brand-pink text-brand-red border-red-100'
              }`}>
                {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : 'AI'}
              </div>
              <div className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-brand-slate text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.text.split('\n').map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>
                    {/* Render bold text helper */}
                    {para.startsWith('*') ? (
                      <span className="block pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-brand-red">
                        {para.replace(/\*/g, '')}
                      </span>
                    ) : (
                      para.replace(/\*\*(.*?)\*\*/g, '$1')
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[80%] items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-pink text-brand-red border border-red-100 text-[10px] font-bold">
                AI
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 rounded-tl-none px-4 py-2.5 shadow-sm">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quickchips */}
      <div className="px-4 py-2 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar bg-slate-50">
        <button
          onClick={() => handleQuickAction('What career path matches my assessment?')}
          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-brand-slate hover:border-brand-red hover:text-brand-red transition-all duration-200 shadow-sm"
        >
          Career Match %
        </button>
        <button
          onClick={() => handleQuickAction('Recommend top universities.')}
          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-brand-slate hover:border-brand-red hover:text-brand-red transition-all duration-200 shadow-sm"
        >
          Suggested Colleges
        </button>
        <button
          onClick={() => handleQuickAction('Book a counseling session.')}
          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-brand-slate hover:border-brand-red hover:text-brand-red transition-all duration-200 shadow-sm"
        >
          Book Counsel
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex border-t border-slate-200 p-2 bg-white">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={user ? "Ask anything..." : "Log in to chat with Coach..."}
          disabled={!user && messages.length > 1}
          className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-brand-red focus:outline-none transition-colors"
        />
        <button
          type="submit"
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white hover:bg-brand-redhover transition-colors"
        >
          <Send className="h-4.5 w-4.5" />
        </button>
      </form>
    </div>
  );
};
