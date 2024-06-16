import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, RPW, Sizes, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";

interface checkBoxProps {
  items: any;
  addCheckedVariant: (title: string) => void;
  isSelected: boolean;
}

export const CheckBox: React.FC<checkBoxProps> = ({
  items,
  addCheckedVariant,
  isSelected,
}) => {
  const { theme } = useThemeContext();
  return (
    <>
      <TouchableOpacity
        style={styles.btnList}
        onPress={() => addCheckedVariant(items.title)}>
        <View>
          <AppText fontRegular semiMedium black>
            {items.title}
          </AppText>
          {items.description && (
            <AppText fontRegular small gray>
              {items.description}
            </AppText>
          )}
        </View>
        <View>
          <View>
            {isSelected ? (
              <MaterialIcons
                name={"check-box"}
                size={Sizes.font22}
                color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
              />
            ) : (
              <MaterialIcons
                name={"check-box-outline-blank"}
                size={Sizes.font22}
                color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  ckIcon: {
    marginRight: RPW(2),
  },
  btnList: {
    marginBottom: verticalScale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
