import { AppText } from "@src/components";
import { Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import React from "react";
import { StyleSheet, View } from "react-native";

export const SnapFormat: React.FC<{}> = () => {
  const { theme } = useThemeContext();
  return (
    <>
      <View style={styles.subHeaderText}>
        <AppText fontBold semiMedium black>
          Sample Format
        </AppText>
        <AppText fontRegular small gray>
          Follow this format in order to get accuracy when
        </AppText>
        <AppText fontRegular small gray>
          snapping to snapping a product
        </AppText>
      </View>
      <View
        style={[
          styles.format,
          {
            backgroundColor: "#F4F4F4",
          },
        ]}>
        <AppText fontMedium semiMedium black>
          Snap
        </AppText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subHeaderText: {
    alignItems: "center",
  },
  format: {
    flex: 1,
    margin: Sizes.font20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.font20,
  },
});
