import { AuthScreenProps } from "@src/router/types";
import Screen from "../Screen";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { globalStyle } from "@src/theme/globalStyles";
import { Sizes } from "@src/theme";
import { AppBtn, AppInput, Header } from "@src/components";
import { Feather } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import React from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(0, "Email is required!")
    .max(50, "Too Long!")
    .email()
    .required("Please enter a valid email"),
});

interface ForgotPassDTO {
  email: string;
}

export const ForgotPassword = ({
  navigation,
}: AuthScreenProps<"ForgotPassword">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassDTO>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleResetPassword = (data: ForgotPassDTO) => {
    console.log("Resetting password with email:", data.email);
    navigation.navigate("UpdatePassword");
  };

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyle.container}>
          <View style={styles.headerContainer}>
            <Header title="Reset Account Password" backBtn />
          </View>

          <View style={styles.formContainer}>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label="Email Address"
                  placeholder="john.doe@example.com"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.email?.message}
                />
              )}
              name="email"
              defaultValue=""
            />
            <AppBtn
              style={styles.resetBtn}
              title="Get Reset Link"
              onPress={handleSubmit(handleResetPassword)}
              icon={
                <Feather
                  name="arrow-up-right"
                  color="white"
                  style={styles.resetBtnIcon}
                />
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: { alignSelf: "flex-start", paddingHorizontal: Sizes.font20 },
  formContainer: {
    paddingHorizontal: Sizes.font20,
  },
  resetBtn: {
    marginTop: Sizes.font10,
  },
  resetBtnIcon: {
    fontSize: Sizes.font16,
  },
});
