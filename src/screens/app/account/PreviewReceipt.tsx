import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { AppText, Header } from "@src/components";
import { Colors, Sizes, screenWidth, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const PreviewReceipt = ({ route }: RootStackProps<"PreviewReceipt">) => {
  const { theme } = useThemeContext();
  const navigation: NavigationProp<any> = useNavigation();
  const { data, onSubmit } = route.params;
  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit();
    }
    navigation.navigate("Account");
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <Header
          backBtn
          title="Receipt Preview"
          rightDoneText="Done"
          rightDoneIcon={true}
          onPressRight={handleSubmit}
        />
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
          <View style={styles.container}>
            <View style={styles.storeInfo}>
              <AppText fontBold centered large black>
                {data.header}
              </AppText>
              <AppText
                fontRegular
                style={{
                  color: theme === "dark" ? Colors.veryLight : Colors.gray,
                }}
              >
                {data?.address}
              </AppText>
              <AppText
                fontRegular
                style={{
                  color: theme === "dark" ? Colors.veryLight : Colors.gray,
                }}
              >
                {data?.phoneNumber}
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
            <AppText fontMedium black style={{ paddingVertical: Sizes.font6 }}>
              Paid with POS
            </AppText>

            <View style={styles.dashedBorder} />

            <View>
              <AppText big black centered fontRegular>
                {data?.footer}
              </AppText>
            </View>
          </View>
        </ScrollView>
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
});
