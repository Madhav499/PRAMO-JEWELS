import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus, Edit3 } from 'lucide-react';

export const CategoryManager: React.FC = () => {
  const categories = [
    { id: 1, name: 'Gold Jewellery', type: 'Jewellery', count: 24, status: 'Active' },
    { id: 2, name: 'Silver Jewellery', type: 'Jewellery', count: 18, status: 'Active' },
    { id: 3, name: 'Gold Coins & Bullion', type: 'Investment Bullion', count: 12, status: 'Active' },
    { id: 4, name: 'Silver Coins & Bars', type: 'Investment Bullion', count: 15, status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Category Management</h1>
          <p className="text-xs text-brand-stone/70">Manage Precious Metal Jewellery and Bullion category hierarchies.</p>
        </div>
        <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Add Category
        </Button>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Category Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Active SKUs</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="p-4 font-serif font-bold text-white">{c.name}</td>
                <td className="p-4">{c.type}</td>
                <td className="p-4 font-mono">{c.count} SKUs</td>
                <td className="p-4"><Badge variant="sage">{c.status}</Badge></td>
                <td className="p-4"><button className="p-1 hover:text-brand-gold"><Edit3 className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
