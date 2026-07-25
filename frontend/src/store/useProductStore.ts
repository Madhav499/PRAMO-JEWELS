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
    sku: 'PJ-GLD-NCK-01',
    name: 'Jaipur Royal 22K Gold Haar Necklace',
    category: 'GOLD_JEWELLERY',
    metalType: '22K_GOLD',
    purity: '22K (916 BIS Hallmarked)',
    metalWeightGram: 42.5,
    makingChargePerGram: 650,
    price: 333625,
    stockStatus: 'IN_STOCK',
    stockQuantity: 6,
    description: 'An majestic 22K yellow gold bridal necklace featuring traditional hand-chiselled filigree motifs and royal heritage proportions.',
    huidVerified: true,
    certificateType: 'BIS_HALLMARK',
    certificateNumber: 'BIS-HUID-JP-77120',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 42,
    isBestSeller: true,
    isNewArrival: true,
    featuredCollection: 'Royal Heritage'
  },
  {
    id: 'pj_prod_02',
    sku: 'PJ-GLD-BNG-02',
    name: 'Mayura Carved 22K Gold Karas (Pair)',
    category: 'GOLD_JEWELLERY',
    metalType: '22K_GOLD',
    purity: '22K (916 BIS Hallmarked)',
    metalWeightGram: 38.0,
    makingChargePerGram: 600,
    price: 296400,
    stockStatus: 'IN_STOCK',
    stockQuantity: 8,
    description: 'Solid 22K yellow gold openable karas embellished with hand-engraved peacock motifs and polished inner comfort fit.',
    huidVerified: true,
    certificateType: 'BIS_HALLMARK',
    certificateNumber: 'BIS-HUID-HYD-55410',
    images: [
      'https://images.unsplash.com/photo-1611591475143-be88404a37f5?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 36,
    isBestSeller: true,
    featuredCollection: 'Royal Heritage'
  },
  {
    id: 'pj_prod_03',
    sku: 'PJ-COIN-GLD-10G',
    name: 'Goddess Lakshmi 24K Pure Gold Coin (10g)',
    category: 'GOLD_COINS',
    metalType: '24K_GOLD',
    purity: '24K (999.9 Fine Pure Gold)',
    metalWeightGram: 10.0,
    makingChargePerGram: 150,
    price: 80000,
    stockStatus: 'IN_STOCK',
    stockQuantity: 50,
    description: 'Assayed 10-gram 24K pure gold coin minted with 999.9 purity, featuring an embossed Goddess Lakshmi for prosperity and wealth preservation.',
    huidVerified: true,
    certificateType: 'ASSAY_CERTIFICATE',
    certificateNumber: 'ASSAY-9999-GLD-1002',
    images: [
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 128,
    isBestSeller: true,
    featuredCollection: 'Investment Bullion'
  },
  {
    id: 'pj_prod_04',
    sku: 'PJ-SLV-PYL-04',
    name: 'Royal Heritage 999 Pure Silver Payal Anklets',
    category: 'SILVER_JEWELLERY',
    metalType: '999_SILVER',
    purity: '999 Fine Pure Silver',
    metalWeightGram: 85.0,
    makingChargePerGram: 35,
    price: 10965,
    stockStatus: 'IN_STOCK',
    stockQuantity: 15,
    description: 'Handcrafted 999 fine silver anklets with delicate silver ghungroo bells and cool metallic lustrous finish.',
    huidVerified: true,
    certificateType: '9999_FINE_GUARANTEE',
    certificateNumber: 'SLV-999-PAYAL-091',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 29,
    isNewArrival: true,
    featuredCollection: 'Silver Heritage'
  },
  {
    id: 'pj_prod_05',
    sku: 'PJ-COIN-SLV-50G',
    name: 'Royal Tree of Life 999 Fine Silver Coin (50g)',
    category: 'SILVER_COINS',
    metalType: '999_SILVER',
    purity: '999 Fine Pure Silver',
    metalWeightGram: 50.0,
    makingChargePerGram: 12,
    price: 5300,
    stockStatus: 'IN_STOCK',
    stockQuantity: 40,
    description: 'Assayed 50-gram 999 fine silver investment coin with tamper-proof blister card packaging and serial number certificate.',
    huidVerified: true,
    certificateType: 'ASSAY_CERTIFICATE',
    certificateNumber: 'ASSAY-999-SLV-5001',
    images: [
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 84,
    isBestSeller: true,
    featuredCollection: 'Investment Bullion'
  },
  {
    id: 'pj_prod_06',
    sku: 'PJ-GLD-RNG-06',
    name: 'Shree Royal Emblem 22K Gold Signet Ring',
    category: 'GOLD_JEWELLERY',
    metalType: '22K_GOLD',
    purity: '22K (916 BIS Hallmarked)',
    metalWeightGram: 12.5,
    makingChargePerGram: 550,
    price: 96875,
    stockStatus: 'IN_STOCK',
    stockQuantity: 10,
    description: 'A classic 22K gold signet ring featuring the embossed Pramo royal crest, polished to champagne perfection.',
    huidVerified: true,
    certificateType: 'BIS_HALLMARK',
    certificateNumber: 'BIS-HUID-RJ-8802',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 22,
    featuredCollection: 'Royal Heritage'
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
        return 0;
      });
  },
}));
