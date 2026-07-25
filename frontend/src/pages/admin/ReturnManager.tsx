import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RotateCcw, CheckCircle } from 'lucide-react';

export const ReturnManager: React.FC = () => {
  const returns = [
    { id: 1, returnNo: 'RET-2026-001', orderNo: 'PJ-ORD-2026-9901', customer: 'Maharaja Pramo', reason: 'Size Exchange', valuation: '₹98,420 (100% Value Buyback)', status: 'Approved for Pickup' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Returns & 100% Buyback Management</h1>
        <p className="text-xs text-brand-stone/70">Manage 15-day insured returns, size exchanges, and 100% lifetime value gold buybacks.</p>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Return ID</th>
              <th className="p-4">Order Number</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Valuation Assessment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {returns.map((r) => (
              <tr key={r.id} className="hover:bg-white/5">
                <td className="p-4 font-mono font-bold text-white flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-brand-gold" /> {r.returnNo}
                </td>
                <td className="p-4 font-mono">{r.orderNo}</td>
                <td className="p-4">{r.customer}</td>
                <td className="p-4">{r.reason}</td>
                <td className="p-4 font-serif font-bold text-brand-gold">{r.valuation}</td>
                <td className="p-4"><Badge variant="sage">{r.status}</Badge></td>
                <td className="p-4">
                  <Button size="sm" variant="outline" leftIcon={<CheckCircle className="w-3 h-3" />}>Authorize Buyback</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
