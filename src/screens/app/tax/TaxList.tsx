import React, { useEffect } from "react";
import Screen from "@src/screens/Screen";
import { FlatList, StyleSheet, View } from "react-native";
import { globalStyle } from "@src/theme/globalStyles";
import {
  AppBtn,
  AppText,
  EmptyEntity,
  Header,
  Loader,
  TaxItem,
} from "@src/components";
import { RootStackProps } from "@src/router/types";
import { RPW, Sizes, screenWidth, verticalScale } from "@src/theme";
import { useTaxStore, useUser } from "@src/state";
import { useGetAllTax } from "@src/services/queries";

export const TaxList = ({ navigation }: RootStackProps<"TaxList">) => {
  const { storeId } = useUser();
  const { taxes, setTaxes } = useTaxStore();
  const { data: taxesData, isLoading, isError } = useGetAllTax(storeId);

  useEffect(() => {
    if (taxesData) {
      setTaxes(taxesData);
      console.log(taxesData);
    }
  }, [taxesData, isLoading, isError]);

  return (
    <Screen>
      <View style={globalStyle.container}>
        <View style={styles.headerContainer}>
          <Header title='Tax' backBtn onPressRight={() => {}} />
          <AppBtn
            title='Add Tax'
            style={styles.appBtn}
            onPress={() => {
              navigation.navigate("AddTax");
            }}
          />
        </View>
        <View>
          <AppText fontRegular semiMedium black>
            All Tax
          </AppText>
          {isLoading ? (
            <Loader sizes='large' />
          ) : taxes?.length === 0 ? (
            <View style={styles.emptyProductContainer}>
              <EmptyEntity
                headerText='No taxes yet!'
                title='Taxes you have added will show up here as a list.'
              />
            </View>
          ) : (
            <>
              <FlatList
                data={taxes}
                renderItem={({ item }) => <TaxItem data={item} />}
                keyExtractor={(item) => item.taxId?.toString()}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: screenWidth - 25,
  },
  appBtn: {
    width: RPW(30),
    borderRadius: Sizes.font50,
    marginTop: verticalScale(-20),
  },
  emptyProductContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 140,
  },
});
