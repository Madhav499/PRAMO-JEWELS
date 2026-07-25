import React from 'react';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export const GoldPurityGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold">
          Educational Knowledge Base
        </span>
        <h1 className="font-serif text-4xl font-medium text-brand-charcoal">
          Understanding Gold Purity & BIS Hallmarking
        </h1>
        <p className="text-sm text-brand-slate">
          A comprehensive buying guide to gold karats, purity percentages, and Government HUID verification.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-brand-charcoal">
            1. What is a Karat (K)?
          </h2>
          <p className="text-xs text-brand-slate leading-relaxed">
            Karat measures the ratio of pure gold to other metal alloys (such as copper, silver, or zinc) added to impart structural durability for jewellery making. Pure gold is 24 Karat (99.9% pure).
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-brand-gold-dark">24K Gold (999)</h3>
            <p className="text-xs text-brand-slate">99.9% Pure Gold. Ideal for investment bullion coins, gold bars, and sovereign wealth preservation.</p>
          </Card>
          <Card className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-brand-gold-dark">22K Gold (916)</h3>
            <p className="text-xs text-brand-slate">91.6% Pure Gold. The gold standard for royal Indian heritage jewellery, Kundan, and bridal necklaces.</p>
          </Card>
          <Card className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-brand-gold-dark">18K Gold (750)</h3>
            <p className="text-xs text-brand-slate">75.0% Pure Gold. Perfect strength for setting solitaire diamonds, gemstones, and modern daily wear.</p>
          </Card>
        </div>

        <Card className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-brand-charcoal flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-gold" /> 2. What is BIS HUID Hallmarking?
          </h2>
          <p className="text-xs text-brand-slate leading-relaxed">
            HUID stands for Hallmark Unique Identification. Every piece of gold jewellery at Pramo Jewels is laser-stamped with a unique 6-digit alphanumeric code assigned by the Bureau of Indian Standards (BIS).
          </p>
        </Card>
      </div>
    </div>
  );
};
