/**
 * Pramo Jewels Checkout Engine
 * Manages multi-step checkout validation, address capture, payment simulation, and order confirmation.
 */

import { store } from './store.js';
import { APIService } from '../services/api.js';
import { createIcons, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide';

export const CheckoutEngine = {
  step: 1,

  init() {
    this.renderSummary();
    this.attachEvents();
  },

  renderSummary() {
    const items = store.cart;
    const total = store.getCartTotal();
    const container = document.getElementById('checkout-items');
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = '<p class="text-xs text-[#5F5F5F]">Your bag is empty.</p>';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="flex items-center gap-3 py-3 border-b border-[#EDE7DD]">
        <img src="${item.image}" alt="${item.name}" class="w-12 h-14 object-cover rounded bg-[#EDE7DD]">
        <div class="flex-1 text-xs">
          <h5 class="font-serif font-semibold text-[#1F1F1F]">${item.name}</h5>
          <p class="text-[10px] text-[#5F5F5F]">${item.metal} (Qty: ${item.quantity})</p>
        </div>
        <span class="font-serif text-xs font-bold text-[#1F1F1F]">${store.formatPrice(item.price * item.quantity)}</span>
      </div>
    `).join('');

    document.getElementById('checkout-subtotal').textContent = store.formatPrice(total);
    document.getElementById('checkout-[#total]').textContent = store.formatPrice(total);
  },

  attachEvents() {
    const form = document.getElementById('checkout-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const payload = {
        fullName: document.getElementById('c-name')?.value,
        email: document.getElementById('c-email')?.value,
        phone: document.getElementById('c-phone')?.value,
        address: document.getElementById('c-address')?.value,
        city: document.getElementById('c-city')?.value,
        totalAmount: store.getCartTotal()
      };

      const result = await APIService.submitOrder(payload);

      if (result.success) {
        store.clearCart();
        this.renderConfirmation(result);
      }
    });
  },

  renderConfirmation(res) {
    const mainLayout = document.getElementById('checkout-layout');
    if (mainLayout) {
      mainLayout.innerHTML = `
        <div class="max-w-xl mx-auto bg-white p-8 rounded-lg border border-[#D7D0C5] text-center space-y-6 shadow-xl">
          <div class="w-16 h-16 bg-[#6F8F72]/15 text-[#6F8F72] rounded-full flex items-center justify-center mx-auto">
            <i data-lucide="check-circle-2" class="w-8 h-8"></i>
          </div>
          <div>
            <span class="text-xs uppercase tracking-widest text-[#C7A76C] font-semibold">ORDER CONFIRMED</span>
            <h2 class="font-serif text-3xl font-light text-[#1F1F1F] mt-1">Thank You For Your Order</h2>
            <p class="text-xs text-[#5F5F5F] mt-2">Order Reference ID: <strong class="text-[#1F1F1F]">${res.orderId}</strong></p>
          </div>

          <div class="bg-[#EDE7DD] p-4 rounded text-left text-xs space-y-2 border border-[#D7D0C5]">
            <div class="flex justify-between">
              <span class="text-[#5F5F5F]">Status:</span>
              <span class="font-semibold text-[#6F8F72]">${res.status}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#5F5F5F]">Estimated Delivery:</span>
              <span class="font-semibold text-[#1F1F1F]">${res.estimatedDelivery}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#5F5F5F]">Insured Courier:</span>
              <span class="font-semibold text-[#1F1F1F]">Pramo Express Air Service</span>
            </div>
          </div>

          <p class="text-xs text-[#5F5F5F]">A formal invoice and GIA verification receipt has been dispatched to your email address.</p>

          <a href="/user/shop.html" class="inline-block gold-btn px-8 py-3.5 rounded text-xs font-semibold uppercase tracking-widest">
            CONTINUE SHOPPING
          </a>
        </div>
      `;
      createIcons({ icons: { CheckCircle2 } });
    }
  }
};
