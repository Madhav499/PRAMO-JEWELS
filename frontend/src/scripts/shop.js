/**
 * Pramo Jewels Shop & Catalog Engine
 * Handles live catalog filtering, sorting, grid switching, and quick-add actions.
 */

import { APIService } from '../services/api.js';
import { store } from './store.js';
import { createIcons, Heart, SlidersHorizontal, Grid2X2, Grid3X3, Eye, ShoppingBag } from 'lucide';

export const ShopEngine = {
  activeFilters: {
    category: 'all',
    maxPrice: 10000,
    metal: 'all',
    sort: 'featured'
  },
  gridMode: '4-col',

  async init() {
    this.readUrlParams();
    await this.renderCatalog();
    this.attachEventListeners();
  },

  readUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('category')) {
      this.activeFilters.category = urlParams.get('category');
    }
  },

  async renderCatalog() {
    const container = document.getElementById('product-grid');
    if (!container) return;

    container.innerHTML = '<div class="col-span-full text-center py-20 text-xs text-[#5F5F5F]">Loading fine jewellery catalog...</div>';

    let products = await APIService.getProducts(this.activeFilters);

    // Apply sorting
    if (this.activeFilters.sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (this.activeFilters.sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (this.activeFilters.sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }

    const countEl = document.getElementById('catalog-count');
    if (countEl) countEl.textContent = `${products.length} Items`;

    if (products.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-20 space-y-4">
          <p class="font-serif text-lg text-[#1F1F1F]">No fine jewellery pieces found.</p>
          <button id="clear-filters-btn" class="gold-outline-btn px-6 py-2 rounded text-xs">Reset All Filters</button>
        </div>
      `;
      document.getElementById('clear-filters-btn')?.addEventListener('click', () => this.resetFilters());
      return;
    }

    const gridClass = this.gridMode === '2-col' 
      ? 'grid-cols-1 md:grid-cols-2 gap-8' 
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';

    container.className = `grid ${gridClass}`;
    container.innerHTML = products.map(p => this.renderProductCard(p)).join('');

    createIcons({ icons: { Heart, Eye, ShoppingBag } });
    this.attachCardEvents(products);
  },

  renderProductCard(p) {
    const isWishlisted = store.isInWishlist(p.id);
    return `
      <div class="group relative bg-white rounded-lg border border-[#D7D0C5] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300">
        
        <!-- Image & Badges -->
        <div class="relative aspect-square overflow-hidden bg-[#EDE7DD]">
          <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
          
          ${p.isNewArrival ? `<span class="absolute top-3 left-3 bg-[#1F1F1F] text-[#F8F6F2] text-[10px] uppercase font-bold px-2.5 py-1 rounded">New</span>` : ''}
          ${p.isBestseller ? `<span class="absolute top-3 left-3 bg-[#C7A76C] text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded">Bestseller</span>` : ''}

          <!-- Wishlist Toggle -->
          <button data-wishlist-id="${p.id}" class="wishlist-btn absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-[#1F1F1F] hover:text-[#A33A3A] transition-colors shadow">
            <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-[#A33A3A] text-[#A33A3A]' : ''}"></i>
          </button>
        </div>

        <!-- Details -->
        <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
          <div>
            <span class="text-[10px] uppercase tracking-widest text-[#5F5F5F] font-semibold">${p.categoryName}</span>
            <a href="/user/product.html?id=${p.id}">
              <h3 class="font-serif text-base font-semibold text-[#1F1F1F] hover:text-[#C7A76C] transition-colors leading-snug mt-1">${p.name}</h3>
            </a>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-[#EDE7DD]">
            <div>
              <span class="font-serif text-lg font-bold text-[#1F1F1F]">${store.formatPrice(p.price)}</span>
              ${p.originalPrice ? `<span class="text-xs text-[#5F5F5F] line-through ml-2">${store.formatPrice(p.originalPrice)}</span>` : ''}
            </div>

            <button data-quick-add="${p.id}" class="p-2.5 gold-btn rounded-full hover:scale-110 transition-transform" title="Quick Add to Bag">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  attachCardEvents(products) {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-wishlist-id');
        store.toggleWishlist(id);
        this.renderCatalog();
      });
    });

    document.querySelectorAll('[data-quick-add]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-quick-add');
        const product = products.find(p => p.id === id);
        if (product) store.addToCart(product);
      });
    });
  },

  attachEventListeners() {
    // Filter controls
    document.getElementById('category-filter')?.addEventListener('change', (e) => {
      this.activeFilters.category = e.target.value;
      this.renderCatalog();
    });

    document.getElementById('price-range')?.addEventListener('input', (e) => {
      this.activeFilters.maxPrice = e.target.value;
      document.getElementById('price-val').textContent = store.formatPrice(e.target.value);
      this.renderCatalog();
    });

    document.getElementById('sort-filter')?.addEventListener('change', (e) => {
      this.activeFilters.sort = e.target.value;
      this.renderCatalog();
    });

    // Grid Switchers
    document.getElementById('grid-2col')?.addEventListener('click', () => {
      this.gridMode = '2-col';
      this.renderCatalog();
    });
    document.getElementById('grid-4col')?.addEventListener('click', () => {
      this.gridMode = '4-col';
      this.renderCatalog();
    });
  },

  resetFilters() {
    this.activeFilters = { category: 'all', maxPrice: 10000, metal: 'all', sort: 'featured' };
    this.renderCatalog();
  }
};
