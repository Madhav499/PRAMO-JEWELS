import React, { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit3, Trash2 } from 'lucide-react';

export const ProductManager: React.FC = () => {
  const { products } = useProductStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Product Catalog Management</h1>
          <p className="text-xs text-brand-stone/70">Manage SKUs, metal weights, making charges, and WebGL assets.</p>
        </div>
        <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Add New Jewellery SKU
        </Button>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">SKU & Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Metal / Purity</th>
              <th className="p-4">Weight (g)</th>
              <th className="p-4">Making Charge</th>
              <th className="p-4">Total Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {products.map((prod) => (
              <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 object-cover border border-brand-stone/30" />
                    <div>
                      <span className="font-serif font-semibold text-white block">{prod.name}</span>
                      <span className="font-mono text-[10px] text-brand-stone/60">{prod.sku}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">{prod.category}</td>
                <td className="p-4">{prod.purity}</td>
                <td className="p-4 font-mono">{prod.metalWeightGram}g</td>
                <td className="p-4 font-mono">₹{prod.makingChargePerGram}/g</td>
                <td className="p-4 font-serif font-bold text-brand-gold">₹{prod.price.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <Badge variant="sage">{prod.stockQuantity} in stock</Badge>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:text-brand-gold"><Edit3 className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-brand-crimson"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
