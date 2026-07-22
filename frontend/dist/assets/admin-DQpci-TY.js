import{d as a,A as r,s as o,c as l,a as i,R as c,T as p,P as m,S as g,r as F,b,e as h}from"./modal-Bwvivhk1.js";/* empty css             *//**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=["svg",a,[["line",{x1:"12",x2:"12",y1:"2",y2:"22"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=["svg",a,[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["path",{d:"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"}],["path",{d:"m7.5 4.27 9 5.15"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=["svg",a,[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=["svg",a,[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75"}]]],E={async init(){i.protectRoute([c.ADMIN,c.SUPER_ADMIN]),await this.renderDashboard(),this.attachEvents()},async renderDashboard(){const e=await r.getProducts(),s=await r.getAdminOrders();document.getElementById("stat-revenue").textContent="$24,100",document.getElementById("stat-orders").textContent=s.length,document.getElementById("stat-products").textContent=e.length;const d=document.getElementById("admin-catalog-tbody");d&&(d.innerHTML=e.map(t=>`
        <tr class="hover:bg-[#EDE7DD]/50 border-b border-[#D7D0C5]">
          <td class="p-3 flex items-center gap-3">
            <img src="${t.images[0]}" alt="${t.name}" class="w-10 h-10 object-cover rounded bg-[#EDE7DD]">
            <span class="font-semibold text-[#1F1F1F]">${t.name}</span>
          </td>
          <td class="p-3 text-[#5F5F5F] uppercase">${t.categoryName}</td>
          <td class="p-3 font-bold text-[#1F1F1F]">${o.formatPrice(t.price)}</td>
          <td class="p-3">
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${t.stock<10?"bg-[#C28B2C]/15 text-[#C28B2C]":"bg-[#6F8F72]/15 text-[#6F8F72]"}">
              ${t.stock} Units
            </span>
          </td>
          <td class="p-3 flex gap-2">
            <button class="p-1 text-[#5F5F5F] hover:text-[#C7A76C]"><i data-lucide="edit" class="w-4 h-4"></i></button>
            <button class="p-1 text-[#5F5F5F] hover:text-[#A33A3A]"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </td>
        </tr>
      `).join(""));const n=document.getElementById("admin-orders-tbody");n&&(n.innerHTML=s.map(t=>`
        <tr class="hover:bg-[#EDE7DD]/50 border-b border-[#D7D0C5]">
          <td class="p-3 font-bold text-[#1F1F1F]">${t.id}</td>
          <td class="p-3 text-[#5F5F5F]">${t.customer}</td>
          <td class="p-3">${t.date}</td>
          <td class="p-3 font-semibold text-[#1F1F1F]">${o.formatPrice(t.total)}</td>
          <td class="p-3">
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#6F8F72]/15 text-[#6F8F72]">${t.status}</span>
          </td>
        </tr>
      `).join("")),l({icons:{Package:x,ShoppingBag:g,DollarSign:u,Users:D,Plus:m,Edit:v,Trash2:p}})},attachEvents(){var e;(e=document.getElementById("add-product-btn"))==null||e.addEventListener("click",()=>{alert("Add New Fine Jewellery Piece Modal triggered.")})}};document.addEventListener("DOMContentLoaded",()=>{F(),b(),h(),E.init()});
