import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { useCustomerStore } from '@/store/useCustomerStore';
import { useUIStore } from '@/store/useUIStore';
import { LiveMetalRateTicker } from '../features/LiveMetalRateTicker';
import { Search, ShoppingBag, Heart, User, ShieldCheck, Ruler, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const { wishlistProductIds } = useCustomerStore();
  const { toggleCart, toggleSearch, toggleHallmarkVerifier, toggleRingSizeVisualizer } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const categories = [
    { name: 'Solitaires', path: '/catalog?category=SOLITAIRES' },
    { name: 'Rings', path: '/catalog?category=RINGS' },
    { name: 'Necklaces', path: '/catalog?category=NECKLACES' },
    { name: 'Earrings', path: '/catalog?category=EARRINGS' },
    { name: 'Bracelets', path: '/catalog?category=BRACELETS' },
    { name: 'Gold Coins', path: '/catalog?category=COINS' },
    { name: 'Gold Guide', path: '/gold-purity-guide' },
    { name: 'Gemstone Guide', path: '/gemstone-guide' },
  ];

  return (
    <header className="sticky top-0 z-[50] bg-brand-ivory/90 backdrop-blur-md border-b border-brand-stone/40">
      <LiveMetalRateTicker />

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Direct Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-brand-charcoal hover:text-brand-gold"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => toggleSearch(true)}
            className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-wider text-brand-slate hover:text-brand-gold transition-colors"
          >
            <Search className="w-4 h-4 text-brand-gold" />
            <span>Search</span>
          </button>
        </div>

        {/* Center: Brand Logo */}
        <Link to="/" className="flex flex-col items-center group">
          <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-brand-charcoal group-hover:text-brand-gold transition-colors">
            PRAMO JEWELS
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-brand-gold-dark font-medium -mt-1">
            HAUTE JOAILLERIE • EST. 1984
          </span>
        </Link>

        {/* Right: User Utilities & Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => toggleHallmarkVerifier(true)}
            className="hidden md:flex items-center gap-1.5 text-xs text-brand-slate hover:text-brand-gold transition-colors"
            title="Verify HUID Hallmark Code"
          >
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span className="hidden xl:inline">Verify HUID</span>
          </button>

          <button
            onClick={() => toggleRingSizeVisualizer(true)}
            className="hidden md:flex items-center gap-1.5 text-xs text-brand-slate hover:text-brand-gold transition-colors"
            title="Ring Size Visualizer"
          >
            <Ruler className="w-4 h-4 text-brand-gold" />
            <span className="hidden xl:inline">Size Visualizer</span>
          </button>

          <Link to="/customer" className="p-1.5 text-brand-charcoal hover:text-brand-gold transition-colors">
            <User className="w-5 h-5" />
          </Link>

          <Link to="/customer" className="relative p-1.5 text-brand-charcoal hover:text-brand-gold transition-colors">
            <Heart className="w-5 h-5" />
            {wishlistProductIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-gold text-brand-charcoal text-[10px] font-bold flex items-center justify-center">
                {wishlistProductIds.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => toggleCart(true)}
            className="relative p-1.5 text-brand-charcoal hover:text-brand-gold transition-colors flex items-center gap-2"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
              Cart ({totalCartCount})
            </span>
            {totalCartCount > 0 && (
              <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-gold text-brand-charcoal text-[10px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav className="hidden lg:block border-t border-brand-stone/30 bg-brand-ivory">
        <ul className="max-w-7xl mx-auto flex items-center justify-center gap-8 h-12 text-xs uppercase tracking-[0.15em] font-medium text-brand-charcoal">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                to={cat.path}
                className="hover:text-brand-gold border-b-2 border-transparent hover:border-brand-gold py-3 transition-all"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-stone/40 bg-brand-ivory p-6 space-y-4">
          <button
            onClick={() => {
              toggleSearch(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 bg-brand-beige/50 text-sm font-medium text-brand-charcoal"
          >
            <Search className="w-4 h-4 text-brand-gold" />
            <span>Search Products & Collections</span>
          </button>

          <ul className="space-y-3 pt-2 text-sm uppercase tracking-wider font-medium text-brand-charcoal">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link
                  to={cat.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-brand-gold"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
