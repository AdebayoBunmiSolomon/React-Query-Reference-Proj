import { create } from "zustand";

type colorData = {
  color: string;
};

interface colorStore {
  color: colorData[];
  setColor: (color: colorData[]) => void;
}

export const useColorStore = create<colorStore>((set) => ({
  color: [],
  setColor: (color) => set({ color: color }),
}));
