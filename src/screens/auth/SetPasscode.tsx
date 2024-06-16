import { AuthScreenProps } from "@src/router/types";
import React from "react";
import Screen from "../Screen";
import { StyleSheet, View } from "react-native";
import { globalStyle } from "@src/theme/globalStyles";
import { DialPad, Header, PasscodeTopContainer } from "@src/components";
import { Sizes, screenWidth } from "@src/theme";

export const SetPasscode = ({ navigation }: AuthScreenProps<"SetPasscode">) => {
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
            image
            title='Confirm passcode'
            passCodeTitle='Enter Your passcode'
            topDescr='We use state-of-the-art security measures to protect'
            bottomDescr=' your information at all times'
          />
        </View>
        <View style={styles.passCodeContainer}>
          <DialPad
            onPress={(numPressed) => {
              console.log(numPressed);
            }}
            padType='confirm-passcode'
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
