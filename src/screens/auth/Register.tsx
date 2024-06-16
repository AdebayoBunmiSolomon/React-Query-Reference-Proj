import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  AppBtn,
  AppInput,
  AppText,
  Header,
  ScrollContainer,
} from "@src/components";
import Screen from "../Screen";
import { AuthScreenProps } from "@src/router/types";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Colors, RPW, Sizes } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { CreateAccountData } from "@src/types/api";
import { useCreateUser } from "@src/services/mutations";

const schema = yup.object().shape({
  business_name: yup.string().required("Business Name is required"),
  email: yup
    .string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .email()
    .required("Please enter a valid email"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Please enter a valid password"),
  country: yup.string().required("Country is required"),
  business_industry: yup.string().required("Business Industry is required"),
});

export const Register = ({ navigation }: AuthScreenProps<"Register">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useCreateUser();

  const handleRegister = async (data: CreateAccountData) => {
    mutate(data);
  };

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyle.container}>
          <View style={{ alignSelf: "flex-start" }}>
            <Header title="Create an Account 👋🏿" backBtn />
          </View>

          <ScrollContainer>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label="Business Name"
                  placeholder="John Doe LTD"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.business_name?.message}
                />
              )}
              name="business_name"
              defaultValue=""
            />

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

            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label="Business Industry"
                  placeholder="Restuarant"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.business_industry?.message}
                />
              )}
              name="business_industry"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label="Country"
                  placeholder="Nigeria"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.country?.message}
                />
              )}
              name="country"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label="Create Password"
                  placeholder="Enter your password"
                  password
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.password?.message}
                />
              )}
              name="password"
              defaultValue=""
            />

            <View style={styles.footer}>
              <AppText small black>
                By creating an account, you agree to our
              </AppText>
              <TouchableOpacity
                onPress={() => navigation.navigate("TermsServices")}
              >
                <AppText small mainColor>
                  Terms of Service
                </AppText>
              </TouchableOpacity>
              <AppText small black>
                and
              </AppText>
              <TouchableOpacity
                onPress={() => navigation.navigate("PrivacyPolicy")}
              >
                <AppText small mainColor>
                  Privacy Policy
                </AppText>
              </TouchableOpacity>
            </View>

            <AppBtn
              style={{ marginTop: Sizes.font20, alignSelf: "center" }}
              title="Get Started"
              disabled={isPending}
              onPress={handleSubmit(handleRegister)}
              icon={
                <MaterialIcons
                  name="arrow-forward"
                  size={Sizes.font20}
                  color="white"
                />
              }
            />
          </ScrollContainer>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
};

const styles = StyleSheet.create({
  agreementTextContainer: {
    color: Colors.black,
    marginTop: Sizes.font14,
    textAlign: "center",
    lineHeight: Sizes.font20,
    fontSize: Sizes.font12,
    width: RPW(90),
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    gap: Sizes.font6 / 3,
    flexWrap: "wrap",
    marginBottom: Sizes.font10,
    justifyContent: "center",
  },
});
