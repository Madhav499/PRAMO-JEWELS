import React, { useState } from 'react';
import { JewelryCanvas } from './JewelryCanvas';
import { HeroRingModel } from './HeroRingModel';
import { MetalType } from '@/types';

export interface Product3DViewerProps {
  initialMetal?: MetalType;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  initialMetal = '22K_GOLD',
}) => {
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(initialMetal);

  const metals: { type: MetalType; label: string; bg: string }[] = [
    { type: '22K_GOLD', label: '22K Gold', bg: 'bg-[#C7A76C]' },
    { type: '18K_ROSE_GOLD', label: 'Rose Gold', bg: 'bg-[#E8A598]' },
    { type: '950_PLATINUM', label: 'Platinum', bg: 'bg-[#E5E8EC]' },
    { type: '24K_GOLD', label: '24K Gold', bg: 'bg-[#FFD700]' },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <JewelryCanvas height="h-80 md:h-[420px]" enableOrbit={true} autoRotate={true}>
        <HeroRingModel metalType={selectedMetal} />
      </JewelryCanvas>

      {/* Interactive Metal Selector */}
      <div className="flex items-center gap-3 mt-4 p-2 bg-white/80 border border-brand-stone/60 backdrop-blur-md">
        <span className="text-xs uppercase tracking-wider text-brand-slate font-medium mr-2">
          Metal Finish:
        </span>
        {metals.map((m) => (
          <button
            key={m.type}
            onClick={() => setSelectedMetal(m.type)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
              selectedMetal === m.type
                ? 'border-b-2 border-brand-gold text-brand-charcoal font-semibold'
                : 'text-brand-slate hover:text-brand-charcoal'
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-full border border-black/20 ${m.bg}`} />
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};
