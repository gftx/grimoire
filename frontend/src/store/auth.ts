import { create } from 'zustand';
import { authApi } from '@/shared/api/auth';
import { User } from '@/entities/user/types/user';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  checkAuth: async () => {
    try {
      const me = await authApi.me();
      set({
        user: {
          id: me.userId,
          email: me.email,
          username: me.username,
        },
        isLoading: false,
      });
    } catch {
      set({ user: null, isLoading: false });
    }
  },
}));
