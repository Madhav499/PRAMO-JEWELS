/**
 * Pramo Jewels Master Mock Data Repository
 * Production-ready datasets for Products, Categories, Collections, User Profiles, Orders, and Super Admin System Logs.
 */

export const MOCK_PRODUCTS = [
  {
    id: 'pj-ring-001',
    name: 'The Royal Solitaire Diamond Ring',
    category: 'rings',
    categoryName: 'Rings',
    price: 4500,
    originalPrice: 4950,
    rating: 5.0,
    reviewsCount: 48,
    metalOptions: [
      { id: '18k-gold', name: '18K Yellow Gold', hex: '#E5C158', priceMultiplier: 1.0 },
      { id: 'rose-gold', name: '18K Rose Gold', hex: '#E8A598', priceMultiplier: 1.05 },
      { id: 'platinum', name: '950 Platinum', hex: '#E2E4E9', priceMultiplier: 1.25 }
    ],
    caratOptions: ['0.50 Carat', '1.00 Carat', '1.50 Carat', '2.00 Carat'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Impeccably crafted in 18K solid gold, featuring a hand-selected VVS1 clarity oval brilliant cut diamond. Sculpted with a micro-pavé band for breathtaking brilliance.',
    details: [
      'BIS Hallmarked & GIA Certified',
      'VVS1 Clarity, E Color Diamond',
      'Conflict-free ethically sourced gems',
      'Complimentary custom inner band engraving'
    ],
    stock: 14,
    isBestseller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'pj-neck-002',
    name: 'Aura Emerald Cascade Necklace',
    category: 'necklaces',
    categoryName: 'Necklaces',
    price: 8900,
    originalPrice: 9500,
    rating: 4.9,
    reviewsCount: 32,
    metalOptions: [
      { id: '18k-gold', name: '18K Yellow Gold', hex: '#E5C158', priceMultiplier: 1.0 },
      { id: 'platinum', name: '950 Platinum', hex: '#E2E4E9', priceMultiplier: 1.2 }
    ],
    caratOptions: ['3.50 Total Carat Weight', '5.00 Total Carat Weight'],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'An ethereal array of Zambian emeralds accented by pear-cut lab diamonds. Designed for high gala occasions and red carpet moments.',
    details: [
      'Genuine natural Zambian Emeralds',
      'Solid 18K Yellow Gold chain',
      'Includes certificate of authenticity'
    ],
    stock: 5,
    isBestseller: true,
    isNewArrival: true,
    featured: true
  },
  {
    id: 'pj-brac-003',
    name: 'Celeste Diamond Tennis Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets & Bangles',
    price: 6200,
    originalPrice: 6500,
    rating: 4.95,
    reviewsCount: 64,
    metalOptions: [
      { id: 'platinum', name: '950 Platinum', hex: '#E2E4E9', priceMultiplier: 1.0 },
      { id: '18k-gold', name: '18K Yellow Gold', hex: '#E5C158', priceMultiplier: 0.95 }
    ],
    caratOptions: ['4.00 Carat', '7.00 Carat'],
    images: [
      'https://images.unsplash.com/photo-1611591475168-7c8702c2e0b5?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'A timeless continuous loop of matched round brilliant diamonds in a four-prong setting. Features a double-locking safety clasp.',
    details: [
      'F Color, VS1 Clarity Diamonds',
      'Comfort-fit fluid linkage design',
      'Lifetime Warranty & Free Maintenance'
    ],
    stock: 9,
    isBestseller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'pj-earr-004',
    name: 'Seraphina Pearl & Diamond Earrings',
    category: 'earrings',
    categoryName: 'Earrings',
    price: 3100,
    originalPrice: 3400,
    rating: 4.88,
    reviewsCount: 29,
    metalOptions: [
      { id: '18k-gold', name: '18K Yellow Gold', hex: '#E5C158', priceMultiplier: 1.0 },
      { id: 'rose-gold', name: '18K Rose Gold', hex: '#E8A598', priceMultiplier: 1.05 }
    ],
    caratOptions: ['1.20 Carat Accent'],
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'Luminous South Sea cultured pearls suspended from brilliant diamond-encrusted ear wires. Pure elegance with every movement.',
    details: [
      '11mm South Sea Pearls',
      'Secure push-back closure',
      'Signature luxury packaging included'
    ],
    stock: 18,
    isBestseller: false,
    isNewArrival: true,
    featured: false
  },
  {
    id: 'pj-pend-005',
    name: 'Elysium Sapphire Solitaire Pendant',
    category: 'pendants',
    categoryName: 'Pendants & Chains',
    price: 3850,
    originalPrice: 4100,
    rating: 4.92,
    reviewsCount: 19,
    metalOptions: [
      { id: 'platinum', name: '950 Platinum', hex: '#E2E4E9', priceMultiplier: 1.0 },
      { id: '18k-gold', name: '18K Yellow Gold', hex: '#E5C158', priceMultiplier: 0.95 }
    ],
    caratOptions: ['2.00 Carat Sapphire'],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80'
    ],
    description: 'A deep royal blue Ceylon sapphire set in an ultra-sleek minimalist platinum pendant on an adjustable 18-inch chain.',
    details: [
      'Unheated Ceylon Royal Blue Sapphire',
      'Adjustable 16-18 inch chain length',
      'Hallmarked 950 Platinum'
    ],
    stock: 7,
    isBestseller: false,
    isNewArrival: true,
    featured: true
  }
];

export const MOCK_CATEGORIES = [
  { id: 'rings', name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80', count: 42 },
  { id: 'necklaces', name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80', count: 28 },
  { id: 'bracelets', name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591475168-7c8702c2e0b5?w=600&auto=format&fit=crop&q=80', count: 34 },
  { id: 'earrings', name: 'Earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80', count: 51 },
  { id: 'pendants', name: 'Pendants', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80', count: 19 }
];

export const MOCK_SUPER_ADMIN_AUDIT_LOGS = [
  { id: 'log-901', timestamp: '2026-07-22 12:45:10', actor: 'Super Admin (You)', action: 'Updated Global Pricing Matrix (+2.5% Gold Index)', status: 'Success', ip: '192.168.1.100' },
  { id: 'log-902', timestamp: '2026-07-22 11:20:04', actor: 'System Middleware', action: 'XSS Attack Blocked on Search Input', status: 'Prevented', ip: '185.220.101.5' },
  { id: 'log-903', timestamp: '2026-07-22 09:15:30', actor: 'Admin (Store Manager)', action: 'Approved Order #PJ-ORD-8849', status: 'Success', ip: '192.168.1.105' },
  { id: 'log-904', timestamp: '2026-07-21 18:30:22', actor: 'Super Admin', action: 'Granted Manager Permissions to user: sarah.j@pramo.com', status: 'Success', ip: '192.168.1.100' }
];

export const MOCK_ORDERS = [
  { id: 'PJ-ORD-8849', customer: 'Lady Eleanor Vance', date: '2026-07-22', total: 10700, itemsCount: 2, status: 'Processing', payment: 'Paid (Card)' },
  { id: 'PJ-ORD-8848', customer: 'Arthur Pendelton', date: '2026-07-21', total: 4500, itemsCount: 1, status: 'Shipped', payment: 'Paid (UPI)' },
  { id: 'PJ-ORD-8847', customer: 'Dr. Evelyn Reed', date: '2026-07-20', total: 8900, itemsCount: 1, status: 'Delivered', payment: 'Paid (Card)' }
];
