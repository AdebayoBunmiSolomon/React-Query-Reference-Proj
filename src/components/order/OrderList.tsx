import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RPH, verticalScale } from "@src/theme";
import Screen from "@src/screens/Screen";
import { FilterHeader } from "../products/FilterProductHeader";
import { OrderItem } from "./OrderItem";
import { ProductData } from "@src/types/types";

interface OrderListProps {
  orderData: ProductData[];
  showSingleColumn: boolean;
  addToCart: (product: ProductData) => void;
}

export const OrderList = ({
  orderData,
  showSingleColumn,
  addToCart,
}: OrderListProps) => {
  const [selectedFilter, setSelectedFilter] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orderData);

  // Filter products based on category and search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredByCategory =
      selectedFilter === "All Products"
        ? orderData
        : orderData.filter(
            (product: { category: string }) =>
              product.category === selectedFilter
          );
    const filteredBySearch = filteredByCategory.filter(
      (product: { name: string; store: string }) =>
        product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredOrders(filteredBySearch);
  }, [selectedFilter, searchQuery, orderData]);

  // Handle filter selection
  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  // Handle search query change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Screen>
      <View>
        <FilterHeader
          filters={[
            "All Products",
            "Clothes & Shoes",
            "Gadgets",
            "Home Appliances",
          ]}
          selectedFilter={selectedFilter}
          onSelectFilter={handleSelectFilter}
        />
      </View>

      <View style={styles.orderList}>
        <FlatList
          key={Math.random()}
          data={filteredOrders}
          renderItem={({ item }) => (
            <OrderItem
              product={item}
              showSingleColumn={showSingleColumn}
              addToCart={addToCart}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          numColumns={showSingleColumn ? 1 : 2}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  orderList: {
    position: "relative",
    flex: 1,
    marginTop: RPH(2),
    marginBottom: verticalScale(45),
    flexWrap: "wrap",
  },
});
