import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppText, EmptyEntity } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { PaymentTypeItem } from "@src/components/settings/PaymentTypeItem";
import { paymentTypesData } from "@src/constant/data";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { Colors, Sizes } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

export const PaymentTypes = ({ route }: RootStackProps<"PaymentTypes">) => {
  const navigation: NavigationProp<any> = useNavigation();
  const { paymentTypeId, iconName, updatedPaymentType }: any = route.params ?? {
    paymentTypeId: undefined,
    iconName: undefined,
    updatedPaymentType: undefined,
  };
  const [paymentTypes, setPaymentTypes] = useState(paymentTypesData);

  useEffect(() => {
    if (paymentTypeId !== undefined && iconName !== undefined) {
      const updatedPaymentTypes = paymentTypes.map((type) => {
        if (type.id === paymentTypeId) {
          return { ...type, iconName: iconName };
        }
        return type;
      });
      setPaymentTypes(updatedPaymentTypes);
    }
  }, [paymentTypeId, iconName]);

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader title="Payment Types" backBtn={true} />

        {paymentTypes?.length === 0 ? (
          <View style={styles.emptyPaymentTypeContainer}>
            <EmptyEntity
              headerText="No payment type added yet!"
              title="Create a new payment type and close more deals."
            />
          </View>
        ) : (
          <View style={styles.listContainer}>
            <AppText black fontRegular style={{ marginBottom: Sizes.font6 }}>
              All Payment Type
            </AppText>

            <FlatList
              data={paymentTypes}
              renderItem={({ item }) => (
                <PaymentTypeItem data={item} onEditNavigate="EditPaymentType" />
              )}
              keyExtractor={(item) => item?.id?.toString()}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("AddPaymentType")}
          color="white"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  emptyPaymentTypeContainer: {
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
  fab: {
    position: "absolute",
    margin: 12,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: Colors.primary,
  },
});
