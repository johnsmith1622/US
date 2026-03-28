import { useState } from 'react';
import { 
  MessageCircle, 
  BookOpen, 
  PenTool, 
  ShieldCheck, 
  Users, 
  Wind, 
  Library as LibraryIcon,
  Heart,
  Menu,
  X,
  Smile,
  Frown,
  Angry,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useMood, Mood } from '@/src/hooks/useMood';
import { cn } from '@/src/lib/utils';
import Auth from './Auth';

// Components
import Chat from './Chat';
import Journal from './Journal';
import Library from './Library';
import Resources from './Resources';
import SafetyCenter from './SafetyCenter';
import Community from './Community';
import CalmTools from './CalmTools';

type Tab = 'chat' | 'journal' | 'library' | 'resources' | 'safety' | 'community' | 'calm' | 'dashboard';

const MOOD_OPTIONS: { mood: Mood; emoji: string; label: string }[] = [
  { mood: 'happy', emoji: '😊', label: 'Happy' },
  { mood: 'calm', emoji: '😌', label: 'Calm' },
  { mood: 'neutral', emoji: '😐', label: 'Neutral' },
  { mood: 'sad', emoji: '😔', label: 'Sad' },
  { mood: 'angry', emoji: '😡', label: 'Angry' },
];

export default function MainLayout() {
  const { mood, setMood, themeClasses } = useMood();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('dasp-user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('dasp-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('dasp-user');
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Support', icon: MessageCircle },
    { id: 'journal', label: 'Journal', icon: PenTool },
    { id: 'library', label: 'Library', icon: LibraryIcon },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'calm', label: 'Calm Tools', icon: Wind },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'safety', label: 'Safety Center', icon: ShieldCheck },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'chat': return <Chat />;
      case 'journal': return <Journal />;
      case 'library': return <Library />;
      case 'resources': return <Resources />;
      case 'safety': return <SafetyCenter />;
      case 'community': return <Community />;
      case 'calm': return <CalmTools />;
      default: return (
        <div className="h-full flex flex-col gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight">Welcome back, {user.username}!</h1>
            <p className="text-xl opacity-70">Your safe space for mental wellbeing and growth.</p>
            {user.interests && user.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {user.interests.map((i: string) => (
                  <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full border border-indigo-200">
                    {i}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/40 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">How are you feeling right now?</h2>
              <div className="flex flex-wrap gap-4">
                {MOOD_OPTIONS.map((opt) => (
                  <button
                    key={opt.mood}
                    onClick={() => setMood(opt.mood)}
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 rounded-3xl transition-all hover:scale-105",
                      mood === opt.mood 
                        ? "bg-indigo-600 text-white shadow-lg" 
                        : "bg-white/60 text-slate-700 hover:bg-white/80"
                    )}
                  >
                    <span className="text-3xl">{opt.emoji}</span>
                    <span className="font-bold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('chat')}
              className="bg-indigo-600 text-white p-8 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform text-left space-y-4"
            >
              <MessageCircle className="w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold">Talk to DASP</h3>
                <p className="opacity-80">Our AI assistant is here to listen and support you 24/7.</p>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('calm')}
              className="bg-teal-500 text-white p-8 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform text-left space-y-4"
            >
              <Wind className="w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold">Calm Down</h3>
                <p className="opacity-80">Try some breathing exercises to center yourself.</p>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('journal')}
              className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/40 shadow-xl hover:scale-[1.02] transition-transform text-left space-y-4"
            >
              <PenTool className="w-12 h-12 text-indigo-600" />
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Journaling</h3>
                <p className="text-slate-600">Write down your thoughts and track your daily mood.</p>
              </div>
            </button>
          </div>

          <div className="mt-auto p-6 bg-white/20 rounded-3xl border border-white/10 flex items-center gap-4">
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            <p className="text-sm font-medium opacity-80 italic">"You are stronger than you know, and braver than you feel."</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={cn("fixed inset-0 flex flex-col overflow-hidden transition-colors duration-1000", themeClasses)}>
      {/* Header */}
      <header className="bg-white/30 backdrop-blur-xl border-b border-white/20 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="text-3xl font-black text-indigo-600 tracking-tighter cursor-pointer shrink-0"
          >
            DASP
          </div>

          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap",
                  activeTab === item.id 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "hover:bg-white/40 text-slate-700"
                )}
              >
                <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-white" : "text-indigo-600")} />
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-2 bg-white/40 px-4 py-2 rounded-xl border border-white/20">
              <span className="text-xl">{MOOD_OPTIONS.find(o => o.mood === mood)?.emoji}</span>
              <span className="text-sm font-bold capitalize">{mood}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
              title="Logout"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Mobile Nav Toggle */}
            <div className="lg:hidden flex items-center gap-2">
               <select 
                value={activeTab} 
                onChange={(e) => setActiveTab(e.target.value as Tab)}
                className="bg-white/50 border-none rounded-xl px-3 py-2 text-sm font-bold outline-none"
               >
                 {navItems.map(item => (
                   <option key={item.id} value={item.id}>{item.label}</option>
                 ))}
               </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative p-6 md:p-10 custom-scrollbar">
        <div className="max-w-7xl mx-auto h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
