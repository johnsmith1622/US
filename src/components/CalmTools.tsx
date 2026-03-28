import { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CalmTools() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Wait'>('Inhale');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            switch (phase) {
              case 'Inhale': setPhase('Hold'); return 4;
              case 'Hold': setPhase('Exhale'); return 4;
              case 'Exhale': setPhase('Wait'); return 4;
              case 'Wait': setPhase('Inhale'); return 4;
              default: return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, phase]);

  const resetBreathing = () => {
    setIsBreathing(false);
    setPhase('Inhale');
    setTimer(4);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-12 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Wind className="w-10 h-10 text-teal-500" />
          Box Breathing
        </h2>
        <p className="text-lg opacity-70">A simple technique to calm your nervous system.</p>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Breathing Circle */}
        <motion.div
          animate={{
            scale: phase === 'Inhale' ? 1.5 : phase === 'Exhale' ? 1 : phase === 'Hold' ? 1.5 : 1,
            backgroundColor: phase === 'Inhale' ? 'rgba(45, 212, 191, 0.4)' : 'rgba(45, 212, 191, 0.2)',
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-4 border-teal-400/30"
        />
        
        <div className="z-10 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-4xl font-black text-teal-600 uppercase tracking-widest"
            >
              {phase}
            </motion.div>
          </AnimatePresence>
          <div className="text-6xl font-light text-teal-400 mt-2">{timer}</div>
        </div>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => setIsBreathing(!isBreathing)}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${
            isBreathing ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-teal-600 text-white hover:bg-teal-700'
          }`}
        >
          {isBreathing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          {isBreathing ? 'Pause' : 'Start Breathing'}
        </button>
        <button
          onClick={resetBreathing}
          className="p-4 bg-white/60 text-slate-600 rounded-2xl hover:bg-white/80 transition-all shadow-md"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-8">
        {['Inhale', 'Hold', 'Exhale', 'Wait'].map((p) => (
          <div
            key={p}
            className={`p-4 rounded-2xl border-2 transition-all text-center ${
              phase === p && isBreathing ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-transparent bg-white/30 opacity-50'
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-tighter">{p}</p>
            <p className="text-sm">4 Seconds</p>
          </div>
        ))}
      </div>
    </div>
  );
}
