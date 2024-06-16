import { globalStyle } from "@src/theme/globalStyles";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Screen from "@src/screens/Screen";
import { RootStackProps } from "@src/router/types";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RPH, RPW, Sizes, screenWidth } from "@src/theme";
import { AppText, Loader } from "@src/components";
import { truncateText } from "@src/helper/helper";
export const EditEmployee = ({ route }: RootStackProps<"EditEmployee">) => {
  const { data }: any = route.params ?? { data: undefined };
  console.log(data);

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader
          title='Employee Profile'
          iconType='filledBtn'
          filledBtnText='Edit'
          backBtn
        />
        <View style={styles.dataContainer}>
          <Image
            source={require("@src/assets/icons/person.png")}
            resizeMode='contain'
            style={styles.img}
          />
          <AppText fontBold semiMedium black>
            Employee ID: 1
          </AppText>
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <AppText fontRegular gray semiMedium>
                Full name
              </AppText>
              <AppText fontRegular black semiMedium>
                {data && data.employeeName}
              </AppText>
            </View>
            <View style={styles.content}>
              <AppText fontRegular gray semiMedium>
                Email
              </AppText>
              <AppText fontRegular black semiMedium>
                {data && data.employeeEmail}
              </AppText>
            </View>
            <View style={styles.content}>
              <AppText fontRegular gray semiMedium>
                Phone number
              </AppText>
              <AppText fontRegular black semiMedium>
                {data && data.employeePhone}
              </AppText>
            </View>
            <View style={styles.content}>
              <AppText fontRegular gray semiMedium>
                Role
              </AppText>
              <AppText fontRegular black semiMedium>
                {data && data.employeePasscode}
              </AppText>
            </View>
            <View style={styles.content}>
              <AppText fontRegular gray semiMedium>
                Address
              </AppText>
              <AppText fontRegular black semiMedium>
                {truncateText("NO 10, Paysharperly, street.")}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  img: {
    width: RPW(30),
    height: RPH(15),
    backgroundColor: "red",
    borderRadius: 100,
  },
  dataContainer: {
    alignItems: "center",
    width: screenWidth - 25,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: screenWidth - 25,
  },
  contentContainer: {
    marginTop: Sizes.font26,
    gap: Sizes.font10,
  },
});
