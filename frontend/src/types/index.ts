export type MetalType = '24K_GOLD' | '22K_GOLD' | '18K_ROSE_GOLD' | '950_PLATINUM' | '999_SILVER';

export type ProductCategory = 'RINGS' | 'NECKLACES' | 'EARRINGS' | 'BRACELETS' | 'PENDANTS' | 'SOLITAIRES' | 'COINS';

export interface MetalRates {
  gold24k: number; // INR per gram
  gold22k: number; // INR per gram
  gold18k: number; // INR per gram
  platinum: number; // INR per gram
  silver999: number; // INR per gram
  updatedAt: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  metalType: MetalType;
  purity: string; // e.g. "22K (916)", "18K (750)"
  metalWeightGram: number;
  makingChargePerGram: number;
  gemstoneCost: number;
  price: number; // Computed base price
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'MADE_TO_ORDER' | 'OUT_OF_STOCK';
  stockQuantity: number;
  description: string;
  huidVerified: boolean;
  certificateType: 'IGI' | 'GIA' | 'BIS_HALLMARK';
  certificateNumber: string;
  images: string[];
  model3dUrl?: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  featuredCollection?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedMetal: MetalType;
  selectedSize?: string;
  quantity: number;
  engravingText?: string;
  giftWrapped?: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'CUSTOMER' | 'INVENTORY_MANAGER';
  avatarUrl?: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  makingChargesTotal: number;
  taxGst: number;
  discount: number;
  totalAmount: number;
  orderStatus: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'UNPAID' | 'COMPLETED' | 'REFUNDED';
  paymentMethod: 'UPI' | 'CARD' | 'NET_BANKING' | 'COD';
  shippingAddress: Address;
  trackingNumber?: string;
  courierName?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userCity: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}
