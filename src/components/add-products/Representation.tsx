import { formatFirstCharacterToUpperCase } from "@src/helper/helper";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "../shared/AppText";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";

interface representationProps {
  data: any[];
  setSelectedProRepItem: (item: string) => void;
  selectedProdRepItem: string;
}

export const Representation: React.FC<representationProps> = ({
  data,
  setSelectedProRepItem,
  selectedProdRepItem,
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
              setSelectedProRepItem(radioItems);
            }}>
            <AppText>{formatFirstCharacterToUpperCase(radioItems)}</AppText>
            <Ionicons
              name={`${
                selectedProdRepItem === radioItems
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
