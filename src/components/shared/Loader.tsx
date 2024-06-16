import { Colors } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type size = {
  sizes: "small" | "large";
};

export const Loader = ({ sizes }: size) => {
  const { theme } = useThemeContext();
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={sizes}
        color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
