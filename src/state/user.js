import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setUserField: (field, value) =>
        set((state) => ({
          user: { ...state.user, [field]: value },
        })),
      setToken: (token) => set({ token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
