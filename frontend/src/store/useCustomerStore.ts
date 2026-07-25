import { create } from 'zustand';
import { Address, Order } from '@/types';

interface CustomerState {
  addresses: Address[];
  wishlistProductIds: string[];
  orders: Order[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const MOCK_ADDRESS: Address = {
  id: 'addr_01',
  userId: 'usr_admin_01',
  fullName: 'Maharaja Pramo',
  line1: 'Palace Estate, 108 Royal Avenue',
  line2: 'Civil Lines',
  city: 'Jaipur',
  state: 'Rajasthan',
  postalCode: '302006',
  country: 'India',
  phone: '+91 98765 43210',
  isDefault: true,
};

export const useCustomerStore = create<CustomerState>((set, get) => ({
  addresses: [MOCK_ADDRESS],
  wishlistProductIds: ['pj_prod_01', 'pj_prod_02'],
  orders: [
    {
      id: 'ord_1001',
      orderNumber: 'PJ-ORD-2026-9901',
      userId: 'usr_admin_01',
      items: [],
      subtotal: 98420,
      makingChargesTotal: 4420,
      taxGst: 2952,
      discount: 0,
      totalAmount: 101372,
      orderStatus: 'DELIVERED',
      paymentStatus: 'COMPLETED',
      paymentMethod: 'UPI',
      shippingAddress: MOCK_ADDRESS,
      trackingNumber: 'BLUEDART-AWB-8812903',
      courierName: 'Blue Dart Insured Apex',
      createdAt: '2026-07-20T10:30:00Z',
    },
  ],

  addAddress: (address) => {
    const id = `addr_${Math.random().toString(36).substring(2, 9)}`;
    set((state) => ({ addresses: [...state.addresses, { ...address, id }] }));
  },

  toggleWishlist: (productId) => {
    set((state) => {
      const exists = state.wishlistProductIds.includes(productId);
      if (exists) {
        return { wishlistProductIds: state.wishlistProductIds.filter((id) => id !== productId) };
      }
      return { wishlistProductIds: [...state.wishlistProductIds, productId] };
    });
  },

  isInWishlist: (productId) => get().wishlistProductIds.includes(productId),
}));
