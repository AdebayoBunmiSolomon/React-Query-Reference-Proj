import { RootStackProps } from "@src/router/types";
import React from "react";
import Screen from "@src/screens/Screen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { globalStyle } from "@src/theme/globalStyles";
import { Colors, Sizes, screenWidth } from "@src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "@src/theme/themeContext";
import { AppBtn, AppText } from "@src/components";
import { SnapFormat } from "./SnapFormat";
import { useModal } from "@src/hooks/useModal";
import { SnapOptions } from "../modal/SnapOptions";

export const SnapToAdd = ({ navigation }: RootStackProps<"SnapToAdd">) => {
  const { theme } = useThemeContext();
  const {
    snapOptionsModalOpen,
    snapOptionsModalRef,
    openSnapOptionsModal,
    closeSnapOptionsModal,
  } = useModal();
  return (
    <Screen>
      <View style={globalStyle.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name='arrow-back-sharp'
              size={Sizes.font26}
              color={theme === "dark" ? Colors.white : Colors.black}
            />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <AppText fontMedium semiMedium black>
              Snap to add
            </AppText>
          </View>
        </View>
        <SnapFormat />
        <View style={styles.bottomView}>
          <AppBtn
            title='Proceed'
            onPress={() => {
              openSnapOptionsModal();
            }}
          />
        </View>
      </View>
      <SnapOptions
        modalOpen={snapOptionsModalOpen}
        modalRef={snapOptionsModalRef}
        onCloseModal={closeSnapOptionsModal}
        snapPoints={["25%"]}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    width: screenWidth - 25,
    marginVertical: Sizes.font18,
  },
  headerText: {
    alignItems: "center",
    width: screenWidth - 50,
  },
  bottomView: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: Sizes.font10,
  },
});
