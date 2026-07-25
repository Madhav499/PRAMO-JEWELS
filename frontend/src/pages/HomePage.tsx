import React from 'react';
import { Link } from 'react-router-dom';
import { JewelryCanvas } from '@/components/3d/JewelryCanvas';
import { HeroRingModel } from '@/components/3d/HeroRingModel';
import { Coin3DViewer } from '@/components/3d/Coin3DViewer';
import { CraftsmanshipShowcase } from '@/components/features/CraftsmanshipShowcase';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { ArrowRight, ShieldCheck, Sparkles, Star, ChevronRight, Award, Truck, Coins, Mail } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products } = useProductStore();
  const { addItem } = useCartStore();
  const { addToast, toggleCart } = useUIStore();

  const goldJewellery = products.filter((p) => p.category === 'GOLD_JEWELLERY');
  const silverJewellery = products.filter((p) => p.category === 'SILVER_JEWELLERY');
  const coins = products.filter((p) => p.category === 'GOLD_COINS' || p.category === 'SILVER_COINS');

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Arrival Milestone: Hero Narrative & Dual 3D Gold/Silver Canvas */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pt-8">
        <div className="w-full lg:w-1/2 space-y-6 z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pramo Jewels • Pure Gold & Silver House</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-brand-charcoal leading-[1.1]">
            Pure Gold & Silver <br />
            <span className="gold-shimmer italic font-serif">Haute Joaillerie.</span>
          </h1>

          <p className="text-sm md:text-base text-brand-slate max-w-xl leading-relaxed font-sans font-normal">
            Step inside our virtual gallery. Explore 22K BIS Hallmarked Gold Jewellery, 999 Fine Silver Ornaments, and 24K Assayed Investment Coins handcrafted for royal elegance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link to="/catalog">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Gold & Silver Vault
              </Button>
            </Link>
            <Link to="/gold-purity-guide">
              <Button size="lg" variant="outline">
                HUID & Purity Guide
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-stone/40 text-left">
            <div>
              <span className="font-serif text-2xl font-bold text-brand-charcoal">22K / 24K</span>
              <span className="block text-[11px] text-brand-slate uppercase font-medium">BIS Hallmarked Gold</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-brand-charcoal">999 Fine</span>
              <span className="block text-[11px] text-brand-slate uppercase font-medium">Pure Silver Bullion</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-brand-charcoal">Insured</span>
              <span className="block text-[11px] text-brand-slate uppercase font-medium">Pan-India Delivery</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[450px] sm:h-[550px] relative">
          <JewelryCanvas height="h-full" enableOrbit={true} autoRotate={true}>
            <HeroRingModel />
          </JewelryCanvas>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-1.5 border border-brand-stone/60 text-[11px] text-brand-slate uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
            22K Royal Gold Signet • Drag to Rotate
          </div>
        </div>
      </section>

      {/* 2. Brand Legacy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 bg-brand-beige/30 border border-brand-stone/50 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold-dark font-semibold">
              Est. 1984 • Four Decades of Trust
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-charcoal">
              A Legacy Built on Pure Precious Metals
            </h2>
            <p className="text-xs md:text-sm text-brand-slate leading-relaxed">
              Founded on unyielding integrity, Pramo Jewels has served over four decades as the trusted custodian for royal families, gold investors, and wedding buyers across India. We strictly deal in 100% hallmarked gold and 999 fine silver.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-6 bg-white border border-brand-stone/40">
              <span className="font-serif text-3xl font-bold text-brand-gold-dark block">40+ Years</span>
              <span className="text-[11px] text-brand-slate uppercase font-medium">Precious Metal Heritage</span>
            </div>
            <div className="p-6 bg-white border border-brand-stone/40">
              <span className="font-serif text-3xl font-bold text-brand-gold-dark block">100k+</span>
              <span className="text-[11px] text-brand-slate uppercase font-medium">Hallmarked Creations</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Gold & Silver Craftsmanship Journey */}
      <CraftsmanshipShowcase />

      {/* 4. Jewellery Collections (Gold & Silver Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-charcoal mt-1">
              Gold & Silver Jewellery
            </h2>
          </div>
          <Link to="/catalog">
            <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
              View All Jewellery
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...goldJewellery, ...silverJewellery].map((product) => (
            <Card key={product.id} className="flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden bg-brand-beige/20 border border-brand-stone/40">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <Badge variant="gold">{product.purity}</Badge>
                    {product.huidVerified && <Badge variant="sage">BIS Hallmarked</Badge>}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-600 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-medium text-brand-charcoal">{product.rating}</span>
                    <span className="text-brand-slate">({product.reviewCount})</span>
                  </div>

                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-serif text-lg font-semibold text-brand-charcoal group-hover:text-brand-gold transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-brand-slate line-clamp-2">{product.description}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-stone/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-brand-slate uppercase block">Price incl. GST</span>
                  <span className="font-serif text-xl font-bold text-brand-gold-dark">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    addItem(product, product.metalType);
                    addToast({ type: 'success', title: 'Added to Bag', message: `${product.name} added.` });
                    toggleCart(true);
                  }}
                >
                  Add to Bag
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Investment Coins Showcase (Gold & Silver Coins) */}
      <section className="bg-brand-beige/40 py-20 border-y border-brand-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold flex items-center justify-center gap-1.5">
              <Coins className="w-4 h-4 text-brand-gold" /> Assayed Investment Bullion
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-charcoal">
              24K Pure Gold & 999 Silver Coins
            </h2>
            <p className="text-xs text-brand-slate">
              Minted with 999.9 fine purity and tamper-proof blister card packaging for wealth protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* 3D Coin Viewer Canvas */}
            <div className="bg-white p-6 border border-brand-stone/60 shadow-luxury">
              <Coin3DViewer metalType="24K_GOLD" weightLabel="10 Grams 24K 999.9 Fine Gold" />
            </div>

            {/* Coin Product Cards */}
            <div className="space-y-6">
              {coins.map((coin) => (
                <Card key={coin.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-4">
                    <img src={coin.images[0]} alt={coin.name} className="w-20 h-20 object-cover border" />
                    <div>
                      <Badge variant="gold">{coin.purity}</Badge>
                      <h3 className="font-serif text-lg font-semibold text-brand-charcoal mt-1">{coin.name}</h3>
                      <p className="text-xs text-brand-slate">{coin.metalWeightGram}g • Assayed Blister Card</p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="font-serif text-xl font-bold text-brand-gold-dark">
                      ₹{coin.price.toLocaleString('en-IN')}
                    </span>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        addItem(coin, coin.metalType);
                        addToast({ type: 'success', title: 'Added to Bag', message: `${coin.name} added.` });
                        toggleCart(true);
                      }}
                    >
                      Buy Bullion
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Trust & Certification Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-white border border-brand-stone/60 text-center space-y-6">
          <ShieldCheck className="w-12 h-12 text-brand-gold mx-auto" />
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl font-semibold text-brand-charcoal">
              Government HUID & Assay Certificate Guarantee
            </h3>
            <p className="text-xs text-brand-slate leading-relaxed">
              Every purchase at Pramo Jewels is backed by a 6-digit HUID code issued by the Bureau of Indian Standards (BIS) and an official Assay certificate verifying exact metal weight and purity.
            </p>
          </div>
          <Link to="/gold-purity-guide">
            <Button variant="outline" size="sm">
              Verify HUID Code Online
            </Button>
          </Link>
        </div>
      </section>

      {/* 7. Contact / Salon Inquiry Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold">
          Private Boutique Consultation
        </span>
        <h2 className="font-serif text-3xl font-medium text-brand-charcoal">
          Schedule an Appointment at Our Salon
        </h2>
        <p className="text-xs text-brand-slate max-w-lg mx-auto">
          Visit our private salons in Mumbai, Delhi, Jaipur, Hyderabad, or Bengaluru for personal jewellery consultation and bullion investment.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); addToast({ type: 'success', title: 'Inquiry Sent', message: 'Our royal salon associate will contact you.' }); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your phone or email"
            required
            className="flex-1 px-4 py-3 bg-white border border-brand-stone text-xs focus:outline-none focus:border-brand-gold"
          />
          <Button type="submit" variant="primary" size="md" leftIcon={<Mail className="w-4 h-4" />}>
            Request Callback
          </Button>
        </form>
      </section>
    </div>
  );
};
