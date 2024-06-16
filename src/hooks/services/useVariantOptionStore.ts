import { create } from "zustand";

type variantOptionStore = {
  variantsStore: any[];
  setVariantsStore: (variantsStore: any[]) => void;
};

export const useVariantOptionStore = create<variantOptionStore>((set) => ({
  variantsStore: [],
  setVariantsStore: (variantsStore) => set({ variantsStore: variantsStore }),
}));
