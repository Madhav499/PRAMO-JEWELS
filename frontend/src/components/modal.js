/**
 * Pramo Jewels Modal & Drawer Manager
 * Renders Slide-Over Cart Drawer, Search Modal, and Interactive Dialogs.
 */

import { store } from '../scripts/store.js';
import { APIService } from '../services/api.js';
import { Sanitizer } from '../middleware/sanitizer.js';
import { createIcons, X, Trash2, Plus, Minus, Search, ArrowRight } from 'lucide';

export function renderCartDrawer(containerId = 'cart-drawer-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = store.cart;
  const total = store.getCartTotal();
  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);

  container.innerHTML = `
    <!-- Cart Slide-Over Drawer -->
    <div id="cart-drawer" class="fixed inset-0 z-50 overflow-hidden transform translate-x-full transition-transform duration-500 ease-in-out">
      <div class="absolute inset-0 bg-[#1F1F1F]/50 backdrop-blur-sm" id="cart-drawer-backdrop"></div>

      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-[#F8F6F2] shadow-2xl flex flex-col justify-between">
          
          <!-- Drawer Header -->
          <div class="p-6 border-b border-[#D7D0C5] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h3 class="font-serif text-xl font-light text-[#1F1F1F] tracking-wide">YOUR SHOPPING BAG</h3>
              <span class="text-xs bg-[#C7A76C]/20 text-[#9E7C42] px-2 py-0.5 rounded-full font-bold">
                ${store.getCartCount()}
              </span>
            </div>
            <button id="cart-drawer-close" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors">
              <i data-lucide="x" class="w-6 h-6"></i>
            </button>
          </div>

          <!-- Free Shipping Indicator -->
          <div class="bg-[#EDE7DD] px-6 py-3 border-b border-[#D7D0C5]">
            ${remainingForFreeShipping > 0 ? `
              <p class="text-xs text-[#5F5F5F]">Add <strong class="text-[#1F1F1F]">${store.formatPrice(remainingForFreeShipping)}</strong> more for complimentary insured delivery.</p>
              <div class="w-full bg-[#D7D0C5] h-1.5 rounded-full mt-2 overflow-hidden">
                <div class="bg-[#C7A76C] h-full transition-all duration-300" style="width: ${Math.min(100, (total / freeShippingThreshold) * 100)}%"></div>
              </div>
            ` : `
              <p class="text-xs text-[#6F8F72] font-semibold flex items-center gap-1">
                ✓ Congratulations! You unlocked complimentary insured express delivery.
              </p>
            `}
          </div>

          <!-- Cart Items List -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            ${items.length === 0 ? `
              <div class="text-center py-16 text-[#5F5F5F] space-y-3">
                <p class="font-serif text-lg">Your shopping bag is empty.</p>
                <a href="/user/shop.html" class="inline-block gold-btn px-6 py-2.5 text-xs font-semibold rounded uppercase tracking-wider">
                  Explore High Jewellery
                </a>
              </div>
            ` : items.map((item, index) => `
              <div class="flex gap-4 pb-6 border-b border-[#D7D0C5] relative group">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover rounded bg-[#EDE7DD]">
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 class="font-serif text-sm font-semibold text-[#1F1F1F] leading-snug">${item.name}</h4>
                    <p class="text-[11px] text-[#5F5F5F] mt-0.5">${item.metal} | ${item.carat}</p>
                    ${item.engraving ? `<p class="text-[10px] text-[#C7A76C] italic mt-0.5">Engraving: "${Sanitizer.escapeHTML(item.engraving)}"</p>` : ''}
                  </div>

                  <div class="flex items-center justify-between mt-3">
                    <div class="flex items-center border border-[#D7D0C5] rounded bg-white">
                      <button data-cart-action="dec" data-index="${index}" class="px-2 py-1 text-xs hover:bg-[#EDE7DD]">
                        <i data-lucide="minus" class="w-3 h-3"></i>
                      </button>
                      <span class="px-3 text-xs font-semibold">${item.quantity}</span>
                      <button data-cart-action="inc" data-index="${index}" class="px-2 py-1 text-xs hover:bg-[#EDE7DD]">
                        <i data-lucide="plus" class="w-3 h-3"></i>
                      </button>
                    </div>

                    <span class="font-serif text-sm font-bold text-[#1F1F1F]">
                      ${store.formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>

                <button data-cart-action="remove" data-index="${index}" class="absolute top-0 right-0 p-1 text-[#5F5F5F] hover:text-[#A33A3A] transition-colors">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            `).join('')}
          </div>

          <!-- Drawer Footer -->
          ${items.length > 0 ? `
            <div class="p-6 border-t border-[#D7D0C5] bg-white space-y-4">
              <div class="flex justify-between items-center text-sm font-serif">
                <span class="text-[#5F5F5F]">Subtotal</span>
                <span class="text-xl font-bold text-[#1F1F1F]">${store.formatPrice(total)}</span>
              </div>
              <p class="text-[11px] text-[#5F5F5F]">Taxes and duties calculated at checkout.</p>
              
              <a href="/user/checkout.html" class="w-full gold-btn py-3.5 rounded text-xs font-semibold uppercase tracking-widest text-center flex justify-center items-center gap-2">
                PROCEED TO CHECKOUT <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>
          ` : ''}

        </div>
      </div>
    </div>

    <!-- Live Search Modal -->
    <div id="search-modal" class="fixed inset-0 z-50 bg-[#1F1F1F]/60 backdrop-blur-md hidden flex items-start justify-center pt-20 px-4">
      <div class="bg-[#F8F6F2] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-[#D7D0C5]">
        <div class="p-4 border-b border-[#D7D0C5] flex items-center gap-3">
          <i data-lucide="search" class="w-5 h-5 text-[#C7A76C]"></i>
          <input type="text" id="live-search-input" placeholder="Search solitaire rings, emerald necklaces, diamond bracelets..." class="w-full bg-transparent text-sm focus:outline-none text-[#1F1F1F]">
          <button id="search-modal-close" class="text-[#5F5F5F] hover:text-[#1F1F1F]">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div id="live-search-results" class="p-6 max-h-96 overflow-y-auto space-y-3">
          <p class="text-xs text-[#5F5F5F] text-center">Start typing to search our fine jewellery catalog...</p>
        </div>
      </div>
    </div>
  `;

  createIcons({
    icons: { X, Trash2, Plus, Minus, Search, ArrowRight }
  });

  // Attach event listeners for cart quantity and deletion
  document.getElementById('cart-drawer-close')?.addEventListener('click', () => store.closeCartDrawer());
  document.getElementById('cart-drawer-backdrop')?.addEventListener('click', () => store.closeCartDrawer());

  container.querySelectorAll('[data-cart-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.getAttribute('data-cart-action');
      const index = parseInt(btn.getAttribute('data-index'), 10);
      if (action === 'inc') store.updateQuantity(index, store.cart[index].quantity + 1);
      if (action === 'dec') store.updateQuantity(index, store.cart[index].quantity - 1);
      if (action === 'remove') store.removeFromCart(index);
    });
  });

  // Search Modal Handlers
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-modal-close');
  const searchInput = document.getElementById('live-search-input');
  const searchResults = document.getElementById('live-search-results');

  document.getElementById('search-modal-trigger')?.addEventListener('click', () => {
    searchModal?.classList.remove('hidden');
    searchInput?.focus();
  });

  searchClose?.addEventListener('click', () => searchModal?.classList.add('hidden'));

  searchInput?.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (!query) {
      if (searchResults) searchResults.innerHTML = '<p class="text-xs text-[#5F5F5F] text-center">Start typing to search...</p>';
      return;
    }
    const products = await APIService.getProducts({ search: query });
    if (searchResults) {
      if (products.length === 0) {
        searchResults.innerHTML = '<p class="text-xs text-[#A33A3A] text-center">No fine jewellery matching your search criteria.</p>';
      } else {
        searchResults.innerHTML = products.map(p => `
          <a href="/user/product.html?id=${p.id}" class="flex items-center gap-4 p-2 hover:bg-[#EDE7DD] rounded transition-colors">
            <img src="${p.images[0]}" alt="${p.name}" class="w-12 h-12 object-cover rounded">
            <div>
              <h5 class="font-serif text-sm font-semibold text-[#1F1F1F]">${p.name}</h5>
              <p class="text-xs text-[#C7A76C]">${store.formatPrice(p.price)}</p>
            </div>
          </a>
        `).join('');
      }
    }
  });

  // Subscribe state store updates to keep Cart Drawer in sync
  store.subscribe(() => renderCartDrawer(containerId));
}
