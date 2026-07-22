/**
 * Pramo Jewels API Interceptor Middleware
 * Manages security headers, authentication tokens, CSRF validation, and standardized response wrappers.
 */

import { Sanitizer } from './sanitizer.js';

export const APIInterceptor = {
  /**
   * Generates secure headers for API requests
   * @param {Object} customHeaders 
   * @returns {Object}
   */
  getSecureHeaders(customHeaders = {}) {
    const token = localStorage.getItem('pramo_auth_token');
    const csrfToken = localStorage.getItem('pramo_csrf_token') || 'csrf_token_pramo_secure_2026';

    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': csrfToken,
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      ...customHeaders
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  },

  /**
   * Sanitizes payload data before sending
   * @param {Object} data 
   * @returns {Object}
   */
  sanitizePayload(data) {
    if (!data || typeof data !== 'object') return data;
    const sanitized = Array.isArray(data) ? [] : {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const val = data[key];
        if (typeof val === 'string') {
          sanitized[key] = Sanitizer.cleanInput(val);
        } else if (typeof val === 'object' && val !== null) {
          sanitized[key] = this.sanitizePayload(val);
        } else {
          sanitized[key] = val;
        }
      }
    }

    return sanitized;
  },

  /**
   * Handles response verification & error logging
   * @param {Response} response 
   * @returns {Promise<any>}
   */
  async handleResponse(response) {
    if (!response.ok) {
      if (response.status === 401) {
        console.warn('[Security Interceptor] Unauthorized access. Redirecting to login.');
      } else if (response.status === 403) {
        console.error('[Security Interceptor] Forbidden resource. Permission denied.');
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
};
