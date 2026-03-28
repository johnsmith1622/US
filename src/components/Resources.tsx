import { Lightbulb, Brain, Heart, TrendingUp, ArrowRight } from 'lucide-react';

const RESOURCES = [
  {
    category: 'Mental Health Tips',
    icon: Brain,
    color: 'text-purple-500',
    items: [
      { title: 'Understanding Anxiety', desc: 'Learn the signs and how to manage daily stress.' },
      { title: 'The Power of Sleep', desc: 'How rest impacts your emotional resilience.' },
      { title: 'Healthy Boundaries', desc: 'Setting limits for a healthier social life.' }
    ]
  },
  {
    category: 'Stress Management',
    icon: Lightbulb,
    color: 'text-amber-500',
    items: [
      { title: 'Quick De-stressors', desc: '5-minute techniques for busy days.' },
      { title: 'Mindful Walking', desc: 'Connecting with nature to clear your mind.' },
      { title: 'Digital Detox', desc: 'Finding balance in a connected world.' }
    ]
  },
  {
    category: 'Confidence Building',
    icon: TrendingUp,
    color: 'text-emerald-500',
    items: [
      { title: 'Positive Affirmations', desc: 'Rewiring your inner dialogue for success.' },
      { title: 'Facing Your Fears', desc: 'Small steps towards big personal growth.' },
      { title: 'Body Positivity', desc: 'Learning to love the skin you are in.' }
    ]
  },
  {
    category: 'Emotional Growth',
    icon: Heart,
    color: 'text-pink-500',
    items: [
      { title: 'Developing Empathy', desc: 'Understanding others to understand yourself.' },
      { title: 'Processing Grief', desc: 'Navigating the journey of loss and healing.' },
      { title: 'Emotional Intelligence', desc: 'The key to better relationships.' }
    ]
  }
];

export default function Resources() {
  return (
    <div className="h-full flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">Resources & Guides</h2>
        <p className="text-lg opacity-70">Knowledge is the first step towards healing and growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto pr-2 custom-scrollbar">
        {RESOURCES.map((section) => (
          <div key={section.category} className="space-y-4">
            <div className="flex items-center gap-3">
              <section.icon className={`w-6 h-6 ${section.color}`} />
              <h3 className="text-xl font-bold uppercase tracking-widest opacity-60">{section.category}</h3>
            </div>
            <div className="grid gap-4">
              {section.items.map((item) => (
                <button
                  key={item.title}
                  className="group bg-white/50 backdrop-blur-sm p-6 rounded-[2rem] border border-white/30 shadow-sm hover:shadow-md hover:bg-white/70 transition-all text-left flex justify-between items-center"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                    <p className="text-sm opacity-70">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-indigo-600" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
