import { AuthScreenProps } from "@src/router/types";
import Screen from "../Screen";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { globalStyle } from "@src/theme/globalStyles";
import { Sizes } from "@src/theme";
import { AppBtn, AppInput, Header } from "@src/components";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Please enter a valid password"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

interface UpdateDTO {
  password: string;
  confirm_password: string;
}

export const UpdatePassword = ({
  navigation,
}: AuthScreenProps<"UpdatePassword">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDTO>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleUpdatePassword = () => {
    navigation.navigate("Login");
  };

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyle.container}>
          <View style={styles.headerContainer}>
            <Header title="Update Password" backBtn />
          </View>

          <View style={styles.formContainer}>
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

            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label="Confirm Password"
                  placeholder="Enter your password again"
                  password
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.confirm_password?.message}
                />
              )}
              name="confirm_password"
              defaultValue=""
            />

            <AppBtn
              style={styles.resetBtn}
              title="Update Password"
              onPress={handleSubmit(handleUpdatePassword)}
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
});
