import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { formatAmount } from "@src/helper/helper";
import { Colors, Sizes, moderateScale, verticalScale } from "@src/theme";
import { ProductData } from "@src/types/types";
import { useNavigation } from "@react-navigation/native";

export const CartCheckout = ({ cartData }: { cartData: ProductData[] }) => {
  const navigation: any = useNavigation();

  const totalAmount = cartData.reduce(
    (total: any, item: { price: any }) => total + item.price,
    0
  );

  return (
    <View style={styles.footer}>
      <View style={styles.amountContainer}>
        <AppText gray semiMedium>
          Amount Price
        </AppText>
        <AppText black fontBold big>
          ₦{formatAmount(totalAmount)}
        </AppText>
      </View>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate("OrderPayment", { cartData })}
      >
        <AppText fontBold centered medium style={{ color: Colors.white }}>
          Check Out
        </AppText>
        <View style={styles.circle}>
          <AppText mainColor semiMedium>
            {cartData.length}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: moderateScale(10),
  },
  amountContainer: { flexDirection: "column", alignItems: "center" },
  checkoutButton: {
    flexDirection: "row",
    gap: moderateScale(8),
    backgroundColor: Colors.iconNfocused2,
    paddingVertical: verticalScale(13),
    paddingHorizontal: moderateScale(50),
    borderRadius: Sizes.font10,
  },
  circle: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
