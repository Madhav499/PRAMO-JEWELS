import{r as i,b as o,e as n,A as d,s as r}from"./modal-Bwvivhk1.js";/* empty css             */document.addEventListener("DOMContentLoaded",async()=>{i(),o(),n();const t=document.getElementById("account-wishlist-grid"),s=(await d.getProducts()).filter(e=>r.isInWishlist(e.id));t&&(s.length===0?t.innerHTML='<p class="text-xs text-[#5F5F5F] col-span-full">No saved items in your wishlist.</p>':t.innerHTML=s.map(e=>`
            <div class="bg-white rounded border border-[#D7D0C5] p-4 text-xs space-y-2">
              <img src="${e.images[0]}" alt="${e.name}" class="w-full h-40 object-cover rounded bg-[#EDE7DD]">
              <h4 class="font-serif font-semibold text-[#1F1F1F]">${e.name}</h4>
              <p class="font-bold text-[#C7A76C]">${r.formatPrice(e.price)}</p>
              <a href="/user/product.html?id=${e.id}" class="block text-center gold-btn py-2 rounded text-[11px] font-semibold">View Piece</a>
            </div>
          `).join(""))});
