/**
 * Pramo Jewels Global State Store
 * Reactive state management for Cart, Wishlist, Currency, Role, and Modals.
 */

import { AuthGuard, ROLES } from '../middleware/authGuard.js';

class StateStore {
  constructor() {
    this.cart = this.loadStorage('pramo_cart', []);
    this.wishlist = this.loadStorage('pramo_wishlist', ['pj-ring-001']);
    this.currency = this.loadStorage('pramo_currency', 'USD');
    this.listeners = [];
  }

  loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Storage error', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }

  // --- CART MANAGEMENT ---
  addToCart(product, selectedMetal = '18k-gold', selectedCarat = '1.00 Carat', engraving = '') {
    const existingIndex = this.cart.findIndex(
      item => item.id === product.id && item.metal === selectedMetal && item.carat === selectedCarat && item.engraving === engraving
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images ? product.images[0] : product.image,
        metal: selectedMetal,
        carat: selectedCarat,
        engraving: engraving,
        quantity: 1
      });
    }

    this.saveStorage('pramo_cart', this.cart);
    this.notify();
    this.openCartDrawer();
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveStorage('pramo_cart', this.cart);
    this.notify();
  }

  updateQuantity(index, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(index);
      return;
    }
    this.cart[index].quantity = quantity;
    this.saveStorage('pramo_cart', this.cart);
    this.notify();
  }

  clearCart() {
    this.cart = [];
    this.saveStorage('pramo_cart', this.cart);
    this.notify();
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // --- WISHLIST MANAGEMENT ---
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(productId);
    }
    this.saveStorage('pramo_wishlist', this.wishlist);
    this.notify();
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  // --- CURRENCY FORMATTER ---
  formatPrice(amount) {
    if (this.currency === 'INR') {
      return `₹${(amount * 83).toLocaleString('en-IN')}`;
    } else if (this.currency === 'EUR') {
      return `€${(amount * 0.92).toLocaleString('de-DE')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  }

  // --- ROLE SWITCHER HELPER ---
  switchRole(newRole) {
    const user = {
      id: `usr_${newRole}_001`,
      name: newRole === ROLES.SUPER_ADMIN ? 'Super Admin (Architect)' : newRole === ROLES.ADMIN ? 'Store Manager' : 'Valued Customer',
      email: `${newRole}@pramojewels.com`,
      role: newRole
    };
    AuthGuard.setUserSession(user);
    this.notify();
    alert(`Active role switched to: [${newRole.toUpperCase()}]. Navigating to corresponding portal.`);
    if (newRole === ROLES.SUPER_ADMIN) {
      window.location.href = '/super-admin/index.html';
    } else if (newRole === ROLES.ADMIN) {
      window.location.href = '/admin/index.html';
    } else {
      window.location.href = '/user/index.html';
    }
  }

  // --- DRAWER & MODAL TOGGLES ---
  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.remove('translate-x-0');
      drawer.classList.add('translate-x-full');
      document.body.style.overflow = 'auto';
    }
  }
}

export const store = new StateStore();
