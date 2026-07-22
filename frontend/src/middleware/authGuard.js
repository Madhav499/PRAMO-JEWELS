/**
 * Pramo Jewels Auth Guard & Role-Based Access Control (RBAC)
 * Protects customer, admin, and super-admin routes.
 */

export const ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

export const AuthGuard = {
  /**
   * Get current authenticated user details from session/storage
   * @returns {Object|null}
   */
  getCurrentUser() {
    try {
      const stored = localStorage.getItem('pramo_active_user');
      return stored ? JSON.parse(stored) : {
        id: 'usr_guest_001',
        name: 'Guest User',
        email: 'guest@pramojewels.com',
        role: ROLES.CUSTOMER,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };
    } catch (e) {
      return null;
    }
  },

  /**
   * Set user session role
   * @param {Object} user 
   */
  setUserSession(user) {
    localStorage.setItem('pramo_active_user', JSON.stringify(user));
    localStorage.setItem('pramo_auth_token', `token_pramo_${user.role}_${Date.now()}`);
  },

  /**
   * Check if current user has required role
   * @param {string|Array<string>} requiredRoles 
   * @returns {boolean}
   */
  hasRole(requiredRoles) {
    const user = this.getCurrentUser();
    if (!user) return false;

    // Super Admin has universal override permission
    if (user.role === ROLES.SUPER_ADMIN) return true;

    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    return user.role === requiredRoles;
  },

  /**
   * Protect route execution
   * @param {string|Array<string>} requiredRoles 
   * @param {string} redirectUrl 
   */
  protectRoute(requiredRoles, redirectUrl = '/user/index.html') {
    if (!this.hasRole(requiredRoles)) {
      console.warn(`[Auth Guard] Access denied. Current role cannot access route.`);
      alert(`Security Notice: You require [${Array.isArray(requiredRoles) ? requiredRoles.join('/') : requiredRoles}] privileges to access this area. Switch role in top header.`);
      window.location.href = redirectUrl;
    }
  }
};
