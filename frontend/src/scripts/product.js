/**
 * Pramo Jewels Product Detail Page (PDP) Engine
 * Manages image magnifier, metal/carat selection, live engraving preview, and size guide modal.
 */

import { APIService } from '../services/api.js';
import { store } from './store.js';
import { createIcons, Heart, ShieldCheck, Gem, Ruler, Check, ChevronDown } from 'lucide';

export const ProductEngine = {
  product: null,
  selectedMetal: null,
  selectedCarat: null,
  engravingText: '',

  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'pj-ring-001';
    
    this.product = await APIService.getProductById(productId);
    if (!this.product) return;

    this.selectedMetal = this.product.metalOptions[0];
    this.selectedCarat = this.product.caratOptions[0];

    this.renderPDP();
    this.attachEventListeners();
  },

  renderPDP() {
    const p = this.product;
    const isWishlisted = store.isInWishlist(p.id);

    // Title & Price
    document.getElementById('p-name').textContent = p.name;
    document.getElementById('p-category').textContent = p.categoryName.toUpperCase();
    document.getElementById('p-price').textContent = store.formatPrice(p.price);
    document.getElementById('p-description').textContent = p.description;

    // Gallery Main Image & Thumbnails
    const mainImg = document.getElementById('main-p-image');
    if (mainImg) mainImg.src = p.images[0];

    const thumbContainer = document.getElementById('p-thumbnails');
    if (thumbContainer) {
      thumbContainer.innerHTML = p.images.map((img, idx) => `
        <button class="thumb-btn border-2 rounded overflow-hidden w-16 h-16 ${idx === 0 ? 'border-[#C7A76C]' : 'border-transparent'}" data-img="${img}">
          <img src="${img}" alt="${p.name}" class="w-full h-full object-cover">
        </button>
      `).join('');
    }

    // Metal Options Swatches
    const metalContainer = document.getElementById('p-metals');
    if (metalContainer) {
      metalContainer.innerHTML = p.metalOptions.map(m => `
        <button data-metal-id="${m.id}" class="metal-btn px-4 py-2 text-xs rounded border flex items-center gap-2 ${m.id === this.selectedMetal.id ? 'border-[#C7A76C] bg-[#EDE7DD] font-semibold' : 'border-[#D7D0C5]'}">
          <span class="w-3.5 h-3.5 rounded-full border border-black/20" style="background-color: ${m.hex}"></span>
          ${m.name}
        </button>
      `).join('');
    }

    // Carat Options
    const caratContainer = document.getElementById('p-carats');
    if (caratContainer) {
      caratContainer.innerHTML = p.caratOptions.map(c => `
        <button data-carat-val="${c}" class="carat-btn px-4 py-2 text-xs rounded border ${c === this.selectedCarat ? 'border-[#C7A76C] bg-[#EDE7DD] font-semibold' : 'border-[#D7D0C5]'}">
          ${c}
        </button>
      `).join('');
    }

    // Wishlist Button State
    const wishlistBtn = document.getElementById('p-wishlist-btn');
    if (wishlistBtn) {
      wishlistBtn.innerHTML = `<i data-lucide="heart" class="w-5 h-5 ${isWishlisted ? 'fill-[#A33A3A] text-[#A33A3A]' : ''}"></i>`;
    }

    createIcons({ icons: { Heart, ShieldCheck, Gem, Ruler, Check, ChevronDown } });
  },

  attachEventListeners() {
    // Thumbnail Click
    document.querySelectorAll('.thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-img');
        const mainImg = document.getElementById('main-p-image');
        if (mainImg) mainImg.src = src;
        document.querySelectorAll('.thumb-btn').forEach(b => b.classList.replace('border-[#C7A76C]', 'border-transparent'));
        btn.classList.replace('border-transparent', 'border-[#C7A76C]');
      });
    });

    // Metal Swatch Select
    document.querySelectorAll('.metal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-metal-id');
        this.selectedMetal = this.product.metalOptions.find(m => m.id === id);
        this.renderPDP();
      });
    });

    // Carat Select
    document.querySelectorAll('.carat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedCarat = btn.getAttribute('data-carat-val');
        this.renderPDP();
      });
    });

    // Engraving live preview
    const engInput = document.getElementById('engraving-input');
    const engPreview = document.getElementById('engraving-preview');
    engInput?.addEventListener('input', (e) => {
      this.engravingText = e.target.value;
      if (engPreview) {
        engPreview.textContent = e.target.value ? `Live Inner Band Engraving: "${e.target.value}"` : '';
      }
    });

    // Add to Cart
    document.getElementById('add-to-bag-btn')?.addEventListener('click', () => {
      store.addToCart(this.product, this.selectedMetal.name, this.selectedCarat, this.engravingText);
    });

    // Size Guide Modal
    const sizeModal = document.getElementById('size-guide-modal');
    document.getElementById('open-size-guide')?.addEventListener('click', () => sizeModal?.classList.remove('hidden'));
    document.getElementById('close-size-guide')?.addEventListener('click', () => sizeModal?.classList.add('hidden'));
  }
};
