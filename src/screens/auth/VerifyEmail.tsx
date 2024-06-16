import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import Screen from "../Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { Sizes } from "@src/theme";
import { AppBtn, AppInput, Header } from "@src/components";
import { Controller, useForm } from "react-hook-form";
import { useVerifyEmail } from "@src/services/mutations";
import { VerifyDTO } from "@src/types/api";

export const VerifyEmail = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyDTO>({ mode: "onChange" });

  const { mutate, isPending } = useVerifyEmail();

  const handleVerify = async (data: VerifyDTO) => {
    mutate(data);
  };

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyle.container}>
          <View
            style={{
              alignSelf: "flex-start",
              paddingHorizontal: Sizes.font20,
            }}
          >
            <Header title="Verify Email 👋🏿" backBtn />
          </View>

          <View>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label="Verification Code"
                  placeholder="enter verification code"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.emailPasscode?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Verification code is required!",
                },
              }}
              name="emailPasscode"
              defaultValue=""
            />

            <AppBtn
              style={{ marginTop: Sizes.font20 }}
              title="Verify Email"
              onPress={handleSubmit(handleVerify)}
              disabled={isPending}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
};

const styles = StyleSheet.create({});
