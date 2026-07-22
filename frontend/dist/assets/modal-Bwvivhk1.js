(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=a(r);fetch(r.href,i)}})();const p={CUSTOMER:"customer",ADMIN:"admin",SUPER_ADMIN:"super_admin"},S={getCurrentUser(){try{const t=localStorage.getItem("pramo_active_user");return t?JSON.parse(t):{id:"usr_guest_001",name:"Guest User",email:"guest@pramojewels.com",role:p.CUSTOMER,avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}}catch{return null}},setUserSession(t){localStorage.setItem("pramo_active_user",JSON.stringify(t)),localStorage.setItem("pramo_auth_token",`token_pramo_${t.role}_${Date.now()}`)},hasRole(t){const e=this.getCurrentUser();return e?e.role===p.SUPER_ADMIN?!0:Array.isArray(t)?t.includes(e.role):e.role===t:!1},protectRoute(t,e="/user/index.html"){this.hasRole(t)||(console.warn("[Auth Guard] Access denied. Current role cannot access route."),alert(`Security Notice: You require [${Array.isArray(t)?t.join("/"):t}] privileges to access this area. Switch role in top header.`),window.location.href=e)}};class M{constructor(){this.cart=this.loadStorage("pramo_cart",[]),this.wishlist=this.loadStorage("pramo_wishlist",["pj-ring-001"]),this.currency=this.loadStorage("pramo_currency","USD"),this.listeners=[]}loadStorage(e,a){try{const s=localStorage.getItem(e);return s?JSON.parse(s):a}catch{return a}}saveStorage(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch(s){console.error("Storage error",s)}}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(a=>a!==e)}}notify(){this.listeners.forEach(e=>e(this))}addToCart(e,a="18k-gold",s="1.00 Carat",r=""){const i=this.cart.findIndex(n=>n.id===e.id&&n.metal===a&&n.carat===s&&n.engraving===r);i>-1?this.cart[i].quantity+=1:this.cart.push({id:e.id,name:e.name,price:e.price,image:e.images?e.images[0]:e.image,metal:a,carat:s,engraving:r,quantity:1}),this.saveStorage("pramo_cart",this.cart),this.notify(),this.openCartDrawer()}removeFromCart(e){this.cart.splice(e,1),this.saveStorage("pramo_cart",this.cart),this.notify()}updateQuantity(e,a){if(a<=0){this.removeFromCart(e);return}this.cart[e].quantity=a,this.saveStorage("pramo_cart",this.cart),this.notify()}clearCart(){this.cart=[],this.saveStorage("pramo_cart",this.cart),this.notify()}getCartTotal(){return this.cart.reduce((e,a)=>e+a.price*a.quantity,0)}getCartCount(){return this.cart.reduce((e,a)=>e+a.quantity,0)}toggleWishlist(e){const a=this.wishlist.indexOf(e);a>-1?this.wishlist.splice(a,1):this.wishlist.push(e),this.saveStorage("pramo_wishlist",this.wishlist),this.notify()}isInWishlist(e){return this.wishlist.includes(e)}formatPrice(e){return this.currency==="INR"?`₹${(e*83).toLocaleString("en-IN")}`:this.currency==="EUR"?`€${(e*.92).toLocaleString("de-DE")}`:`$${e.toLocaleString("en-US")}`}switchRole(e){const a={id:`usr_${e}_001`,name:e===p.SUPER_ADMIN?"Super Admin (Architect)":e===p.ADMIN?"Store Manager":"Valued Customer",email:`${e}@pramojewels.com`,role:e};S.setUserSession(a),this.notify(),alert(`Active role switched to: [${e.toUpperCase()}]. Navigating to corresponding portal.`),e===p.SUPER_ADMIN?window.location.href="/super-admin/index.html":e===p.ADMIN?window.location.href="/admin/index.html":window.location.href="/user/index.html"}openCartDrawer(){const e=document.getElementById("cart-drawer");e&&(e.classList.remove("translate-x-full"),e.classList.add("translate-x-0"),document.body.style.overflow="hidden")}closeCartDrawer(){const e=document.getElementById("cart-drawer");e&&(e.classList.remove("translate-x-0"),e.classList.add("translate-x-full"),document.body.style.overflow="auto")}}const o=new M;/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=(t,e,a=[])=>{const s=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(r=>{s.setAttribute(r,String(e[r]))}),a.length&&a.forEach(r=>{const i=D(...r);s.appendChild(i)}),s};var L=([t,e,a])=>D(t,e,a);/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=t=>Array.from(t.attributes).reduce((e,a)=>(e[a.name]=a.value,e),{}),O=t=>typeof t=="string"?t:!t||!t.class?"":t.class&&typeof t.class=="string"?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"",N=t=>t.flatMap(O).map(a=>a.trim()).filter(Boolean).filter((a,s,r)=>r.indexOf(a)===s).join(" "),B=t=>t.replace(/(\w)(\w*)(_|-|\s*)/g,(e,a,s)=>a.toUpperCase()+s.toLowerCase()),A=(t,{nameAttr:e,icons:a,attrs:s})=>{var f;const r=t.getAttribute(e);if(r==null)return;const i=B(r),n=a[i];if(!n)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const g=R(t),[u,h,v]=n,x={...h,"data-lucide":r,...s,...g},c=N(["lucide",`lucide-${r}`,g,s]);c&&Object.assign(x,{class:c});const l=L([u,x,v]);return(f=t.parentNode)==null?void 0:f.replaceChild(l,t)};/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=["svg",d,[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=["svg",d,[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=["svg",d,[["path",{d:"M6 3h12l4 6-10 13L2 9Z"}],["path",{d:"M11 3 8 9l4 13 4-13-3-6"}],["path",{d:"M2 9h20"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=["svg",d,[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=["svg",d,[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=["svg",d,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=["svg",d,[["path",{d:"M5 12h14"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=["svg",d,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=["svg",d,[["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=["svg",d,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=["svg",d,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=["svg",d,[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"}],["path",{d:"M3 6h18"}],["path",{d:"M16 10a4 4 0 0 1-8 0"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=["svg",d,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=["svg",d,[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=["svg",d,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=({icons:t={},nameAttr:e="data-lucide",attrs:a={}}={})=>{if(!Object.values(t).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const s=document.querySelectorAll(`[${e}]`);if(Array.from(s).forEach(r=>A(r,{nameAttr:e,icons:t,attrs:a})),e==="data-lucide"){const r=document.querySelectorAll("[icon-name]");r.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(r).forEach(i=>A(i,{nameAttr:"icon-name",icons:t,attrs:a})))}};function ee(t="header-container"){var v,x;const e=document.getElementById(t);if(!e)return;const a=S.getCurrentUser(),s=o.getCartCount(),r=o.wishlist.length;e.innerHTML=`
    <header class="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <!-- Announcement Bar -->
      <div class="bg-[#1F1F1F] text-[#F8F6F2] py-2 text-center text-xs tracking-widest uppercase border-b border-[#C7A76C]/30 flex justify-between items-center px-4 md:px-8">
        <span class="hidden md:inline-block">COMPLIMENTARY INSURED WORLDWIDE EXPRESS SHIPPING</span>
        <span class="mx-auto md:mx-0">PRAMO ATELIER: BESPOKE HIGH JEWELLERY CONSULTATION</span>
        <div class="hidden md:flex items-center gap-3 text-[10px] text-[#C7A76C]">
          <span>CURRENCY:</span>
          <select id="currency-select" class="bg-transparent border border-[#C7A76C]/40 text-[#F8F6F2] rounded px-1 py-0.5 cursor-pointer outline-none">
            <option value="USD" ${o.currency==="USD"?"selected":""}>USD ($)</option>
            <option value="INR" ${o.currency==="INR"?"selected":""}>INR (₹)</option>
            <option value="EUR" ${o.currency==="EUR"?"selected":""}>EUR (€)</option>
          </select>
        </div>
      </div>

      <!-- Main Luxury Navigation Bar -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <!-- Mobile Menu Trigger -->
        <button id="mobile-menu-open" class="lg:hidden p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors" aria-label="Open Navigation Menu">
          <i data-lucide="menu" class="w-6 h-6"></i>
        </button>

        <!-- Brand Logo -->
        <a href="/user/index.html" class="flex flex-col items-center group">
          <span class="font-serif text-2xl md:text-3xl tracking-[0.2em] font-light text-[#1F1F1F] group-hover:text-[#C7A76C] transition-colors">
            PRAMO
          </span>
          <span class="text-[9px] tracking-[0.4em] uppercase text-[#C7A76C] font-semibold">
            JEWELS
          </span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center gap-8 text-xs tracking-widest uppercase font-medium text-[#1F1F1F]">
          <a href="/user/shop.html" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Shop All
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/user/shop.html?category=rings" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Rings
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/user/shop.html?category=necklaces" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Necklaces
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/user/about.html" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Heritage
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/user/contact.html" class="hover:text-[#C7A76C] transition-colors py-2 relative group">
            Atelier Booking
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C7A76C] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <!-- Header Controls & Role Switcher -->
        <div class="flex items-center gap-3 sm:gap-5">

          <!-- RBAC Role Selector Pill -->
          <div class="hidden xl:flex items-center bg-[#EDE7DD] border border-[#D7D0C5] rounded-full p-1 text-[11px]">
            <button data-role="${p.CUSTOMER}" class="role-btn px-3 py-1 rounded-full transition-all ${a.role===p.CUSTOMER?"bg-[#1F1F1F] text-[#F8F6F2]":"text-[#5F5F5F] hover:text-[#1F1F1F]"}">
              User
            </button>
            <button data-role="${p.ADMIN}" class="role-btn px-3 py-1 rounded-full transition-all ${a.role===p.ADMIN?"bg-[#C7A76C] text-[#FFFFFF]":"text-[#5F5F5F] hover:text-[#1F1F1F]"}">
              Admin
            </button>
            <button data-role="${p.SUPER_ADMIN}" class="role-btn px-3 py-1 rounded-full transition-all ${a.role===p.SUPER_ADMIN?"bg-[#9E7C42] text-[#FFFFFF] font-bold":"text-[#5F5F5F] hover:text-[#1F1F1F]"}">
              Super Admin
            </button>
          </div>

          <!-- Search Trigger -->
          <button id="search-modal-trigger" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors" aria-label="Search Fine Jewellery">
            <i data-lucide="search" class="w-5 h-5"></i>
          </button>

          <!-- Customer Account / Dashboard -->
          <a href="/user/account.html" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors relative" aria-label="Account Dashboard">
            <i data-lucide="user" class="w-5 h-5"></i>
          </a>

          <!-- Wishlist Badge -->
          <a href="/user/account.html#wishlist" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors relative" aria-label="Wishlist">
            <i data-lucide="heart" class="w-5 h-5"></i>
            ${r>0?`<span class="absolute top-1 right-1 bg-[#C7A76C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">${r}</span>`:""}
          </a>

          <!-- Cart Drawer Button -->
          <button id="cart-drawer-trigger" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors relative flex items-center gap-2" aria-label="Shopping Cart">
            <i data-lucide="shopping-bag" class="w-5 h-5"></i>
            ${s>0?`<span class="bg-[#1F1F1F] text-[#F8F6F2] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">${s}</span>`:""}
          </button>

        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <div id="mobile-menu-drawer" class="fixed inset-0 z-50 bg-[#1F1F1F]/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300">
      <div class="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[#F8F6F2] p-6 shadow-2xl flex flex-col justify-between -translate-x-full transition-transform duration-300" id="mobile-menu-content">
        <div>
          <div class="flex items-center justify-between pb-6 border-b border-[#D7D0C5]">
            <span class="font-serif text-xl tracking-widest text-[#1F1F1F]">PRAMO JEWELS</span>
            <button id="mobile-menu-close" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C]">
              <i data-lucide="x" class="w-6 h-6"></i>
            </button>
          </div>
          <nav class="flex flex-col gap-5 mt-8 text-sm tracking-widest uppercase font-medium">
            <a href="/user/index.html" class="hover:text-[#C7A76C]">Home</a>
            <a href="/user/shop.html" class="hover:text-[#C7A76C]">Shop All Collections</a>
            <a href="/user/shop.html?category=rings" class="hover:text-[#C7A76C]">Solitaire Rings</a>
            <a href="/user/shop.html?category=necklaces" class="hover:text-[#C7A76C]">Fine Necklaces</a>
            <a href="/user/about.html" class="hover:text-[#C7A76C]">Heritage & Craftsmanship</a>
            <a href="/user/contact.html" class="hover:text-[#C7A76C]">Book Atelier Session</a>
            <a href="/admin/index.html" class="hover:text-[#C7A76C] text-[#C7A76C] font-bold">Admin Portal</a>
            <a href="/super-admin/index.html" class="hover:text-[#9E7C42] text-[#9E7C42] font-bold">Super Admin Portal</a>
          </nav>
        </div>
        <div class="pt-6 border-t border-[#D7D0C5] text-xs text-[#5F5F5F]">
          <p>© 2026 Pramo Jewels. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  `,C({icons:{ShoppingBag:J,Heart:j,Search:I,Menu:U,X:P,Shield:z,User:W}}),(v=document.getElementById("cart-drawer-trigger"))==null||v.addEventListener("click",()=>o.openCartDrawer()),(x=document.getElementById("currency-select"))==null||x.addEventListener("change",c=>{o.currency=c.target.value,o.saveStorage("pramo_currency",c.target.value),o.notify()}),document.querySelectorAll(".role-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.getAttribute("data-role");o.switchRole(l)})});const i=document.getElementById("mobile-menu-drawer"),n=document.getElementById("mobile-menu-content"),g=document.getElementById("mobile-menu-open"),u=document.getElementById("mobile-menu-close"),h=c=>{c?(i==null||i.classList.remove("opacity-0","pointer-events-none"),n==null||n.classList.remove("-translate-x-full")):(i==null||i.classList.add("opacity-0","pointer-events-none"),n==null||n.classList.add("-translate-x-full"))};g==null||g.addEventListener("click",()=>h(!0)),u==null||u.addEventListener("click",()=>h(!1)),i==null||i.addEventListener("click",c=>{c.target===i&&h(!1)}),o.subscribe(()=>{const c=o.getCartCount(),l=document.querySelector("#cart-drawer-trigger span");l&&(l.textContent=c)})}const F={escapeHTML(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},cleanInput(t,e=255){if(!t)return"";const a=String(t).trim().slice(0,e);return this.escapeHTML(a)},isValidEmail(t){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(t).toLowerCase())}};function te(t="footer-container"){var a;const e=document.getElementById(t);e&&(e.innerHTML=`
    <!-- Trust Seals Banner -->
    <section class="bg-[#EDE7DD] border-t border-b border-[#D7D0C5] py-10 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 rounded-full bg-[#C7A76C]/15 flex items-center justify-center text-[#C7A76C] mb-3">
            <i data-lucide="shield-check" class="w-6 h-6"></i>
          </div>
          <h4 class="font-serif text-sm font-semibold tracking-wider text-[#1F1F1F]">BIS HALLMARKED 916</h4>
          <p class="text-xs text-[#5F5F5F] mt-1">100% Certified Solid Gold</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="w-12 h-12 rounded-full bg-[#C7A76C]/15 flex items-center justify-center text-[#C7A76C] mb-3">
            <i data-lucide="gem" class="w-6 h-6"></i>
          </div>
          <h4 class="font-serif text-sm font-semibold tracking-wider text-[#1F1F1F]">GIA CERTIFIED DIAMONDS</h4>
          <p class="text-xs text-[#5F5F5F] mt-1">Ethically Sourced & Hand-Selected</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="w-12 h-12 rounded-full bg-[#C7A76C]/15 flex items-center justify-center text-[#C7A76C] mb-3">
            <i data-lucide="award" class="w-6 h-6"></i>
          </div>
          <h4 class="font-serif text-sm font-semibold tracking-wider text-[#1F1F1F]">LIFETIME WARRANTY</h4>
          <p class="text-xs text-[#5F5F5F] mt-1">Complimentary Cleaning & Repair</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="w-12 h-12 rounded-full bg-[#C7A76C]/15 flex items-center justify-center text-[#C7A76C] mb-3">
            <i data-lucide="lock" class="w-6 h-6"></i>
          </div>
          <h4 class="font-serif text-sm font-semibold tracking-wider text-[#1F1F1F]">INSURED WORLDWIDE DELIVERY</h4>
          <p class="text-xs text-[#5F5F5F] mt-1">Tamper-Evident Luxury Packaging</p>
        </div>
      </div>
    </section>

    <!-- Main Footer Body -->
    <footer class="bg-[#1F1F1F] text-[#F8F6F2] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        <!-- Brand Info -->
        <div class="lg:col-span-2 space-y-4">
          <span class="font-serif text-3xl tracking-[0.2em] font-light text-[#F8F6F2]">PRAMO JEWELS</span>
          <p class="text-xs text-[#D7D0C5] leading-relaxed max-w-sm">
            Crafting timeless high-jewellery masterpieces since 1984. Where ancient goldsmithing heritage meets contemporary haute joaillerie.
          </p>
          <div class="pt-4">
            <h5 class="text-xs uppercase tracking-widest text-[#C7A76C] font-semibold mb-3">THE PRAMO GAZETTE</h5>
            <form id="newsletter-form" class="flex gap-2 max-w-sm">
              <input type="email" id="newsletter-email" placeholder="Enter your email address" required class="w-full bg-[#2A2A2A] border border-[#5F5F5F] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7A76C]">
              <button type="submit" class="gold-btn px-4 py-2 rounded text-xs font-semibold flex items-center gap-1">
                JOIN <i data-lucide="arrow-right" class="w-3 h-3"></i>
              </button>
            </form>
            <p id="newsletter-msg" class="text-[11px] text-[#6F8F72] mt-2 hidden"></p>
          </div>
        </div>

        <!-- Collections -->
        <div>
          <h5 class="text-xs uppercase tracking-widest text-[#C7A76C] font-semibold mb-4">COLLECTIONS</h5>
          <ul class="space-y-2.5 text-xs text-[#D7D0C5]">
            <li><a href="/user/shop.html?category=rings" class="hover:text-white transition-colors">Solitaire Rings</a></li>
            <li><a href="/user/shop.html?category=necklaces" class="hover:text-white transition-colors">Haute Necklaces</a></li>
            <li><a href="/user/shop.html?category=bracelets" class="hover:text-white transition-colors">Diamond Tennis Bracelets</a></li>
            <li><a href="/user/shop.html?category=earrings" class="hover:text-white transition-colors">South Sea Pearls</a></li>
            <li><a href="/user/shop.html?category=pendants" class="hover:text-white transition-colors">Sapphire Pendants</a></li>
          </ul>
        </div>

        <!-- High Jewellery & Atelier -->
        <div>
          <h5 class="text-xs uppercase tracking-widest text-[#C7A76C] font-semibold mb-4">ATELIER</h5>
          <ul class="space-y-2.5 text-xs text-[#D7D0C5]">
            <li><a href="/user/contact.html" class="hover:text-white transition-colors">Bespoke Design Session</a></li>
            <li><a href="/user/about.html" class="hover:text-white transition-colors">Our Craftsmanship</a></li>
            <li><a href="/user/about.html#sustainability" class="hover:text-white transition-colors">Ethical Sourcing</a></li>
            <li><a href="/user/account.html" class="hover:text-white transition-colors">Book Ring Sizing</a></li>
          </ul>
        </div>

        <!-- Portals & Governance -->
        <div>
          <h5 class="text-xs uppercase tracking-widest text-[#C7A76C] font-semibold mb-4">PORTALS</h5>
          <ul class="space-y-2.5 text-xs text-[#D7D0C5]">
            <li><a href="/user/account.html" class="hover:text-white transition-colors">Customer Account</a></li>
            <li><a href="/admin/index.html" class="hover:text-white text-[#C7A76C] transition-colors">Store Manager Portal</a></li>
            <li><a href="/super-admin/index.html" class="hover:text-white text-[#9E7C42] font-semibold transition-colors">Super Admin Portal</a></li>
            <li><a href="/user/contact.html#faq" class="hover:text-white transition-colors">Help & Concierge</a></li>
          </ul>
        </div>
      </div>

      <!-- Copyright & Bottom Bar -->
      <div class="max-w-7xl mx-auto pt-10 mt-10 border-t border-[#333333] flex flex-col md:flex-row justify-between items-center text-xs text-[#5F5F5F] gap-4">
        <p>© 2026 Pramo Jewels Platform. Designed with Enterprise Luxury Precision.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-[#D7D0C5]">Privacy Policy</a>
          <a href="#" class="hover:text-[#D7D0C5]">Terms of Service</a>
          <a href="#" class="hover:text-[#D7D0C5]">GIA Verification</a>
        </div>
      </div>
    </footer>
  `,C({icons:{ShieldCheck:q,Gem:T,Award:$,Lock:_,ArrowRight:k}}),(a=document.getElementById("newsletter-form"))==null||a.addEventListener("submit",s=>{s.preventDefault();const r=document.getElementById("newsletter-email"),i=document.getElementById("newsletter-msg");r&&F.isValidEmail(r.value)?(i&&(i.textContent="Thank you for subscribing to The Pramo Gazette.",i.classList.remove("hidden")),r.value=""):i&&(i.textContent="Please enter a valid email address.",i.classList.remove("hidden"),i.classList.replace("text-[#6F8F72]","text-[#A33A3A]"))}))}const y={getSecureHeaders(t={}){const e=localStorage.getItem("pramo_auth_token"),s={"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":localStorage.getItem("pramo_csrf_token")||"csrf_token_pramo_secure_2026","X-Frame-Options":"DENY","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin",...t};return e&&(s.Authorization=`Bearer ${e}`),s},sanitizePayload(t){if(!t||typeof t!="object")return t;const e=Array.isArray(t)?[]:{};for(const a in t)if(Object.prototype.hasOwnProperty.call(t,a)){const s=t[a];typeof s=="string"?e[a]=F.cleanInput(s):typeof s=="object"&&s!==null?e[a]=this.sanitizePayload(s):e[a]=s}return e},async handleResponse(t){if(!t.ok)throw t.status===401?console.warn("[Security Interceptor] Unauthorized access. Redirecting to login."):t.status===403&&console.error("[Security Interceptor] Forbidden resource. Permission denied."),new Error(`API Error: ${t.status} ${t.statusText}`);return await t.json()}},w=[{id:"pj-ring-001",name:"The Royal Solitaire Diamond Ring",category:"rings",categoryName:"Rings",price:4500,originalPrice:4950,rating:5,reviewsCount:48,metalOptions:[{id:"18k-gold",name:"18K Yellow Gold",hex:"#E5C158",priceMultiplier:1},{id:"rose-gold",name:"18K Rose Gold",hex:"#E8A598",priceMultiplier:1.05},{id:"platinum",name:"950 Platinum",hex:"#E2E4E9",priceMultiplier:1.25}],caratOptions:["0.50 Carat","1.00 Carat","1.50 Carat","2.00 Carat"],images:["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1000&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=1000&auto=format&fit=crop&q=80"],description:"Impeccably crafted in 18K solid gold, featuring a hand-selected VVS1 clarity oval brilliant cut diamond. Sculpted with a micro-pavé band for breathtaking brilliance.",details:["BIS Hallmarked & GIA Certified","VVS1 Clarity, E Color Diamond","Conflict-free ethically sourced gems","Complimentary custom inner band engraving"],stock:14,isBestseller:!0,isNewArrival:!1,featured:!0},{id:"pj-neck-002",name:"Aura Emerald Cascade Necklace",category:"necklaces",categoryName:"Necklaces",price:8900,originalPrice:9500,rating:4.9,reviewsCount:32,metalOptions:[{id:"18k-gold",name:"18K Yellow Gold",hex:"#E5C158",priceMultiplier:1},{id:"platinum",name:"950 Platinum",hex:"#E2E4E9",priceMultiplier:1.2}],caratOptions:["3.50 Total Carat Weight","5.00 Total Carat Weight"],images:["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&auto=format&fit=crop&q=80"],description:"An ethereal array of Zambian emeralds accented by pear-cut lab diamonds. Designed for high gala occasions and red carpet moments.",details:["Genuine natural Zambian Emeralds","Solid 18K Yellow Gold chain","Includes certificate of authenticity"],stock:5,isBestseller:!0,isNewArrival:!0,featured:!0},{id:"pj-brac-003",name:"Celeste Diamond Tennis Bracelet",category:"bracelets",categoryName:"Bracelets & Bangles",price:6200,originalPrice:6500,rating:4.95,reviewsCount:64,metalOptions:[{id:"platinum",name:"950 Platinum",hex:"#E2E4E9",priceMultiplier:1},{id:"18k-gold",name:"18K Yellow Gold",hex:"#E5C158",priceMultiplier:.95}],caratOptions:["4.00 Carat","7.00 Carat"],images:["https://images.unsplash.com/photo-1611591475168-7c8702c2e0b5?w=1000&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80"],description:"A timeless continuous loop of matched round brilliant diamonds in a four-prong setting. Features a double-locking safety clasp.",details:["F Color, VS1 Clarity Diamonds","Comfort-fit fluid linkage design","Lifetime Warranty & Free Maintenance"],stock:9,isBestseller:!0,isNewArrival:!1,featured:!0},{id:"pj-earr-004",name:"Seraphina Pearl & Diamond Earrings",category:"earrings",categoryName:"Earrings",price:3100,originalPrice:3400,rating:4.88,reviewsCount:29,metalOptions:[{id:"18k-gold",name:"18K Yellow Gold",hex:"#E5C158",priceMultiplier:1},{id:"rose-gold",name:"18K Rose Gold",hex:"#E8A598",priceMultiplier:1.05}],caratOptions:["1.20 Carat Accent"],images:["https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1000&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80"],description:"Luminous South Sea cultured pearls suspended from brilliant diamond-encrusted ear wires. Pure elegance with every movement.",details:["11mm South Sea Pearls","Secure push-back closure","Signature luxury packaging included"],stock:18,isBestseller:!1,isNewArrival:!0,featured:!1},{id:"pj-pend-005",name:"Elysium Sapphire Solitaire Pendant",category:"pendants",categoryName:"Pendants & Chains",price:3850,originalPrice:4100,rating:4.92,reviewsCount:19,metalOptions:[{id:"platinum",name:"950 Platinum",hex:"#E2E4E9",priceMultiplier:1},{id:"18k-gold",name:"18K Yellow Gold",hex:"#E5C158",priceMultiplier:.95}],caratOptions:["2.00 Carat Sapphire"],images:["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80"],description:"A deep royal blue Ceylon sapphire set in an ultra-sleek minimalist platinum pendant on an adjustable 18-inch chain.",details:["Unheated Ceylon Royal Blue Sapphire","Adjustable 16-18 inch chain length","Hallmarked 950 Platinum"],stock:7,isBestseller:!1,isNewArrival:!0,featured:!0}],V=[{id:"rings",name:"Rings",image:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80",count:42},{id:"necklaces",name:"Necklaces",image:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",count:28},{id:"bracelets",name:"Bracelets",image:"https://images.unsplash.com/photo-1611591475168-7c8702c2e0b5?w=600&auto=format&fit=crop&q=80",count:34},{id:"earrings",name:"Earrings",image:"https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80",count:51},{id:"pendants",name:"Pendants",image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80",count:19}],Y=[{id:"log-901",timestamp:"2026-07-22 12:45:10",actor:"Super Admin (You)",action:"Updated Global Pricing Matrix (+2.5% Gold Index)",status:"Success",ip:"192.168.1.100"},{id:"log-902",timestamp:"2026-07-22 11:20:04",actor:"System Middleware",action:"XSS Attack Blocked on Search Input",status:"Prevented",ip:"185.220.101.5"},{id:"log-903",timestamp:"2026-07-22 09:15:30",actor:"Admin (Store Manager)",action:"Approved Order #PJ-ORD-8849",status:"Success",ip:"192.168.1.105"},{id:"log-904",timestamp:"2026-07-21 18:30:22",actor:"Super Admin",action:"Granted Manager Permissions to user: sarah.j@pramo.com",status:"Success",ip:"192.168.1.100"}],Z=[{id:"PJ-ORD-8849",customer:"Lady Eleanor Vance",date:"2026-07-22",total:10700,itemsCount:2,status:"Processing",payment:"Paid (Card)"},{id:"PJ-ORD-8848",customer:"Arthur Pendelton",date:"2026-07-21",total:4500,itemsCount:1,status:"Shipped",payment:"Paid (UPI)"},{id:"PJ-ORD-8847",customer:"Dr. Evelyn Reed",date:"2026-07-20",total:8900,itemsCount:1,status:"Delivered",payment:"Paid (Card)"}],E="http://127.0.0.1:8000/api/v1",X={async getProducts(t={}){try{const e=y.sanitizePayload(t),a=new URL(`${E}/products`);Object.keys(e).forEach(r=>a.searchParams.append(r,e[r]));const s=await fetch(a.toString(),{headers:y.getSecureHeaders()});return await y.handleResponse(s)}catch{console.info("[APIService] Using fallback mock data for products");let a=[...w];if(t.category&&t.category!=="all"&&(a=a.filter(s=>s.category===t.category)),t.search){const s=t.search.toLowerCase();a=a.filter(r=>r.name.toLowerCase().includes(s)||r.description.toLowerCase().includes(s))}return t.maxPrice&&(a=a.filter(s=>s.price<=Number(t.maxPrice))),a}},async getProductById(t){try{const e=await fetch(`${E}/products/${t}`,{headers:y.getSecureHeaders()});return await y.handleResponse(e)}catch{return w.find(s=>s.id===t)||w[0]}},async getCategories(){return V},async getAdminOrders(){return Z},async getSuperAdminAuditLogs(){return Y},async submitOrder(t){const e=y.sanitizePayload(t);return{success:!0,orderId:`PJ-ORD-${Math.floor(1e3+Math.random()*9e3)}`,status:"Confirmed",estimatedDelivery:"3-5 Business Days",amountPaid:e.totalAmount}}};function Q(t="cart-drawer-container"){var v,x,c;const e=document.getElementById(t);if(!e)return;const a=o.cart,s=o.getCartTotal(),r=5e3,i=Math.max(0,r-s);e.innerHTML=`
    <!-- Cart Slide-Over Drawer -->
    <div id="cart-drawer" class="fixed inset-0 z-50 overflow-hidden transform translate-x-full transition-transform duration-500 ease-in-out">
      <div class="absolute inset-0 bg-[#1F1F1F]/50 backdrop-blur-sm" id="cart-drawer-backdrop"></div>

      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-[#F8F6F2] shadow-2xl flex flex-col justify-between">
          
          <!-- Drawer Header -->
          <div class="p-6 border-b border-[#D7D0C5] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h3 class="font-serif text-xl font-light text-[#1F1F1F] tracking-wide">YOUR SHOPPING BAG</h3>
              <span class="text-xs bg-[#C7A76C]/20 text-[#9E7C42] px-2 py-0.5 rounded-full font-bold">
                ${o.getCartCount()}
              </span>
            </div>
            <button id="cart-drawer-close" class="p-2 text-[#1F1F1F] hover:text-[#C7A76C] transition-colors">
              <i data-lucide="x" class="w-6 h-6"></i>
            </button>
          </div>

          <!-- Free Shipping Indicator -->
          <div class="bg-[#EDE7DD] px-6 py-3 border-b border-[#D7D0C5]">
            ${i>0?`
              <p class="text-xs text-[#5F5F5F]">Add <strong class="text-[#1F1F1F]">${o.formatPrice(i)}</strong> more for complimentary insured delivery.</p>
              <div class="w-full bg-[#D7D0C5] h-1.5 rounded-full mt-2 overflow-hidden">
                <div class="bg-[#C7A76C] h-full transition-all duration-300" style="width: ${Math.min(100,s/r*100)}%"></div>
              </div>
            `:`
              <p class="text-xs text-[#6F8F72] font-semibold flex items-center gap-1">
                ✓ Congratulations! You unlocked complimentary insured express delivery.
              </p>
            `}
          </div>

          <!-- Cart Items List -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            ${a.length===0?`
              <div class="text-center py-16 text-[#5F5F5F] space-y-3">
                <p class="font-serif text-lg">Your shopping bag is empty.</p>
                <a href="/user/shop.html" class="inline-block gold-btn px-6 py-2.5 text-xs font-semibold rounded uppercase tracking-wider">
                  Explore High Jewellery
                </a>
              </div>
            `:a.map((l,f)=>`
              <div class="flex gap-4 pb-6 border-b border-[#D7D0C5] relative group">
                <img src="${l.image}" alt="${l.name}" class="w-20 h-24 object-cover rounded bg-[#EDE7DD]">
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 class="font-serif text-sm font-semibold text-[#1F1F1F] leading-snug">${l.name}</h4>
                    <p class="text-[11px] text-[#5F5F5F] mt-0.5">${l.metal} | ${l.carat}</p>
                    ${l.engraving?`<p class="text-[10px] text-[#C7A76C] italic mt-0.5">Engraving: "${F.escapeHTML(l.engraving)}"</p>`:""}
                  </div>

                  <div class="flex items-center justify-between mt-3">
                    <div class="flex items-center border border-[#D7D0C5] rounded bg-white">
                      <button data-cart-action="dec" data-index="${f}" class="px-2 py-1 text-xs hover:bg-[#EDE7DD]">
                        <i data-lucide="minus" class="w-3 h-3"></i>
                      </button>
                      <span class="px-3 text-xs font-semibold">${l.quantity}</span>
                      <button data-cart-action="inc" data-index="${f}" class="px-2 py-1 text-xs hover:bg-[#EDE7DD]">
                        <i data-lucide="plus" class="w-3 h-3"></i>
                      </button>
                    </div>

                    <span class="font-serif text-sm font-bold text-[#1F1F1F]">
                      ${o.formatPrice(l.price*l.quantity)}
                    </span>
                  </div>
                </div>

                <button data-cart-action="remove" data-index="${f}" class="absolute top-0 right-0 p-1 text-[#5F5F5F] hover:text-[#A33A3A] transition-colors">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            `).join("")}
          </div>

          <!-- Drawer Footer -->
          ${a.length>0?`
            <div class="p-6 border-t border-[#D7D0C5] bg-white space-y-4">
              <div class="flex justify-between items-center text-sm font-serif">
                <span class="text-[#5F5F5F]">Subtotal</span>
                <span class="text-xl font-bold text-[#1F1F1F]">${o.formatPrice(s)}</span>
              </div>
              <p class="text-[11px] text-[#5F5F5F]">Taxes and duties calculated at checkout.</p>
              
              <a href="/user/checkout.html" class="w-full gold-btn py-3.5 rounded text-xs font-semibold uppercase tracking-widest text-center flex justify-center items-center gap-2">
                PROCEED TO CHECKOUT <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>
          `:""}

        </div>
      </div>
    </div>

    <!-- Live Search Modal -->
    <div id="search-modal" class="fixed inset-0 z-50 bg-[#1F1F1F]/60 backdrop-blur-md hidden flex items-start justify-center pt-20 px-4">
      <div class="bg-[#F8F6F2] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-[#D7D0C5]">
        <div class="p-4 border-b border-[#D7D0C5] flex items-center gap-3">
          <i data-lucide="search" class="w-5 h-5 text-[#C7A76C]"></i>
          <input type="text" id="live-search-input" placeholder="Search solitaire rings, emerald necklaces, diamond bracelets..." class="w-full bg-transparent text-sm focus:outline-none text-[#1F1F1F]">
          <button id="search-modal-close" class="text-[#5F5F5F] hover:text-[#1F1F1F]">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div id="live-search-results" class="p-6 max-h-96 overflow-y-auto space-y-3">
          <p class="text-xs text-[#5F5F5F] text-center">Start typing to search our fine jewellery catalog...</p>
        </div>
      </div>
    </div>
  `,C({icons:{X:P,Trash2:K,Plus:G,Minus:H,Search:I,ArrowRight:k}}),(v=document.getElementById("cart-drawer-close"))==null||v.addEventListener("click",()=>o.closeCartDrawer()),(x=document.getElementById("cart-drawer-backdrop"))==null||x.addEventListener("click",()=>o.closeCartDrawer()),e.querySelectorAll("[data-cart-action]").forEach(l=>{l.addEventListener("click",f=>{const b=l.getAttribute("data-cart-action"),m=parseInt(l.getAttribute("data-index"),10);b==="inc"&&o.updateQuantity(m,o.cart[m].quantity+1),b==="dec"&&o.updateQuantity(m,o.cart[m].quantity-1),b==="remove"&&o.removeFromCart(m)})});const n=document.getElementById("search-modal"),g=document.getElementById("search-modal-close"),u=document.getElementById("live-search-input"),h=document.getElementById("live-search-results");(c=document.getElementById("search-modal-trigger"))==null||c.addEventListener("click",()=>{n==null||n.classList.remove("hidden"),u==null||u.focus()}),g==null||g.addEventListener("click",()=>n==null?void 0:n.classList.add("hidden")),u==null||u.addEventListener("input",async l=>{const f=l.target.value.trim();if(!f){h&&(h.innerHTML='<p class="text-xs text-[#5F5F5F] text-center">Start typing to search...</p>');return}const b=await X.getProducts({search:f});h&&(b.length===0?h.innerHTML='<p class="text-xs text-[#A33A3A] text-center">No fine jewellery matching your search criteria.</p>':h.innerHTML=b.map(m=>`
          <a href="/user/product.html?id=${m.id}" class="flex items-center gap-4 p-2 hover:bg-[#EDE7DD] rounded transition-colors">
            <img src="${m.images[0]}" alt="${m.name}" class="w-12 h-12 object-cover rounded">
            <div>
              <h5 class="font-serif text-sm font-semibold text-[#1F1F1F]">${m.name}</h5>
              <p class="text-xs text-[#C7A76C]">${o.formatPrice(m.price)}</p>
            </div>
          </a>
        `).join(""))}),o.subscribe(()=>Q(t))}export{X as A,T as G,j as H,_ as L,G as P,p as R,J as S,K as T,S as a,te as b,C as c,d,Q as e,q as f,ee as r,o as s};
