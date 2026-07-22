/**
 * Pramo Jewels Security Sanitizer
 * Protects against XSS attacks, malicious scripts, and input injection.
 */

export const Sanitizer = {
  /**
   * Escape HTML special characters
   * @param {string} str 
   * @returns {string}
   */
  escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Sanitize text input for search, forms, and custom engraving
   * @param {string} input 
   * @param {number} maxLength 
   * @returns {string}
   */
  cleanInput(input, maxLength = 255) {
    if (!input) return '';
    const trimmed = String(input).trim().slice(0, maxLength);
    return this.escapeHTML(trimmed);
  },

  /**
   * Validate email format securely
   * @param {string} email 
   * @returns {boolean}
   */
  isValidEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }
};
