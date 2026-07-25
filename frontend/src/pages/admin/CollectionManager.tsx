import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus, Edit3, Sparkles } from 'lucide-react';

export const CollectionManager: React.FC = () => {
  const collections = [
    { id: 1, name: 'Royal Heritage Kundan', category: 'Gold Jewellery', skus: 12, banner: 'Warm Gold Lighting', status: 'Featured' },
    { id: 2, name: 'Silver Heritage Anklets', category: 'Silver Jewellery', skus: 8, banner: 'Cool Metallic Lighting', status: 'Active' },
    { id: 3, name: 'Sovereign Bullion Vault', category: 'Gold & Silver Coins', skus: 15, banner: '3D Rotating Coin Stand', status: 'Featured' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Curated Collection Management</h1>
          <p className="text-xs text-brand-stone/70">Manage exhibition collections, lighting presets, and featured storefront stories.</p>
        </div>
        <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Create New Collection
        </Button>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Collection Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Assigned SKUs</th>
              <th className="p-4">3D Lighting Preset</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {collections.map((col) => (
              <tr key={col.id} className="hover:bg-white/5">
                <td className="p-4 font-serif font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  {col.name}
                </td>
                <td className="p-4">{col.category}</td>
                <td className="p-4 font-mono">{col.skus} SKUs</td>
                <td className="p-4 font-mono">{col.banner}</td>
                <td className="p-4"><Badge variant="gold">{col.status}</Badge></td>
                <td className="p-4"><button className="p-1 hover:text-brand-gold"><Edit3 className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
