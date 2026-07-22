import{d as l,c as m,s as a,A as u,r as x,b as p,e as F}from"./modal-Bwvivhk1.js";/* empty css             *//**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=["svg",l,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]]],v={step:1,init(){this.renderSummary(),this.attachEvents()},renderSummary(){const e=a.cart,s=a.getCartTotal(),n=document.getElementById("checkout-items");if(n){if(e.length===0){n.innerHTML='<p class="text-xs text-[#5F5F5F]">Your bag is empty.</p>';return}n.innerHTML=e.map(t=>`
      <div class="flex items-center gap-3 py-3 border-b border-[#EDE7DD]">
        <img src="${t.image}" alt="${t.name}" class="w-12 h-14 object-cover rounded bg-[#EDE7DD]">
        <div class="flex-1 text-xs">
          <h5 class="font-serif font-semibold text-[#1F1F1F]">${t.name}</h5>
          <p class="text-[10px] text-[#5F5F5F]">${t.metal} (Qty: ${t.quantity})</p>
        </div>
        <span class="font-serif text-xs font-bold text-[#1F1F1F]">${a.formatPrice(t.price*t.quantity)}</span>
      </div>
    `).join(""),document.getElementById("checkout-subtotal").textContent=a.formatPrice(s),document.getElementById("checkout-[#total]").textContent=a.formatPrice(s)}},attachEvents(){const e=document.getElementById("checkout-form");e==null||e.addEventListener("submit",async s=>{var r,c,o,i,d;s.preventDefault();const n={fullName:(r=document.getElementById("c-name"))==null?void 0:r.value,email:(c=document.getElementById("c-email"))==null?void 0:c.value,phone:(o=document.getElementById("c-phone"))==null?void 0:o.value,address:(i=document.getElementById("c-address"))==null?void 0:i.value,city:(d=document.getElementById("c-city"))==null?void 0:d.value,totalAmount:a.getCartTotal()},t=await u.submitOrder(n);t.success&&(a.clearCart(),this.renderConfirmation(t))})},renderConfirmation(e){const s=document.getElementById("checkout-layout");s&&(s.innerHTML=`
        <div class="max-w-xl mx-auto bg-white p-8 rounded-lg border border-[#D7D0C5] text-center space-y-6 shadow-xl">
          <div class="w-16 h-16 bg-[#6F8F72]/15 text-[#6F8F72] rounded-full flex items-center justify-center mx-auto">
            <i data-lucide="check-circle-2" class="w-8 h-8"></i>
          </div>
          <div>
            <span class="text-xs uppercase tracking-widest text-[#C7A76C] font-semibold">ORDER CONFIRMED</span>
            <h2 class="font-serif text-3xl font-light text-[#1F1F1F] mt-1">Thank You For Your Order</h2>
            <p class="text-xs text-[#5F5F5F] mt-2">Order Reference ID: <strong class="text-[#1F1F1F]">${e.orderId}</strong></p>
          </div>

          <div class="bg-[#EDE7DD] p-4 rounded text-left text-xs space-y-2 border border-[#D7D0C5]">
            <div class="flex justify-between">
              <span class="text-[#5F5F5F]">Status:</span>
              <span class="font-semibold text-[#6F8F72]">${e.status}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#5F5F5F]">Estimated Delivery:</span>
              <span class="font-semibold text-[#1F1F1F]">${e.estimatedDelivery}</span>
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
      `,m({icons:{CheckCircle2:f}}))}};document.addEventListener("DOMContentLoaded",()=>{x(),p(),F(),v.init()});
