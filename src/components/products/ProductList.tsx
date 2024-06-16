import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import { ProductItem } from "./ProductItem";
import { RPH, verticalScale } from "@src/theme";
import Screen from "@src/screens/Screen";
import { FilterHeader } from "./FilterProductHeader";

export const ProductList = ({ productData }: any) => {
  const [selectedFilter, setSelectedFilter] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData);
  console.log("productList", productData);

  // Filter products based on category and search query
  useEffect(() => {
    // const lowerCaseQuery = searchQuery.toLowerCase();
    // const filteredByCategory =
    //   selectedFilter === "All Products"
    //     ? productData
    //     : productData.filter(
    //         (product: { category: string }) =>
    //           product.category === selectedFilter
    //       );
    // const filteredBySearch = filteredByCategory.filter(
    //   (product: { name: string; store: string }) =>
    //     product.name.toLowerCase().includes(lowerCaseQuery) ||
    //     product.store.toLowerCase().includes(lowerCaseQuery)
    // );
    setFilteredProducts(productData);
  }, [selectedFilter, searchQuery, productData]);

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
      <View style={styles.filterHeaderContainer}>
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

      <View style={styles.productList}>
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductItem product={item} />}
          keyExtractor={(item) => item.productID.toString()}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  productList: {
    position: "relative",
    flex: 1,
    marginTop: RPH(2),
    marginBottom: verticalScale(45),
    flexWrap: "wrap",
  },
  filterHeaderContainer: { height: RPH(6.5) },
});
