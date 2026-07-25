import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { useCustomerStore } from '@/store/useCustomerStore';
import { useUIStore } from '@/store/useUIStore';
import { Product3DViewer } from '@/components/3d/Product3DViewer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MetalType } from '@/types';
import { ShieldCheck, Heart, Truck, RotateCcw, Ruler, Box, CheckCircle2, Star, Share2 } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProductStore();
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useCustomerStore();
  const { addToast, toggleCart, toggleHallmarkVerifier, toggleRingSizeVisualizer } = useUIStore();

  const product = products.find((p) => p.id === id) || products[0];

  const [activeTab, setActiveTab] = useState<'3D' | 'IMAGE'>('3D');
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product.metalType);
  const [selectedSize, setSelectedSize] = useState('7 (Standard)');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);

  const isWishlisted = isInWishlist(product.id);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryStatus('Insured Express Delivery Available by Tomorrow (Blue Dart Apex)');
    } else {
      setDeliveryStatus('Please enter a valid 6-digit Indian PIN Code.');
    }
  };

  const handleAddToCart = () => {
    addItem(product, selectedMetal, 1, selectedSize);
    addToast({ type: 'success', title: 'Added to Cart', message: `${product.name} added.` });
    toggleCart(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Breadcrumbs */}
      <nav className="text-xs text-brand-slate uppercase tracking-wider flex items-center gap-2">
        <Link to="/" className="hover:text-brand-gold">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-brand-gold">Catalog</Link>
        <span>/</span>
        <span className="text-brand-charcoal font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: 3D WebGL Viewer & High-Res Image Gallery */}
        <div className="space-y-4">
          <div className="flex border-b border-brand-stone/40 text-xs uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('3D')}
              aria-label="Switch to 3D WebGL Inspector tab"
              className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                activeTab === '3D' ? 'border-brand-gold text-brand-charcoal' : 'border-transparent text-brand-slate'
              }`}
            >
              Interactive 3D Inspector
            </button>
            <button
              onClick={() => setActiveTab('IMAGE')}
              aria-label="Switch to High-Res Studio Gallery tab"
              className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                activeTab === 'IMAGE' ? 'border-brand-gold text-brand-charcoal' : 'border-transparent text-brand-slate'
              }`}
            >
              High-Res Studio Gallery
            </button>
          </div>

          <div className="bg-white border border-brand-stone/60 p-4 min-h-[460px] flex items-center justify-center relative">
            {activeTab === '3D' ? (
              <Product3DViewer initialMetal={selectedMetal} />
            ) : (
              <img
                src={product.images[0]}
                alt={product.name}
                className="max-h-[420px] w-auto object-contain"
              />
            )}
          </div>
        </div>

        {/* Right: Product Details & Buying Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="gold">{product.purity}</Badge>
              {product.huidVerified && <Badge variant="sage">BIS Hallmarked</Badge>}
              <Badge variant="stone">{product.certificateType} Certified</Badge>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-medium text-brand-charcoal leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-2 text-xs text-brand-slate">
              <div className="flex items-center text-amber-600">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold text-brand-charcoal ml-1">{product.rating}</span>
              </div>
              <span>• {product.reviewCount} Reviews</span>
              <span>• SKU: {product.sku}</span>
            </div>
          </div>

          {/* Pricing Box & Transparent Breakdown */}
          <div className="p-6 bg-brand-beige/30 border border-brand-stone/50 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-brand-slate block uppercase">Total Inclusive Price (3% GST)</span>
                <span className="font-serif text-3xl font-bold text-brand-gold-dark">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs text-brand-sage font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> In Stock & Ready to Ship
              </span>
            </div>

            {/* Transparent Weight & Making Breakdown */}
            <div className="pt-3 border-t border-brand-stone/30 grid grid-cols-3 gap-2 text-[11px] text-brand-slate">
              <div>
                <span className="block text-brand-slate/70">Gross Metal Wt.</span>
                <strong className="text-brand-charcoal">{product.metalWeightGram} grams</strong>
              </div>
              <div>
                <span className="block text-brand-slate/70">Making Charge</span>
                <strong className="text-brand-charcoal">₹{product.makingChargePerGram}/g</strong>
              </div>
              <div>
                <span className="block text-brand-slate/70">Certified Purity</span>
                <strong className="text-brand-charcoal">{product.purity}</strong>
              </div>
            </div>
          </div>

          {/* Size Selector & Visualizer Trigger */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="uppercase tracking-wider text-brand-slate font-medium">Select Size:</label>
              <button
                onClick={() => toggleRingSizeVisualizer(true)}
                className="text-brand-gold-dark hover:underline flex items-center gap-1 font-medium"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Visualizer
              </button>
            </div>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-3 bg-white border border-brand-stone text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold"
            >
              <option value="6">Size 6 (16.5 mm)</option>
              <option value="7 (Standard)">Size 7 (17.3 mm Standard Female)</option>
              <option value="8">Size 8 (18.1 mm)</option>
              <option value="9">Size 9 (18.9 mm Standard Male)</option>
            </select>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              className="flex-1"
            >
              Add to Shopping Bag
            </Button>

            <button
              onClick={() => {
                toggleWishlist(product.id);
                addToast({
                  type: 'info',
                  title: isWishlisted ? 'Removed' : 'Wishlisted',
                  message: isWishlisted ? 'Removed from saved wishlist' : 'Saved to your wishlist',
                });
              }}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`p-4 border transition-colors ${
                isWishlisted
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-brand-stone text-brand-slate hover:border-brand-gold'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Pincode Estimator */}
          <form onSubmit={handleCheckPincode} className="p-4 bg-white border border-brand-stone/40 space-y-2">
            <label className="text-xs uppercase tracking-wider text-brand-slate font-medium block">
              Pincode Delivery Estimator:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-3 py-2 border border-brand-stone text-xs focus:outline-none focus:border-brand-gold"
              />
              <Button type="submit" size="sm" variant="outline">
                Check
              </Button>
            </div>
            {deliveryStatus && <p className="text-xs text-brand-sage font-medium">{deliveryStatus}</p>}
          </form>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-stone/30 text-xs text-brand-slate">
            <button
              onClick={() => toggleHallmarkVerifier(true)}
              className="flex items-center gap-2 hover:text-brand-gold text-left"
            >
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
              <span>Verify HUID Hallmark Certificate</span>
            </button>

            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-brand-gold shrink-0" />
              <span>15-Day Insured Return & Buyback</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
