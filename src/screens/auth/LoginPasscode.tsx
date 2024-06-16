import { globalStyle } from "@src/theme/globalStyles";
import React from "react";
import Screen from "../Screen";
import { StyleSheet, View } from "react-native";
import { Header, PasscodeTopContainer } from "@src/components";
import { AuthScreenProps } from "@src/router/types";
import { Sizes, screenWidth } from "@src/theme";
import { DialPad } from "@src/components";

export const LoginPasscode = ({
  navigation,
}: AuthScreenProps<"LoginPasscode">) => {
  return (
    <Screen>
      <View style={globalStyle.container}>
        <View style={styles.headerContainer}>
          <Header backBtn title='' />
        </View>
        <View
          style={{
            alignItems: "center",
            paddingTop: Sizes.font45,
          }}>
          <PasscodeTopContainer
            loggedInName='hype supermarket'
            title='Welcome back'
            passCodeTitle='Enter Your passcode'
          />
        </View>
        <View style={styles.passCodeContainer}>
          <DialPad
            onPress={(numPressed) => {
              console.log(numPressed);
            }}
            padType='login-passcode'
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    width: screenWidth,
    paddingHorizontal: Sizes.font16,
  },
  passCodeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
