import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Mood = 'happy' | 'sad' | 'angry' | 'calm' | 'neutral';

interface MoodContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
  themeClasses: string;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<Mood>(() => {
    const saved = localStorage.getItem('dasp-mood');
    return (saved as Mood) || 'neutral';
  });

  useEffect(() => {
    localStorage.setItem('dasp-mood', mood);
  }, [mood]);

  const getThemeClasses = (currentMood: Mood) => {
    switch (currentMood) {
      case 'happy':
        return 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-purple-900';
      case 'sad':
        return 'bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-blue-100';
      case 'angry':
        return 'bg-gradient-to-br from-orange-100 via-red-100 to-orange-200 text-red-900';
      case 'calm':
        return 'bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 text-teal-900';
      default:
        return 'bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 text-slate-800';
    }
  };

  return (
    <MoodContext.Provider value={{ mood, setMood, themeClasses: getThemeClasses(mood) }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (!context) throw new Error('useMood must be used within a MoodProvider');
  return context;
}
