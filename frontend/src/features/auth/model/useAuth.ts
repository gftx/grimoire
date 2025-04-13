import { create } from 'zustand';

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  setToken: (token: string | null) => {
    console.log("roken", token)
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
}));