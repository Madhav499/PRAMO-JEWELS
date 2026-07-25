import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { CreditCard, CheckCircle } from 'lucide-react';

export const PaymentLogManager: React.FC = () => {
  const logs = [
    { id: 1, txRef: 'TXN-UPI-8801923', orderNo: 'PJ-ORD-2026-9901', method: 'UPI (PhonePe)', amount: 101372, status: 'Success', timestamp: '2026-07-25 10:30:15' },
    { id: 2, txRef: 'TXN-CARD-991204', orderNo: 'PJ-ORD-2026-9902', method: 'Visa Credit Card', amount: 333625, status: 'Success', timestamp: '2026-07-25 11:15:00' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Payment Logs & Transaction Audit</h1>
        <p className="text-xs text-brand-stone/70">Audit gateway webhooks, UPI authorizations, card settlement logs, and transaction signatures.</p>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Transaction Reference</th>
              <th className="p-4">Order Number</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Gateway Status</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {logs.map((l) => (
              <tr key={l.id} className="hover:bg-white/5">
                <td className="p-4 font-mono font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-brand-gold" /> {l.txRef}
                </td>
                <td className="p-4 font-mono">{l.orderNo}</td>
                <td className="p-4">{l.method}</td>
                <td className="p-4 font-serif font-bold text-brand-gold">₹{l.amount.toLocaleString('en-IN')}</td>
                <td className="p-4"><Badge variant="sage">{l.status}</Badge></td>
                <td className="p-4 font-mono text-brand-stone/70">{l.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
