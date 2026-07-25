import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Award, Mail } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-charcoal text-brand-ivory pt-16 pb-12 border-t border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-brand-stone/20">
          <div className="flex flex-col items-center text-center p-4">
            <ShieldCheck className="w-8 h-8 text-brand-gold mb-3" />
            <h4 className="font-serif text-lg font-medium text-white mb-1">100% BIS Hallmarked</h4>
            <p className="text-xs text-brand-stone/70">Every piece certified with government HUID verification.</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <Award className="w-8 h-8 text-brand-gold mb-3" />
            <h4 className="font-serif text-lg font-medium text-white mb-1">IGI & GIA Certified</h4>
            <p className="text-xs text-brand-stone/70">Solitaire diamonds backed by international lab reports.</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <Truck className="w-8 h-8 text-brand-gold mb-3" />
            <h4 className="font-serif text-lg font-medium text-white mb-1">Insured Transit</h4>
            <p className="text-xs text-brand-stone/70">Pan-India door-to-door insured logistics by Blue Dart Apex.</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <RotateCcw className="w-8 h-8 text-brand-gold mb-3" />
            <h4 className="font-serif text-lg font-medium text-white mb-1">15-Day Exchange</h4>
            <p className="text-xs text-brand-stone/70">Hassle-free 100% value buyback and exchange guarantee.</p>
          </div>
        </div>

        {/* Middle Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-b border-brand-stone/20">
          {/* Brand Intro */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-2xl font-semibold text-white tracking-wider">PRAMO JEWELS</h3>
            <p className="text-xs text-brand-stone/80 leading-relaxed">
              Curators of fine Indian heritage jewellery, handcrafted by master Karigars across Jaipur, Hyderabad, and Surat. Celebrating timeless luxury and craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Collections</h4>
            <ul className="space-y-2 text-xs text-brand-stone/80">
              <li><Link to="/catalog?category=SOLITAIRES" className="hover:text-brand-gold">Royal Solitaire Rings</Link></li>
              <li><Link to="/catalog?category=NECKLACES" className="hover:text-brand-gold">Bridal Kundan Haars</Link></li>
              <li><Link to="/catalog?category=EARRINGS" className="hover:text-brand-gold">Diamond Jhumkas</Link></li>
              <li><Link to="/catalog?category=BRACELETS" className="hover:text-brand-gold">Gold Karas & Bangles</Link></li>
              <li><Link to="/catalog?category=COINS" className="hover:text-brand-gold">24K Bullion Coins</Link></li>
            </ul>
          </div>

          {/* Educational & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Knowledge & Support</h4>
            <ul className="space-y-2 text-xs text-brand-stone/80">
              <li><Link to="/gold-purity-guide" className="hover:text-brand-gold">Gold Purity & HUID Guide</Link></li>
              <li><Link to="/gemstone-guide" className="hover:text-brand-gold">Diamond 4Cs Encyclopedia</Link></li>
              <li><Link to="/admin" className="hover:text-brand-gold">Boutique Admin Portal</Link></li>
              <li><a href="#support" className="hover:text-brand-gold">Insured Shipping Policy</a></li>
              <li><a href="#terms" className="hover:text-brand-gold">Terms of Service & Privacy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Private Salon Invite</h4>
            <p className="text-xs text-brand-stone/80">Subscribe to receive exclusive access to new high-jewellery private debuts.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2.5 bg-brand-charcoal/80 border border-brand-stone/40 text-xs text-white placeholder:text-brand-stone/50 focus:outline-none focus:border-brand-gold"
              />
              <Button size="sm" variant="primary" leftIcon={<Mail className="w-3.5 h-3.5" />}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-brand-stone/60">
          <p>© 2026 Pramo Jewels Platform. All Rights Reserved. Master Luxury Production Build.</p>
          <div className="flex items-center gap-4">
            <span>Mumbai</span> • <span>Delhi</span> • <span>Jaipur</span> • <span>Hyderabad</span> • <span>Bengaluru</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
