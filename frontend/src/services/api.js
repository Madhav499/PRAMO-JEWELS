/**
 * Pramo Jewels Decoupled API Service Layer
 * Intercepts requests through APIInterceptor and provides fallback mock data if backend server is offline.
 */

import { APIInterceptor } from '../middleware/apiInterceptor.js';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_ORDERS, MOCK_SUPER_ADMIN_AUDIT_LOGS } from './mockData.js';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const APIService = {
  /**
   * Fetch all product catalog items with filters
   * @param {Object} queryParams 
   * @returns {Promise<Array>}
   */
  async getProducts(queryParams = {}) {
    try {
      const sanitized = APIInterceptor.sanitizePayload(queryParams);
      const url = new URL(`${API_BASE_URL}/products`);
      Object.keys(sanitized).forEach(k => url.searchParams.append(k, sanitized[k]));

      const response = await fetch(url.toString(), {
        headers: APIInterceptor.getSecureHeaders()
      });
      return await APIInterceptor.handleResponse(response);
    } catch (e) {
      console.info('[APIService] Using fallback mock data for products');
      let products = [...MOCK_PRODUCTS];

      if (queryParams.category && queryParams.category !== 'all') {
        products = products.filter(p => p.category === queryParams.category);
      }
      if (queryParams.search) {
        const q = queryParams.search.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (queryParams.maxPrice) {
        products = products.filter(p => p.price <= Number(queryParams.maxPrice));
      }

      return products;
    }
  },

  /**
   * Get single product by ID
   * @param {string} id 
   * @returns {Promise<Object>}
   */
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        headers: APIInterceptor.getSecureHeaders()
      });
      return await APIInterceptor.handleResponse(response);
    } catch (e) {
      const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
      return product;
    }
  },

  /**
   * Get categories list
   */
  async getCategories() {
    return MOCK_CATEGORIES;
  },

  /**
   * Get Store Manager Admin Orders
   */
  async getAdminOrders() {
    return MOCK_ORDERS;
  },

  /**
   * Get Super Admin Audit Logs
   */
  async getSuperAdminAuditLogs() {
    return MOCK_SUPER_ADMIN_AUDIT_LOGS;
  },

  /**
   * Submit luxury checkout order securely
   * @param {Object} orderPayload 
   */
  async submitOrder(orderPayload) {
    const sanitized = APIInterceptor.sanitizePayload(orderPayload);
    // Simulate order placement
    return {
      success: true,
      orderId: `PJ-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed',
      estimatedDelivery: '3-5 Business Days',
      amountPaid: sanitized.totalAmount
    };
  }
};
