import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "../shared/AppText";
import { formatFirstCharacterToUpperCase } from "@src/helper/helper";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";

interface soldByProps {
  data: any[];
  onPressSelectedItem: (items: string) => void;
  selectedSoldByItem: string;
}

export const SoldBy: React.FC<soldByProps> = ({
  data,
  onPressSelectedItem,
  selectedSoldByItem,
}) => {
  const { theme } = useThemeContext();
  return (
    <>
      {data &&
        data.map((radioItems, index) => (
          <TouchableOpacity
            key={index}
            style={styles.radioSelectionBtn}
            onPress={() => {
              onPressSelectedItem(radioItems);
            }}>
            <AppText>{formatFirstCharacterToUpperCase(radioItems)}</AppText>
            <Ionicons
              name={`${
                selectedSoldByItem === radioItems
                  ? "radio-button-on"
                  : "radio-button-off"
              }`}
              size={Sizes.font20}
              color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
            />
          </TouchableOpacity>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  radioSelectionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font6,
  },
});
