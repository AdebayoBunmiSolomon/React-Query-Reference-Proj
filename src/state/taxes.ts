import { Taxes } from "@src/types/api";
import { create } from "zustand";

interface TaxesStores {
  isLoading: boolean;
  taxes: Taxes[] | null;
  setTaxes: (taxes: Taxes[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useTaxStore = create<TaxesStores>()((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  taxes: [],
  setTaxes: (taxes) => set({ taxes: taxes }),
}));
