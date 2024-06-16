import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AppBtn, AppInput, AppText, Loader } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { useGetDiscount, useUpdateDiscount } from "@src/services/queries";
import { Sizes, moderateScale, verticalScale } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { UpdateDiscountDTO } from "@src/types/api";

export const EditDiscount = ({ route }: RootStackProps<"EditDiscount">) => {
  const { discountId }: any = route.params ?? { discountId: undefined };
  const { mutate, isPending, error } = useUpdateDiscount(discountId);
  const { data: discountData, isLoading, isError } = useGetDiscount(discountId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateDiscountDTO>({ mode: "onChange" });

  useEffect(() => {
    if (discountData) {
      setValue("name", discountData.name);
      setValue("percentage", discountData.percentage.toString());
    }
  }, [discountData]);

  const onSubmit = async (data: UpdateDiscountDTO) => {
    mutate(data);
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader backBtn />

        <View style={styles.subtitleContainer}>
          <AppText black fontMedium big>
            Edit Discount
          </AppText>
          <AppText gray semiMedium>
            Enter your discount information to continue.
          </AppText>
        </View>
        {isLoading ? (
          <Loader sizes="small" />
        ) : isError ? (
          <AppText>Error fetching data</AppText>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          >
            <View style={styles.formData}>
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
            </View>
            <View style={styles.formData}>
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
        )}
        <AppBtn
          title="Update Discount"
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
  formData: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Sizes.font12,
  },
});
