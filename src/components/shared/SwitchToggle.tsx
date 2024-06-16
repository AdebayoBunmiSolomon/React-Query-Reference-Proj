import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { AppText } from "./AppText";
import { Colors, RPW, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";

interface toggleSwitchProps {
  switchLabel?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onToggle: (toggledSwitch: boolean) => void;
  toggleSwitch: boolean;
}

export const SwitchToggle: React.FC<toggleSwitchProps> = ({
  switchLabel,
  style,
  textStyle,
  onToggle,
  toggleSwitch,
}) => {
  const { theme } = useThemeContext();
  return (
    <View style={[style, styles.container]}>
      {switchLabel && (
        <AppText fontRegular semiMedium black style={textStyle}>
          Save as beneficiary
        </AppText>
      )}
      <ToggleSwitch
        isOn={toggleSwitch}
        onColor='transparent'
        offColor='transparent'
        thumbOffStyle={{
          borderColor: theme === "dark" ? Colors.primaryColor2 : Colors.primary,
          backgroundColor:
            theme === "dark" ? Colors.primaryColor2 : Colors.primary,
        }}
        thumbOnStyle={{
          borderColor: theme === "dark" ? Colors.primaryColor2 : Colors.primary,
          backgroundColor:
            theme === "dark" ? Colors.primaryColor2 : Colors.primary,
        }}
        trackOffStyle={[
          styles.trackStyle,
          {
            borderColor:
              theme === "dark" ? Colors.primaryColor2 : Colors.primary,
          },
        ]}
        trackOnStyle={[
          styles.trackStyle,
          {
            borderColor:
              theme === "dark" ? Colors.primaryColor2 : Colors.primary,
          },
        ]}
        size='small'
        onToggle={onToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font6,
    marginTop: Sizes.font20,
    marginBottom: Sizes.font20,
  },
  trackStyle: {
    borderWidth: RPW(0.3),
  },
});
