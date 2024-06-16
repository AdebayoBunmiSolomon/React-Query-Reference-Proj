import { Categories, Receipt, ReceiptSettings } from "@src/types/api";
import { create } from "zustand";

interface ReceiptStore {
  isLoading: boolean;
  receipts: ReceiptSettings[] | null;
  setReceipts: (categories: ReceiptSettings[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useReceipt = create<ReceiptStore>()((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  receipts: [],
  setReceipts: (receipts) => set({ receipts: receipts }),
}));
