import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppBtn, AppText } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import {
  Colors,
  RPH,
  RPW,
  Sizes,
  screenWidth,
  verticalScale,
} from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { useThemeContext } from "@src/theme/themeContext";
import { formatAmount } from "@src/utils/helper";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ProductData } from "@src/types/types";

export const OrderRefund = ({
  navigation,
  route,
}: RootStackProps<"OrderRefund">) => {
  const { theme } = useThemeContext();
  const { cartData }: any = route.params ?? {
    cartData: undefined,
  };

  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const handleItemSelection = (itemName: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName],
    }));
  };

  const calculateRefundAmount = () => {
    let refundAmount = 0;
    for (const item of cartData) {
      if (selectedItems[item.price] && selectedItems[item.name]) {
        refundAmount += Number(item.price);
      }
    }
    return refundAmount;
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader title="Refund" backBtn={true} />

        <ScrollView style={styles.scrollViewContainer}>
          {cartData?.map((item: ProductData, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleItemSelection(item.name)}
              style={[
                styles.itemContainer,
                {
                  backgroundColor:
                    theme === "dark" && selectedItems[item.name]
                      ? Colors.bgDark
                      : theme === "light" && selectedItems[item.name]
                      ? Colors.white
                      : undefined,
                },
              ]}
            >
              <View style={styles.leftContainer}>
                <MaterialCommunityIcons
                  name={
                    selectedItems[item.name]
                      ? "checkbox-marked"
                      : "checkbox-blank-outline"
                  }
                  size={Sizes.font26}
                  color={Colors.primary}
                />
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: Sizes.font16,
                    alignItems: "flex-start",
                  }}
                >
                  <AppText medium black centered>
                    {item.name}
                  </AppText>
                  <AppText medium gray centered>
                    {`1x ₦${formatAmount(Number(item.price))}`}
                  </AppText>
                </View>
              </View>
              <AppText fontMedium black centered medium>
                ₦ {formatAmount(Number(item.price))}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <AppBtn
          title={
            calculateRefundAmount() > 0
              ? `Refund ₦${formatAmount(calculateRefundAmount())}`
              : "Refund"
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: verticalScale(10),
  },
  scrollViewContainer: {
    marginTop: verticalScale(10),
    flexDirection: "column",
  },
  leftContainer: { flexDirection: "row", alignItems: "flex-start" },
});

export default OrderRefund;
