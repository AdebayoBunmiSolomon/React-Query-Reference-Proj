import React from "react";
import { StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import { Colors, FontFamily, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";

interface AppTextProps {
  children: React.ReactNode;
  small?: boolean;
  big?: boolean;
  large?: boolean;
  semiMedium?: boolean;
  medium?: boolean;
  semiBig?: boolean;
  underlined?: boolean;
  capitalized?: boolean;
  uppercase?: boolean;
  centered?: boolean;
  black?: boolean;
  red?: boolean;
  white?: boolean;
  gray?: boolean;
  success?: boolean;
  mainColor?: boolean;
  usedTextColor?: boolean;
  fontBold?: boolean;
  fontMedium?: boolean;
  fontRegular?: boolean;
  style?: StyleProp<TextStyle>;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  small,
  big,
  large,
  semiMedium,
  medium,
  semiBig,
  underlined,
  capitalized,
  uppercase,
  centered,
  black,
  red,
  white,
  gray,
  success,
  mainColor,
  usedTextColor,
  fontBold,
  fontMedium,
  fontRegular,
  style,
}) => {
  const fontFamilyStyle = fontBold
    ? { fontFamily: FontFamily.openSansBold }
    : fontMedium
    ? { fontFamily: FontFamily.openSansMedium }
    : fontRegular
    ? { fontFamily: FontFamily.openSansRegular }
    : {};

  const { theme } = useThemeContext();

  return (
    <View>
      <Text
        style={[
          styles.text,
          small && styles.small,
          big && styles.big,
          large && styles.large,
          semiMedium && styles.semiMedium,
          semiBig && styles.semiBig,
          centered && styles.centered,
          capitalized && styles.capitalized,
          uppercase && styles.upppercase,
          underlined && styles.underlined,
          medium && styles.medium,
          red && styles.red,
          white && styles.white,
          black && theme === "dark" ? styles.white : styles.black,
          gray && styles.gray,
          success && styles.success,
          mainColor && styles.mainColor,
          usedTextColor && styles.usedTextColor,
          fontFamilyStyle,
          style,
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: Sizes.font14,
    color: Colors.black,
    fontFamily: FontFamily.openSansRegular,
  },
  small: {
    fontSize: Sizes.font12,
  },
  semiMedium: {
    fontSize: Sizes.font16,
  },
  big: {
    fontSize: Sizes.font20,
  },
  large: {
    fontSize: Sizes.font22,
  },
  semiBig: {
    fontSize: Sizes.font18,
  },
  medium: {
    fontSize: Sizes.font18,
  },
  centered: {
    textAlign: "center",
  },
  capitalized: {
    textTransform: "capitalize",
  },
  upppercase: {
    textTransform: "uppercase",
  },
  underlined: {
    textDecorationLine: "underline",
  },
  white: {
    color: Colors.white,
  },
  red: {
    color: Colors.red,
  },
  black: {
    color: Colors.black,
  },
  gray: {
    color: Colors.gray,
  },
  success: {
    color: Colors.success,
  },
  mainColor: {
    color: Colors.primary,
  },
  usedTextColor: {
    color: Colors.usedText,
  },
});
