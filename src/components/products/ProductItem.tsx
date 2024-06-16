import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { RPH, RPW, Sizes } from "@src/theme";
import {
  formatAmount,
  getStatusBackgroundColor,
  getStatusColor,
} from "@src/helper/helper";
import { useNavigation } from "@react-navigation/native";

export const ProductItem = ({ product }: any) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductPreview", {
          productData: { product },
        })
      }
      style={styles.productItemContainer}>
      <View>
        <Image
          source={require("@src/assets/images/nike.png")}
          style={styles.productImage}
        />
      </View>
      <AppText black>{product.name}</AppText>
      <AppText fontBold black>
        ₦{formatAmount(Number(product.price))}
      </AppText>
      <View style={styles.statusContainer}>
        <AppText small black>
          QTY - {product.quantity}
        </AppText>
        <View
          style={[
            styles.statusItem,
            {
              backgroundColor: getStatusBackgroundColor(
                product.representationOnPos
              ),
            },
          ]}>
          <AppText
            small
            style={{
              color: getStatusColor(
                product.inStock ? "In Stock" : "Out Of Stock"
              ),
            }}>
            Available
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItemContainer: {
    flexBasis: "50%",
    padding: Sizes.font10,
    width: RPW(50),
    gap: Sizes.font6,
  },
  productImage: {
    width: "100%",
    height: RPH(18),
    borderRadius: Sizes.font10,
    marginBottom: Sizes.font6,
  },

  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  statusItem: {
    paddingVertical: Sizes.font6 - 2,
    borderRadius: Sizes.font20,
    paddingHorizontal: Sizes.font10,
  },
});
