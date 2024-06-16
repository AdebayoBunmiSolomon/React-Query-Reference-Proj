import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Colors, RPH, RPW, Sizes, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppText } from "../shared/AppText";
import { AppBtn } from "../shared/AppButton";
import { AppInput } from "../shared/form/AppInput";
import { useColorStore } from "@src/hooks/services/useColorStore";
import { useColor } from "@src/hooks/useColor";

interface sheetModalProps {
  modalRef: any;
  modalOpen: boolean;
  onCloseModal: (modalClose: boolean) => void;
  title: string;
  description: string;
  btnTitle: string;
}

export const ColorSheetModal: React.FC<sheetModalProps> = ({
  modalRef,
  modalOpen,
  onCloseModal,
  title,
  description,
  btnTitle,
}) => {
  const { theme } = useThemeContext();
  const bottomSheetModalRef = modalRef;
  const snapPoints = ["40%"];

  const [colorValue, setColorValue] = useState<string>();
  const { addColor } = useColor();

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleModalPosition = () => {
    if (keyboardHeight > 0) {
      // Adjust modal position to move it up by the height of the keyboard
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.snapToIndex(0);
    }
  };

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
              }}
              //   onChange={handleModalPosition}
            >
              <BottomSheetScrollView
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}>
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
                  <AppText fontRegular semiMedium black>
                    Color name
                  </AppText>
                  <AppInput
                    placeholder='Enter color value'
                    keyboardType='default'
                    style={{ marginBottom: RPH(4) }}
                    value={colorValue}
                    onChangeText={(colorValue) => setColorValue(colorValue)}
                    colorInput
                    colorValue={
                      colorValue && colorValue.toLowerCase().replace(/\s/g, "")
                    }
                  />
                  <AppBtn
                    title={btnTitle}
                    onPress={() => {
                      addColor(String(colorValue?.toLowerCase()));
                    }}
                    style={{ marginBottom: RPH(4) }}
                  />
                </View>
              </BottomSheetScrollView>
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
  inputStyle: {
    alignSelf: "center",
  },
});
