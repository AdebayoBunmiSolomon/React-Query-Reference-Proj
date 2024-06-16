import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AppBtn, AppText, SheetModal } from "@src/components";
import { useSelectedCategoryData } from "@src/hooks/services/useSelectedCategory";
import { useGetAllCategory } from "@src/services/queries";
import { useCategory, useUser } from "@src/state";
import { Colors, Sizes, screenWidth, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { sheetModalType } from "@src/types/types";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
export const Categories: React.FC<sheetModalType> = ({
  modalOpen,
  modalRef,
  onCloseModal,
  snapPoints,
}) => {
  // const { setValue } = useForm<createProductInformation>();
  const { storeId } = useUser();
  //this holds selected store from the list
  const { selectedCategoryData, setSelectedCategoryData } =
    useSelectedCategoryData();
  // const selectedCategory = returnSelectedCategoryArrayId(selectedCategoryData);
  //this holds the stores downloaded from the api
  const { setCategories, categories } = useCategory();
  const { theme } = useThemeContext();

  const { data: categoryData, isLoading, isError } = useGetAllCategory(storeId);

  const addCategory = (name: string, categoryId: string) => {
    const isCategoryExist = selectedCategoryData.some(
      (categoryData) => categoryData.name === name
    );
    if (!isCategoryExist) {
      const updatedSelectedCategory = [
        ...selectedCategoryData,
        {
          name: name,
          categoryId: categoryId,
        },
      ];
      setSelectedCategoryData(updatedSelectedCategory);
      // console.log(updatedSelectedCategory);
    } else {
      const filteredCategory = selectedCategoryData.filter(
        (categoryData) => categoryData.name !== name
      );
      setSelectedCategoryData(filteredCategory);
      // console.log(filteredCategory);
    }
  };

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
      console.log(categoryData);
    }
  }, [categoryData, isLoading, isError, categories]);
  return (
    <>
      <SheetModal
        modalOpen={modalOpen}
        modalRef={modalRef}
        onCloseModal={onCloseModal}
        snapPoints={snapPoints}>
        <AppText fontBold semiMedium black style={styles.title}>
          Select Category
        </AppText>
        <BottomSheetScrollView
          style={{
            width: screenWidth - 25,
          }}
          showsVerticalScrollIndicator={false}>
          {categories &&
            categories.map((items, index) => {
              const isSelected = selectedCategoryData.some(
                (categoryData) => categoryData.name === items.name
              );
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.optionBtn}
                  onPress={() =>
                    addCategory(items.name, String(items.categoryId))
                  }>
                  <AppText fontMedium semiMedium black>
                    {items.name}
                  </AppText>
                  <FontAwesome
                    name={`${isSelected ? "check-square" : "square-o"}`}
                    size={Sizes.font20}
                    color={
                      theme === "dark" ? Colors.primaryColor2 : Colors.primary
                    }
                  />
                </TouchableOpacity>
              );
            })}
        </BottomSheetScrollView>
        <AppBtn
          title='Add'
          onPress={() => {
            // setValue("categoriesId", selectedCategory.categoryIdArray);
            onCloseModal(false);
          }}
          style={{
            marginBottom: Sizes.font50,
          }}
        />
      </SheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
  },
});
