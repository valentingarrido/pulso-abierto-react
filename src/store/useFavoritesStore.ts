import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: string) => {
        set((state) => {
          const exists = state.favorites.includes(id);
          const updatedFavorites = exists
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id];
          return { favorites: updatedFavorites };
        });
      },
      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: "crypto-favorites-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);