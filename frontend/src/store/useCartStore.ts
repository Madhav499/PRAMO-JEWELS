import { create } from 'zustand';
import { CartItem, Product, MetalType } from '@/types';

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountPercentage: number;
  isGiftWrapped: boolean;
  addItem: (product: Product, selectedMetal: MetalType, quantity?: number, selectedSize?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  toggleGiftWrap: (val?: boolean) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getMakingChargesTotal: () => number;
  getTaxGst: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  couponCode: null,
  discountPercentage: 0,
  isGiftWrapped: false,

  addItem: (product, selectedMetal, quantity = 1, selectedSize) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.product.id === product.id && i.selectedMetal === selectedMetal && i.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex].quantity += quantity;
        return { items: updatedItems };
      }

      const newItem: CartItem = {
        id: `cart_${Math.random().toString(36).substring(2, 9)}`,
        product,
        selectedMetal,
        selectedSize: selectedSize || '7 (Standard)',
        quantity,
      };

      return { items: [...state.items, newItem] };
    });
  },

  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },

  applyCoupon: (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ROYAL10') {
      set({ couponCode: 'ROYAL10', discountPercentage: 10 });
      return { success: true, message: 'Royal 10% Luxury Coupon Applied!' };
    }
    if (cleanCode === 'PRAMO5') {
      set({ couponCode: 'PRAMO5', discountPercentage: 5 });
      return { success: true, message: 'Pramo Jewels 5% Discount Applied!' };
    }
    return { success: false, message: 'Invalid or Expired Coupon Code' };
  },

  removeCoupon: () => set({ couponCode: null, discountPercentage: 0 }),
  toggleGiftWrap: (val) => set((s) => ({ isGiftWrapped: val ?? !s.isGiftWrapped })),
  clearCart: () => set({ items: [], couponCode: null, discountPercentage: 0 }),

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },

  getMakingChargesTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.metalWeightGram * item.product.makingChargePerGram * item.quantity,
      0
    );
  },

  getTaxGst: () => {
    // 3% GST on Indian Gold & Jewellery
    const subtotal = get().getSubtotal();
    return Math.round(subtotal * 0.03);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    return Math.round((subtotal * get().discountPercentage) / 100);
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const gst = get().getTaxGst();
    const discount = get().getDiscountAmount();
    const giftWrapCost = get().isGiftWrapped ? 499 : 0; // ₹499 Insured Gift Packaging
    return Math.max(0, subtotal + gst - discount + giftWrapCost);
  },
}));
