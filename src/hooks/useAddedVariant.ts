import { useStoreAccessStore } from "./services/useStoreAccessStore";
import { useStoreStore } from "./services/useStoreStore";
import { useVariantTypeStore } from "./services/useVariantTypeStore";

export const useAddedVariant = () => {
  const {
    setVariantType,
    variantType,
    clotheVariant,
    setClotheVariant,
    shoeVariant,
    setShoeVariant,
  } = useVariantTypeStore();
  const { setStore, store } = useStoreStore();
  const { storeAccess, setStoreAccess } = useStoreAccessStore();

  //checked added clothe variant sizes
  const addCheckedClotheVariant = (variantTitle: string) => {
    const variantExist = clotheVariant.some(
      (variant) => variant.title === variantTitle
    );
    if (variantExist) {
      const removedClotheVariant = clotheVariant.filter(
        (variant) => variant.title !== variantTitle
      );
      console.log(removedClotheVariant);
      setClotheVariant(removedClotheVariant);
    } else {
      const updateVariant = [...clotheVariant, { title: variantTitle }];
      setClotheVariant(updateVariant);
    }
  };

  //checked added shoe variant sizes
  const addCheckedShoeVariant = (variantTitle: string) => {
    const variantExist = shoeVariant.some(
      (variant) => variant.title === variantTitle
    );
    if (variantExist) {
      const removedShoeVariant = shoeVariant.filter(
        (variant) => variant.title !== variantTitle
      );
      console.log(removedShoeVariant);
      setShoeVariant(removedShoeVariant);
    } else {
      const updateVariant = [...shoeVariant, { title: variantTitle }];
      setShoeVariant(updateVariant);
    }
  };

  //checked added form variant sizes i.e. size variant & color variant
  const addCheckedVariant = (variantTitle: string) => {
    const variantExist = variantType.some(
      (variant) => variant.title === variantTitle
    );
    if (variantExist) {
      const removedUser = variantType.filter(
        (variant) => variant.title !== variantTitle
      );
      console.log(removedUser);
      setVariantType(removedUser);
    } else {
      const updateVariant = [...variantType, { title: variantTitle }];
      setVariantType(updateVariant);
    }
  };

  const addCheckedStore = (storeTitle: string) => {
    const storeExists = store.some((store) => store.title === storeTitle);
    if (storeExists) {
      const removedStore = store.filter((store) => store.title !== storeTitle);
      console.log(removedStore);
      setStore(removedStore);
    } else {
      const updatedStore = [...store, { title: storeTitle }];
      setStore(updatedStore);
    }
  };

  const addCheckedStoreAccess = (storeTitle: string) => {
    const storeAccessExists = storeAccess.some(
      (storeAccess) => storeAccess.title === storeTitle
    );
    if (storeAccessExists) {
      const removedStoreAccess = storeAccess.filter(
        (storeAccess) => storeAccess.title !== storeTitle
      );
      console.log(removedStoreAccess);
      setStoreAccess(removedStoreAccess);
    } else {
      const updatedStoreAccess = [...storeAccess, { title: storeTitle }];
      setStoreAccess(updatedStoreAccess);
    }
  };

  return {
    addCheckedClotheVariant,
    addCheckedShoeVariant,
    addCheckedVariant,
    addCheckedStore,
    addCheckedStoreAccess,
  };
};
