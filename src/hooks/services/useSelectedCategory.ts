import { create } from "zustand";

type categoryData = {
  categoryId: string;
  name: string;
};

interface selectedCategory {
  selectedCategoryData: categoryData[];
  setSelectedCategoryData: (selectedCategoryData: categoryData[]) => void;
}

export const useSelectedCategoryData = create<selectedCategory>((set) => ({
  selectedCategoryData: [],
  setSelectedCategoryData: (categoryData) =>
    set({ selectedCategoryData: categoryData }),
}));
