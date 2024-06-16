import { AntDesign, Entypo } from "@expo/vector-icons";
import { AppBtn, AppText, Header } from "@src/components";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { Colors, RPH, RPW, Sizes, scaleSize, verticalScale } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { StyleSheet, View, Image, ScrollView } from "react-native";

export const CustomerProfile = ({
  navigation,
}: RootStackProps<"CustomerProfile">) => {
  return (
    <Screen>
      <View style={globalStyle.container}>
        <Header title="Customer Profile" backBtn rightIcon />
        <View style={styles.avatarContainer}>
          <Image
            source={require("@src/assets/images/customer-avatar.png")}
            style={styles.avatar}
          />
          <AppText medium black fontMedium>
            User ID: 456783459
          </AppText>
        </View>

        <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
          <View style={styles.customerDetails}>
            <View style={styles.customerData}>
              <AppText semiMedium gray>
                Full name
              </AppText>
              <AppText semiMedium black>
                Nnaji Christain
              </AppText>
            </View>
            <View style={styles.customerData}>
              <AppText semiMedium gray>
                Email
              </AppText>
              <AppText semiMedium black>
                chrrisnnaji443@gmail.com
              </AppText>
            </View>
            <View style={styles.customerData}>
              <AppText semiMedium gray>
                Phone number
              </AppText>
              <AppText semiMedium black>
                09021233422
              </AppText>
            </View>
            <View style={styles.customerData}>
              <AppText semiMedium gray>
                Address
              </AppText>
              <View style={styles.addressData}>
                <AppText semiMedium black>
                  No 5 Umushi street Ifite
                </AppText>
              </View>
            </View>
          </View>
          <View style={styles.footPrints}>
            <View style={styles.footprintDetailsContainer}>
              <View style={styles.iconContainer}>
                <AntDesign name="staro" size={24} color={Colors.white} />
              </View>
              <View style={styles.footprintDataDetails}>
                <AppText black medium>
                  0.00
                </AppText>
                <AppText small gray>
                  Points
                </AppText>
              </View>
            </View>
            <View style={styles.footprintDetailsContainer}>
              <View style={styles.iconContainer}>
                <Entypo name="shop" size={24} color={Colors.white} />
              </View>
              <View style={styles.footprintDataDetails}>
                <AppText black medium>
                  1
                </AppText>
                <AppText small gray>
                  Visits
                </AppText>
              </View>
            </View>
            <View style={styles.footprintDetailsContainer}>
              <View style={styles.iconContainer}>
                <Entypo name="calendar" size={24} color={Colors.white} />
              </View>
              <View style={styles.footprintDataDetails}>
                <AppText black medium>
                  Jan 14, 2024
                </AppText>
                <AppText small gray>
                  Last Visits
                </AppText>
              </View>
            </View>
          </View>
        </ScrollView>
        <AppBtn
          title="View Purchases"
          onPress={() => navigation.navigate("UserPurchases")}
          style={{ alignSelf: "center" }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginVertical: verticalScale(22),
  },
  avatar: {
    width: RPW(23),
    height: RPH(10),
    borderRadius: scaleSize(100),
    marginBottom: Sizes.font10,
  },
  customerDetails: {
    marginTop: Sizes.font30,
    gap: Sizes.font14,
  },
  customerData: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: Sizes.font8,
  },
  addressData: {
    maxWidth: "50%",
  },
  footPrints: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: Sizes.font20,
    marginTop: Sizes.font30,
  },
  footprintDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font14,
  },
  footprintDataDetails: {
    flexDirection: "column",
  },
  iconContainer: {
    padding: Sizes.font10,
    backgroundColor: Colors.primary,
    borderRadius: scaleSize(20),
  },
});
