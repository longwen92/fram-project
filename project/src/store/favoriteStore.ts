import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Goods } from '@/types';
import { STORAGE_KEYS } from '@/constants';

interface FavoriteState {
  goodsIds: string[];
  goodsMap: Record<string, Goods>;
  addGoods: (goods: Goods) => void;
  removeGoods: (goodsId: string) => void;
  isFavorite: (goodsId: string) => boolean;
  toggleFavorite: (goods: Goods) => void;
  getFavorites: () => Goods[];
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      goodsIds: [],
      goodsMap: {},

      addGoods: (goods) => {
        set((state) => ({
          goodsIds: Array.from(new Set([...state.goodsIds, goods.goodsId])),
          goodsMap: { ...state.goodsMap, [goods.goodsId]: goods },
        }));
      },

      removeGoods: (goodsId) => {
        set((state) => {
          const newGoodsMap = { ...state.goodsMap };
          delete newGoodsMap[goodsId];
          return {
            goodsIds: state.goodsIds.filter((id) => id !== goodsId),
            goodsMap: newGoodsMap,
          };
        });
      },

      isFavorite: (goodsId) => {
        return get().goodsIds.includes(goodsId);
      },

      toggleFavorite: (goods) => {
        const { isFavorite, addGoods, removeGoods } = get();
        if (isFavorite(goods.goodsId)) {
          removeGoods(goods.goodsId);
        } else {
          addGoods(goods);
        }
      },

      getFavorites: () => {
        const { goodsIds, goodsMap } = get();
        return goodsIds.map((id) => goodsMap[id]).filter(Boolean);
      },

      clearFavorites: () => {
        set({ goodsIds: [], goodsMap: {} });
      },
    }),
    {
      name: STORAGE_KEYS.VIEW_HISTORY,
    }
  )
);
