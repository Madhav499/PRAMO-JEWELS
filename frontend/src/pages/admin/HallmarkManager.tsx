import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Plus } from 'lucide-react';

export const HallmarkManager: React.FC = () => {
  const certificates = [
    { id: 1, huid: 'BIS-HUID-JP-77120', sku: 'PJ-GLD-NCK-01', purity: '22K (916 Gold)', center: 'Jaipur AHC #108', date: '2026-01-15' },
    { id: 2, huid: 'BIS-HUID-HYD-55410', sku: 'PJ-GLD-BNG-02', purity: '22K (916 Gold)', center: 'Hyderabad AHC #042', date: '2026-01-18' },
    { id: 3, huid: 'ASSAY-9999-GLD-1002', sku: 'PJ-COIN-GLD-10G', purity: '24K (999.9 Gold)', center: 'MMTC-PAMP Mint Assayer', date: '2026-01-20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">BIS Hallmark & HUID Database</h1>
          <p className="text-xs text-brand-stone/70">Manage Government HUID certification records and assay reports.</p>
        </div>
        <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Register HUID Certificate
        </Button>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">HUID / Assay Code</th>
              <th className="p-4">Product SKU</th>
              <th className="p-4">Certified Purity</th>
              <th className="p-4">Assaying Centre</th>
              <th className="p-4">Certification Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {certificates.map((c) => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="p-4 font-mono font-bold text-white">{c.huid}</td>
                <td className="p-4 font-mono">{c.sku}</td>
                <td className="p-4">{c.purity}</td>
                <td className="p-4">{c.center}</td>
                <td className="p-4 font-mono">{c.date}</td>
                <td className="p-4"><Badge variant="sage">Verified Genuine</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
