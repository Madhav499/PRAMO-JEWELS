import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductCategory, MetalType } from '@/types';
import { Filter, Star, SlidersHorizontal } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, selectedCategory, selectedMetal, sortBy, setCategory, setMetalFilter, setSortBy, getFilteredProducts } = useProductStore();
  const { addItem } = useCartStore();
  const { addToast, toggleCart } = useUIStore();

  // Sync URL params if provided
  React.useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setCategory(cat as ProductCategory);
    }
  }, [searchParams, setCategory]);

  const categories: { label: string; value: ProductCategory | 'ALL' }[] = [
    { label: 'All Collections', value: 'ALL' },
    { label: 'Solitaire Rings', value: 'SOLITAIRES' },
    { label: 'Gold Rings', value: 'RINGS' },
    { label: 'Kundan Necklaces', value: 'NECKLACES' },
    { label: 'Diamond Earrings', value: 'EARRINGS' },
    { label: 'Gold Karas & Bangles', value: 'BRACELETS' },
    { label: 'Pendants', value: 'PENDANTS' },
    { label: 'Gold Coins', value: 'COINS' },
  ];

  const metals: { label: string; value: MetalType | 'ALL' }[] = [
    { label: 'All Metals', value: 'ALL' },
    { label: '22K Gold', value: '22K_GOLD' },
    { label: '18K Rose Gold', value: '18K_ROSE_GOLD' },
    { label: '950 Platinum', value: '950_PLATINUM' },
    { label: '24K Pure Gold', value: '24K_GOLD' },
  ];

  const filtered = getFilteredProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-brand-beige/40 p-8 border border-brand-stone/40 text-center space-y-2">
        <h1 className="font-serif text-4xl font-medium text-brand-charcoal">
          The Pramo Jewels Masterpiece Vault
        </h1>
        <p className="text-xs text-brand-slate max-w-xl mx-auto">
          Explore certified 22K Gold, 18K Diamond, Solitaire, Kundan, and Platinum haute joaillerie.
        </p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-brand-stone/40">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value);
                setSearchParams(cat.value === 'ALL' ? {} : { category: cat.value });
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                selectedCategory === cat.value
                  ? 'bg-brand-gold text-brand-charcoal border-brand-gold shadow-sm'
                  : 'bg-white text-brand-slate border-brand-stone hover:border-brand-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Metal Filter & Sort Dropdown */}
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
          <div className="flex items-center gap-2 text-xs text-brand-slate">
            <Filter className="w-4 h-4 text-brand-gold" />
            <span>Metal:</span>
            <select
              value={selectedMetal}
              onChange={(e) => setMetalFilter(e.target.value as MetalType | 'ALL')}
              className="bg-white border border-brand-stone px-3 py-1.5 text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold"
            >
              {metals.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-brand-slate">
            <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-brand-stone px-3 py-1.5 text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold"
            >
              <option value="FEATURED">Featured</option>
              <option value="PRICE_LOW_HIGH">Price: Low to High</option>
              <option value="PRICE_HIGH_LOW">Price: High to Low</option>
              <option value="RATING">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white border border-brand-stone/40">
          <h3 className="font-serif text-xl font-medium text-brand-charcoal mb-2">No matching products found</h3>
          <p className="text-xs text-brand-slate mb-6">Try resetting filters to explore our full jewellery collection.</p>
          <Button
            onClick={() => {
              setCategory('ALL');
              setMetalFilter('ALL');
            }}
            variant="outline"
            size="sm"
          >
            Reset All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
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
      )}
    </div>
  );
};
