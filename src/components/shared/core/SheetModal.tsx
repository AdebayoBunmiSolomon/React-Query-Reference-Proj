import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { sheetModalProps } from "@src/types/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const SheetModal: React.FC<sheetModalProps> = ({
  modalRef,
  modalOpen,
  onCloseModal,
  children,
  snapPoints,
}) => {
  const { theme } = useThemeContext();
  const bottomSheetModalRef = modalRef;
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
              <View style={styles.sheetContent}>{children}</View>
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
  handleIndicatorStyle: {
    width: RPW(40),
    height: RPH(0.6),
  },
  sheetModal: {
    borderRadius: Sizes.font20,
    width: "100%",
    overflow: "hidden",
  },
  notificationTitle: {
    marginBottom: RPH(3),
    alignSelf: "center",
  },
  sheetContent: {
    paddingHorizontal: Sizes.font10,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
