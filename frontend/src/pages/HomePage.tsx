import React from 'react';
import { Link } from 'react-router-dom';
import { JewelryCanvas } from '@/components/3d/JewelryCanvas';
import { HeroRingModel } from '@/components/3d/HeroRingModel';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { ArrowRight, ShieldCheck, Sparkles, Star, ChevronRight, Award, Truck } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products } = useProductStore();
  const { addItem } = useCartStore();
  const { addToast, toggleCart } = useUIStore();

  const bestSellers = products.filter((p) => p.isBestSeller);

  const collections = [
    {
      title: 'Royal Heritage Kundan',
      subtitle: 'Handcrafted Bridal Masterpieces',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      category: 'NECKLACES',
    },
    {
      title: 'Solitaire Diamond Vault',
      subtitle: 'IGI & GIA Certified Brilliance',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      category: 'SOLITAIRES',
    },
    {
      title: 'Everyday Temple Gold',
      subtitle: '22K Hallmarked Daily Elegance',
      image: 'https://images.unsplash.com/photo-1611591475143-be88404a37f5?auto=format&fit=crop&w=1000&q=80',
      category: 'BRACELETS',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section with 3D WebGL Ring & Storytelling */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pt-8">
        {/* Left Hero Narrative */}
        <div className="w-full lg:w-1/2 space-y-6 z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pramo Jewels Haute Joaillerie</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-brand-charcoal leading-[1.1]">
            Royal Indian Heritage <br />
            <span className="gold-shimmer italic font-serif">Reimagined.</span>
          </h1>

          <p className="text-sm md:text-base text-brand-slate max-w-xl leading-relaxed font-sans font-normal">
            Step into our virtual atelier. Handcrafted 22K Gold & IGI Certified Solitaires sculpted by master Karigars across Jaipur and Hyderabad. Certified for a lifetime of trust.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link to="/catalog">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Masterpieces
              </Button>
            </Link>
            <Link to="/gold-purity-guide">
              <Button size="lg" variant="outline">
                Purity & HUID Guide
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-stone/40 text-left">
            <div>
              <span className="font-serif text-2xl font-bold text-brand-charcoal">100%</span>
              <span className="block text-[11px] text-brand-slate uppercase font-medium">BIS Hallmarked</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-brand-charcoal">4.9 ★</span>
              <span className="block text-[11px] text-brand-slate uppercase font-medium">10,000+ Reviews</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-brand-charcoal">Insured</span>
              <span className="block text-[11px] text-brand-slate uppercase font-medium">Pan-India Delivery</span>
            </div>
          </div>
        </div>

        {/* Right 3D Solitaire Canvas */}
        <div className="w-full lg:w-1/2 h-[450px] sm:h-[550px] relative">
          <JewelryCanvas height="h-full" enableOrbit={true} autoRotate={true}>
            <HeroRingModel />
          </JewelryCanvas>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-1.5 border border-brand-stone/60 text-[11px] text-brand-slate uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
            Interactive 3D Solitaire • Drag to Rotate
          </div>
        </div>
      </section>

      {/* Heritage Craftsmanship Story Section */}
      <section className="bg-brand-beige/40 py-20 border-y border-brand-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold-dark font-semibold">
              Centuries of Master Craftsmanship
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-charcoal">
              Every Gemstone Holds a Royal Legacy
            </h2>
            <p className="text-sm md:text-base text-brand-slate leading-relaxed">
              Pramo Jewels revives the imperial royal ateliers of 19th-century India. Combining ancient Kundan glass casting, intricate Meenakari filigree, and precision laser 3D gem setting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6">
            <Card className="bg-white">
              <ShieldCheck className="w-10 h-10 text-brand-gold mb-4" />
              <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-2">Government HUID Hallmark</h3>
              <p className="text-xs text-brand-slate leading-relaxed">
                Every piece is laser-etched with a unique 6-digit HUID code verified directly against the Bureau of Indian Standards database.
              </p>
            </Card>

            <Card className="bg-white">
              <Award className="w-10 h-10 text-brand-gold mb-4" />
              <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-2">Conflict-Free Solitaires</h3>
              <p className="text-xs text-brand-slate leading-relaxed">
                Our solitaire diamonds undergo rigorous IGI and GIA laboratory grading for cut, color, clarity, and ethical origin.
              </p>
            </Card>

            <Card className="bg-white">
              <Truck className="w-10 h-10 text-brand-gold mb-4" />
              <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-2">100% Value Buyback</h3>
              <p className="text-xs text-brand-slate leading-relaxed">
                Lifetime guaranteed gold buyback and exchange policies ensure your jewellery remains a cherished investment asset.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Curated Royal Collections Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-charcoal mt-1">
              Featured Royal Collections
            </h2>
          </div>
          <Link to="/catalog">
            <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
              View All Collections
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((col, idx) => (
            <Link
              key={idx}
              to={`/catalog?category=${col.category}`}
              className="group relative h-96 overflow-hidden border border-brand-stone/60 block"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/30 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-1">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-2xl font-medium text-white group-hover:text-brand-gold transition-colors">
                  {col.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold">
            Most Coveted Jewels
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-charcoal">
            Iconic Best Sellers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <Card key={product.id} className="flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-brand-beige/20 border border-brand-stone/40">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <Badge variant="gold">{product.purity}</Badge>
                    {product.isBestSeller && <Badge variant="dark">Best Seller</Badge>}
                  </div>
                </div>

                {/* Product Info */}
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

              {/* Price & Cart Actions */}
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
    </div>
  );
};
