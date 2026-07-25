import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';
import { useProductStore } from '@/store/useProductStore';
import { Modal } from '../ui/Modal';
import { Search, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const navigate = useNavigate();
  const { isSearchOpen, toggleSearch } = useUIStore();
  const { products } = useProductStore();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (productId: string) => {
    toggleSearch(false);
    navigate(`/product/${productId}`);
  };

  return (
    <Modal isOpen={isSearchOpen} onClose={() => toggleSearch(false)} maxWidth="xl">
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-brand-gold absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search Solitaire Rings, Kundan Necklaces, 22K Gold..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-brand-stone text-brand-charcoal text-base focus:outline-none focus:border-brand-gold"
            autoFocus
          />
        </div>

        {/* Quick Search Results */}
        {query.trim() && (
          <div className="max-h-80 overflow-y-auto space-y-2 pt-2">
            {filtered.length === 0 ? (
              <p className="text-xs text-brand-slate text-center py-6">No matching jewellery products found.</p>
            ) : (
              filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod.id)}
                  className="flex items-center justify-between p-3 bg-white border border-brand-stone/40 hover:border-brand-gold cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 object-cover border" />
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-brand-charcoal">{prod.name}</h4>
                      <p className="text-[11px] text-brand-slate">{prod.purity} • {prod.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-bold text-brand-gold-dark">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-slate" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
