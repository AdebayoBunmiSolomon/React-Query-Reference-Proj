import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AppText } from "@src/components/shared/AppText";
import { Colors, moderateScale, RPW, Sizes, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";

interface EntityActionProps {
  onPress: () => void;
  icon: any;
  label: string;
  backgroundColor: string;
  textColor: string;
}

const EntityAction: React.FC<EntityActionProps> = ({
  onPress,
  icon,
  label,
  backgroundColor,
  textColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.action}>
      <View style={[styles.actionIcon, { backgroundColor }]}>
        <AntDesign name={icon} size={Sizes.font18} color={textColor} />
      </View>
      <AppText black centered>
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

interface EntityModalProps {
  label: string;
  actions: {
    label: string;
    icon: string;
    onPress: () => void;
  }[];
}

export const EntityModal: React.FC<EntityModalProps> = ({ label, actions }) => {
  const { theme } = useThemeContext();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? "#091D22" : Colors.white,
          borderWidth: 1,
          borderColor: theme === "dark" ? Colors.bgDark : Colors.veryLight,
        },
      ]}
    >
      {actions.map(({ label, icon, onPress }, index) => (
        <EntityAction
          key={index}
          onPress={onPress}
          icon={icon}
          label={label}
          backgroundColor={
            theme === "dark" ? Colors.primaryColor2 : Colors.primary
          }
          textColor={theme === "dark" ? Colors.black : Colors.white}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: verticalScale(100),
    borderRadius: Sizes.font6,
    right: moderateScale(20),
    zIndex: 999,
    width: moderateScale(180),
    paddingHorizontal: Sizes.font6,
    paddingVertical: verticalScale(10),
  },
  action: {
    alignItems: "center",
    flexDirection: "row",
    padding: verticalScale(5),
    gap: verticalScale(8),
    width: "100%",
  },
  actionIcon: {
    padding: Sizes.font6,
    borderRadius: 50,
  },
});
