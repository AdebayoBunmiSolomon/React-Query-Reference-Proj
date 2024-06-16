import { useNavigation } from "@react-navigation/native";
import { AppText, EntityModal } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { formatAmount } from "@src/helper/helper";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { Colors, Sizes, moderateScale, verticalScale } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { useThemeContext } from "@src/theme/themeContext";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export const OrderReceipt = ({ route }: RootStackProps<"OrderReceipt">) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { cartData, paymentMethod }: any = route.params ?? {
    cartData: undefined,
    paymentMethod: undefined,
  };
  const { theme } = useThemeContext();
  const navigation: any = useNavigation();

  const totalAmount = cartData?.reduce(
    (total: any, item: { price: any }) => total + item.price,
    0
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader
          title="Receipt"
          iconType="modal"
          onIconPress={toggleModal}
          backBtn={true}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.receiptContainer}>
            <View style={styles.storeInfo}>
              <AppText fontBold centered large black>
                Zara's Store
              </AppText>
              <AppText
                fontRegular
                style={{
                  color: theme === "dark" ? Colors.veryLight : Colors.gray,
                }}
              >
                No 5 Umushi Street, Awka
              </AppText>
              <AppText
                fontRegular
                style={{
                  color: theme === "dark" ? Colors.veryLight : Colors.gray,
                }}
              >
                Tel: +1234567890
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

            <View style={styles.orderDetailsContainer}>
              <View style={styles.orderDetailsHeader}>
                <View style={styles.orderDetailsHeaderRow}>
                  <AppText fontMedium semiMedium black>
                    QTY
                  </AppText>
                  <AppText fontMedium semiMedium black>
                    Description
                  </AppText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: moderateScale(45),
                  }}
                >
                  <AppText
                    fontMedium
                    semiMedium
                    black
                    style={{ marginRight: moderateScale(55) }}
                  >
                    Price
                  </AppText>
                  <AppText fontMedium semiMedium black>
                    Total
                  </AppText>
                </View>
              </View>
              {cartData?.map((item: any, index: number) => (
                <View style={styles.orderDetails} key={item.id}>
                  <AppText
                    fontRegular
                    style={{
                      color: theme === "dark" ? Colors.veryLight : Colors.gray,
                      paddingRight: 28,
                    }}
                  >
                    {index + 1}
                  </AppText>

                  <View
                    style={{
                      flexBasis: "30%",
                    }}
                  >
                    <AppText
                      fontRegular
                      style={{
                        color:
                          theme === "dark" ? Colors.veryLight : Colors.gray,
                      }}
                    >
                      {item.name}
                    </AppText>
                  </View>
                  <View
                    style={{
                      flexBasis: "28%",
                      flexDirection: "row",
                    }}
                  >
                    <AppText
                      fontRegular
                      style={{
                        color:
                          theme === "dark" ? Colors.veryLight : Colors.gray,
                        paddingLeft: verticalScale(20),
                      }}
                    >
                      ₦{formatAmount(item.price)}
                    </AppText>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      paddingLeft: verticalScale(15),
                    }}
                  >
                    <AppText
                      fontRegular
                      style={{
                        color:
                          theme === "dark" ? Colors.veryLight : Colors.gray,
                      }}
                    >
                      ₦{formatAmount(item.price)}
                    </AppText>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.dashedBorder} />
            <View style={styles.orderReceiptTotalContainer}>
              <View style={styles.orderReceiptTotal}>
                <AppText capitalized semiMedium gray>
                  taxable
                </AppText>
                <AppText semiMedium black>
                  ₦{formatAmount(500)}
                </AppText>
              </View>
              <View style={styles.orderReceiptTotal}>
                <AppText uppercase semiMedium gray>
                  vat 15%
                </AppText>
                <AppText semiMedium black>
                  ₦{formatAmount(50)}
                </AppText>
              </View>
              <View style={styles.orderReceiptTotal}>
                <AppText uppercase semiMedium gray>
                  Total
                </AppText>
                <AppText semiMedium black>
                  ₦{formatAmount(totalAmount)}
                </AppText>
              </View>
            </View>

            <View style={styles.dashedBorder} />
            <AppText semiMedium black>
              Paid with {paymentMethod}
            </AppText>

            <View style={styles.dashedBorder} />

            <View>
              <AppText large black centered fontRegular>
                Thank You
              </AppText>
            </View>
          </View>
        </ScrollView>
      </View>
      {isModalVisible && (
        <EntityModal
          label="Receipt"
          actions={[
            {
              label: "Print",
              icon: "printer",
              onPress: () => console.log("Print"),
            },
            {
              label: "Email reciept",
              icon: "inbox",
              onPress: () => console.log("Email reciept"),
            },
            {
              label: "Refund",
              icon: "retweet",
              onPress: () => navigation.navigate("OrderRefund", { cartData }),
            },
          ]}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  receiptContainer: {
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
    marginVertical: verticalScale(20),
  },
  orderDetailsContainer: {
    flexDirection: "column",
  },
  orderDetailsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  orderDetailsHeader: {
    flexDirection: "row",
    marginBottom: verticalScale(15),
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  orderReceiptTotalContainer: {
    marginTop: Sizes.font30,
    gap: Sizes.font14,
  },
  orderReceiptTotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
