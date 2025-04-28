import { create } from 'zustand';
import { authApi } from '@/shared/api/auth';
import { User } from '@/entities/user/types/user';
import { Role } from '@/entities/user/types/role';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isRefreshing: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setRefreshing: (value: boolean) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isRefreshing: false,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setRefreshing: (value) => set({ isRefreshing: value }),

  checkAuth: async () => {
    try {
      const me = await authApi.me();
      set({
        user: {
          id: me.userId,
          email: me.email,
          username: me.username,
          role: me.role as Role,
        },
        isLoading: false,
      });
    } catch {
      set({ user: null, isLoading: false });
    }
  },
}));
