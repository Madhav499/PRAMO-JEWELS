import React from 'react';
import { useCustomerStore } from '@/store/useCustomerStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { User, MapPin, Package, Heart, ShieldCheck } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { addresses, orders, wishlistProductIds } = useCustomerStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* User Header */}
      <div className="p-8 bg-brand-beige/40 border border-brand-stone/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-charcoal flex items-center justify-center font-serif text-2xl font-bold">
            {user?.firstName.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-3xl font-medium text-brand-charcoal">
              Welcome, {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-xs text-brand-slate">{user?.email} • {user?.phone}</p>
          </div>
        </div>

        <Badge variant="gold">Valued Royal Patron</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-brand-charcoal flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-gold" /> Your Orders
          </h2>

          {orders.map((ord) => (
            <Card key={ord.id} className="space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-brand-stone/30 pb-3 text-xs gap-2">
                <div>
                  <span className="text-brand-slate block">Order Number</span>
                  <span className="font-mono font-bold text-brand-charcoal">{ord.orderNumber}</span>
                </div>
                <div>
                  <span className="text-brand-slate block">Date</span>
                  <span className="font-medium">{new Date(ord.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-brand-slate block">Total Amount</span>
                  <span className="font-serif font-bold text-brand-gold-dark">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <Badge variant="sage">{ord.orderStatus}</Badge>
              </div>

              <div className="text-xs text-brand-slate space-y-1">
                <p><strong>Tracking:</strong> {ord.trackingNumber} ({ord.courierName})</p>
                <p><strong>Shipping To:</strong> {ord.shippingAddress.fullName}, {ord.shippingAddress.city}</p>
              </div>

              <div className="pt-2 flex gap-3">
                <Button size="sm" variant="outline" leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}>
                  Download Digital Valuation Certificate (PDF)
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Address Book & Saved Wishlist Overview */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-brand-charcoal flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-gold" /> Saved Addresses
            </h2>

            {addresses.map((addr) => (
              <Card key={addr.id} className="space-y-2 text-xs text-brand-slate">
                <div className="flex justify-between items-center text-brand-charcoal font-semibold">
                  <span>{addr.fullName}</span>
                  {addr.isDefault && <Badge variant="gold">Default</Badge>}
                </div>
                <p>{addr.line1}, {addr.line2}</p>
                <p>{addr.city}, {addr.state} - {addr.postalCode}</p>
                <p>Phone: {addr.phone}</p>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-brand-charcoal flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-gold" /> Wishlist Summary
            </h2>
            <Card className="text-xs text-brand-slate text-center py-6 space-y-2">
              <p>You have <strong>{wishlistProductIds.length}</strong> items saved in your luxury wishlist.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
