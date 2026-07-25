import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, CheckCircle, XCircle } from 'lucide-react';

export const ReviewManager: React.FC = () => {
  const reviews = [
    { id: 1, user: 'Maharaja Pramo', product: 'Jaipur Royal 22K Gold Haar', rating: 5, comment: 'Exceptional craftsmanship and genuine BIS HUID verification.', date: '2026-07-20', status: 'Approved' },
    { id: 2, user: 'Devika S.', product: 'Goddess Lakshmi 24K Pure Gold Coin', rating: 5, comment: 'Assayed blister packaging arrived in tamper-proof Blue Dart box.', date: '2026-07-22', status: 'Approved' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Review & Rating Moderation</h1>
        <p className="text-xs text-brand-stone/70">Moderate customer testimonials and verified purchaser feedback.</p>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Jewellery SKU</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Review Text</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {reviews.map((r) => (
              <tr key={r.id} className="hover:bg-white/5">
                <td className="p-4 font-semibold text-white">{r.user}</td>
                <td className="p-4 font-serif">{r.product}</td>
                <td className="p-4 flex items-center text-amber-500 font-bold">{r.rating} <Star className="w-3 h-3 fill-current ml-1" /></td>
                <td className="p-4 max-w-xs truncate">{r.comment}</td>
                <td className="p-4"><Badge variant="sage">{r.status}</Badge></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-1 text-brand-sage hover:text-white"><CheckCircle className="w-4 h-4" /></button>
                    <button className="p-1 text-brand-crimson hover:text-white"><XCircle className="w-4 h-4" /></button>
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
