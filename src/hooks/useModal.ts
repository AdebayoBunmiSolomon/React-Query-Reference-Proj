import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";

export const useModal = () => {
  const [optionModalOpen, setOptionModalOpen] = useState<boolean>(false);
  const optionModalRef = useRef<BottomSheetModal>(null);

  const [storeModalOpen, setStoreModalOpen] = useState<boolean>(false);
  const storeModalRef = useRef<BottomSheetModal>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const categoryModalRef = useRef<BottomSheetModal>(null);

  const [discountModalOpen, setDiscountModalOpen] = useState<boolean>(false);
  const discountModalRef = useRef<BottomSheetModal>(null);

  const [snapOptionsModalOpen, setSnapOptionModalOpen] =
    useState<boolean>(false);
  const snapOptionsModalRef = useRef<BottomSheetModal>(null);

  const closeOptionModal = (modalClose: boolean = false) => {
    setOptionModalOpen(modalClose);
  };

  const openOptionModal = () => {
    setOptionModalOpen(true);
    optionModalRef.current?.present();
  };

  const closeStoreModal = (modalClose: boolean = false) => {
    setStoreModalOpen(modalClose);
  };

  const openStoreModal = () => {
    setStoreModalOpen(true);
    storeModalRef.current?.present();
  };

  const closeCategoryModal = (modalClose: boolean = false) => {
    setCategoryModalOpen(modalClose);
  };

  const openCategoryModal = () => {
    setCategoryModalOpen(true);
    categoryModalRef.current?.present();
  };

  const closeDiscountModal = (modalClose: boolean = false) => {
    setDiscountModalOpen(modalClose);
  };

  const openDiscountModal = () => {
    setDiscountModalOpen(true);
    discountModalRef.current?.present();
  };

  const closeSnapOptionsModal = (modalClose: boolean = false) => {
    setSnapOptionModalOpen(modalClose);
  };

  const openSnapOptionsModal = () => {
    setSnapOptionModalOpen(true);
    snapOptionsModalRef.current?.present();
  };

  return {
    //option modal
    optionModalOpen,
    optionModalRef,
    closeOptionModal,
    openOptionModal,
    //store modal
    storeModalOpen,
    storeModalRef,
    closeStoreModal,
    openStoreModal,
    //category modal
    categoryModalOpen,
    categoryModalRef,
    closeCategoryModal,
    openCategoryModal,
    //discount modal
    discountModalOpen,
    discountModalRef,
    closeDiscountModal,
    openDiscountModal,
    //snap-options modal
    snapOptionsModalOpen,
    snapOptionsModalRef,
    openSnapOptionsModal,
    closeSnapOptionsModal,
  };
};
