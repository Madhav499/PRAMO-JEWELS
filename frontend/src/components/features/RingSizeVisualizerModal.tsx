import React, { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Modal } from '../ui/Modal';
import { Ruler } from 'lucide-react';

export const RingSizeVisualizerModal: React.FC = () => {
  const { isRingSizeVisualizerOpen, toggleRingSizeVisualizer } = useUIStore();
  const [sizeIndex, setSizeIndex] = useState(3); // Default size 7

  if (!isRingSizeVisualizerOpen) return null;

  const sizes = [
    { num: '4', mm: '14.9 mm', circ: '46.8 mm' },
    { num: '5', mm: '15.7 mm', circ: '49.3 mm' },
    { num: '6', mm: '16.5 mm', circ: '51.8 mm' },
    { num: '7', mm: '17.3 mm', circ: '54.4 mm (Standard Indian Female)' },
    { num: '8', mm: '18.1 mm', circ: '56.9 mm' },
    { num: '9', mm: '18.9 mm', circ: '59.5 mm (Standard Indian Male)' },
    { num: '10', mm: '19.8 mm', circ: '62.1 mm' },
  ];

  const current = sizes[sizeIndex];

  return (
    <Modal
      isOpen={isRingSizeVisualizerOpen}
      onClose={() => toggleRingSizeVisualizer(false)}
      title="Interactive Ring Size Visualizer"
      maxWidth="lg"
    >
      <div className="space-y-6 text-center">
        <p className="text-xs text-brand-slate">
          Adjust the slider or place an existing ring against your device screen to match the exact inner diameter.
        </p>

        {/* Dynamic Scale Ring Circle */}
        <div className="py-8 flex flex-col items-center justify-center">
          <div
            className="rounded-full border-4 border-brand-gold bg-brand-ivory shadow-gold-glow flex items-center justify-center transition-all duration-300"
            style={{
              width: `${120 + sizeIndex * 14}px`,
              height: `${120 + sizeIndex * 14}px`,
            }}
          >
            <div className="text-center">
              <span className="font-serif text-2xl font-bold text-brand-charcoal">Size {current.num}</span>
              <span className="block text-[10px] text-brand-slate uppercase font-mono">{current.mm}</span>
            </div>
          </div>
        </div>

        {/* Size Slider */}
        <div className="space-y-2 max-w-xs mx-auto">
          <input
            type="range"
            min="0"
            max={sizes.length - 1}
            value={sizeIndex}
            onChange={(e) => setSizeIndex(parseInt(e.target.value))}
            className="w-full accent-brand-gold cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-brand-slate">
            <span>Size 4</span>
            <span>Size 7</span>
            <span>Size 10</span>
          </div>
        </div>

        {/* Measurement Spec */}
        <div className="p-4 bg-brand-beige/50 border border-brand-stone/40 text-xs text-brand-charcoal flex justify-around">
          <div>
            <span className="text-brand-slate block text-[10px] uppercase">Inner Diameter</span>
            <strong className="font-serif text-sm">{current.mm}</strong>
          </div>
          <div>
            <span className="text-brand-slate block text-[10px] uppercase">Circumference</span>
            <strong className="font-serif text-sm">{current.circ}</strong>
          </div>
        </div>
      </div>
    </Modal>
  );
};
