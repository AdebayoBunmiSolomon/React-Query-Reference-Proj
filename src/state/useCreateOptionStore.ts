import {create} from 'zustand';

type Option = {
  optionName: string;
  values: string[];
};

type OptionsStore = {
  options: Option[];
  addOption: () => void;
  deleteOption: (index: number) => void;
  updateOptionName: (index: number, optionName: string) => void;
  addValueToOption: (index: number, value: string) => void;
  removeValueFromOption: (index: number, valueIndex: number) => void;
};

export const useOptionsStore = create<OptionsStore>((set) => ({
  options: [],
  addOption: () => set((state) => ({ options: [...state.options, { optionName: '', values: [] }] })),
  deleteOption: (index) => set((state) => ({ options: state.options.filter((_, i) => i !== index) })),
  updateOptionName: (index, optionName) =>
    set((state) => ({
      options: state.options.map((option, i) => (i === index ? { ...option, optionName } : option)),
    })),
  addValueToOption: (index, value) =>
    set((state) => ({
      options: state.options.map((option, i) =>
        i === index ? { ...option, values: [...option.values, value] } : option
      ),
    })),
    removeValueFromOption: (index, valueIndex) =>
    set((state) => ({
      options: state.options.map((option, i) =>
        i === index ? { ...option, values: option.values.filter((_, j) => j !== valueIndex) } : option
      ),
    })),
}));
