import React, { useRef } from "react";
import { AppText } from "../AppText";
import OTPTextInput from "react-native-otp-textinput";
import { useThemeContext } from "@src/theme/themeContext";
import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { StyleSheet, View } from "react-native";

type otpInputProps = {
  onChange: (text: string) => void;
  value: string;
  errors: any;
  count: number;
  label: string;
};

export const OtpInput = ({
  onChange,
  value,
  errors,
  count,
  label,
}: otpInputProps) => {
  const otpInput = useRef<OTPTextInput>(null);
  const { theme } = useThemeContext();
  return (
    <View style={styles.container}>
      <AppText fontMedium black style={styles.label}>
        {label}
      </AppText>
      <OTPTextInput
        ref={otpInput}
        defaultValue={value}
        handleTextChange={(text) => onChange(text)}
        textInputStyle={styles.otpInput}
        tintColor={theme === "light" ? Colors.gray : Colors.white}
        offTintColor={theme === "light" ? Colors.veryLight : Colors.gray}
        inputCount={count}
      />
      {errors && (
        <AppText
          red
          style={{
            color: Colors.red,

            paddingLeft: Sizes.font6,
          }}>
          {errors}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  otpInput: {
    borderWidth: RPW(0.3),
    borderBottomWidth: RPW(0.3),
    height: RPH(6),
    width: RPW(21),
    borderRadius: Sizes.font4,
  },
  label: {
    marginBottom: Sizes.font6,
    color: Colors.black,
    paddingLeft: Sizes.font4,
  },
  container: {
    marginBottom: Sizes.font16,
  },
});
