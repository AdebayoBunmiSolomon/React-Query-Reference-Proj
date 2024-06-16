import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RootStackProps } from "@src/router/types";
import { AppInput, AppText, DiscountItem, EmptyEntity } from "@src/components";
import { globalStyle } from "@src/theme/globalStyles";
import Screen from "../../Screen";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { Sizes } from "@src/theme";
import { useGetAllDiscount } from "@src/services/queries";
import { useUser } from "@src/state";
import { useDiscount } from "@src/state/inventories";
import { useSearchFilter } from "@src/hooks";

export const Discounts = ({}: RootStackProps<"Discounts">) => {
  const { userProfile, storeId } = useUser();
  const { setDiscounts, discounts } = useDiscount();

  const {
    data: discountsData,
    isLoading,
    isError,
  } = useGetAllDiscount(storeId);

  useEffect(() => {
    if (discountsData) {
      setDiscounts(discountsData);
    }
  }, [discountsData, isLoading, isError]);

  const { handleSearch, filteredData: filteredDiscounts } = useSearchFilter(
    discounts || [],
    (item) => item.name
  );

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader title="Discount" iconType="filledBtn" drawerBtn />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppInput
            placeholder="Search discounts"
            icon={require("@src/assets/icons/fi_search.png")}
            onChangeText={handleSearch}
          />
        </TouchableWithoutFeedback>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {discounts?.length === 0 ? (
              <View style={styles.emptyProductContainer}>
                <EmptyEntity
                  headerText="No discounts added yet!"
                  title="Create a new discount and get more customers."
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
                    data={filteredDiscounts}
                    renderItem={({ item }) => (
                      <DiscountItem data={item} onEditNavigate="EditDiscount" />
                    )}
                    keyExtractor={(item) => item?.discountId?.toString()}
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
    paddingTop: Sizes.font45,
  },
  listContainer: {
    flex: 1,
    marginTop: Sizes.font10,
    height: "70%",
    marginBottom: Sizes.font10,
  },
});
