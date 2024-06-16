import React from "react";
import { AppText } from "../shared/AppText";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeContext } from "@src/theme/themeContext";
import { Colors, Sizes, verticalScale } from "@src/theme";
import { useVariantTypeStore } from "@src/hooks/services/useVariantTypeStore";

interface radioButtonProps {
  items: any;
}

export const RadioButton: React.FC<radioButtonProps> = ({ items }) => {
  const { theme } = useThemeContext();
  const { prodSizeType, setProdSizeType } = useVariantTypeStore();
  return (
    <>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          setProdSizeType(String(items.title));
        }}>
        <AppText fontRegular semiMedium black>
          {items.title}
        </AppText>
        <MaterialCommunityIcons
          name={`${
            items.title === prodSizeType ? "radiobox-marked" : "radiobox-blank"
          }`}
          color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
          size={Sizes.font22}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(30),
  },
});
