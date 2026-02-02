import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  order: null,
  court: null,
  setCourt: (court) => set({ court }),
  setOrder: (order) => set({ order }),
  clearOrder: () => set({ order: null, court: null }),
}));