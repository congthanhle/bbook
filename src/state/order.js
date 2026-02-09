import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  order: null,
  court: null,
  ticket: null,
  setCourt: (court) => set({ court }),
  setOrder: (order) => set({ order }),
  setTicket: (ticket) => set({ ticket }),
  clearTicket: () => set({ ticket: null, court: null }),
  clearOrder: () => set({ order: null, court: null }),
}));