import React from 'react';
import { Card } from '@/components/ui/Card';

export const GemstoneGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold">
          Solitaire & Diamond Encyclopedia
        </span>
        <h1 className="font-serif text-4xl font-medium text-brand-charcoal">
          The 4 Cs of Solitaire Diamonds
        </h1>
        <p className="text-sm text-brand-slate">
          Understand Cut, Color, Clarity, and Carat weight before choosing your diamond masterpiece.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-brand-gold-dark">1. Cut (Brilliance & Fire)</h3>
          <p className="text-xs text-brand-slate leading-relaxed">
            The cut determines how light reflects off diamond facets. Pramo Jewels selects only Excellent and Ideal cut grades for maximum sparkle and scintillation.
          </p>
        </Card>

        <Card className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-brand-gold-dark">2. Color (Purity & Clarity)</h3>
          <p className="text-xs text-brand-slate leading-relaxed">
            Graded on a scale from D (Colorless) to Z. Our solitaire collections utilize exceptional D-F colorless grades set in 18K white/rose gold and 950 platinum.
          </p>
        </Card>

        <Card className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-brand-gold-dark">3. Clarity (Inner Inclusions)</h3>
          <p className="text-xs text-brand-slate leading-relaxed">
            Measures internal microscopic characteristics. We offer VVS1 to VS2 clarity grades certified by IGI and GIA laboratories.
          </p>
        </Card>

        <Card className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-brand-gold-dark">4. Carat (Weight & Scale)</h3>
          <p className="text-xs text-brand-slate leading-relaxed">
            Carat measures diamond weight (1 carat = 200 milligrams). Explore solitaire sizes from 0.5 ct to 5.0 ct in our custom atelier.
          </p>
        </Card>
      </div>
    </div>
  );
};
