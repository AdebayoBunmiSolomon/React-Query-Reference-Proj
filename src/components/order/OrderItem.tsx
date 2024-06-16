import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { Colors, RPH, RPW, Sizes, screenWidth } from "@src/theme";
import { formatAmount } from "@src/helper/helper";
import { ProductData, ProductItemProps } from "@src/types/types";
import { AntDesign } from "@expo/vector-icons";
import { useThemeContext } from "@src/theme/themeContext";

interface OrderItemProps {
  product: ProductData;
  showSingleColumn: boolean;
  addToCart: (product: ProductData) => void;
}

export const OrderItem = ({
  product,
  showSingleColumn,
  addToCart,
}: OrderItemProps) => {
  const { theme } = useThemeContext();

  return (
    <>
      {showSingleColumn ? (
        <View style={styles.productItemSingleContainer}>
          <View>
            <Image source={product.image} style={styles.singleProductImage} />
          </View>
          <View style={styles.singleOrderDetails}>
            <View style={styles.singleOrderDetailsLeft}>
              <AppText black medium>
                {product.name}
              </AppText>
              <AppText fontBold black semiMedium>
                ₦{formatAmount(product.price)}
              </AppText>
            </View>
            <TouchableOpacity onPress={() => addToCart(product)}>
              <AntDesign
                name="pluscircle"
                size={30}
                color={
                  theme === "light" ? Colors.primary : Colors.primaryColor2
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.productItemContainer}>
          <View>
            <Image source={product.image} style={styles.productImage} />
          </View>
          <View style={styles.orderDetails}>
            <View style={styles.orderDetailsLeft}>
              <AppText black>{product.name}</AppText>
              <AppText fontBold black>
                ₦{formatAmount(product.price)}
              </AppText>
            </View>
            <TouchableOpacity onPress={() => addToCart(product)}>
              <AntDesign
                name="pluscircle"
                size={30}
                color={
                  theme === "light" ? Colors.primary : Colors.primaryColor2
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
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
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  orderDetailsLeft: {
    flexDirection: "column",
    gap: Sizes.font6,
  },

  // single column
  productItemSingleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: Sizes.font10,
    // gap: Sizes.font6,
  },
  singleProductImage: {
    width: RPW(33),
    height: RPH(15),
    borderRadius: Sizes.font10,
  },
  singleOrderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: RPW(52),
    height: RPH(15),
  },
  singleOrderDetailsLeft: {
    flexDirection: "column",
    gap: Sizes.font10 * 2,
  },
});
