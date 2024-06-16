import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { AppText, EmptyEntity, Header } from "@src/components";
import { Colors, Sizes, screenWidth, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { useReceipt, useUser } from "@src/state";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useGetAllReceiptTemplate } from "@src/services/queries";

export const ReceiptSettings = () => {
  const { theme } = useThemeContext();
  const { userProfile, storeId } = useUser();
  const navigation: NavigationProp<any> = useNavigation();
  const { setReceipts, receipts } = useReceipt();

  const {
    data: receiptData,
    isLoading,
    isError,
  } = useGetAllReceiptTemplate(storeId);

  useEffect(() => {
    if (receiptData) {
      setReceipts(receiptData);
    }
  }, [receiptData, isLoading, isError]);

  return (
    <Screen>
      <View style={globalStyle.container}>
        <Header
          backBtn
          title="Receipt Settings"
          rightDoneText={receipts ? "Update" : "Create"}
          rightDoneIcon={true}
          onPressRight={() => {
            navigation.navigate("UpdateReceipt");
          }}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {receipts?.length === 0 ? (
              <View style={styles.emptyProductContainer}>
                <EmptyEntity
                  headerText="No receipt created yet!"
                  title="Create your store receipt"
                  onPress={() => {}}
                  label="Create Receipt"
                />
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
              >
                <View style={styles.container}>
                  <View style={styles.storeInfo}>
                    <AppText fontBold centered large black>
                      {receipts?.[0]?.header}
                    </AppText>
                    <AppText
                      fontRegular
                      style={{
                        color:
                          theme === "dark" ? Colors.veryLight : Colors.gray,
                      }}
                    >
                      {receipts?.[0]?.address}
                    </AppText>
                    <AppText
                      fontRegular
                      style={{
                        color:
                          theme === "dark" ? Colors.veryLight : Colors.gray,
                      }}
                    >
                      {userProfile?.email}
                      {receipts?.[0]?.phoneNumber}
                    </AppText>
                    <AppText
                      fontRegular
                      style={{
                        color:
                          theme === "dark" ? Colors.veryLight : Colors.gray,
                      }}
                    >
                      {receipts?.[0]?.phoneNumber}
                    </AppText>
                  </View>
                  <View style={styles.receiptApprovedBy}>
                    <View style={styles.receiptApprovedData}>
                      <AppText black>Cashier:</AppText>
                      <AppText black>Prisca Martinez</AppText>
                    </View>
                    <View style={styles.receiptApprovedDataCol}>
                      <AppText black>Time: 5:25PM</AppText>
                      <View style={styles.receiptApprovedData}>
                        <AppText black>Date:</AppText>
                        <AppText black>26/02/2024</AppText>
                      </View>
                    </View>
                  </View>

                  <View style={styles.dashedBorder} />
                  <View style={styles.orderDetailsContainer}></View>
                  <View style={styles.dashedBorder} />
                  <View style={styles.orderReceiptTotalContainer}></View>

                  <View style={styles.dashedBorder} />
                  <AppText
                    fontMedium
                    black
                    style={{ paddingVertical: Sizes.font6 }}
                  >
                    Paid with POS
                  </AppText>

                  <View style={styles.dashedBorder} />

                  <View>
                    <AppText big black centered fontRegular>
                      {receipts?.[0]?.footer}
                    </AppText>
                  </View>
                </View>
              </ScrollView>
            )}
          </>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 40,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: Colors.selectedPinCodeDark,
    padding: verticalScale(15),
    borderRadius: Sizes.font6,
  },
  storeInfo: {
    flexDirection: "column",
    alignItems: "center",
    gap: Sizes.font6 - 4,
    marginBottom: 20,
  },
  receiptApprovedBy: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: verticalScale(10),
  },
  receiptApprovedData: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Sizes.font6,
  },
  receiptApprovedDataCol: {
    flexDirection: "column",
    gap: Sizes.font6,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  dashedBorder: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.iconNfocused,
    marginVertical: verticalScale(15),
  },
  orderDetailsContainer: {
    flexDirection: "column",
    paddingVertical: Sizes.font45 * 2,
  },
  orderReceiptTotalContainer: {
    marginTop: Sizes.font30,
    gap: Sizes.font14,
  },
  emptyProductContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 140,
    width: screenWidth - 40,
  },
});
