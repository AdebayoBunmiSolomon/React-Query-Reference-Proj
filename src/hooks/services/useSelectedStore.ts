import { create } from "zustand";

type storeData = {
  storeID: number;
  name: string;
};

interface selectedStore {
  selectedStoreData: storeData[];
  setSelectedStoreData: (storeData: storeData[]) => void;
}

export const useSelectedStoreData = create<selectedStore>((set) => ({
  selectedStoreData: [],
  setSelectedStoreData: (selectedStoreData) =>
    set({ selectedStoreData: selectedStoreData }),
}));
