import React, { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { TrendingUp, ShoppingBag, Users, AlertTriangle, RefreshCw } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { metrics, setLiveGoldOverride } = useAdminStore();
  const { metalRates, updateMetalRates } = useAppStore();
  const [overrideInput, setOverrideInput] = useState(metalRates.gold22k.toString());

  const handleUpdateRate = (e: React.FormEvent) => {
    e.preventDefault();
    const newRate = parseFloat(overrideInput);
    if (!isNaN(newRate)) {
      updateMetalRates({ gold22k: newRate });
      setLiveGoldOverride(newRate);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Executive Control Dashboard</h1>
        <p className="text-xs text-brand-stone/70">Real-time revenue, order velocity, and live gold pricing parameters.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white/5 border border-brand-stone/20 space-y-2">
          <div className="flex items-center justify-between text-brand-gold">
            <span className="text-xs uppercase tracking-wider">Total Sales Revenue</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="font-serif text-3xl font-bold text-white">
            ₹{metrics.totalRevenue.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="p-6 bg-white/5 border border-brand-stone/20 space-y-2">
          <div className="flex items-center justify-between text-brand-gold">
            <span className="text-xs uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="font-serif text-3xl font-bold text-white">{metrics.totalOrders}</span>
        </div>

        <div className="p-6 bg-white/5 border border-brand-stone/20 space-y-2">
          <div className="flex items-center justify-between text-brand-gold">
            <span className="text-xs uppercase tracking-wider">Active Customers</span>
            <Users className="w-5 h-5" />
          </div>
          <span className="font-serif text-3xl font-bold text-white">{metrics.activeCustomers}</span>
        </div>

        <div className="p-6 bg-white/5 border border-brand-stone/20 space-y-2">
          <div className="flex items-center justify-between text-brand-amber">
            <span className="text-xs uppercase tracking-wider">Inventory Warnings</span>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <span className="font-serif text-3xl font-bold text-white">{metrics.inventoryAlerts} SKUs</span>
        </div>
      </div>

      {/* Live Metal Override Section */}
      <div className="p-6 bg-white/5 border border-brand-stone/20 space-y-4 max-w-xl">
        <h3 className="font-serif text-xl font-semibold text-white flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-brand-gold" /> Live 22K Gold Market Rate Override
        </h3>
        <p className="text-xs text-brand-stone/70">
          Updating this value dynamically adjusts prices across all 22K Gold products on the storefront in real time.
        </p>

        <form onSubmit={handleUpdateRate} className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-xs text-brand-stone">₹/g:</span>
            <input
              type="number"
              value={overrideInput}
              onChange={(e) => setOverrideInput(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-black/60 border border-brand-stone/40 text-white text-xs font-mono focus:outline-none focus:border-brand-gold"
            />
          </div>
          <Button type="submit" size="sm" variant="primary">
            Broadcast Rate
          </Button>
        </form>
      </div>
    </div>
  );
};
