import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { AuthScreenProps } from "@src/router/types";
import { globalStyle } from "@src/theme/globalStyles";
import { AppBtn, AppInput, AppText, Header } from "@src/components";
import { Sizes } from "@src/theme";
import Screen from "../Screen";
import { Feather } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { useLogin } from "@src/services/mutations";

interface LoginDTO {
  email: string;
  password: string;
}

export const Login = ({ navigation }: AuthScreenProps<"Login">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({ mode: "onChange" });

  const { mutate, isPending } = useLogin();

  const handleSignIn = async (data: LoginDTO) => {
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
            <Header title="Welcome Back 👋🏿" backBtn />
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
              rules={{
                required: {
                  value: true,
                  message: "Email is required!",
                },
              }}
              name="email"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label="Password"
                  placeholder="Enter your password"
                  password
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.password?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Password is required!",
                },
              }}
              name="password"
              defaultValue=""
            />

            <View style={styles.cta}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <AppText fontMedium mainColor>
                  Forgot password
                </AppText>
              </TouchableOpacity>
            </View>

            <AppBtn
              style={{ marginTop: Sizes.font20 }}
              title="Sign In"
              onPress={handleSubmit(handleSignIn)}
              disabled={isPending}
              icon={
                <Feather
                  name="arrow-up-right"
                  size={Sizes.font20}
                  color="white"
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

  formContainer: {
    paddingHorizontal: Sizes.font20,
  },
  cta: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Sizes.font6,
  },
});
