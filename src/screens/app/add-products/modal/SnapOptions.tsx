import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AppText, SheetModal } from "@src/components";
import { Colors, RPW, Sizes, screenWidth, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { sheetModalType } from "@src/types/types";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const SnapOptions: React.FC<sheetModalType> = ({
  modalOpen,
  modalRef,
  onCloseModal,
  snapPoints,
}) => {
  const { theme } = useThemeContext();
  return (
    <>
      <SheetModal
        modalOpen={modalOpen}
        modalRef={modalRef}
        onCloseModal={onCloseModal}
        snapPoints={snapPoints}>
        <AppText fontBold semiMedium black style={styles.title}>
          Add Photo
        </AppText>
        <BottomSheetScrollView
          style={{
            width: screenWidth - 25,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.btnContainer}>
            <View>
              <TouchableOpacity style={styles.optionsBtn}>
                <FontAwesome
                  name='camera'
                  size={Sizes.font22}
                  color={
                    theme === "dark" ? Colors.primaryColor2 : Colors.primary
                  }
                />
              </TouchableOpacity>
              <AppText fontBold semiMedium black>
                Camera
              </AppText>
            </View>
            <View>
              <TouchableOpacity style={styles.optionsBtn}>
                <Ionicons
                  name='images'
                  size={Sizes.font22}
                  color={
                    theme === "dark" ? Colors.primaryColor2 : Colors.primary
                  }
                />
              </TouchableOpacity>
              <AppText fontBold semiMedium black>
                Images
              </AppText>
            </View>
          </View>
        </BottomSheetScrollView>
      </SheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
  },
  optionsBtn: {
    borderRadius: Sizes.font50,
    borderColor: Colors.gray,
    borderWidth: RPW(0.2),
    padding: Sizes.font16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    marginTop: Sizes.font12,
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font26,
  },
});
