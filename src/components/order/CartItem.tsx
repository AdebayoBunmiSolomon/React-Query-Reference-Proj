import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { formatAmount } from "@src/helper/helper";
import { Entypo } from "@expo/vector-icons";
import { ProductData } from "@src/types/types";
import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { useState } from "react";

export const CartItem = ({
  product,
  increaseQuantity,
  decreaseQuantity,
}: {
  product: ProductData;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}) => {
  return (
    <View style={styles.cartItemSingleContainer}>
      <View>
        <Image source={product.image} style={styles.singlecartImage} />
      </View>
      <View style={styles.itemDetailsContainer}>
        <View style={styles.singleOrderDetailsLeft}>
          <View>
            <AppText black semiMedium>
              {product.name}
            </AppText>
            <AppText gray small>
              {product.category}
            </AppText>
          </View>
          <AppText fontBold black small>
            ₦{formatAmount(product.price)}
          </AppText>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => increaseQuantity(product.id)}
          >
            <Entypo name="plus" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <AppText fontMedium black semiMedium>
            {product.quantity}
          </AppText>
          <TouchableOpacity
            onPress={() => decreaseQuantity(product.id)}
            style={styles.iconContainer}
          >
            <Entypo name="minus" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemSingleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Sizes.font10,
  },
  itemDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  singleOrderDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  singleOrderDetailsLeft: {
    gap: Sizes.font20,
  },

  singlecartImage: {
    width: RPW(25),
    height: RPH(12),
    borderRadius: Sizes.font20,
    marginRight: Sizes.font10,
  },
  quantityContainer: {
    flexDirection: "column",
    gap: Sizes.font10,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: Colors.selectedPinCodeDark,
    borderRadius: Sizes.font20,
  },
});
