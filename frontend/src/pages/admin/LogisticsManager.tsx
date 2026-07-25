import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Truck, Printer } from 'lucide-react';

export const LogisticsManager: React.FC = () => {
  const shipments = [
    { id: 1, awb: 'BLUEDART-AWB-8812903', orderNo: 'PJ-ORD-2026-9901', partner: 'Blue Dart Insured Apex', status: 'In Transit', destination: 'Jaipur' },
    { id: 2, awb: 'BLUEDART-AWB-8812904', orderNo: 'PJ-ORD-2026-9902', partner: 'Blue Dart Insured Apex', status: 'Manifest Generated', destination: 'Mumbai' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Shipping & Logistics Control</h1>
        <p className="text-xs text-brand-stone/70">Manage insured courier dispatches, Airway Bills (AWB), and door-to-door transit tracking.</p>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Airway Bill (AWB)</th>
              <th className="p-4">Order Number</th>
              <th className="p-4">Logistics Partner</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Transit Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {shipments.map((s) => (
              <tr key={s.id} className="hover:bg-white/5">
                <td className="p-4 font-mono font-bold text-white flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-brand-gold" /> {s.awb}
                </td>
                <td className="p-4 font-mono">{s.orderNo}</td>
                <td className="p-4">{s.partner}</td>
                <td className="p-4">{s.destination}</td>
                <td className="p-4"><Badge variant="sage">{s.status}</Badge></td>
                <td className="p-4">
                  <Button size="sm" variant="outline" leftIcon={<Printer className="w-3 h-3" />}>Print AWB</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
