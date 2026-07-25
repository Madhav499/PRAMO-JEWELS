import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

export const CustomerManager: React.FC = () => {
  const patrons = [
    { id: 'usr_01', name: 'Maharaja Pramo', email: 'admin@pramojewels.com', phone: '+91 98765 43210', city: 'Jaipur', tier: 'Royal Patron', totalSpend: 825000 },
    { id: 'usr_02', name: 'Rajkumari Devika', email: 'devika@royalestate.in', phone: '+91 98111 22334', city: 'Mumbai', tier: 'Gold Tier', totalSpend: 420000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Patron & Customer Management</h1>
        <p className="text-xs text-brand-stone/70">Manage VIP customer profiles, total bullion investment, and salon appointment histories.</p>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Patron Name</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">City</th>
              <th className="p-4">Patron Tier</th>
              <th className="p-4">Total Portfolio Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {patrons.map((p) => (
              <tr key={p.id} className="hover:bg-white/5">
                <td className="p-4 font-serif font-bold text-white">{p.name}</td>
                <td className="p-4 space-y-0.5">
                  <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-brand-gold" /> {p.email}</div>
                  <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-brand-stone/60" /> {p.phone}</div>
                </td>
                <td className="p-4">{p.city}</td>
                <td className="p-4"><Badge variant="gold">{p.tier}</Badge></td>
                <td className="p-4 font-serif font-bold text-brand-gold">₹{p.totalSpend.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
