import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AppBtn, AppText, SheetModal } from "@src/components";
import { useSelectedStoreData } from "@src/hooks/services/useSelectedStore";
import { useStoreStore } from "@src/hooks/services/useStoreStore";
import { useGetAllStore } from "@src/services/queries";
import { useUser } from "@src/state";
import { Colors, Sizes, screenWidth, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { sheetModalType } from "@src/types/types";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { storeConstantData } from "@src/constant/data";

export const Store: React.FC<sheetModalType> = ({
  modalOpen,
  modalRef,
  onCloseModal,
  snapPoints,
}) => {
  const { storeId } = useUser();
  //this holds selected store from the list
  const { selectedStoreData, setSelectedStoreData } = useSelectedStoreData();
  //this holds the stores downloaded from the api
  const { store, setStore } = useStoreStore();
  const { theme } = useThemeContext();

  const { data: storeData, isLoading, isError } = useGetAllStore(storeId);

  const addStoreName = (name: string, storeID: number) => {
    const isStoreExist = selectedStoreData.some(
      (stores) => stores.name === name
    );
    if (!isStoreExist) {
      const updatedSelectStoreData = [
        ...selectedStoreData,
        {
          name: name,
          storeID: storeID,
        },
      ];
      setSelectedStoreData(updatedSelectStoreData);
      // console.log(updatedSelectStoreData);
    } else {
      const filteredStoreData = selectedStoreData.filter(
        (stores) => stores.name !== name
      );
      setSelectedStoreData(filteredStoreData);
      // console.log(filteredStoreData);
    }
  };

  useEffect(() => {
    if (storeData) {
      setStore(storeData);
    }
  }, [storeData, isLoading, isError, store]);
  return (
    <>
      <SheetModal
        modalOpen={modalOpen}
        modalRef={modalRef}
        onCloseModal={onCloseModal}
        snapPoints={snapPoints}>
        <AppText fontBold semiMedium black style={styles.title}>
          Select store
        </AppText>
        <BottomSheetScrollView
          style={{
            width: screenWidth - 25,
          }}
          showsVerticalScrollIndicator={false}>
          {store &&
            store.map((items, index) => {
              const isSelected = selectedStoreData.some(
                (store) => store.name === items.name
              );
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.optionBtn}
                  onPress={() =>
                    addStoreName(items.name, Number(items.storeID))
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
