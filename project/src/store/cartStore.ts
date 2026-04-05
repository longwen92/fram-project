import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartSummary } from '@/types';
import { STORAGE_KEYS } from '@/constants';

interface CartState {
  items: CartItem[];
  summary: CartSummary;
  addItem: (item: CartItem) => void;
  updateItem: (cartId: string, updates: Partial<CartItem>) => void;
  removeItem: (cartId: string) => void;
  selectItem: (cartId: string, selected: boolean) => void;
  selectAll: (selected: boolean) => void;
  clearItems: () => void;
  removeSelected: () => void;
  moveToFavorites: (cartIds: string[]) => void;
  calculateSummary: () => CartSummary;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      summary: {
        totalQuantity: 0,
        totalAmount: 0,
        freightAmount: 15,
        discountAmount: 0,
        payableAmount: 0,
      },

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.goodsId === item.goodsId && i.specifications === item.specifications
          );

          let newItems;
          if (existingIndex >= 0) {
            newItems = state.items.map((i, index) =>
              index === existingIndex
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            newItems = [...state.items, { ...item, selected: true, cartId: Date.now().toString() }];
          }

          return { items: newItems };
        });
        get().calculateSummary();
      },

      updateItem: (cartId, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId ? { ...item, ...updates } : item
          ),
        }));
        get().calculateSummary();
      },

      removeItem: (cartId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartId !== cartId),
        }));
        get().calculateSummary();
      },

      selectItem: (cartId, selected) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId ? { ...item, selected } : item
          ),
        }));
        get().calculateSummary();
      },

      selectAll: (selected) => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, selected })),
        }));
        get().calculateSummary();
      },

      clearItems: () => {
        set({
          items: [],
          summary: {
            totalQuantity: 0,
            totalAmount: 0,
            freightAmount: 15,
            discountAmount: 0,
            payableAmount: 0,
          },
        });
      },

      removeSelected: () => {
        set((state) => ({
          items: state.items.filter((item) => !item.selected),
        }));
        get().calculateSummary();
      },

      moveToFavorites: (cartIds) => {
        set((state) => ({
          items: state.items.filter((item) => !cartIds.includes(item.cartId)),
        }));
        get().calculateSummary();
      },

      calculateSummary: () => {
        const items = get().items;
        const selectedItems = items.filter((item) => item.selected);

        const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = selectedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        // 简单运费计算逻辑
        let freightAmount = 15;
        if (totalAmount >= 199) freightAmount = 0;

        const discountAmount = 0; // 优惠券逻辑后续实现
        const payableAmount = totalAmount + freightAmount - discountAmount;

        const summary = {
          totalQuantity,
          totalAmount,
          freightAmount,
          discountAmount,
          payableAmount,
        };

        set({ summary });
        return summary;
      },
    }),
    {
      name: STORAGE_KEYS.CART_COUNT,
    }
  )
);
