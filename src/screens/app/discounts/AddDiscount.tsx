import { AppBtn, AppInput, AppText } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { useCreateDiscount } from "@src/services/mutations";
import { useUser } from "@src/state";
import { Sizes, moderateScale, verticalScale } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { CreateDiscountDTO } from "@src/types/api";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

export const AddDiscount = ({}: RootStackProps<"AddDiscount">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDiscountDTO>({ mode: "onChange" });
  const { userProfile, storeId } = useUser();
  const { mutate, isPending, error } = useCreateDiscount(storeId);

  const onSubmit = async (data: CreateDiscountDTO) => {
    mutate(data);
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader backBtn />
        <View style={styles.subtitleContainer}>
          <AppText black fontMedium big>
            Add New Discount
          </AppText>
          <AppText gray semiMedium>
            Add your discount information to continue.
          </AppText>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
          <View>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label="Discount Name"
                  placeholder="What's your discount name"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.name?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Discount name is required!",
                },
              }}
              name="name"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  placeholder="How many percentage off?"
                  label="Percentage Off"
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  errors={errors?.percentage?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Percentage is required!",
                },
              }}
              name="percentage"
              defaultValue=""
            />
          </View>
        </ScrollView>
        <AppBtn
          title="Create Discount"
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
});
