import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus, Tag } from 'lucide-react';

export const CouponManager: React.FC = () => {
  const coupons = [
    { id: 1, code: 'ROYAL10', discount: '10% OFF', category: 'All Gold & Silver', minPurchase: '₹50,000', status: 'Active' },
    { id: 2, code: 'PRAMO5', discount: '5% OFF', category: 'Investment Coins', minPurchase: '₹10,000', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Coupons & Promotional Offers</h1>
          <p className="text-xs text-brand-stone/70">Manage promotional discount codes and minimum purchase thresholds.</p>
        </div>
        <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Create New Coupon
        </Button>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Applicable Scope</th>
              <th className="p-4">Min Purchase</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="p-4 font-mono font-bold text-white flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-brand-gold" /> {c.code}
                </td>
                <td className="p-4 font-bold text-brand-gold">{c.discount}</td>
                <td className="p-4">{c.category}</td>
                <td className="p-4 font-mono">{c.minPurchase}</td>
                <td className="p-4"><Badge variant="sage">{c.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
