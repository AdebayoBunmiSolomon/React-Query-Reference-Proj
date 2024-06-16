import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { Colors, Sizes, screenWidth } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { firstCharInFirstNLastString } from "@src/helper/helper";
import { Ionicons } from "@expo/vector-icons";
import { homeHeaderProps } from "@src/types/types";
import { useUser } from "@src/state";

export const HomeHeader: React.FC<homeHeaderProps> = ({ onOpenSlideMenu }) => {
  const { theme } = useThemeContext();
  const { activeStore } = useUser();

  const { joinedChar, nameWithoutSpaces } = firstCharInFirstNLastString(
    activeStore?.name ? activeStore.name : ""
  );
  return (
    <>
      <View style={styles.container}>
        {activeStore?.name && (
          <View style={styles.nameContainer}>
            <TouchableOpacity
              onPress={onOpenSlideMenu}
              style={[
                styles.nameText,
                {
                  backgroundColor:
                    theme === "dark" ? Colors.primaryColor2 : Colors.primary,
                },
              ]}
            >
              <AppText
                fontMedium
                big
                style={{
                  color: theme === "dark" ? Colors.bgDark : Colors.white,
                }}
              >
                {joinedChar.toUpperCase()}
              </AppText>
            </TouchableOpacity>
            <View>
              <AppText fontMedium small gray>
                Welcome back 👋
              </AppText>
              <AppText fontMedium small black>
                @{nameWithoutSpaces}
              </AppText>
            </View>
          </View>
        )}
        <View>
          <TouchableOpacity>
            <Ionicons
              size={Sizes.font22}
              color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
              name="notifications-outline"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    width: screenWidth - 25,
    marginTop: Sizes.font12,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font10,
  },
  nameText: {
    paddingHorizontal: Sizes.font12,
    paddingVertical: Sizes.font12,
    borderRadius: 100,
  },
});
