import React from 'react';
import { useCustomerStore } from '@/store/useCustomerStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Printer, Truck } from 'lucide-react';

export const OrderManager: React.FC = () => {
  const { orders } = useCustomerStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Order & Fulfillment Center</h1>
        <p className="text-xs text-brand-stone/70">Manage customer orders, generate Airway Bills (AWB), and track shipments.</p>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Order #</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Airway Bill (AWB)</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono font-bold text-white">{ord.orderNumber}</td>
                <td className="p-4">{ord.shippingAddress.fullName}</td>
                <td className="p-4"><Badge variant="sage">{ord.orderStatus}</Badge></td>
                <td className="p-4 font-serif font-bold text-brand-gold">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                <td className="p-4">{ord.paymentMethod}</td>
                <td className="p-4 font-mono text-[11px]">{ord.trackingNumber || 'N/A'}</td>
                <td className="p-4">
                  <Button size="sm" variant="outline" leftIcon={<Printer className="w-3.5 h-3.5" />}>
                    Print Invoice & AWB
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
