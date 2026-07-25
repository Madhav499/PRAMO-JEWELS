import { create } from 'zustand';

interface AdminMetrics {
  totalRevenue: number;
  totalOrders: number;
  activeCustomers: number;
  inventoryAlerts: number;
  liveGoldOverrideRate: number | null;
}

interface AdminState {
  metrics: AdminMetrics;
  setLiveGoldOverride: (rate: number | null) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  metrics: {
    totalRevenue: 2845000,
    totalOrders: 142,
    activeCustomers: 98,
    inventoryAlerts: 2,
    liveGoldOverrideRate: null,
  },
  setLiveGoldOverride: (rate) =>
    set((state) => ({
      metrics: { ...state.metrics, liveGoldOverrideRate: rate },
    })),
}));
