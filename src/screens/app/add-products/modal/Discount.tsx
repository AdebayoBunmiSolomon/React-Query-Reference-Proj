import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AppBtn, AppText, SheetModal } from "@src/components";
import { useSelectedDiscountData } from "@src/hooks/services/useSelectedDiscount";
import { useGetAllDiscount } from "@src/services/queries";
import { useUser } from "@src/state";
import { useDiscount } from "@src/state/inventories";
import { Colors, Sizes, screenWidth, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { sheetModalType } from "@src/types/types";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { discountConstantData } from "@src/constant/data";

export const Discount: React.FC<sheetModalType> = ({
  modalOpen,
  modalRef,
  onCloseModal,
  snapPoints,
}) => {
  const { storeId } = useUser();
  //this holds selected discount from the list
  const { selectedDiscountData, setSelectedDiscountData } =
    useSelectedDiscountData();

  //this holds the discount downloaded from the api
  const { setDiscounts, discounts } = useDiscount();
  const { theme } = useThemeContext();

  const {
    data: discountsData,
    isLoading,
    isError,
  } = useGetAllDiscount(storeId);

  const addDiscount = (id: string, name: string) => {
    setSelectedDiscountData({ ...selectedDiscountData, id: id, name: name });
  };

  useEffect(() => {
    if (discountsData) {
      setDiscounts(discountsData);
      console.log(discountsData);
    }
  }, [discountsData, isLoading, isError, discounts]);
  return (
    <>
      <SheetModal
        modalOpen={modalOpen}
        modalRef={modalRef}
        onCloseModal={onCloseModal}
        snapPoints={snapPoints}>
        <AppText fontBold semiMedium black style={styles.title}>
          Select Discount
        </AppText>
        <BottomSheetScrollView
          style={{
            width: screenWidth - 25,
          }}
          showsVerticalScrollIndicator={false}>
          {discounts &&
            discounts.map((items, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.optionBtn}
                  onPress={() =>
                    addDiscount(String(items.discountId), String(items.name))
                  }>
                  <AppText fontMedium semiMedium black>
                    {items.name}
                  </AppText>
                  <MaterialIcons
                    name={`${
                      selectedDiscountData.id === String(items.discountId)
                        ? "radio-button-on"
                        : "radio-button-off"
                    }`}
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
          onPress={() => onCloseModal(false)}
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
