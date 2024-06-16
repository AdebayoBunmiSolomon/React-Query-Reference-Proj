import { create } from "zustand";

type discountData = {
  id: string;
  name: string;
};

export interface Discounts {
  selectedDiscountData: discountData;
  setSelectedDiscountData: (discountId: discountData) => void;
}

export const useSelectedDiscountData = create<Discounts>((set) => ({
  selectedDiscountData: {
    id: "",
    name: "",
  },
  setSelectedDiscountData: (selectedDiscountData) =>
    set({ selectedDiscountData: selectedDiscountData }),
}));
