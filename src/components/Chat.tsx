import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { getChatResponse } from '@/src/lib/gemini';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('dasp-chat-history');
    return saved ? JSON.parse(saved) : [{ role: 'model', text: "Hi there! I'm DASP. How are you feeling today?" }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('dasp-chat-history', JSON.stringify(messages));
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getChatResponse(history, userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response || '...' }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-white/20">
      <div className="p-6 border-bottom border-white/20 bg-white/20">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Bot className="w-6 h-6 text-indigo-600" />
          AI Support Chat
        </h2>
        <p className="text-sm opacity-70">A safe space to talk, anytime.</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-indigo-500 text-white" : "bg-white text-indigo-600 shadow-sm"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl shadow-sm",
                msg.role === 'user' 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-white/80 text-slate-800 rounded-tl-none"
              )}>
                <div className="prose prose-sm max-w-none prose-slate">
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[85%] items-center text-indigo-600/50">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm italic">DASP is thinking...</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/30 border-t border-white/20">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message here..."
            className="w-full p-4 pr-14 bg-white/80 border-none rounded-2xl focus:ring-2 focus:ring-indigo-400 outline-none shadow-inner text-slate-800"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
