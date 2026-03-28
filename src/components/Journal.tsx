import { useState, useEffect } from 'react';
import { PenLine, Calendar, Smile, Frown, Angry, Zap, Save, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
  reflection: string;
}

const MOODS = [
  { icon: Smile, label: 'Happy', emoji: '😊', color: 'text-yellow-500' },
  { icon: Zap, label: 'Calm', emoji: '😌', color: 'text-teal-500' },
  { icon: Frown, label: 'Sad', emoji: '😔', color: 'text-blue-500' },
  { icon: Angry, label: 'Angry', emoji: '😡', color: 'text-red-500' },
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('dasp-journal-entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentEntry, setCurrentEntry] = useState({
    mood: 'Happy',
    content: '',
    reflection: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem('dasp-journal-entries', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!currentEntry.content.trim()) return;
    
    setIsSaving(true);
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      ...currentEntry
    };

    setTimeout(() => {
      setEntries([newEntry, ...entries]);
      setCurrentEntry({ mood: 'Happy', content: '', reflection: '' });
      setIsSaving(false);
    }, 600);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="h-full flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-8 shadow-xl border border-white/40">
        <div className="flex items-center gap-3 mb-6">
          <PenLine className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold">Daily Reflection</h2>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <p className="w-full text-sm font-semibold opacity-60 uppercase tracking-widest">How are you feeling right now?</p>
            {MOODS.map((m) => (
              <button
                key={m.label}
                onClick={() => setCurrentEntry({ ...currentEntry, mood: m.label })}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl transition-all",
                  currentEntry.mood === m.label 
                    ? "bg-indigo-600 text-white shadow-lg scale-105" 
                    : "bg-white/50 hover:bg-white/80 text-slate-700"
                )}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="font-medium">{m.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <textarea
              placeholder="What's on your mind? Write freely..."
              value={currentEntry.content}
              onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
              className="w-full h-48 p-6 bg-white/40 rounded-3xl border-none focus:ring-2 focus:ring-indigo-400 outline-none text-lg resize-none shadow-inner"
            />
            <input
              type="text"
              placeholder="One thing you're grateful for today..."
              value={currentEntry.reflection}
              onChange={(e) => setCurrentEntry({ ...currentEntry, reflection: e.target.value })}
              className="w-full p-4 bg-white/40 rounded-2xl border-none focus:ring-2 focus:ring-indigo-400 outline-none shadow-inner"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving || !currentEntry.content.trim()}
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg active:scale-95"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
        <h3 className="text-xl font-bold opacity-60 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Past Entries
        </h3>
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-sm group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold opacity-50 uppercase">{entry.date}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl">{MOODS.find(m => m.label === entry.mood)?.emoji}</span>
                    <span className="font-semibold text-indigo-600">{entry.mood}</span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteEntry(entry.id)}
                  className="p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">{entry.content}</p>
              {entry.reflection && (
                <div className="p-3 bg-indigo-50/50 rounded-xl border-l-4 border-indigo-400">
                  <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Gratitude</p>
                  <p className="text-sm italic text-slate-600">{entry.reflection}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {entries.length === 0 && (
          <div className="text-center py-12 opacity-40">
            <PenLine className="w-12 h-12 mx-auto mb-4" />
            <p>No entries yet. Start writing your story.</p>
          </div>
        )}
      </div>
    </div>
  );
}
