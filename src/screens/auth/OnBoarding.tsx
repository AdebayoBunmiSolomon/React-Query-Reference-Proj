import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { AppBtn, AppText } from "@src/components";
import { globalStyle } from "@src/theme/globalStyles";
import Screen from "../Screen";
import { RPH, RPW, Sizes } from "@src/theme";
import { AuthScreenProps } from "@src/router/types";

export const OnBoarding = ({ navigation }: AuthScreenProps<"OnBoarding">) => {
  return (
    <Screen>
      <View style={globalStyle.container}>
        <View style={styles.header}>
          <Image source={require("@src/assets/icons/favicon.png")} />

          <AppText
            fontBold
            black
            semiMedium
            style={{ marginTop: Sizes.font20 * 2 }}
          >
            Welcome to PaySharperly POS
          </AppText>
          <AppText black>Manage all your inventories in one platform</AppText>
        </View>
        <Image
          source={require("@src/assets/icons/onboarding.gif")}
          style={styles.gif}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AppBtn
            style={{ marginTop: Sizes.font20 * 2 }}
            title="Register With Us"
            onPress={() => navigation.navigate("Register")}
          />
          <AppBtn
            style={{ marginTop: Sizes.font14 }}
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Sizes.font20,
  },
  gif: {
    width: RPW(100),
    height: RPH(40),
  },
});
