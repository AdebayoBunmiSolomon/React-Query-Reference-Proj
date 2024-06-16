import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors, RPH, Sizes, screenWidth } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { storeOverViewProps } from "@src/types/types";

export const ReceiptOverview: React.FC<storeOverViewProps> = ({
  onPressToday,
  onPressFilter,
  style,
}) => {
  const { theme } = useThemeContext();
  return (
    <>
      <View style={[styles.container, style]}>
        <View style={styles.storeContainer}>
          <AppText fontRegular medium black>
            Today
          </AppText>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.todayBtn,
              {
                backgroundColor:
                  theme === "dark" ? Colors.primaryColor2 : Colors.primary,
              },
            ]}
            onPress={onPressToday}
          >
            <AppText
              fontRegular
              semiMedium
              style={{
                color: theme === "dark" ? Colors.black : Colors.white,
              }}
            >
              Today
            </AppText>
            <Ionicons
              name="chevron-down"
              size={Sizes.font14}
              color={theme === "dark" ? Colors.black : Colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              {
                backgroundColor:
                  theme === "dark" ? Colors.primaryColor2 : Colors.primary,
              },
            ]}
            onPress={onPressFilter}
          >
            <AntDesign
              name="filter"
              size={Sizes.font14}
              color={theme === "dark" ? Colors.black : Colors.white}
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
    width: screenWidth - 30,
  },
  storeContainer: {
    flexDirection: "row",
    gap: Sizes.font10,
    alignItems: "center",
  },
  todayBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Sizes.font6,
    paddingHorizontal: Sizes.font10,
    height: RPH(4),
    borderRadius: Sizes.font45,
  },
  filterBtn: {
    paddingHorizontal: Sizes.font8,
    height: RPH(4),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.font26,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font10,
  },
});
