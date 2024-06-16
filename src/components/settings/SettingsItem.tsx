import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors, Sizes, moderateScale } from "@src/theme";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useThemeContext } from "@src/theme/themeContext";
import { SwitchToggle } from "../shared/SwitchToggle";
import { useState } from "react";

interface SettingProps {
  setting: {
    iconName?: any;
    text?: string;
    rightIcon?: any;
    navigateTo?: any;
  };
}

export const SettingsItem: React.FC<SettingProps> = ({ setting }) => {
  const navigation: NavigationProp<any> = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const handleSettingPress = () => {
    if (setting.rightIcon && setting.navigateTo) {
      navigation.navigate(setting.navigateTo);
    } else {
      if (setting.text === "Code scanning") {
        console.log("Code scanning toggled");
        setIsSwitchOn(!isSwitchOn);
      } else if (setting.text === "Theme") {
        toggleTheme(theme === "dark" ? "light" : "dark");
        setIsSwitchOn(!isSwitchOn);
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={handleSettingPress}
      disabled={!setting.rightIcon}
    >
      <View style={styles.settingsLFS}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: theme === "dark" ? Colors.bgDark : Colors.light,
            },
          ]}
        >
          {setting.text === "Receipt Settings" ? (
            <Ionicons
              name={setting.iconName}
              size={20}
              color={Colors.primary}
            />
          ) : setting.text === "Tax Settings" ? (
            <MaterialCommunityIcons
              name={setting.iconName}
              size={20}
              color={Colors.primary}
            />
          ) : setting.text === "Payment Types" ? (
            <FontAwesome
              name={setting.iconName}
              ize={20}
              color={Colors.primary}
            />
          ) : setting.text === "Connect Printer" ? (
            <MaterialCommunityIcons
              name={setting.iconName}
              size={20}
              color={Colors.primary}
            />
          ) : setting.text === "Theme" ? (
            <Ionicons name="moon-outline" size={20} color={Colors.primary} />
          ) : setting.text === "Code scanning" ? (
            <Ionicons
              name={setting.iconName}
              size={20}
              color={Colors.primary}
            />
          ) : setting.text === "Language" ? (
            <FontAwesome
              name={setting.iconName}
              size={20}
              color={Colors.primary}
            />
          ) : setting.text === "Currency" ? (
            <FontAwesome
              name={setting.iconName}
              size={20}
              color={Colors.primary}
            />
          ) : setting.iconName === "Help" ? (
            <Ionicons
              name={setting.iconName}
              size={20}
              color={Colors.primary}
            />
          ) : setting.text === "Delete Account" ? (
            <Ionicons
              name={setting.iconName}
              size={20}
              color={Colors.primary}
            />
          ) : (
            <MaterialCommunityIcons
              name={setting.iconName}
              size={20}
              color={Colors.primary}
            />
          )}
        </View>
        {setting.text === "Code scanning" ? (
          <View style={{ flexDirection: "column", gap: Sizes.font2 }}>
            <AppText black fontRegular>
              {setting.text}
            </AppText>
            <AppText gray small>
              Use phone to scan barcode
            </AppText>
          </View>
        ) : (
          <AppText black fontRegular>
            {setting.text}
          </AppText>
        )}
      </View>

      {!setting.rightIcon ? (
        <SwitchToggle onToggle={handleSettingPress} toggleSwitch={isSwitchOn} />
      ) : (
        <Feather
          name="chevron-right"
          size={moderateScale(16)}
          color={Colors.gray}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingsLFS: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font10,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: moderateScale(12),
  },
  iconContainer: {
    padding: Sizes.font10,
    borderRadius: Sizes.font22,
  },
});
