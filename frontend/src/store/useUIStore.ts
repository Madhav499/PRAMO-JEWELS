import { create } from 'zustand';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface UIState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isHallmarkVerifierOpen: boolean;
  isRingSizeVisualizerOpen: boolean;
  isCustomEngravingOpen: boolean;
  activeQuickViewProductId: string | null;
  toasts: Toast[];

  toggleCart: (open?: boolean) => void;
  toggleSearch: (open?: boolean) => void;
  toggleHallmarkVerifier: (open?: boolean) => void;
  toggleRingSizeVisualizer: (open?: boolean) => void;
  toggleCustomEngraving: (open?: boolean) => void;
  setQuickViewProduct: (productId: string | null) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isHallmarkVerifierOpen: false,
  isRingSizeVisualizerOpen: false,
  isCustomEngravingOpen: false,
  activeQuickViewProductId: null,
  toasts: [],

  toggleCart: (open) => set((s) => ({ isCartOpen: open ?? !s.isCartOpen })),
  toggleSearch: (open) => set((s) => ({ isSearchOpen: open ?? !s.isSearchOpen })),
  toggleHallmarkVerifier: (open) => set((s) => ({ isHallmarkVerifierOpen: open ?? !s.isHallmarkVerifierOpen })),
  toggleRingSizeVisualizer: (open) => set((s) => ({ isRingSizeVisualizerOpen: open ?? !s.isRingSizeVisualizerOpen })),
  toggleCustomEngraving: (open) => set((s) => ({ isCustomEngravingOpen: open ?? !s.isCustomEngravingOpen })),
  setQuickViewProduct: (productId) => set({ activeQuickViewProductId: productId }),

  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
