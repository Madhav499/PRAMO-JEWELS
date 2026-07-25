import { create } from 'zustand';
import { MetalRates } from '@/types';

interface AppState {
  metalRates: MetalRates;
  currency: 'INR' | 'USD' | 'AED';
  webglProfile: 'ULTRA' | 'HIGH' | 'MEDIUM' | 'LOW' | 'MOBILE' | 'FALLBACK';
  setWebglProfile: (profile: AppState['webglProfile']) => void;
  updateMetalRates: (rates: Partial<MetalRates>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  metalRates: {
    gold24k: 7850,   // INR per gram (999.9 Fine Gold)
    gold22k: 7200,   // INR per gram (916 BIS Hallmarked Gold)
    gold18k: 5900,   // INR per gram (750 Gold)
    silver999: 94,   // INR per gram (999 Fine Silver)
    silver925: 88,   // INR per gram (925 Sterling Silver)
    updatedAt: new Date().toISOString(),
  },
  currency: 'INR',
  webglProfile: 'HIGH',
  setWebglProfile: (profile) => set({ webglProfile: profile }),
  updateMetalRates: (newRates) =>
    set((state) => ({
      metalRates: { ...state.metalRates, ...newRates, updatedAt: new Date().toISOString() },
    })),
}));
