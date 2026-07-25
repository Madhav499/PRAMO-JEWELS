import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '../ui/Button';
import { X, Trash2, Plus, Minus, Tag, Gift, ShieldCheck, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { isCartOpen, toggleCart, addToast } = useUIStore();
  const {
    items,
    removeItem,
    updateQuantity,
    couponCode,
    applyCoupon,
    removeCoupon,
    isGiftWrapped,
    toggleGiftWrap,
    getSubtotal,
    getMakingChargesTotal,
    getTaxGst,
    getDiscountAmount,
    getTotal,
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(inputCoupon);
    if (res.success) {
      addToast({ type: 'success', title: 'Coupon Applied', message: res.message });
      setInputCoupon('');
    } else {
      addToast({ type: 'error', title: 'Invalid Coupon', message: res.message });
    }
  };

  const handleProceedCheckout = () => {
    toggleCart(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => toggleCart(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-brand-ivory h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-brand-stone/40 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl font-semibold text-brand-charcoal">Your Shopping Bag</h3>
            <span className="text-xs px-2 py-0.5 bg-brand-gold/20 text-brand-gold-dark font-semibold">
              {items.length} Items
            </span>
          </div>
          <button
            onClick={() => toggleCart(false)}
            className="p-1 text-brand-slate hover:text-brand-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <ShoppingBagIcon className="w-16 h-16 text-brand-stone/60 mb-4" />
              <h4 className="font-serif text-lg font-medium text-brand-charcoal mb-1">Your bag is currently empty</h4>
              <p className="text-xs text-brand-slate mb-6">Explore our royal Indian collections to discover masterpiece jewellery.</p>
              <Button onClick={() => toggleCart(false)} variant="primary" size="sm">
                Explore Collections
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b border-brand-stone/30">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover border border-brand-stone/50 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-semibold text-brand-charcoal line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-brand-slate hover:text-brand-crimson transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-brand-slate mt-0.5">
                      {item.selectedMetal} • Size: {item.selectedSize}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-brand-stone text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2 text-brand-slate hover:text-brand-charcoal"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 text-brand-slate hover:text-brand-charcoal"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif text-sm font-bold text-brand-charcoal">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary Section */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-brand-stone/40 space-y-4">
            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-brand-slate absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. ROYAL10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-brand-stone text-brand-charcoal uppercase placeholder:normal-case focus:outline-none focus:border-brand-gold"
                />
              </div>
              <Button type="submit" size="sm" variant="outline">
                Apply
              </Button>
            </form>

            {couponCode && (
              <div className="flex items-center justify-between text-xs bg-brand-gold/10 p-2 text-brand-gold-dark border border-brand-gold/30">
                <span>Code <strong>{couponCode}</strong> Applied</span>
                <button onClick={removeCoupon} className="underline text-[10px]">Remove</button>
              </div>
            )}

            {/* Gift Wrap Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-xs text-brand-slate pt-1">
              <input
                type="checkbox"
                checked={isGiftWrapped}
                onChange={(e) => toggleGiftWrap(e.target.checked)}
                className="accent-brand-gold"
              />
              <Gift className="w-4 h-4 text-brand-gold" />
              <span>Add Royal Insured Gift Packaging (+₹499)</span>
            </label>

            {/* Price Calculations */}
            <div className="space-y-1.5 pt-3 border-t border-brand-stone/30 text-xs">
              <div className="flex justify-between text-brand-slate">
                <span>Subtotal</span>
                <span>₹{getSubtotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-brand-slate">
                <span>Making Charges Total</span>
                <span>₹{getMakingChargesTotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-brand-slate">
                <span>GST (3% Indian Jewellery Tax)</span>
                <span>₹{getTaxGst().toLocaleString('en-IN')}</span>
              </div>
              {getDiscountAmount() > 0 && (
                <div className="flex justify-between text-brand-sage font-medium">
                  <span>Coupon Discount</span>
                  <span>-₹{getDiscountAmount().toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-serif font-bold text-brand-charcoal pt-2 border-t border-brand-stone/40">
                <span>Estimated Total</span>
                <span className="text-brand-gold-dark">₹{getTotal().toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleProceedCheckout}
              variant="primary"
              size="lg"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Insured Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);
