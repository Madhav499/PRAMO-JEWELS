import React from 'react';
import { Flame, Hammer, Sparkles, ShieldCheck } from 'lucide-react';

export const CraftsmanshipShowcase: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: '999.9 Fine Metal Refining',
      desc: 'Sovereign pure 24K Gold and 999 Fine Silver bullion bars are induction-refined to guaranteed purity standards.',
      icon: Flame,
    },
    {
      num: '02',
      title: 'Master Karigar Hand Forging',
      desc: 'Heritage artisan goldsmiths across Jaipur and Hyderabad hand-forge raw precious metals into royal proportions.',
      icon: Hammer,
    },
    {
      num: '03',
      title: 'Precision Filigree Engraving',
      desc: 'Intricate Meenakari and lotus geometry filigree line work is hand-engraved onto every piece with micro precision.',
      icon: Sparkles,
    },
    {
      num: '04',
      title: 'BIS HUID Laser Hallmarking',
      desc: 'Every completed creation is laser-etched with an official 6-digit Government HUID code for lifetime assurance.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-brand-charcoal text-brand-ivory py-20 border-y border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            Raw Precious Metal to Masterpiece
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-white">
            The Craftsmanship Journey
          </h2>
          <p className="text-xs md:text-sm text-brand-stone/80 leading-relaxed font-sans">
            Experience how Pramo Jewels transforms raw 24K Gold and 999 Fine Silver into museum-grade heirloom jewellery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 bg-white/5 border border-brand-stone/20 hover:border-brand-gold/60 transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-brand-gold">{step.num}</span>
                  <Icon className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-serif text-xl font-medium text-white group-hover:text-brand-gold transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-brand-stone/70 leading-relaxed font-sans">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
