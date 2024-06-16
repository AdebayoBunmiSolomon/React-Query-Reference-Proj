import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { AuthScreenProps } from "@src/router/types";
import Screen from "../../Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { Colors, Sizes } from "@src/theme";
import {
  AddProductsHeader,
  AppBtn,
  AppInput,
  ScrollContainer,
} from "@src/components";
import { Feather } from "@expo/vector-icons";
import { CreateStoreDTO } from "@src/types/api";
import { Controller, useForm } from "react-hook-form";
import { useThemeContext } from "@src/theme/themeContext";
import { useUser } from "@src/state";
import { useCreateStore } from "@src/services/mutations";

export const CreateStore = ({ navigation }: AuthScreenProps<"CreateStore">) => {
  const { theme } = useThemeContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreDTO>({ mode: "onChange" });
  const { storeId } = useUser();
  const { mutate, isPending, error } = useCreateStore(storeId);

  const onSubmit = async (data: CreateStoreDTO) => {
    mutate(data);
  };
  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <AddProductsHeader
            title='Store Information 🏬'
            description=''
            btnPressed={() => {}}
            goBack={() => navigation.goBack()}
          />
          <ScrollContainer>
            <View style={globalStyle.container}>
              <Controller
                control={control}
                render={({ field }) => (
                  <AppInput
                    label='Store Name'
                    placeholder="What's your store name"
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    errors={errors?.name?.message}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Store name is required!",
                  },
                }}
                name='name'
                defaultValue=''
              />
              <Controller
                control={control}
                render={({ field }) => (
                  <AppInput
                    label='Address'
                    placeholder="What's your store address"
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    errors={errors?.address?.message}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Store address is required!",
                  },
                }}
                name='address'
                defaultValue=''
              />

              <Controller
                control={control}
                render={({ field }) => (
                  <AppInput
                    label='Phone number'
                    placeholder=''
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    errors={errors?.phoneNumber?.message}
                    phoneNumber={"+234"}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Phone number is required!",
                  },
                }}
                name='phoneNumber'
                defaultValue=''
              />

              <Controller
                control={control}
                render={({ field }) => (
                  <AppInput
                    label='Country'
                    placeholder='Enter your country'
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

              <View style={styles.stateCityContainer}>
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
              </View>

              <Controller
                control={control}
                render={({ field }) => (
                  <AppInput
                    label='Description'
                    placeholder='Store description'
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    errors={errors?.description?.message}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Description is required!",
                  },
                }}
                name='description'
                defaultValue=''
              />

              <AppBtn
                style={{ marginTop: Sizes.font20 }}
                title='Create Account'
                onPress={handleSubmit(onSubmit)}
                disabled={isPending}
                icon={
                  <Feather
                    name='arrow-up-right'
                    size={Sizes.font20}
                    color={theme === "dark" ? Colors.white : Colors.white}
                  />
                }
              />
            </View>
          </ScrollContainer>
        </>
      </TouchableWithoutFeedback>
    </Screen>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: Sizes.font20,
  },
  stateCityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
