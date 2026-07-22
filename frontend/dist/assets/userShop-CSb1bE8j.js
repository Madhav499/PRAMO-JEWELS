import{d as o,s as l,A as d,c,S as g,H as u,r as h,b as f,e as p}from"./modal-Bwvivhk1.js";/* empty css             *//**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=["svg",o,[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]]],m={activeFilters:{category:"all",maxPrice:1e4,metal:"all",sort:"featured"},gridMode:"4-col",async init(){this.readUrlParams(),await this.renderCatalog(),this.attachEventListeners()},readUrlParams(){const t=new URLSearchParams(window.location.search);t.has("category")&&(this.activeFilters.category=t.get("category"))},async renderCatalog(){var s;const t=document.getElementById("product-grid");if(!t)return;t.innerHTML='<div class="col-span-full text-center py-20 text-xs text-[#5F5F5F]">Loading fine jewellery catalog...</div>';let e=await d.getProducts(this.activeFilters);this.activeFilters.sort==="price-low"?e.sort((r,n)=>r.price-n.price):this.activeFilters.sort==="price-high"?e.sort((r,n)=>n.price-r.price):this.activeFilters.sort==="rating"&&e.sort((r,n)=>n.rating-r.rating);const a=document.getElementById("catalog-count");if(a&&(a.textContent=`${e.length} Items`),e.length===0){t.innerHTML=`
        <div class="col-span-full text-center py-20 space-y-4">
          <p class="font-serif text-lg text-[#1F1F1F]">No fine jewellery pieces found.</p>
          <button id="clear-filters-btn" class="gold-outline-btn px-6 py-2 rounded text-xs">Reset All Filters</button>
        </div>
      `,(s=document.getElementById("clear-filters-btn"))==null||s.addEventListener("click",()=>this.resetFilters());return}const i=this.gridMode==="2-col"?"grid-cols-1 md:grid-cols-2 gap-8":"grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";t.className=`grid ${i}`,t.innerHTML=e.map(r=>this.renderProductCard(r)).join(""),c({icons:{Heart:u,Eye:v,ShoppingBag:g}}),this.attachCardEvents(e)},renderProductCard(t){const e=l.isInWishlist(t.id);return`
      <div class="group relative bg-white rounded-lg border border-[#D7D0C5] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300">
        
        <!-- Image & Badges -->
        <div class="relative aspect-square overflow-hidden bg-[#EDE7DD]">
          <img src="${t.images[0]}" alt="${t.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
          
          ${t.isNewArrival?'<span class="absolute top-3 left-3 bg-[#1F1F1F] text-[#F8F6F2] text-[10px] uppercase font-bold px-2.5 py-1 rounded">New</span>':""}
          ${t.isBestseller?'<span class="absolute top-3 left-3 bg-[#C7A76C] text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded">Bestseller</span>':""}

          <!-- Wishlist Toggle -->
          <button data-wishlist-id="${t.id}" class="wishlist-btn absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-[#1F1F1F] hover:text-[#A33A3A] transition-colors shadow">
            <i data-lucide="heart" class="w-4 h-4 ${e?"fill-[#A33A3A] text-[#A33A3A]":""}"></i>
          </button>
        </div>

        <!-- Details -->
        <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
          <div>
            <span class="text-[10px] uppercase tracking-widest text-[#5F5F5F] font-semibold">${t.categoryName}</span>
            <a href="/user/product.html?id=${t.id}">
              <h3 class="font-serif text-base font-semibold text-[#1F1F1F] hover:text-[#C7A76C] transition-colors leading-snug mt-1">${t.name}</h3>
            </a>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-[#EDE7DD]">
            <div>
              <span class="font-serif text-lg font-bold text-[#1F1F1F]">${l.formatPrice(t.price)}</span>
              ${t.originalPrice?`<span class="text-xs text-[#5F5F5F] line-through ml-2">${l.formatPrice(t.originalPrice)}</span>`:""}
            </div>

            <button data-quick-add="${t.id}" class="p-2.5 gold-btn rounded-full hover:scale-110 transition-transform" title="Quick Add to Bag">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `},attachCardEvents(t){document.querySelectorAll(".wishlist-btn").forEach(e=>{e.addEventListener("click",a=>{const i=e.getAttribute("data-wishlist-id");l.toggleWishlist(i),this.renderCatalog()})}),document.querySelectorAll("[data-quick-add]").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-quick-add"),i=t.find(s=>s.id===a);i&&l.addToCart(i)})})},attachEventListeners(){var t,e,a,i,s;(t=document.getElementById("category-filter"))==null||t.addEventListener("change",r=>{this.activeFilters.category=r.target.value,this.renderCatalog()}),(e=document.getElementById("price-range"))==null||e.addEventListener("input",r=>{this.activeFilters.maxPrice=r.target.value,document.getElementById("price-val").textContent=l.formatPrice(r.target.value),this.renderCatalog()}),(a=document.getElementById("sort-filter"))==null||a.addEventListener("change",r=>{this.activeFilters.sort=r.target.value,this.renderCatalog()}),(i=document.getElementById("grid-2col"))==null||i.addEventListener("click",()=>{this.gridMode="2-col",this.renderCatalog()}),(s=document.getElementById("grid-4col"))==null||s.addEventListener("click",()=>{this.gridMode="4-col",this.renderCatalog()})},resetFilters(){this.activeFilters={category:"all",maxPrice:1e4,metal:"all",sort:"featured"},this.renderCatalog()}};document.addEventListener("DOMContentLoaded",()=>{h(),f(),p(),m.init()});
