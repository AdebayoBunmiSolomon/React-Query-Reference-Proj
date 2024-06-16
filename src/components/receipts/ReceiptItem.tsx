import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { formatAmount } from "@src/helper/helper";
import { Colors, Sizes, moderateScale } from "@src/theme";
import { Receipt } from "@src/types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const ReceiptItem = ({ receipt }: { receipt: Receipt }) => {
  const navigation: any = useNavigation();
  // Select icon based on payment method
  const selectIcon = (paidWith: string) => {
    switch (paidWith) {
      case "Cash":
        return <MaterialCommunityIcons name="cash" size={24} color="white" />;
      case "Card":
        return (
          <MaterialCommunityIcons name="credit-card" size={24} color="white" />
        );
      case "POS":
        return (
          <MaterialCommunityIcons
            name="cellphone-wireless"
            size={24}
            color="white"
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={styles.receiptDetailsContainer}
      onPress={() => navigation.navigate("OrderReceipt")}
    >
      <View style={styles.receiptData}>
        <View style={styles.amountContainer}>
          <View style={styles.iconContainer}>
            {selectIcon(receipt.paidWith)}
          </View>
          <View>
            <AppText black fontRegular>
              ₦{formatAmount(receipt.amount)}
            </AppText>
            <AppText small gray>
              {receipt.time}
            </AppText>
          </View>
        </View>
        <AppText fontRegular black>
          {receipt.receiptNumber}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  receiptDetailsContainer: {
    marginTop: Sizes.font26,
    gap: Sizes.font10,
  },
  receiptData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font10,
  },
  iconContainer: {
    padding: moderateScale(8),
    backgroundColor: Colors.primary,
    borderRadius: Sizes.font20,
  },
});
