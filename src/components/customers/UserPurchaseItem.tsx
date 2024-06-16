import { Colors, Sizes, moderateScale } from "@src/theme";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { formatAmount } from "@src/helper/helper";
import { PurchaseProps } from "@src/types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const UserPurchaseItem = ({
  purchases,
}: {
  purchases: PurchaseProps;
}) => {
  return (
    <TouchableOpacity style={styles.purchaseDetailsContainer}>
      <View style={styles.purchaseData}>
        <View style={styles.amountContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={purchases.icon}
              size={24}
              color="white"
            />
          </View>
          <View>
            <AppText black fontRegular>
              {purchases.name}
            </AppText>
            <AppText small gray>
              {purchases.dateAdded}
            </AppText>
          </View>
        </View>
        <AppText fontRegular black>
          ₦{formatAmount(purchases.amount)}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  purchaseDetailsContainer: {
    marginTop: Sizes.font26,
    gap: Sizes.font10,
  },
  purchaseData: {
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
