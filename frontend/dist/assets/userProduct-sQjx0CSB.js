import{d as l,s as c,c as u,G as g,f as p,H as h,A as b,r as E,b as v,e as C}from"./modal-Bwvivhk1.js";/* empty css             *//**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=["svg",l,[["path",{d:"M20 6 9 17l-5-5"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=["svg",l,[["path",{d:"m6 9 6 6 6-6"}]]];/**
 * @license lucide v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=["svg",l,[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]]],L={product:null,selectedMetal:null,selectedCarat:null,engravingText:"",async init(){const r=new URLSearchParams(window.location.search).get("id")||"pj-ring-001";this.product=await b.getProductById(r),this.product&&(this.selectedMetal=this.product.metalOptions[0],this.selectedCarat=this.product.caratOptions[0],this.renderPDP(),this.attachEventListeners())},renderPDP(){const e=this.product,r=c.isInWishlist(e.id);document.getElementById("p-name").textContent=e.name,document.getElementById("p-category").textContent=e.categoryName.toUpperCase(),document.getElementById("p-price").textContent=c.formatPrice(e.price),document.getElementById("p-description").textContent=e.description;const a=document.getElementById("main-p-image");a&&(a.src=e.images[0]);const s=document.getElementById("p-thumbnails");s&&(s.innerHTML=e.images.map((n,d)=>`
        <button class="thumb-btn border-2 rounded overflow-hidden w-16 h-16 ${d===0?"border-[#C7A76C]":"border-transparent"}" data-img="${n}">
          <img src="${n}" alt="${e.name}" class="w-full h-full object-cover">
        </button>
      `).join(""));const i=document.getElementById("p-metals");i&&(i.innerHTML=e.metalOptions.map(n=>`
        <button data-metal-id="${n.id}" class="metal-btn px-4 py-2 text-xs rounded border flex items-center gap-2 ${n.id===this.selectedMetal.id?"border-[#C7A76C] bg-[#EDE7DD] font-semibold":"border-[#D7D0C5]"}">
          <span class="w-3.5 h-3.5 rounded-full border border-black/20" style="background-color: ${n.hex}"></span>
          ${n.name}
        </button>
      `).join(""));const o=document.getElementById("p-carats");o&&(o.innerHTML=e.caratOptions.map(n=>`
        <button data-carat-val="${n}" class="carat-btn px-4 py-2 text-xs rounded border ${n===this.selectedCarat?"border-[#C7A76C] bg-[#EDE7DD] font-semibold":"border-[#D7D0C5]"}">
          ${n}
        </button>
      `).join(""));const t=document.getElementById("p-wishlist-btn");t&&(t.innerHTML=`<i data-lucide="heart" class="w-5 h-5 ${r?"fill-[#A33A3A] text-[#A33A3A]":""}"></i>`),u({icons:{Heart:h,ShieldCheck:p,Gem:g,Ruler:I,Check:y,ChevronDown:f}})},attachEventListeners(){var s,i,o;document.querySelectorAll(".thumb-btn").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-img"),d=document.getElementById("main-p-image");d&&(d.src=n),document.querySelectorAll(".thumb-btn").forEach(m=>m.classList.replace("border-[#C7A76C]","border-transparent")),t.classList.replace("border-transparent","border-[#C7A76C]")})}),document.querySelectorAll(".metal-btn").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-metal-id");this.selectedMetal=this.product.metalOptions.find(d=>d.id===n),this.renderPDP()})}),document.querySelectorAll(".carat-btn").forEach(t=>{t.addEventListener("click",()=>{this.selectedCarat=t.getAttribute("data-carat-val"),this.renderPDP()})});const e=document.getElementById("engraving-input"),r=document.getElementById("engraving-preview");e==null||e.addEventListener("input",t=>{this.engravingText=t.target.value,r&&(r.textContent=t.target.value?`Live Inner Band Engraving: "${t.target.value}"`:"")}),(s=document.getElementById("add-to-bag-btn"))==null||s.addEventListener("click",()=>{c.addToCart(this.product,this.selectedMetal.name,this.selectedCarat,this.engravingText)});const a=document.getElementById("size-guide-modal");(i=document.getElementById("open-size-guide"))==null||i.addEventListener("click",()=>a==null?void 0:a.classList.remove("hidden")),(o=document.getElementById("close-size-guide"))==null||o.addEventListener("click",()=>a==null?void 0:a.classList.add("hidden"))}};document.addEventListener("DOMContentLoaded",()=>{E(),v(),C(),L.init()});
