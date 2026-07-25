import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const MOCK_ADMIN_USER: User = {
  id: 'usr_admin_01',
  firstName: 'Maharaja',
  lastName: 'Pramo',
  email: 'admin@pramojewels.com',
  phone: '+91 98765 43210',
  role: 'ADMIN',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_ADMIN_USER, // Default logged in as Admin for full demonstration
  token: 'mock_sanctum_bearer_token_pramo_jewels_2026',
  isAuthenticated: true,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
