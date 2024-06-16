import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { firstCharInFirstNLastString } from "@src/helper/helper";
import { useThemeContext } from "@src/theme/themeContext";
import { Colors, RPH, Sizes } from "@src/theme";
import { passCodeTopContainerProps } from "@src/types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const PasscodeTopContainer: React.FC<passCodeTopContainerProps> = ({
  image,
  loggedInName,
  title,
  passCodeTitle,
  topDescr,
  bottomDescr,
}) => {
  const { theme } = useThemeContext();
  const { joinedChar, nameWithoutSpaces } = firstCharInFirstNLastString(
    loggedInName ? loggedInName : ""
  );
  return (
    <>
      <View
        style={[
          styles.nameText,
          {
            backgroundColor: image ? undefined : Colors.nameColor,
          },
        ]}>
        {image ? (
          <MaterialCommunityIcons
            name='lock'
            size={Sizes.font45}
            color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
          />
        ) : (
          <AppText
            fontMedium
            big
            style={{
              color: theme === "dark" ? Colors.bgDark : Colors.white,
              padding: Sizes.font20,
            }}>
            {joinedChar.toUpperCase()}
          </AppText>
        )}
      </View>
      <View>
        <AppText fontBold semiMedium black>
          {title}
        </AppText>
        {loggedInName && (
          <AppText fontMedium small gray style={styles.nameWithoutSpace}>
            @{nameWithoutSpaces}
          </AppText>
        )}
      </View>
      {topDescr && (
        <View>
          <AppText fontMedium small gray>
            {topDescr}
          </AppText>
        </View>
      )}
      {bottomDescr && (
        <View>
          <AppText fontMedium small gray>
            {bottomDescr}
          </AppText>
        </View>
      )}
      <View style={styles.passCode}>
        <AppText
          fontMedium
          small
          style={{
            color: theme === "dark" ? Colors.primaryColor2 : Colors.primary,
          }}>
          {passCodeTitle}
        </AppText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  nameText: {
    // paddingHorizontal: Sizes.font12,
    borderRadius: 100,
  },

  passCode: {
    marginTop: RPH(3),
    marginBottom: Sizes.font20,
  },
  nameWithoutSpace: {
    marginBottom: Sizes.font6,
  },
});
