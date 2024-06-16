import { create } from "zustand";

type storeAccessData = {
  title: string;
};

interface storeAccess {
  storeAccess: storeAccessData[];
  setStoreAccess: (store: storeAccessData[]) => void;
}

export const useStoreAccessStore = create<storeAccess>((set) => ({
  storeAccess: [],
  setStoreAccess: (storeAccess) => set({ storeAccess: storeAccess }),
}));
