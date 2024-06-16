import { Products } from "@src/types/api";
import { create } from "zustand";

interface productsStore {
  isLoading: boolean;
  products: Products | null;
  setProducts: (products: Products) => void;
  setLoading: (loading: boolean) => void;
}

export const useProductsStore = create<productsStore>()((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  products: null,
  setProducts: (products) => set({ products: products }),
}));
