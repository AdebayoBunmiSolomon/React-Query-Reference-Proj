import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { RootStackProps } from "@src/router/types";
import { AppText, StoreHeader } from "@src/components";
import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { useDeleteStore } from "@src/services/mutations";

export const StoreInfo = ({
  route,
  navigation,
}: RootStackProps<"StoreInfo">) => {
  const { data }: any = route.params ?? { data: undefined };
  const { mutate: deleteStore, isPending } = useDeleteStore(data.storeId);

  return (
    <Screen>
      <View style={globalStyle.container}>
        <StoreHeader
          backBtn
          showMoreIcon
          titleText='Store Information'
          showTitleText
          onPressBackIcon={() => navigation.goBack()}
          onPressDeleteStore={() => deleteStore()}
          isPending={isPending}
        />
        {/* @ namespace container */}
        <View>
          <View style={styles.joinedCharContainer}>
            <AppText
              fontBold
              semiMedium
              white
              style={{
                color: Colors.white,
              }}>
              {data.joinedChar ? data.joinedChar : "NIL"}
            </AppText>
          </View>
          <View style={styles.storeName}>
            <AppText
              fontBold
              semiMedium
              black
              style={{
                alignSelf: "center",
              }}>
              {data.storeName ? data.storeName : "NIL"}
            </AppText>
            <AppText
              fontMedium
              small
              gray
              style={{
                alignSelf: "center",
              }}>
              {data.storeAtName ? data.storeAtName : "NIL"}
            </AppText>
          </View>
          <View style={styles.topContentContainer}>
            <View style={styles.topContent}>
              <View>
                <AppText fontRegular semiMedium gray>
                  Country
                </AppText>
                <AppText fontBold semiMedium black>
                  {data.country ? data.country : "NIL"}
                </AppText>
              </View>
              <View>
                <AppText fontRegular semiMedium gray>
                  State
                </AppText>
                <AppText fontBold semiMedium black>
                  {data.state ? data.state : "NIL"}
                </AppText>
              </View>
            </View>
            <View style={styles.topContent}>
              <View>
                <AppText fontRegular semiMedium gray>
                  City
                </AppText>
                <AppText fontBold semiMedium black>
                  {data.city ? data.city : "NIL"}
                </AppText>
              </View>
              <View>
                <AppText fontRegular semiMedium gray>
                  Phone number
                </AppText>
                <AppText fontBold semiMedium black>
                  {data.phoneNumber ? data.phoneNumber : "NIL"}
                </AppText>
              </View>
            </View>
            <View style={styles.topContent}>
              <View>
                <AppText fontRegular semiMedium gray>
                  Address
                </AppText>
                <AppText fontBold semiMedium black>
                  {data.address ? data.address : "NIL"}
                </AppText>
              </View>
            </View>
          </View>
          <View>
            <AppText
              fontRegular
              semiMedium
              gray
              style={{
                marginTop: Sizes.font34,
              }}>
              Store Description
            </AppText>
            <View
              style={{
                width: "90%",
              }}>
              <AppText
                fontRegular
                black
                style={{
                  textAlign: "justify",
                  marginTop: Sizes.font10,
                }}>
                {data.description ? data.description : "NIL"}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  joinedCharContainer: {
    width: RPW(14),
    height: RPH(7),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.nameColor,
    borderRadius: Sizes.font45,
    alignSelf: "center",
  },
  storeName: {
    alignSelf: "center",
    marginTop: Sizes.font10,
  },
  topContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topContentContainer: {
    marginTop: Sizes.font34,
    gap: Sizes.font20,
  },
});
