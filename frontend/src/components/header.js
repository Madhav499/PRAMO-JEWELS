/**
 * Pramo Jewels Header & Navigation Component
 * Renders luxury responsive navigation, role selector pill, and cart/wishlist counters.
 */

import { store } from '../scripts/store.js';
import { AuthGuard, ROLES } from '../middleware/authGuard.js';
import { createIcons, ShoppingBag, Heart, Search, Menu, X, Shield, User } from 'lucide';

export function renderHeader(containerId = 'header-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currentUser = AuthGuard.getCurrentUser();
  const cartCount = store.getCartCount();
  const wishlistCount = store.wishlist.length;

  container.innerHTML = `
    <header class="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <!-- Announcement Bar -->
      <div class="bg-[#1F1F1F] text-[#F8F6F2] py-2 text-center text-xs tracking-widest uppercase border-b border-[#C7A76C]/30 flex justify-between items-center px-4 md:px-8">
        <span class="hidden md:inline-block">COMPLIMENTARY INSURED WORLDWIDE EXPRESS SHIPPING</span>
        <span class="mx-auto md:mx-0">PRAMO ATELIER: BESPOKE HIGH JEWELLERY CONSULTATION</span>
        <div class="hidden md:flex items-center gap-3 text-[10px] text-[#C7A76C]">
          <span>CURRENCY:</span>
          <select id="currency-select" class="bg-transparent border border-[#C7A76C]/40 text-[#F8F6F2] rounded px-1 py-0.5 cursor-pointer outline-none">
            <option value="USD" ${store.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
            <option value="INR" ${store.currency === 'INR' ? 'selected' : ''}>INR (₹)</option>
            <option value="EUR" ${store.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
          </select>
        </div>
      </div>

      <!-- Main Luxury Navigation Bar -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <!-- Mobile Menu Trigger -->
        <button id="mobile-menu-open" class="lg:hidden p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors" aria-label="Open Navigation Menu">
          <i data-lucide="menu" class="w-6 h-6"></i>
        </button>

        <!-- Brand Logo -->
        <a href="/user/index.html" class="flex flex-col items-center group">
          <span class="font-serif text-2xl md:text-3xl tracking-[0.2em] font-light text-[#1F1F1F] group-hover:text-[#C7A76C] transition-colors">
            PRAMO
          </span>
          <span class="text-[9px] tracking-[0.4em] uppercase text-[#C7A76C] font-semibold">
            JEWELS
          </span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center gap-8 text-xs tracking-widest uppercase font-medium text-[#1F1F1F]">
          <a href="/user/shop.html" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Shop All
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/user/shop.html?category=rings" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Rings
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/user/shop.html?category=necklaces" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Necklaces
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/user/about.html" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Heritage
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/user/contact.html" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Atelier Booking
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <!-- Header Controls & Role Switcher -->
        <div class="flex items-center gap-3 sm:gap-5">

          <!-- RBAC Role Selector Pill -->
          <div class="hidden xl:flex items-center bg-[#EDE7DD] border border-[#D7D0C5] rounded-full p-1 text-[11px]">
            <button data-role="${ROLES.CUSTOMER}" class="role-btn px-3 py-1 rounded-full transition-all ${currentUser.role === ROLES.CUSTOMER ? 'bg-[#1F1F1F] text-[#F8F6F2]' : 'text-[#5F5F5F] hover:text-[#1F1F1F]'}">
              User
            </button>
            <button data-role="${ROLES.ADMIN}" class="role-btn px-3 py-1 rounded-full transition-all ${currentUser.role === ROLES.ADMIN ? 'bg-[#C7A76C] text-[#FFFFFF]' : 'text-[#5F5F5F] hover:text-[#1F1F1F]'}">
              Admin
            </button>
            <button data-role="${ROLES.SUPER_ADMIN}" class="role-btn px-3 py-1 rounded-full transition-all ${currentUser.role === ROLES.SUPER_ADMIN ? 'bg-[#9E7C42] text-[#FFFFFF] font-bold' : 'text-[#5F5F5F] hover:text-[#1F1F1F]'}">
              Super Admin
            </button>
          </div>

          <!-- Search Trigger -->
          <button id="search-modal-trigger" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors" aria-label="Search Fine Jewellery">
            <i data-lucide="search" class="w-5 h-5"></i>
          </button>

          <!-- Customer Account / Dashboard -->
          <a href="/user/account.html" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors relative" aria-label="Account Dashboard">
            <i data-lucide="user" class="w-5 h-5"></i>
          </a>

          <!-- Wishlist Badge -->
          <a href="/user/account.html#wishlist" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors relative" aria-label="Wishlist">
            <i data-lucide="heart" class="w-5 h-5"></i>
            ${wishlistCount > 0 ? `<span class="absolute top-1 right-1 bg-[#C7A76C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">${wishlistCount}</span>` : ''}
          </a>

          <!-- Cart Drawer Button -->
          <button id="cart-drawer-trigger" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors relative flex items-center gap-2" aria-label="Shopping Cart">
            <i data-lucide="shopping-bag" class="w-5 h-5"></i>
            ${cartCount > 0 ? `<span class="bg-[#1F1F1F] text-[#F8F6F2] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">${cartCount}</span>` : ''}
          </button>

        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <div id="mobile-menu-drawer" class="fixed inset-0 z-50 bg-[#1F1F1F]/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300">
      <div class="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[#F8F6F2] p-6 shadow-2xl flex flex-col justify-between -translate-x-full transition-transform duration-300" id="mobile-menu-content">
        <div>
          <div class="flex items-center justify-between pb-6 border-b border-[#D7D0C5]">
            <span class="font-serif text-xl tracking-widest text-[#1F1F1F]">PRAMO JEWELS</span>
            <button id="mobile-menu-close" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C]">
              <i data-lucide="x" class="w-6 h-6"></i>
            </button>
          </div>
          <nav class="flex flex-col gap-5 mt-8 text-sm tracking-widest uppercase font-medium">
            <a href="/user/index.html" class="hover:text-[#C7A76C]">Home</a>
            <a href="/user/shop.html" class="hover:text-[#C7A76C]">Shop All Collections</a>
            <a href="/user/shop.html?category=rings" class="hover:text-[#C7A76C]">Solitaire Rings</a>
            <a href="/user/shop.html?category=necklaces" class="hover:text-[#C7A76C]">Fine Necklaces</a>
            <a href="/user/about.html" class="hover:text-[#C7A76C]">Heritage & Craftsmanship</a>
            <a href="/user/contact.html" class="hover:text-[#C7A76C]">Book Atelier Session</a>
            <a href="/admin/index.html" class="hover:text-[#C7A76C] text-[#C7A76C] font-bold">Admin Portal</a>
            <a href="/super-admin/index.html" class="hover:text-[#9E7C42] text-[#9E7C42] font-bold">Super Admin Portal</a>
          </nav>
        </div>
        <div class="pt-6 border-t border-[#D7D0C5] text-xs text-[#5F5F5F]">
          <p>© 2026 Pramo Jewels. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  `;

  createIcons({
    icons: { ShoppingBag, Heart, Search, Menu, X, Shield, User }
  });

  // Attach Event Listeners
  document.getElementById('cart-drawer-trigger')?.addEventListener('click', () => store.openCartDrawer());
  
  document.getElementById('currency-select')?.addEventListener('change', (e) => {
    store.currency = e.target.value;
    store.saveStorage('pramo_currency', e.target.value);
    store.notify();
  });

  // Role buttons
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      store.switchRole(role);
    });
  });

  // Mobile menu handlers
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileContent = document.getElementById('mobile-menu-content');
  const openMobile = document.getElementById('mobile-menu-open');
  const closeMobile = document.getElementById('mobile-menu-close');

  const toggleMobileMenu = (open) => {
    if (open) {
      mobileDrawer?.classList.remove('opacity-0', 'pointer-events-none');
      mobileContent?.classList.remove('-translate-x-full');
    } else {
      mobileDrawer?.classList.add('opacity-0', 'pointer-events-none');
      mobileContent?.classList.add('-translate-x-full');
    }
  };

  openMobile?.addEventListener('click', () => toggleMobileMenu(true));
  closeMobile?.addEventListener('click', () => toggleMobileMenu(false));
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) toggleMobileMenu(false);
  });

  // Store changes re-render state indicators
  store.subscribe(() => {
    const newCartCount = store.getCartCount();
    const countBadge = document.querySelector('#cart-drawer-trigger span');
    if (countBadge) {
      countBadge.textContent = newCartCount;
    }
  });
}
