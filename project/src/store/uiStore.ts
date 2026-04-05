import { create } from 'zustand';
import type { Size } from '@/types';

interface UIState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  cartDrawerOpen: boolean;
  messageDrawerOpen: boolean;
  globalLoading: boolean;
  toast: {
    visible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  } | null;
  buttonSize: Size;

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  toggleCartDrawer: () => void;
  setCartDrawerOpen: (open: boolean) => void;
  toggleMessageDrawer: () => void;
  setMessageDrawerOpen: (open: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
  showToast: (
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    duration?: number
  ) => void;
  hideToast: () => void;
  setButtonSize: (size: Size) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  searchOpen: false,
  cartDrawerOpen: false,
  messageDrawerOpen: false,
  globalLoading: false,
  toast: null,
  buttonSize: 'medium',

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),

  setSearchOpen: (open) => set({ searchOpen: open }),

  toggleCartDrawer: () => set((state) => ({ cartDrawerOpen: !state.cartDrawerOpen })),

  setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),

  toggleMessageDrawer: () => set((state) => ({ messageDrawerOpen: !state.messageDrawerOpen })),

  setMessageDrawerOpen: (open) => set({ messageDrawerOpen: open }),

  setGlobalLoading: (loading) => set({ globalLoading: loading }),

  showToast: (type, message, duration) =>
    set({ toast: { visible: true, type, message, duration } }),

  hideToast: () => set({ toast: null }),

  setButtonSize: (size) => set({ buttonSize: size }),
}));
