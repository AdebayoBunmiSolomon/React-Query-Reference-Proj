import { create } from "zustand";

type storeData = {
  storeID: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  description: string;
};

interface storeStore {
  store: storeData[];
  setStore: (store: storeData[]) => void;
}

export const useStoreStore = create<storeStore>((set) => ({
  store: [],
  setStore: (store) => set({ store: store }),
}));
