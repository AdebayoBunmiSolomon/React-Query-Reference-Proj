import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { AppText } from "../shared/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeContext } from "@src/theme/themeContext";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Sizes } from "@src/theme";

interface nestedDropDownProps {
  focused: boolean;
  label: string;
  onPressDropDown: () => void;
  showDropDown: boolean;
}

export const NestedDropdown: React.FC<nestedDropDownProps> = ({
  focused,
  label,
  onPressDropDown,
  showDropDown,
}) => {
  const { theme } = useThemeContext();
  return (
    <>
      <View style={styles.nestedNavigationContainer}>
        <AppText
          fontMedium
          semiMedium
          style={{
            color:
              focused && theme === "dark"
                ? Colors.primaryColor2
                : !focused && theme === "dark"
                ? Colors.white
                : focused && theme === "light"
                ? Colors.primary
                : !focused && theme === "light"
                ? Colors.black
                : undefined,
          }}>
          {label}
        </AppText>
        <TouchableOpacity onPress={onPressDropDown}>
          <MaterialIcons
            size={Sizes.font26}
            color={
              focused && theme === "dark"
                ? Colors.primaryColor2
                : !focused && theme === "dark"
                ? Colors.white
                : focused && theme === "light"
                ? Colors.primary
                : !focused && theme === "light"
                ? Colors.black
                : undefined
            }
            name={!showDropDown ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  nestedNavigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "125%",
  },
});
