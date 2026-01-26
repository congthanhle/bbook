import { create } from 'zustand';

export const useSheetStore = create((set) => ({
  visible: false,
  children: null,
  openSheet: ({ children }) =>
    set({ visible: true, children }),
  closeSheet: () =>
    set({ visible: false, children: null }),
}));