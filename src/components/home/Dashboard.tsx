import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { Colors, Sizes, screenWidth } from "@src/theme";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useThemeContext } from "@src/theme/themeContext";
import { formatAmount } from "@src/utils/helper";
import { dashBoardProps } from "@src/types/types";

const overViewData = {
  topOverview: [
    {
      id: 1,
      title: "Gross Sales",
    },
    {
      id: 1,
      title: "Refunds",
    },
  ],
  bottomOverview: [
    {
      id: 1,
      title: "Discount",
    },
    {
      id: 1,
      title: "Net Sales",
    },
  ],
};

export const Dashboard: React.FC<dashBoardProps> = ({
  grossVal,
  grossPercent,
  refundVal,
  refundPercent,
  discountVal,
  discountPercent,
  netSalesVal,
  netSalesPercent,
}) => {
  const { theme } = useThemeContext();
  return (
    <>
      <View style={styles.container}>
        {/* top container */}
        <View style={styles.topContainer}>
          {overViewData.topOverview.map((items, index) => (
            <View
              style={[
                styles.subContainers,
                {
                  backgroundColor:
                    theme === "dark"
                      ? Colors.secondary
                      : Colors.subContainerBgLight,
                },
              ]}
              key={index}
            >
              <View style={styles.iconContainer}>
                {index === 1 ? (
                  <View
                    style={[
                      styles.icon,
                      {
                        backgroundColor:
                          theme === "dark"
                            ? Colors.primaryColor2
                            : Colors.primary,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="cash-refund"
                      size={Sizes.font26}
                      color={theme === "dark" ? Colors.black : Colors.white}
                    />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.icon,
                      {
                        backgroundColor:
                          theme === "dark"
                            ? Colors.primaryColor2
                            : Colors.primary,
                      },
                    ]}
                  >
                    <Feather
                      name="user"
                      size={Sizes.font26}
                      color={theme === "dark" ? Colors.black : Colors.white}
                    />
                  </View>
                )}
                <View
                  style={[
                    styles.volumeContainer,
                    {
                      backgroundColor:
                        theme === "dark"
                          ? Colors.volumeBgDark
                          : "rgba(231, 246, 237, 1)",
                    },
                  ]}
                >
                  <AppText
                    fontRegular
                    small
                    style={{
                      color: "rgba(3, 107, 38, 1)",
                    }}
                  >
                    {index === 1 ? refundPercent : grossPercent}%
                  </AppText>
                  <MaterialCommunityIcons
                    name="arrow-top-right"
                    size={Sizes.font12}
                    color={"rgba(3, 107, 38, 1)"}
                  />
                </View>
              </View>
              <View style={styles.bottomTextContainer}>
                <AppText fontBold black>
                  ₦{formatAmount(Number(index === 1 ? refundVal : grossVal))}
                </AppText>
                <AppText fontMedium gray>
                  {items.title}
                </AppText>
              </View>
            </View>
          ))}
        </View>
        {/* bottom container */}
        <View style={styles.bottomContainer}>
          {overViewData.bottomOverview.map((items, index) => (
            <View
              style={[
                styles.subContainers,
                {
                  backgroundColor:
                    theme === "dark"
                      ? Colors.secondary
                      : Colors.subContainerBgLight,
                },
              ]}
              key={index}
            >
              <View style={styles.iconContainer}>
                {index === 1 ? (
                  <View
                    style={[
                      styles.icon,
                      {
                        backgroundColor:
                          theme === "dark"
                            ? Colors.primaryColor2
                            : Colors.primary,
                      },
                    ]}
                  >
                    <FontAwesome5
                      name="battle-net"
                      size={Sizes.font26}
                      color={theme === "dark" ? Colors.black : Colors.white}
                    />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.icon,
                      {
                        backgroundColor:
                          theme === "dark"
                            ? Colors.primaryColor2
                            : Colors.primary,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="sale"
                      size={Sizes.font26}
                      color={theme === "dark" ? Colors.black : Colors.white}
                    />
                  </View>
                )}
                <View
                  style={[
                    styles.volumeContainer,
                    {
                      backgroundColor:
                        theme === "dark"
                          ? Colors.volumeBgDark
                          : "rgba(246, 242, 231, 1)",
                    },
                  ]}
                >
                  <AppText
                    fontRegular
                    small
                    style={{
                      color: "rgba(255, 99, 11, 1)",
                    }}
                  >
                    {index === 1 ? netSalesPercent : discountPercent}%
                  </AppText>
                  <MaterialCommunityIcons
                    name="arrow-top-right"
                    size={Sizes.font12}
                    color={"rgba(255, 99, 11, 1)"}
                  />
                </View>
              </View>
              <View style={styles.bottomTextContainer}>
                <AppText fontBold semiMedium black>
                  ₦
                  {formatAmount(
                    Number(index === 1 ? netSalesVal : discountVal)
                  )}
                </AppText>
                <AppText fontMedium semiMedium gray>
                  {items.title}
                </AppText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 25,
    paddingVertical: Sizes.font10,
    marginTop: Sizes.font18,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subContainers: {
    width: "48%",
    borderRadius: Sizes.font6,
    marginBottom: Sizes.font12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Sizes.font18,
  },
  icon: {
    paddingHorizontal: Sizes.font8,
    paddingVertical: Sizes.font8,
    borderRadius: 100,
  },
  iconContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.font12,
    alignItems: "center",
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font6,
    borderRadius: Sizes.font45,
    padding: Sizes.font2,
  },
  bottomTextContainer: {
    marginTop: Sizes.font18,
    width: "100%",
    paddingLeft: Sizes.font12,
  },
});
