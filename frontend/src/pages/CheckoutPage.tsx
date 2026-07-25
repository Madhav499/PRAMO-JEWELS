import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { useCustomerStore } from '@/store/useCustomerStore';
import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, CreditCard, QrCode, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getMakingChargesTotal, getTaxGst, getDiscountAmount, getTotal, clearCart } = useCartStore();
  const { addresses } = useCustomerStore();
  const { addToast } = useUIStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPayment, setSelectedPayment] = useState<'UPI' | 'CARD' | 'COD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleteNumber, setOrderCompleteNumber] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState(addresses[0]?.fullName || 'Maharaja Pramo');
  const [phone, setPhone] = useState(addresses[0]?.phone || '+91 98765 43210');
  const [line1, setLine1] = useState(addresses[0]?.line1 || 'Palace Estate, 108 Royal Avenue');
  const [city, setCity] = useState(addresses[0]?.city || 'Jaipur');
  const [state, setState] = useState(addresses[0]?.state || 'Rajasthan');
  const [postalCode, setPostalCode] = useState(addresses[0]?.postalCode || '302006');

  if (orderCompleteNumber) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-brand-sage/20 border-2 border-brand-sage rounded-full flex items-center justify-center mx-auto text-brand-sage animate-in zoom-in duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="font-serif text-4xl font-semibold text-brand-charcoal">
          Order Successfully Placed & Insured
        </h1>
        <p className="text-sm text-brand-slate max-w-lg mx-auto">
          Thank you for choosing Pramo Jewels. Your royal order <strong>#{orderCompleteNumber}</strong> is currently being assembled with insured tamper-proof packaging.
        </p>

        <div className="p-6 bg-brand-beige/30 border border-brand-stone/40 text-left max-w-md mx-auto space-y-2 text-xs text-brand-charcoal">
          <div className="flex justify-between">
            <span className="text-brand-slate">Order Number:</span>
            <span className="font-mono font-bold">{orderCompleteNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-slate">Estimated Delivery:</span>
            <span className="font-semibold text-brand-sage">2 Business Days via Blue Dart Apex</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-slate">Payment Mode:</span>
            <span className="font-semibold">{selectedPayment}</span>
          </div>
          <div className="flex justify-between border-t border-brand-stone/30 pt-2 font-serif text-sm font-bold">
            <span>Total Amount Paid:</span>
            <span className="text-brand-gold-dark">₹{getTotal().toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link to="/customer">
            <Button variant="primary" size="md">
              View Order in Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="md">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderNo = `PJ-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderCompleteNumber(generatedOrderNo);
      clearCart();
      addToast({ type: 'success', title: 'Order Confirmed', message: `Order #${generatedOrderNo} created.` });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold">
          100% Insured Checkout
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-brand-charcoal">
          Pramo Jewels Secure Checkout
        </h1>
      </div>

      {/* Stepper Navigation */}
      <div className="flex items-center justify-center gap-4 max-w-md mx-auto text-xs font-semibold uppercase tracking-wider">
        <span className={`px-3 py-1 border ${step === 1 ? 'bg-brand-gold text-brand-charcoal border-brand-gold' : 'text-brand-slate border-brand-stone'}`}>
          1. Address
        </span>
        <span className="text-brand-stone">──────</span>
        <span className={`px-3 py-1 border ${step === 2 ? 'bg-brand-gold text-brand-charcoal border-brand-gold' : 'text-brand-slate border-brand-stone'}`}>
          2. Payment
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Step 1 & Step 2 Forms */}
        <div className="lg:col-span-2 space-y-8">
          {step === 1 && (
            <Card className="space-y-6">
              <h3 className="font-serif text-xl font-semibold text-brand-charcoal border-b border-brand-stone/40 pb-3">
                Insured Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <Input label="Mobile Phone (For OTP & Tracking)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <div className="sm:col-span-2">
                  <Input label="Street Address / Building" value={line1} onChange={(e) => setLine1(e.target.value)} />
                </div>
                <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <Input label="State" value={state} onChange={(e) => setState(e.target.value)} />
                <Input label="PIN Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              </div>

              <Button onClick={() => setStep(2)} variant="primary" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue to Secure Payment
              </Button>
            </Card>
          )}

          {step === 2 && (
            <Card className="space-y-6">
              <h3 className="font-serif text-xl font-semibold text-brand-charcoal border-b border-brand-stone/40 pb-3">
                Select Payment Method
              </h3>

              <div className="space-y-3">
                {/* UPI Instant */}
                <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${selectedPayment === 'UPI' ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-stone'}`}>
                  <input type="radio" name="payment" checked={selectedPayment === 'UPI'} onChange={() => setSelectedPayment('UPI')} className="accent-brand-gold" />
                  <QrCode className="w-6 h-6 text-brand-gold" />
                  <div>
                    <span className="font-serif text-sm font-semibold text-brand-charcoal block">Instant UPI (GPay / PhonePe / Paytm)</span>
                    <span className="text-xs text-brand-slate">Zero transaction fees • Instant verification</span>
                  </div>
                </label>

                {/* Credit/Debit Card */}
                <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${selectedPayment === 'CARD' ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-stone'}`}>
                  <input type="radio" name="payment" checked={selectedPayment === 'CARD'} onChange={() => setSelectedPayment('CARD')} className="accent-brand-gold" />
                  <CreditCard className="w-6 h-6 text-brand-gold" />
                  <div>
                    <span className="font-serif text-sm font-semibold text-brand-charcoal block">Credit / Debit Card (Visa / Mastercard / Amex)</span>
                    <span className="text-xs text-brand-slate">256-bit encrypted SSL checkout</span>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${selectedPayment === 'COD' ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-stone'}`}>
                  <input type="radio" name="payment" checked={selectedPayment === 'COD'} onChange={() => setSelectedPayment('COD')} className="accent-brand-gold" />
                  <Truck className="w-6 h-6 text-brand-gold" />
                  <div>
                    <span className="font-serif text-sm font-semibold text-brand-charcoal block">Insured Cash on Delivery (COD)</span>
                    <span className="text-xs text-brand-slate">OTP verification required upon arrival</span>
                  </div>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={() => setStep(1)} variant="outline" size="lg">Back to Address</Button>
                <Button onClick={handlePlaceOrder} isLoading={isProcessing} variant="primary" size="lg" className="flex-1">
                  Authorize & Place Order (₹{getTotal().toLocaleString('en-IN')})
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Right Summary Column */}
        <div className="bg-white border border-brand-stone/60 p-6 space-y-6">
          <h3 className="font-serif text-lg font-semibold text-brand-charcoal pb-3 border-b border-brand-stone/40">
            Order Summary ({items.length} Items)
          </h3>

          <div className="space-y-4 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs">
                <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover border" />
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-brand-charcoal line-clamp-1">{item.product.name}</h4>
                  <p className="text-brand-slate">Qty: {item.quantity} • {item.selectedMetal}</p>
                </div>
                <span className="font-serif font-bold text-brand-charcoal">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-brand-stone/40 text-xs">
            <div className="flex justify-between text-brand-slate"><span>Subtotal</span><span>₹{getSubtotal().toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-brand-slate"><span>Making Charges</span><span>₹{getMakingChargesTotal().toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-brand-slate"><span>GST (3%)</span><span>₹{getTaxGst().toLocaleString('en-IN')}</span></div>
            {getDiscountAmount() > 0 && <div className="flex justify-between text-brand-sage font-semibold"><span>Discount</span><span>-₹{getDiscountAmount().toLocaleString('en-IN')}</span></div>}
            <div className="flex justify-between text-base font-serif font-bold text-brand-charcoal pt-3 border-t border-brand-stone/40">
              <span>Total Payable</span>
              <span className="text-brand-gold-dark">₹{getTotal().toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
