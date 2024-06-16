import { AppInput, AppText, CategoryItem, EmptyEntity } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { categoryData } from "@src/constant/data";
import { useSearchFilter } from "@src/hooks";
import { DrawerStackScreenProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { useGetAllCategory } from "@src/services/queries";
import { useCategory, useUser } from "@src/state";
import { Sizes } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const Category = ({
  navigation,
}: DrawerStackScreenProps<"Category">) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { userProfile, storeId } = useUser();
  const { setCategories, categories } = useCategory();

  const { data: categoryData, isLoading, isError } = useGetAllCategory(storeId);

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData, isLoading, isError]);

  // handle search query change
  const { handleSearch, filteredData: filterCategory } = useSearchFilter(
    categories || [],
    (item) => item.name
  );

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader
          title="Category"
          iconType="filledBtn"
          filledBtnText="Add Category"
          drawerBtn
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppInput
            placeholder="Search..."
            icon={require("@src/assets/icons/fi_search.png")}
            onChangeText={handleSearch}
          />
        </TouchableWithoutFeedback>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {categories?.length === 0 ? (
              <View style={styles.emptyProductContainer}>
                <EmptyEntity
                  headerText="No item category yet!"
                  title="Create your first category"
                />
              </View>
            ) : (
              <>
                <View style={styles.listContainer}>
                  <AppText
                    black
                    fontRegular
                    style={{ marginBottom: Sizes.font6 }}
                  >
                    All Discounts
                  </AppText>
                  <FlatList
                    data={filterCategory}
                    renderItem={({ item }) => (
                      <CategoryItem data={item} onEditNavigate="EditCategory" />
                    )}
                    keyExtractor={(item) => item?.categoryId?.toString()}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </>
            )}
          </>
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
  listContainer: {
    flex: 1,
    marginTop: Sizes.font10,
    height: "70%",
    marginBottom: Sizes.font10,
  },
});
