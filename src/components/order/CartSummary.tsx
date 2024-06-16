import { ProductData } from "@src/types/types";
import { StyleSheet, View } from "react-native";
import { AppText } from "../shared/AppText";
import { formatAmount } from "@src/helper/helper";
import { Sizes, verticalScale } from "@src/theme";

export const CartSummary = ({ cartData }: { cartData: ProductData[] }) => {
  // Calculate total amount, discount, tax, etc.
  const totalAmount = cartData.reduce(
    (total: number, item: { price: number }) => total + item.price,
    0
  );

  const totalDiscount = cartData.reduce(
    (total: number, item: { discount: number }) => total + (item.discount || 0),
    0
  );

  const taxAmount = 100;

  return (
    <View style={styles.cartSummaryContainer}>
      <View style={styles.catSummaryData}>
        <AppText semiMedium black>
          Items
        </AppText>
        <AppText semiMedium black>
          {cartData.length}
        </AppText>
      </View>
      <View style={styles.catSummaryData}>
        <AppText semiMedium black>
          Amount
        </AppText>
        <AppText semiMedium black>
          ₦{formatAmount(totalAmount)}
        </AppText>
      </View>
      <View style={styles.catSummaryData}>
        <AppText semiMedium black>
          Discount
        </AppText>
        <AppText semiMedium black>
          ₦{formatAmount(totalDiscount)}
        </AppText>
      </View>
      <View style={styles.catSummaryData}>
        <AppText semiMedium black>
          Tax
        </AppText>
        <AppText semiMedium black>
          ₦{formatAmount(taxAmount)}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartSummaryContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: verticalScale(30),
    gap: Sizes.font14,
  },
  catSummaryData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
