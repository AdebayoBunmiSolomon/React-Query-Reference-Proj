import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  Colors,
  RPH,
  RPW,
  Sizes,
  screenWidth,
  verticalScale,
} from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppText } from "../shared/AppText";
import { useVariantTypeStore } from "@src/hooks/services/useVariantTypeStore";
import { CheckBox } from "./CheckBox";
import { AppBtn } from "../shared/AppButton";
import { RadioButton } from "./RadioButton";
import { useAddedVariant } from "@src/hooks/useAddedVariant";
import { useStoreStore } from "@src/hooks/services/useStoreStore";
import { useStoreAccessStore } from "@src/hooks/services/useStoreAccessStore";

type variantData = {
  title: string;
  description: string;
};

type productSizeData = {
  title: string;
};

interface sheetModalProps {
  modalRef: any;
  modalOpen: boolean;
  onCloseModal: (modalClose: boolean) => void;
  title: string;
  description: string;
  data: variantData[] | productSizeData[] | undefined;
  dataType:
    | string
    | undefined
    | "product-size-type"
    | "select-store-type"
    | "store-access";
  btnTitle: string;
  selectionType: "checkbox" | "radio-button";
}

export const SheetModal: React.FC<sheetModalProps> = ({
  modalRef,
  modalOpen,
  onCloseModal,
  title,
  description,
  data,
  dataType,
  btnTitle,
  selectionType,
}) => {
  const { theme } = useThemeContext();
  const bottomSheetModalRef = modalRef;
  const snapPoints = ["45%"];
  const { variantType, clotheVariant, shoeVariant } = useVariantTypeStore();
  const { store } = useStoreStore();
  const { storeAccess } = useStoreAccessStore();

  const {
    addCheckedClotheVariant,
    addCheckedShoeVariant,
    addCheckedVariant,
    addCheckedStore,
    addCheckedStoreAccess,
  } = useAddedVariant();

  return (
    <>
      <View
        style={{
          height: modalOpen ? "110%" : undefined,
          width: "100%",
          position: "absolute",
          zIndex: modalOpen ? 1 : undefined,
          backgroundColor:
            modalOpen && theme === "dark"
              ? Colors.modalBgDark
              : Colors.modalBgLight,
        }}>
        <GestureHandlerRootView style={styles.sheetModalContainer}>
          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={[
                styles.sheetModal,
                {
                  backgroundColor:
                    theme === "dark"
                      ? Colors.modalBgDark2
                      : Colors.modalBgLight2,
                },
              ]}
              handleIndicatorStyle={[
                styles.handleIndicatorStyle,
                {
                  backgroundColor:
                    theme === "dark"
                      ? Colors.authInputDark
                      : Colors.authInputLight,
                },
              ]}
              onDismiss={() => {
                onCloseModal(false);
              }}>
              <AppText
                fontBold
                semiMedium
                black
                style={styles.notificationTitle}>
                {title}
              </AppText>
              {description && (
                <AppText
                  fontRegular
                  semiMedium
                  gray
                  style={[
                    styles.notificationTitle,
                    {
                      marginTop: RPH(-3),
                    },
                  ]}>
                  {description}
                </AppText>
              )}
              <View style={styles.scrollViewContainer}>
                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                  {/* data list */}
                  {selectionType === "checkbox"
                    ? data &&
                      data.map((items, index) => {
                        let isSelected: boolean = false;
                        if (dataType === "Clothe") {
                          isSelected = clotheVariant.some(
                            (variant) => variant.title === items.title
                          );
                        } else if (dataType === "Shoe") {
                          isSelected = shoeVariant.some(
                            (variant) => variant.title === items.title
                          );
                        } else if (dataType === "product-size-type") {
                          isSelected = variantType.some(
                            (variant) => variant.title === items.title
                          );
                        } else if (dataType === "select-store-type") {
                          isSelected = store.some(
                            (store) => store.title === items.title
                          );
                        } else if (dataType === "store-access") {
                          isSelected = storeAccess.some(
                            (storeAccess) => storeAccess.title === items.title
                          );
                        }
                        return (
                          <View key={index}>
                            <CheckBox
                              items={items}
                              addCheckedVariant={(title) => {
                                if (dataType === "Clothe") {
                                  addCheckedClotheVariant(title);
                                } else if (dataType === "Shoe") {
                                  addCheckedShoeVariant(title);
                                } else if (dataType === "Other") {
                                  console.log("perform adding others");
                                } else if (dataType === "product-size-type") {
                                  addCheckedVariant(title);
                                } else if (dataType === "select-store-type") {
                                  addCheckedStore(title);
                                } else if (dataType === "store-access") {
                                  addCheckedStoreAccess(title);
                                }
                              }}
                              isSelected={isSelected}
                            />
                          </View>
                        );
                      })
                    : selectionType === "radio-button"
                    ? data &&
                      data.map((items, index) => {
                        return (
                          <View key={index}>
                            <RadioButton items={items} />
                          </View>
                        );
                      })
                    : undefined}
                </BottomSheetScrollView>
              </View>
              <AppBtn
                title={btnTitle}
                onPress={() => onCloseModal(false)}
                style={styles.bottomBtn}
              />
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sheetModalContainer: {
    flex: 1,
  },
  sheetModal: {
    borderRadius: Sizes.font20,
    width: "100%",
    overflow: "hidden",
  },
  handleIndicatorStyle: {
    width: RPW(40),
    height: RPH(0.6),
  },
  notificationTitle: {
    marginBottom: RPH(3),
    alignSelf: "center",
  },
  scrollViewContainer: {
    flex: 0.9,
    flexDirection: "row",
    // backgroundColor: "red",
    width: screenWidth - 50,
    alignSelf: "center",
    gap: Sizes.font10,
  },
  ckIcon: {
    marginRight: RPW(2),
  },
  btnList: {
    marginBottom: verticalScale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomBtn: {
    alignSelf: "center",
    marginBottom: RPH(5),
  },
});
