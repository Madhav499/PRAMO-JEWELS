import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export const LiveMetalRateTicker: React.FC = () => {
  const { metalRates } = useAppStore();

  return (
    <div className="bg-brand-charcoal text-brand-ivory text-[11px] py-1.5 px-4 border-b border-brand-stone/20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Live Rates */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
          <span className="flex items-center gap-1 text-brand-gold font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3 h-3 text-brand-gold" />
            Live Metal Rates (INR/g):
          </span>
          <span>24K Gold: <strong className="text-white">₹{metalRates.gold24k.toLocaleString('en-IN')}</strong></span>
          <span className="text-brand-stone/40">|</span>
          <span>22K Gold: <strong className="text-white">₹{metalRates.gold22k.toLocaleString('en-IN')}</strong></span>
          <span className="text-brand-stone/40">|</span>
          <span>18K Gold: <strong className="text-white">₹{metalRates.gold18k.toLocaleString('en-IN')}</strong></span>
          <span className="text-brand-stone/40">|</span>
          <span>Platinum: <strong className="text-white">₹{metalRates.platinum.toLocaleString('en-IN')}</strong></span>
          <span className="text-brand-stone/40">|</span>
          <span>999 Silver: <strong className="text-white">₹{metalRates.silver999.toLocaleString('en-IN')}</strong></span>
        </div>

        {/* Right: Trust Badge */}
        <div className="hidden lg:flex items-center gap-2 text-brand-stone/80 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
          <span>100% BIS Hallmarked & Insured Pan-India Express Delivery</span>
        </div>
      </div>
    </div>
  );
};
