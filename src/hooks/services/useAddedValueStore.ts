import { create } from "zustand";

type optionValue = {
  index: number;
  values: { value: string; index: number }[];
};

interface addedValueStore {
  optionValues: optionValue;
  setOptionValues: (values: optionValue) => void;
}

export const useAddedValueStore = create<addedValueStore>((set) => ({
  optionValues: {
    index: 0,
    values: [],
  },
  setOptionValues: (optionValues) => set({ optionValues: optionValues }),
}));
