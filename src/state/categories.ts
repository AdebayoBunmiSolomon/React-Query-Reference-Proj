import { Categories } from "@src/types/api";
import { create } from "zustand";

interface CategoriesStore {
  isLoading: boolean;
  categories: Categories[] | null;
  setCategories: (categories: Categories[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useCategory = create<CategoriesStore>()((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  categories: [],
  setCategories: (categories) => set({ categories: categories }),
}));
