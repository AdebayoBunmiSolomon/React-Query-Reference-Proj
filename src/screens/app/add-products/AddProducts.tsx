import React, { useState } from "react";
import Screen from "@src/screens/Screen";
import { View } from "react-native";
import { globalStyle } from "@src/theme/globalStyles";
import { AddProductsHeader, ScrollContainer } from "@src/components";
import { RootStackProps } from "@src/router/types";
import { ProductsForm } from "./ProductsForm";
import { addProductTab } from "@src/constant/data";
import { CreateOption } from "./modal/CreateOption";
import { useModal } from "@src/hooks/useModal";
import { Store } from "./modal/Store";
import { Categories } from "./modal/Categories";
import { Discount } from "./modal/Discount";
import { ServicesForm } from "./ServicesForm";

export const AddProducts = ({ navigation }: RootStackProps<"AddProducts">) => {
  const [selectedTab, setSelectedTab] = useState<string>(addProductTab[0]);
  const {
    optionModalOpen,
    optionModalRef,
    openOptionModal,
    closeOptionModal,
    openStoreModal,
    storeModalRef,
    storeModalOpen,
    closeStoreModal,
    openCategoryModal,
    closeCategoryModal,
    categoryModalOpen,
    categoryModalRef,
    discountModalOpen,
    discountModalRef,
    openDiscountModal,
    closeDiscountModal,
  } = useModal();

  return (
    <Screen>
      <AddProductsHeader
        goBack={() => navigation.goBack()}
        title="Add a Product"
        description="Add your product information to continue"
        btnPressed={() => {}}
        showRightIcon
        showTab
        setSelectedTab={(tabSelected) => setSelectedTab(tabSelected)}
      />
      <ScrollContainer>
        <View style={globalStyle.container}>
          {selectedTab === "Products" ? (
            <ProductsForm
              openOptionModal={() => openOptionModal()}
              openStoreModal={() => openStoreModal()}
              openCategoryModal={() => openCategoryModal()}
              openDiscountModal={() => openDiscountModal()}
            />
          ) : (
            <ServicesForm
              openCategoryModal={() => openCategoryModal()}
              openStoreModal={() => openStoreModal()}
            />
          )}
        </View>
      </ScrollContainer>
      <CreateOption
        modalRef={optionModalRef}
        modalOpen={optionModalOpen}
        onCloseModal={closeOptionModal}
        snapPoints={["90%"]}
      />
      <Store
        modalRef={storeModalRef}
        modalOpen={storeModalOpen}
        onCloseModal={closeStoreModal}
        snapPoints={["45%"]}
      />
      <Categories
        modalRef={categoryModalRef}
        modalOpen={categoryModalOpen}
        onCloseModal={closeCategoryModal}
        snapPoints={["45%"]}
      />
      <Discount
        modalRef={discountModalRef}
        modalOpen={discountModalOpen}
        onCloseModal={closeDiscountModal}
        snapPoints={["45%"]}
      />
    </Screen>
  );
};
