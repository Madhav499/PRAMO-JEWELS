import { create } from 'zustand';
import { Product, ProductCategory, MetalType } from '@/types';

interface ProductState {
  products: Product[];
  selectedCategory: ProductCategory | 'ALL';
  selectedMetal: MetalType | 'ALL';
  searchQuery: string;
  sortBy: 'FEATURED' | 'PRICE_LOW_HIGH' | 'PRICE_HIGH_LOW' | 'RATING';
  setCategory: (cat: ProductCategory | 'ALL') => void;
  setMetalFilter: (metal: MetalType | 'ALL') => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: ProductState['sortBy']) => void;
  getFilteredProducts: () => Product[];
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'pj_prod_01',
    sku: 'PJ-RNG-LOTUS-01',
    name: 'Royal Lotus Solitaire Diamond Ring',
    category: 'RINGS',
    metalType: '22K_GOLD',
    purity: '22K (916 BIS Hallmarked)',
    metalWeightGram: 6.8,
    makingChargePerGram: 650,
    gemstoneCost: 45000,
    price: 98420,
    stockStatus: 'IN_STOCK',
    stockQuantity: 12,
    description: 'An iconic heritage ring featuring a 1.2-carat solitaire held by six intricate lotus-petaled gold prongs, handcrafted in 22K yellow gold with fine filigree detailing.',
    huidVerified: true,
    certificateType: 'IGI',
    certificateNumber: 'IGI-IND-2026-88912',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 38,
    isBestSeller: true,
    isNewArrival: true,
    featuredCollection: 'Royal Heritage'
  },
  {
    id: 'pj_prod_02',
    sku: 'PJ-NCK-KUNDAN-02',
    name: 'Jaipur Royal Kundan & Emerald Haar',
    category: 'NECKLACES',
    metalType: '22K_GOLD',
    purity: '22K (916 BIS Hallmarked)',
    metalWeightGram: 42.5,
    makingChargePerGram: 850,
    gemstoneCost: 85000,
    price: 427100,
    stockStatus: 'IN_STOCK',
    stockQuantity: 4,
    description: 'A breathtaking bridal statement necklace incorporating uncut Kundan glass, hand-carved Zambian emerald drops, and Meenakari enamel art on the reverse side.',
    huidVerified: true,
    certificateType: 'BIS_HALLMARK',
    certificateNumber: 'BIS-HUID-JP-77120',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 19,
    isBestSeller: true,
    featuredCollection: 'Bridal Kundan'
  },
  {
    id: 'pj_prod_03',
    sku: 'PJ-EAR-DMD-03',
    name: 'Celestial Cascade Diamond Jhumkas',
    category: 'EARRINGS',
    metalType: '18K_ROSE_GOLD',
    purity: '18K (750 Rose Gold)',
    metalWeightGram: 14.2,
    makingChargePerGram: 720,
    gemstoneCost: 62000,
    price: 155980,
    stockStatus: 'IN_STOCK',
    stockQuantity: 8,
    description: 'Modern Indian luxury jhumkas crafted in 18K rose gold, studded with brilliant round and marquise diamonds that shimmer gracefully with every motion.',
    huidVerified: true,
    certificateType: 'GIA',
    certificateNumber: 'GIA-221908442',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 26,
    isNewArrival: true,
    featuredCollection: 'Everyday Luxury'
  },
  {
    id: 'pj_prod_04',
    sku: 'PJ-BNG-KARA-04',
    name: 'Mayura Carved Gold Kara Bangles (Pair)',
    category: 'BRACELETS',
    metalType: '22K_GOLD',
    purity: '22K (916 BIS Hallmarked)',
    metalWeightGram: 38.0,
    makingChargePerGram: 600,
    gemstoneCost: 0,
    price: 296400,
    stockStatus: 'IN_STOCK',
    stockQuantity: 6,
    description: 'Solid 22K yellow gold openable karas embellished with hand-engraved peacock motifs and subtle ruby eye accents.',
    huidVerified: true,
    certificateType: 'BIS_HALLMARK',
    certificateNumber: 'BIS-HUID-HYD-55410',
    images: [
      'https://images.unsplash.com/photo-1611591475143-be88404a37f5?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 42,
    isBestSeller: true,
    featuredCollection: 'Royal Heritage'
  },
  {
    id: 'pj_prod_05',
    sku: 'PJ-PND-RUBY-05',
    name: 'Imperial Ruby & Diamond Crest Pendant',
    category: 'PENDANTS',
    metalType: '950_PLATINUM',
    purity: '950 Platinum',
    metalWeightGram: 8.5,
    makingChargePerGram: 900,
    gemstoneCost: 78000,
    price: 114725,
    stockStatus: 'IN_STOCK',
    stockQuantity: 10,
    description: 'A regal pendant boasting a natural pigeon-blood oval ruby enveloped by a double halo of pave-set VVS diamonds set in pure 950 Platinum.',
    huidVerified: true,
    certificateType: 'IGI',
    certificateNumber: 'IGI-PLAT-90012',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 15,
    featuredCollection: 'Solitaire Diamonds'
  },
  {
    id: 'pj_prod_06',
    sku: 'PJ-COIN-24K-06',
    name: 'Pramo Goddess Lakshmi 24K Pure Gold Coin (10g)',
    category: 'COINS',
    metalType: '24K_GOLD',
    purity: '24K (999.9 Fine Pure Gold)',
    metalWeightGram: 10.0,
    makingChargePerGram: 150,
    gemstoneCost: 0,
    price: 80000,
    stockStatus: 'IN_STOCK',
    stockQuantity: 50,
    description: 'Assayed 10-gram 24K pure gold coin minted with 999.9 purity, featuring an embossed Goddess Lakshmi for prosperity and wealth preservation.',
    huidVerified: true,
    certificateType: 'BIS_HALLMARK',
    certificateNumber: 'BIS-COIN-999-1002',
    images: [
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 114,
    isBestSeller: true,
    featuredCollection: 'Gold Coins & Bullion'
  }
];

export const useProductStore = create<ProductState>((set, get) => ({
  products: INITIAL_PRODUCTS,
  selectedCategory: 'ALL',
  selectedMetal: 'ALL',
  searchQuery: '',
  sortBy: 'FEATURED',

  setCategory: (selectedCategory) => set({ selectedCategory }),
  setMetalFilter: (selectedMetal) => set({ selectedMetal }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),

  getFilteredProducts: () => {
    const { products, selectedCategory, selectedMetal, searchQuery, sortBy } = get();

    return products
      .filter((product) => {
        const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
        const matchesMetal = selectedMetal === 'ALL' || product.metalType === selectedMetal;
        const matchesQuery =
          searchQuery === '' ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesMetal && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_LOW_HIGH') return a.price - b.price;
        if (sortBy === 'PRICE_HIGH_LOW') return b.price - a.price;
        if (sortBy === 'RATING') return b.rating - a.rating;
        return 0; // Default FEATURED
      });
  },
}));
