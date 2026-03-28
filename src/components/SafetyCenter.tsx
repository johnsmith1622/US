import { Shield, AlertTriangle, Users, Lock, Info } from 'lucide-react';

const GUIDES = [
  {
    title: 'Cyberbullying',
    icon: Shield,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    content: [
      'Don’t respond to bullies. They want a reaction.',
      'Save the evidence. Take screenshots of harmful messages.',
      'Block the bully immediately.',
      'Report the behavior to the platform.',
      'Talk to a trusted adult or friend.'
    ]
  },
  {
    title: 'Online Harassment',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    content: [
      'Set your profiles to private.',
      'Be careful about sharing your location.',
      'Use strong, unique passwords.',
      'Enable Two-Factor Authentication (2FA).',
      'If you feel unsafe, contact local authorities.'
    ]
  },
  {
    title: 'Staying Safe Online',
    icon: Lock,
    color: 'text-teal-500',
    bg: 'bg-teal-50',
    content: [
      'Think before you post. Once it’s online, it’s forever.',
      'Don’t share personal info with strangers.',
      'Be skeptical of "too good to be true" offers.',
      'Keep your software and apps updated.',
      'Trust your gut. If something feels wrong, it probably is.'
    ]
  }
];

export default function SafetyCenter() {
  return (
    <div className="h-full flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Shield className="w-10 h-10 text-indigo-600" />
          Safety Center
        </h2>
        <p className="text-lg opacity-70">Your guide to psychological safety and digital wellbeing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <div key={guide.title} className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl border border-white/40 flex flex-col gap-6 hover:shadow-2xl transition-all">
            <div className={`w-16 h-16 ${guide.bg} rounded-3xl flex items-center justify-center`}>
              <guide.icon className={`w-8 h-8 ${guide.color}`} />
            </div>
            <h3 className="text-2xl font-bold">{guide.title}</h3>
            <ul className="space-y-4">
              {guide.content.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${guide.color} bg-current`} />
                  <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 text-white rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shrink-0">
          <Users className="w-10 h-10" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-xl font-bold">Need immediate help?</h4>
          <p className="opacity-80">If you are in immediate danger or experiencing a crisis, please reach out to professional emergency services or a crisis hotline in your country.</p>
        </div>
        <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold whitespace-nowrap hover:bg-indigo-50 transition-colors shadow-lg">
          Emergency Resources
        </button>
      </div>
    </div>
  );
}
