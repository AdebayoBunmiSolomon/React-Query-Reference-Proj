import { create } from "zustand";

type variant = {
  title: string;
};

interface variantTypeStore {
  variantType: variant[];
  setVariantType: (variants: variant[]) => void;
  clotheVariant: variant[];
  setClotheVariant: (clotheVariant: variant[]) => void;
  shoeVariant: variant[];
  setShoeVariant: (shoeVariant: variant[]) => void;
  prodSizeType: string;
  setProdSizeType: (prodSizeType: string) => void;
}

export const useVariantTypeStore = create<variantTypeStore>((set) => ({
  variantType: [],
  setVariantType: (variantType) => set({ variantType: variantType }),
  clotheVariant: [],
  setClotheVariant: (clotheVariant) => set({ clotheVariant: clotheVariant }),
  shoeVariant: [],
  setShoeVariant: (shoeVariant) => set({ shoeVariant: shoeVariant }),
  prodSizeType: "",
  setProdSizeType: (prodSizeType) => set({ prodSizeType: prodSizeType }),
}));
