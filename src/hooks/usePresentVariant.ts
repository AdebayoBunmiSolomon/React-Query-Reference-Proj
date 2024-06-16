import { useVariantTypeStore } from "./services/useVariantTypeStore";

export const usePresentVariant = () => {
  const { variantType } = useVariantTypeStore();
  // Check if "Size variants" title exists in variantType array
  const isSizeVariantPresent = variantType.some(
    (variant) => variant.title === "Size variants"
  );
  //Check if "Colors Variants" title exists in variantType array
  const isColorVariantPresent = variantType.some(
    (variant) => variant.title === "Color Variants"
  );

  return {
    isColorVariantPresent,
    isSizeVariantPresent,
  };
};
