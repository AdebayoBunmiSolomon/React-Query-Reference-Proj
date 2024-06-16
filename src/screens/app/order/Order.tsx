import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { AppInput, EmptyEntity } from "@src/components";
import { productList } from "@src/constant/data";
import { OrderList } from "@src/components/order/OrderList";
import { ProductData } from "@src/types/types";
import { RootStackProps } from "@src/router/types";

interface Order {
  name: string;
  status: string;
}

export const Order = ({}: RootStackProps<"Order">) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSingleColumn, setShowSingleColumn] = useState(false);
  const [cartItems, setCartItems] = useState<ProductData[]>([]);

  // handle search query change
  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    setSearchQuery(lowerCaseQuery);
  };

  // Function to filter products based on search query
  const filterOrders = () => {
    let filteredOrders = productList.filter(
      (product: Order) => product.status === "In Stock"
    );

    if (!searchQuery.trim()) {
      return filteredOrders;
    } else {
      filteredOrders = filteredOrders.filter((product: Order) => {
        const productName = product.name.toLowerCase();
        return productName.includes(searchQuery);
      });
      return filteredOrders;
    }
  };

  // Handler function for box icon press
  const handleBoxIconPress = () => {
    setShowSingleColumn(!showSingleColumn);
  };

  // Function to add item to cart
  const addToCart = useCallback(
    (item: ProductData) => {
      const isItemInCart = cartItems.some((cartItem: ProductData) => {
        return cartItem.id === item.id;
      });

      // push item into cart
      if (!isItemInCart) {
        setCartItems((prevCartItems) => [...prevCartItems, item]);
      }
    },
    [cartItems]
  );

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader
          title="Order"
          iconType="cart"
          cartData={cartItems}
          drawerBtn
        />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppInput
            placeholder="Search product or name"
            icon={require("@src/assets/icons/fi_search.png")}
            onChangeText={handleSearch}
            showBoxIcon={!searchQuery.trim()}
            onBoxIconPress={handleBoxIconPress}
          />
        </TouchableWithoutFeedback>

        {filterOrders().length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <EmptyEntity
              label="Add Product"
              title="Add products to see preview"
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </View>
        ) : (
          <OrderList
            orderData={filterOrders()}
            showSingleColumn={showSingleColumn}
            addToCart={addToCart}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  emptyProductContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 140,
  },
});
