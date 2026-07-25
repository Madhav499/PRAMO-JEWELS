import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { TrendingUp, RefreshCw } from 'lucide-react';

export const RateManager: React.FC = () => {
  const { metalRates, updateMetalRates } = useAppStore();

  const [gold24k, setGold24k] = useState(metalRates.gold24k.toString());
  const [gold22k, setGold22k] = useState(metalRates.gold22k.toString());
  const [gold18k, setGold18k] = useState(metalRates.gold18k.toString());
  const [silver999, setSilver999] = useState(metalRates.silver999.toString());

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateMetalRates({
      gold24k: parseFloat(gold24k),
      gold22k: parseFloat(gold22k),
      gold18k: parseFloat(gold18k),
      silver999: parseFloat(silver999),
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Gold & Silver Spot Rate Manager</h1>
        <p className="text-xs text-brand-stone/70">Broadcast live market prices in INR per gram to recalculate product prices in real time.</p>
      </div>

      <form onSubmit={handleUpdate} className="p-6 bg-white/5 border border-brand-stone/20 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-brand-stone block mb-1">24K Pure Gold (999.9 Fine)</label>
            <input
              type="number"
              value={gold24k}
              onChange={(e) => setGold24k(e.target.value)}
              className="w-full p-2.5 bg-black/60 border border-brand-stone/40 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-brand-stone block mb-1">22K Gold (916 BIS Hallmark)</label>
            <input
              type="number"
              value={gold22k}
              onChange={(e) => setGold22k(e.target.value)}
              className="w-full p-2.5 bg-black/60 border border-brand-stone/40 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-brand-stone block mb-1">18K Gold (750)</label>
            <input
              type="number"
              value={gold18k}
              onChange={(e) => setGold18k(e.target.value)}
              className="w-full p-2.5 bg-black/60 border border-brand-stone/40 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-brand-stone block mb-1">999 Fine Silver</label>
            <input
              type="number"
              value={silver999}
              onChange={(e) => setSilver999(e.target.value)}
              className="w-full p-2.5 bg-black/60 border border-brand-stone/40 text-white font-mono"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" size="md" leftIcon={<RefreshCw className="w-4 h-4" />}>
          Broadcast Spot Rates to Storefront
        </Button>
      </form>
    </div>
  );
};
