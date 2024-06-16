import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TabScreenProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import {
  AppInput,
  EmptyEntity,
  EntityModal,
  ProductList,
} from "@src/components";
// import { productList } from "@src/constant/data";
import { useGetAllProduct } from "@src/services/queries";
import { useProductsStore, useUser } from "@src/state";

interface Product {
  name: string;
  store: string;
}

export const Products = ({ navigation }: TabScreenProps<"Products">) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { storeId } = useUser();
  const { products, setProducts } = useProductsStore();
  const { data: productsData, isLoading, isError } = useGetAllProduct(storeId);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // handle search query change
  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    setSearchQuery(lowerCaseQuery);
  };

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [products, isLoading, isError, productsData]);

  // Function to filter products based on search query
  const filterProducts = () => {
    if (!searchQuery.trim()) {
      // If search query is empty, return all products without filtering
      return products?.getProductResponse || [];
    } else {
      // Filter products based on the search query
      const filteredProducts = products?.getProductResponse.filter(
        (product) => {
          return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
      );
      return filteredProducts || [];
    }
  };
  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader
          title='Products'
          iconType='modal'
          onIconPress={toggleModal}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <AppInput
              placeholder='Search product or name of store'
              icon={require("@src/assets/icons/fi_search.png")}
              onChangeText={handleSearch}
            />
          </View>
        </TouchableWithoutFeedback>
        {filterProducts().length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <EmptyEntity
              label='Add Product'
              title='Add products to see preview'
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </View>
        ) : (
          <ProductList productData={filterProducts()} />
        )}
      </View>

      {isModalVisible && (
        <EntityModal
          label='Product'
          actions={[
            {
              label: "Add Product",
              icon: "plus",
              onPress: () => navigation.navigate("AddProducts"),
            },
            {
              label: "Export Product",
              icon: "export",
              onPress: () => console.log("Export product"),
            },
            {
              label: "Import Product",
              icon: "export2",
              onPress: () => console.log("Import product"),
            },
          ]}
        />
      )}
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
