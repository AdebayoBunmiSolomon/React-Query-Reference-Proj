import { createProductInformation } from "@src/types/api";
import { useState } from "react";
import { useVariantOptionStore } from "./services/useVariantOptionStore";

export const useOptionCombination = () => {
  // State variable to store the values of all AppInput components
  const { setVariantsStore } = useVariantOptionStore();
  const [variants, setVariants] = useState<
    createProductInformation["variants"]
  >([]);

  // Function to update the inputValues array when the value in an AppInput changes
  const handleInputChange = (
    index: number,
    field: keyof createProductInformation["variants"][number],
    value: string
  ) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];
      if (!updatedVariants[index]) {
        updatedVariants[index] =
          {} as createProductInformation["variants"][number];
      }
      // Check if the field is a number type before parsing the value
      if (field === "price" || field === "cost" || field === "quantity") {
        // If the value is empty, set it to 0
        updatedVariants[index][field] =
          value.trim() === "" ? Number("0") : parseFloat(value);
      } else {
        // Otherwise, treat it as a string
        updatedVariants[index][field] = value;
      }
      setVariantsStore(updatedVariants);
      return updatedVariants;
    });
  };

  return {
    variants,
    setVariants,
    handleInputChange,
  };
};
