import{d as o,A as c,c as l,L as p,a as h,R as g,r as m,b as v,e as u}from"./modal-Bwvivhk1.js";/* empty css             *//**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=["svg",o,[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=["svg",o,[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1"}],["path",{d:"M15 2v2"}],["path",{d:"M15 20v2"}],["path",{d:"M2 15h2"}],["path",{d:"M2 9h2"}],["path",{d:"M20 15h2"}],["path",{d:"M20 9h2"}],["path",{d:"M9 2v2"}],["path",{d:"M9 20v2"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=["svg",o,[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=["svg",o,[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=["svg",o,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=["svg",o,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["polyline",{points:"16 11 18 13 22 9"}]]],b={isLockdownActive:!1,goldPricingMultiplier:1,async init(){h.protectRoute(g.SUPER_ADMIN,"/user/index.html"),await this.renderControls(),this.attachEvents()},async renderControls(){const e=await c.getSuperAdminAuditLogs(),s=document.getElementById("audit-logs-tbody");s&&(s.innerHTML=e.map(t=>`
        <tr class="hover:bg-[#EDE7DD]/50 border-b border-[#D7D0C5]">
          <td class="p-3 font-mono text-[11px] text-[#5F5F5F]">${t.timestamp}</td>
          <td class="p-3 font-semibold text-[#1F1F1F]">${t.actor}</td>
          <td class="p-3 text-[#1F1F1F]">${t.action}</td>
          <td class="p-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${t.status==="Success"?"bg-[#6F8F72]/15 text-[#6F8F72]":"bg-[#A33A3A]/15 text-[#A33A3A]"}">
              ${t.status}
            </span>
          </td>
          <td class="p-3 font-mono text-[11px] text-[#5F5F5F]">${t.ip}</td>
        </tr>
      `).join("")),l({icons:{ShieldAlert:L,Cpu:E,Activity:A,UserCheck:y,Lock:p,Unlock:x,RefreshCw:M}})},attachEvents(){var s,t;const e=document.getElementById("lockdown-toggle-btn");e==null||e.addEventListener("click",()=>{this.isLockdownActive=!this.isLockdownActive,alert(`[SUPER ADMIN OVERRIDE]: System Lockdown is now ${this.isLockdownActive?"ACTIVE (Read-Only Mode)":"DISABLED (Normal Operations)"}`),e&&(e.textContent=this.isLockdownActive?"DISABLE SYSTEM LOCKDOWN":"ACTIVATE EMERGENCY LOCKDOWN",e.className=this.isLockdownActive?"px-4 py-2 bg-[#6F8F72] text-white rounded font-bold text-xs":"px-4 py-2 bg-[#A33A3A] text-white rounded font-bold text-xs")}),(s=document.getElementById("gold-index-btn"))==null||s.addEventListener("click",()=>{const a=prompt("Enter Global Gold & Diamond Pricing Index Multiplier (Default 1.0):","1.05");a&&!isNaN(a)&&(this.goldPricingMultiplier=parseFloat(a),alert(`[SUPER ADMIN OVERRIDE]: Pricing multiplier set to ${this.goldPricingMultiplier}. Product prices recalculated across all storefronts.`))}),(t=document.getElementById("grant-role-form"))==null||t.addEventListener("submit",a=>{var d,n;a.preventDefault();const i=(d=document.getElementById("role-email"))==null?void 0:d.value,r=(n=document.getElementById("role-select"))==null?void 0:n.value;alert(`[SUPER ADMIN RBAC]: User [${i}] has been elevated to role [${r.toUpperCase()}]. Privileges active immediately.`)})}};document.addEventListener("DOMContentLoaded",()=>{m(),v(),u(),b.init()});
