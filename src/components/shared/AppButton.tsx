import { Colors, RPW, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { AppText } from "./AppText";
import { ActivityIndicator } from "react-native-paper";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const AppBtn: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  disabled,
  icon,
}) => {
  const { theme } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor:
            theme === "dark" ? Colors.primaryColor2 : Colors.primary,
        },
        style,
        disabled && { backgroundColor: "#B4C8C7" },
      ]}
    >
      <View style={styles.buttonContent}>
        {disabled ? (
          <ActivityIndicator
            color={theme === "dark" ? Colors.bgDark : Colors.white}
            size="small"
          />
        ) : (
          <>
            <AppText
              style={{
                color: theme === "dark" ? Colors.bgDark : Colors.white,
                marginRight: Sizes.font6,
              }}
            >
              {title}
            </AppText>
            {icon && <View>{icon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: Sizes.font16,
    paddingVertical: Sizes.font12,
    borderRadius: Sizes.font6,
    alignItems: "center",
    justifyContent: "center",
    width: RPW(90),
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
