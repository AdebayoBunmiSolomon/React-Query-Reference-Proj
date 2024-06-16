import React, { useEffect, useState } from "react";
import {
  AppText,
  CartCheckout,
  CartItem,
  CartSummary,
  EmptyEntity,
  EntityModal,
} from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { FlatList, StyleSheet, View } from "react-native";
import { ProductData } from "@src/types/types";

export const CartPreview = ({
  route,
  navigation,
}: RootStackProps<"CartPreview">) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { cartData }: any = route.params ?? { cartData: undefined };
  const [cartItems, setCartItems] = useState<ProductData[]>(cartData);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleClearCart = () => {
    setCartItems([]);
    setIsModalVisible(false);
  };

  useEffect(() => {
    const mergedCartData = cartData.reduce(
      (acc: any[], current: { id: any }) => {
        const existingItem = acc.find(
          (item: { id: any }) => item.id === current.id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          acc.push({ ...current, quantity: 1 });
        }
        return acc;
      },
      []
    );

    setCartItems(mergedCartData);
  }, [cartData]);

  const increaseQuantity = (productId: number) => {
    setCartItems((items) => {
      const item = items.find((i) => i.id === productId);
      if (item) {
        item.quantity++;
        item.price = item.quantity * item.price;
      }
      return [...items];
    });
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((items) => {
      const updatedItems = items.map((item) => {
        if (item.id === productId) {
          if (item.quantity === 1) {
            return null;
          } else {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.price / item.quantity,
            };
          }
        }
        return item;
      });

      return updatedItems.filter(Boolean) as ProductData[];
    });
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader
          title="Cart"
          iconType="modal"
          onIconPress={toggleModal}
          backBtn={true}
        />

        {cartItems.length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <EmptyEntity
              label="Add to Cart"
              title="Your Cart is currently empty!"
              onPress={() => navigation.navigate("Order")}
            />
          </View>
        ) : (
          <>
            <View style={{ height: "80%" }}>
              <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                  <CartItem
                    product={item}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<CartSummary cartData={cartItems} />}
              />
            </View>

            <CartCheckout cartData={cartItems} />
          </>
        )}
      </View>
      {isModalVisible && (
        <EntityModal
          label="Cart"
          actions={[
            {
              label: "Add Item",
              icon: "shoppingcart",
              onPress: () => console.log("Add item"),
            },
            {
              label: "Assign Cart",
              icon: "user",
              onPress: () => console.log("Assign Cart"),
            },
            {
              label: "Clear Cart",
              icon: "delete",
              onPress: () => handleClearCart(),
            },
          ]}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  singleOrderDetailsRight: {
    flexDirection: "column",
  },
  emptyProductContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 140,
  },
});
