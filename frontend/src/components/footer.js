/**
 * Pramo Jewels Footer Component
 * Renders luxury brand footer, newsletter signup, security trust seals, and legal links.
 */

import { createIcons, ShieldCheck, Gem, Award, Lock, ArrowRight } from 'lucide';
import { Sanitizer } from '../middleware/sanitizer.js';

export function renderFooter(containerId = 'footer-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
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
  `;

  createIcons({
    icons: { ShieldCheck, Gem, Award, Lock, ArrowRight }
  });

  // Newsletter Submit Listener
  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const msg = document.getElementById('newsletter-msg');
    
    if (emailInput && Sanitizer.isValidEmail(emailInput.value)) {
      if (msg) {
        msg.textContent = 'Thank you for subscribing to The Pramo Gazette.';
        msg.classList.remove('hidden');
      }
      emailInput.value = '';
    } else if (msg) {
      msg.textContent = 'Please enter a valid email address.';
      msg.classList.remove('hidden');
      msg.classList.replace('text-[#6F8F72]', 'text-[#A33A3A]');
    }
  });
}
