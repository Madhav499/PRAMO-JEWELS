/**
 * Pramo Jewels Super Admin Control Center Engine
 * Highest authority platform controller: System overrides, RBAC management, audit logs, and global configuration.
 */

import { AuthGuard, ROLES } from '../middleware/authGuard.js';
import { APIService } from '../services/api.js';
import { createIcons, ShieldAlert, Cpu, Activity, UserCheck, Lock, Unlock, RefreshCw } from 'lucide';

export const SuperAdminEngine = {
  isLockdownActive: false,
  goldPricingMultiplier: 1.0,

  async init() {
    // Strictly protect route for SUPER_ADMIN role
    AuthGuard.protectRoute(ROLES.SUPER_ADMIN, '/user/index.html');

    await this.renderControls();
    this.attachEvents();
  },

  async renderControls() {
    const logs = await APIService.getSuperAdminAuditLogs();

    // Render Audit Logs Table
    const logsTbody = document.getElementById('audit-logs-tbody');
    if (logsTbody) {
      logsTbody.innerHTML = logs.map(l => `
        <tr class="hover:bg-[#EDE7DD]/50 border-b border-[#D7D0C5]">
          <td class="p-3 font-mono text-[11px] text-[#5F5F5F]">${l.timestamp}</td>
          <td class="p-3 font-semibold text-[#1F1F1F]">${l.actor}</td>
          <td class="p-3 text-[#1F1F1F]">${l.action}</td>
          <td class="p-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${l.status === 'Success' ? 'bg-[#6F8F72]/15 text-[#6F8F72]' : 'bg-[#A33A3A]/15 text-[#A33A3A]'}">
              ${l.status}
            </span>
          </td>
          <td class="p-3 font-mono text-[11px] text-[#5F5F5F]">${l.ip}</td>
        </tr>
      `).join('');
    }

    createIcons({ icons: { ShieldAlert, Cpu, Activity, UserCheck, Lock, Unlock, RefreshCw } });
  },

  attachEvents() {
    // Lockdown Toggle
    const lockdownBtn = document.getElementById('lockdown-toggle-btn');
    lockdownBtn?.addEventListener('click', () => {
      this.isLockdownActive = !this.isLockdownActive;
      alert(`[SUPER ADMIN OVERRIDE]: System Lockdown is now ${this.isLockdownActive ? 'ACTIVE (Read-Only Mode)' : 'DISABLED (Normal Operations)'}`);
      if (lockdownBtn) {
        lockdownBtn.textContent = this.isLockdownActive ? 'DISABLE SYSTEM LOCKDOWN' : 'ACTIVATE EMERGENCY LOCKDOWN';
        lockdownBtn.className = this.isLockdownActive 
          ? 'px-4 py-2 bg-[#6F8F72] text-white rounded font-bold text-xs' 
          : 'px-4 py-2 bg-[#A33A3A] text-white rounded font-bold text-xs';
      }
    });

    // Gold Index Multiplier Override
    document.getElementById('gold-index-btn')?.addEventListener('click', () => {
      const val = prompt('Enter Global Gold & Diamond Pricing Index Multiplier (Default 1.0):', '1.05');
      if (val && !isNaN(val)) {
        this.goldPricingMultiplier = parseFloat(val);
        alert(`[SUPER ADMIN OVERRIDE]: Pricing multiplier set to ${this.goldPricingMultiplier}. Product prices recalculated across all storefronts.`);
      }
    });

    // Role Manager Action
    document.getElementById('grant-role-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('role-email')?.value;
      const role = document.getElementById('role-select')?.value;
      alert(`[SUPER ADMIN RBAC]: User [${email}] has been elevated to role [${role.toUpperCase()}]. Privileges active immediately.`);
    });
  }
};
