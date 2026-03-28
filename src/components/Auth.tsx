import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, User, Mail, Lock, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface AuthProps {
  onLogin: (userData: any) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // For multi-step signup
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    gender: '',
    interests: [] as string[],
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Mock login - use email prefix as username if not set
      const defaultUsername = formData.email.split('@')[0] || 'User';
      onLogin({ 
        ...formData, 
        username: formData.username || defaultUsername,
        interests: formData.interests.length > 0 ? formData.interests : ['Mental Health']
      });
    } else {
      if (step < 2) {
        setStep(2);
      } else {
        // Mock signup complete
        onLogin({
          ...formData,
          username: formData.username || formData.email.split('@')[0] || 'User'
        });
      }
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const INTEREST_OPTIONS = ['Anxiety Support', 'Stress Relief', 'Daily Motivation', 'Sleep Better', 'Mindfulness', 'Confidence', 'Community'];

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-950 p-6 overflow-hidden">
      {/* Neon Cat Background */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 p-4">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.img 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3 + (i % 5), 
                repeat: Infinity,
                delay: i * 0.1 
              }}
              src={`https://picsum.photos/seed/cat-neon-${i}/100/100`}
              className="w-full aspect-square object-cover rounded-xl filter hue-rotate-[180deg] saturate-200 brightness-125 contrast-125 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              alt="neon cat"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/80" />
      </div>

      <div className="w-full max-w-[400px] space-y-4 relative z-10">
        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 p-10 rounded-xl shadow-sm space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-indigo-600 tracking-tighter flex items-center justify-center gap-2">
              DASP
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              {isLogin ? 'Sign in to protect your peace' : 'Join our supportive community'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm transition-all"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm transition-all"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`signup-step-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {step === 1 ? (
                    <>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm transition-all"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Username"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm transition-all"
                          value={formData.username}
                          onChange={e => setFormData({ ...formData, username: e.target.value })}
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="password"
                          placeholder="Password"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm transition-all"
                          value={formData.password}
                          onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase">Gender</p>
                        <div className="flex gap-2">
                          {['Male', 'Female', 'Other'].map(g => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setFormData({ ...formData, gender: g })}
                              className={cn(
                                "flex-1 py-2 text-xs rounded-lg border transition-all",
                                formData.gender === g ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                              )}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <Sparkles className="w-5 h-5" />
                        <h3 className="font-bold">Personalize your experience</h3>
                      </div>
                      <p className="text-xs text-slate-500">Select what you'd like to focus on in DASP:</p>
                      <div className="flex flex-wrap gap-2">
                        {INTEREST_OPTIONS.map(interest => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={cn(
                              "px-3 py-2 text-xs rounded-full border transition-all",
                              formData.interests.includes(interest) 
                                ? "bg-indigo-100 text-indigo-700 border-indigo-300 shadow-sm" 
                                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-200"
                            )}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Log In' : (step === 1 ? 'Next' : 'Create Account')}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-bold">OR</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 text-indigo-900 font-bold text-sm hover:opacity-80 transition-opacity">
            <Heart className="w-4 h-4 fill-indigo-900" />
            Continue with Google
          </button>
        </motion.div>

        {/* Toggle Card */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl text-center shadow-sm">
          <p className="text-sm text-slate-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setStep(1);
              }}
              className="text-indigo-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
