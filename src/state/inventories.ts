import { Discounts } from "@src/types/api";
import { create } from "zustand";

interface DiscounrStore {
  isLoading: boolean;
  discounts: Discounts[] | null;   
  setDiscounts: (discounts: Discounts[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useDiscount = create<DiscounrStore>()((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  discounts: [],
  setDiscounts: (discounts) => set({ discounts: discounts }),
}),
)