import {
  AppBtn,
  AppInput,
  AppText,
  PhoneNumberInput,
  ScrollContainer,
} from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { useCreateCustomer } from "@src/services/mutations";
import { useUser } from "@src/state";
import { Sizes, moderateScale, verticalScale } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { CreateCustomerDTO } from "@src/types/api";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export const AddCustomer = ({}: RootStackProps<"AddCustomer">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerDTO>({ mode: "onChange" });
  const { storeId } = useUser();
  const { mutate, isPending } = useCreateCustomer(storeId);

  console.log(storeId, "ID");
  const onSubmit = async (data: CreateCustomerDTO) => {
    mutate(data);
  };
  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader backBtn />

        <ScrollContainer>
          <View style={styles.subtitleContainer}>
            <AppText black fontMedium big>
              Add a Customer
            </AppText>
            <AppText gray semiMedium>
              Add your customer information to continue.
            </AppText>
          </View>
          <View style={styles.formData}>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label='Full Name'
                  placeholder="What's your full name"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.name?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Customer full name is required!",
                },
              }}
              name='name'
              defaultValue=''
            />
          </View>
          <View style={styles.formData}>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label='Email Address'
                  placeholder="What's your email address"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.email?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Customer email is required!",
                },
              }}
              name='email'
              defaultValue=''
            />
          </View>
          <View style={styles.formData}>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label='Address'
                  placeholder="What's your address"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.address?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Customer address is required!",
                },
              }}
              name='address'
              defaultValue=''
            />
          </View>

          <View style={styles.formData}>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label='City'
                  placeholder='e.g Ikeja'
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.city?.message}
                  style={{
                    width: "45%",
                  }}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "City is required!",
                },
              }}
              name='city'
              defaultValue=''
            />

            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label='State'
                  placeholder='e.g Lagos'
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.state?.message}
                  style={{
                    width: "45%",
                  }}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "State is required!",
                },
              }}
              name='state'
              defaultValue=''
            />
          </View>

          <View style={styles.formData}>
            <Controller
              control={control}
              render={({ field }) => (
                <PhoneNumberInput
                  onPhoneNumberChange={(phoneNumber, countryCode) => {
                    field.onChange(`${countryCode}${phoneNumber}`);
                    console.log(countryCode);
                  }}
                  errors={errors.phone?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Phone number is required!",
                },
              }}
              name='phone'
              defaultValue=''
            />
          </View>
          <View style={styles.formData}>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label='Country'
                  placeholder='What is your country'
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.country?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Country is required!",
                },
              }}
              name='country'
              defaultValue=''
            />
          </View>
        </ScrollContainer>

        <AppBtn
          title='Add Customer'
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  subtitleContainer: {
    gap: Sizes.font6,
    marginTop: verticalScale(8),
    marginBottom: moderateScale(40),
  },
  formContainer: {
    marginTop: Sizes.font10,
    // height: "70%",
    marginBottom: Sizes.font10,
  },
  formData: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Sizes.font12,
  },
});
