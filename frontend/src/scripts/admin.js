/**
 * Pramo Jewels Store Manager Admin Portal Engine
 * Manages product catalog CRUD, order status updates, and inventory tracking.
 */

import { AuthGuard, ROLES } from '../middleware/authGuard.js';
import { APIService } from '../services/api.js';
import { store } from './store.js';
import { createIcons, Package, ShoppingBag, DollarSign, Users, Plus, Edit, Trash2 } from 'lucide';

export const AdminEngine = {
  async init() {
    // Protect route: require Admin or Super Admin role
    AuthGuard.protectRoute([ROLES.ADMIN, ROLES.SUPER_ADMIN]);

    await this.renderDashboard();
    this.attachEvents();
  },

  async renderDashboard() {
    const products = await APIService.getProducts();
    const orders = await APIService.getAdminOrders();

    // Render Stats
    document.getElementById('stat-revenue').textContent = '$24,100';
    document.getElementById('stat-orders').textContent = orders.length;
    document.getElementById('stat-products').textContent = products.length;

    // Render Catalog Table
    const catalogTbody = document.getElementById('admin-catalog-tbody');
    if (catalogTbody) {
      catalogTbody.innerHTML = products.map(p => `
        <tr class="hover:bg-[#EDE7DD]/50 border-b border-[#D7D0C5]">
          <td class="p-3 flex items-center gap-3">
            <img src="${p.images[0]}" alt="${p.name}" class="w-10 h-10 object-cover rounded bg-[#EDE7DD]">
            <span class="font-semibold text-[#1F1F1F]">${p.name}</span>
          </td>
          <td class="p-3 text-[#5F5F5F] uppercase">${p.categoryName}</td>
          <td class="p-3 font-bold text-[#1F1F1F]">${store.formatPrice(p.price)}</td>
          <td class="p-3">
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${p.stock < 10 ? 'bg-[#C28B2C]/15 text-[#C28B2C]' : 'bg-[#6F8F72]/15 text-[#6F8F72]'}">
              ${p.stock} Units
            </span>
          </td>
          <td class="p-3 flex gap-2">
            <button class="p-1 text-[#5F5F5F] hover:text-[#C7A76C]"><i data-lucide="edit" class="w-4 h-4"></i></button>
            <button class="p-1 text-[#5F5F5F] hover:text-[#A33A3A]"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </td>
        </tr>
      `).join('');
    }

    // Render Orders Table
    const ordersTbody = document.getElementById('admin-orders-tbody');
    if (ordersTbody) {
      ordersTbody.innerHTML = orders.map(o => `
        <tr class="hover:bg-[#EDE7DD]/50 border-b border-[#D7D0C5]">
          <td class="p-3 font-bold text-[#1F1F1F]">${o.id}</td>
          <td class="p-3 text-[#5F5F5F]">${o.customer}</td>
          <td class="p-3">${o.date}</td>
          <td class="p-3 font-semibold text-[#1F1F1F]">${store.formatPrice(o.total)}</td>
          <td class="p-3">
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#6F8F72]/15 text-[#6F8F72]">${o.status}</span>
          </td>
        </tr>
      `).join('');
    }

    createIcons({ icons: { Package, ShoppingBag, DollarSign, Users, Plus, Edit, Trash2 } });
  },

  attachEvents() {
    document.getElementById('add-product-btn')?.addEventListener('click', () => {
      alert('Add New Fine Jewellery Piece Modal triggered.');
    });
  }
};
