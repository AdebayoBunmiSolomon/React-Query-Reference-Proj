import { Stores } from "@src/types/api";
import { create } from "zustand";

interface StoresStore {
  isLoading: boolean;
  stores: Stores[] | null;
  setStores: (stores: Stores[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useStores = create<StoresStore>()((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  stores: [],
  setStores: (stores) => set({ stores: stores }),
}));
