
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Brain, Info, History } from 'lucide-react';
import { Pet, ChatMessage } from '../types';
import { getPetAdvice } from '../services/geminiService';

interface AiExpertProps {
  pets: Pet[];
}

const AiExpert: React.FC<AiExpertProps> = ({ pets }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hi there! I'm your PawsomeCare AI assistant. I can help with feeding guides, training tips, or general health questions for your pets. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await getPetAdvice(userMessage, messages);
    
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] animate-in fade-in slide-in-from-right-4 duration-500">
      {/* AI Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Pet Expert AI</h3>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Always Online</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <History className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Questions */}
      <div className="px-6 py-3 overflow-x-auto flex gap-2 bg-slate-50 hide-scrollbar">
        {["Safe foods for dogs?", "Kitten grooming tips", "Bird diet plan", "Training basics"].map(q => (
          <button 
            key={q}
            onClick={() => setInput(q)}
            className="whitespace-nowrap px-4 py-2 bg-white rounded-full border border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-wide hover:border-indigo-300 transition-colors shadow-sm"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth hide-scrollbar bg-slate-50"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100' 
                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-6 py-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-[2rem] border border-slate-200 shadow-inner">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your pet's care..." 
            className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none placeholder:text-slate-400 font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              input.trim() && !isLoading ? 'bg-indigo-600 text-white scale-100 shadow-md' : 'bg-slate-200 text-slate-400 scale-95'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[9px] text-center mt-3 text-slate-400 font-bold uppercase tracking-widest">
          AI generated advice • Always check with a vet
        </p>
      </div>
    </div>
  );
};

export default AiExpert;
