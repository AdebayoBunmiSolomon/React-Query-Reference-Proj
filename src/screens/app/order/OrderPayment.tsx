import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AppBtn, AppText } from "@src/components";
import { globalStyle } from "@src/theme/globalStyles";
import Screen from "@src/screens/Screen";
import { RootStackProps } from "@src/router/types";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { Colors, Sizes, moderateScale, verticalScale } from "@src/theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const OrderPayment = ({ route }: RootStackProps<"OrderPayment">) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("POS");
  const { cartData }: any = route.params ?? { cartData: undefined };
  const navigation: any = useNavigation();

  const handlePaymentSelection = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader title="Select Payment Method" backBtn={true} />
        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === "POS" && styles.selectedPaymentOption,
            ]}
            onPress={() => handlePaymentSelection("POS")}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="printer-pos"
                size={28}
                color="white"
              />
            </View>
            <AppText black semiBig fontRegular>
              With POS
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === "Cash" && styles.selectedPaymentOption,
            ]}
            onPress={() => handlePaymentSelection("Cash")}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="cash-multiple"
                size={28}
                color="white"
              />
            </View>
            <AppText black semiBig fontRegular>
              With Cash
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === "Card" && styles.selectedPaymentOption,
            ]}
            onPress={() => handlePaymentSelection("Card")}
          >
            <View style={styles.iconContainer}>
              <Feather name="credit-card" size={28} color="white" />
            </View>
            <AppText black semiBig fontRegular>
              With Card
            </AppText>
          </TouchableOpacity>
        </View>
        <AppBtn
          title="Proceed"
          onPress={() =>
            navigation.navigate("OrderReceipt", {
              cartData,
              paymentMethod: selectedPaymentMethod,
            })
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(15),
  },
  paymentOptionsContainer: {
    flex: 1,
  },
  iconContainer: {
    padding: Sizes.font6 + 2,
    borderRadius: Sizes.font20,
    backgroundColor: Colors.primary,
  },
  paymentOption: {
    flexDirection: "row",
    gap: Sizes.font20,
    padding: moderateScale(25),
    marginVertical: verticalScale(10),
    backgroundColor: Colors.selectedPinCodeLight,
    borderRadius: Sizes.font12,
    alignItems: "center",
    width: "100%",
  },
  selectedPaymentOption: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});
