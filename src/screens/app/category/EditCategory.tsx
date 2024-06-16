import { AppBtn, AppInput, AppText, Loader } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { useGetCategory, useUpdateCategory } from "@src/services/queries";
import { Sizes, moderateScale, verticalScale } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { UpdateCategoryDTO } from "@src/types/api";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

export const EditCategory = ({ route }: RootStackProps<"EditCategory">) => {
  const { categoryId }: any = route.params ?? { categoryId: undefined };
  const { mutate, isPending, error } = useUpdateCategory(categoryId);
  const { data: categoryData, isLoading, isError } = useGetCategory(categoryId);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateCategoryDTO>({ mode: "onChange" });

  const onSubmit = async (data: UpdateCategoryDTO) => {
    mutate(data);
  };

  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData.name);
      setValue("color", categoryData.color.toString());
    }
  }, [categoryData]);

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader backBtn />

        <View style={styles.subtitleContainer}>
          <AppText black fontMedium big>
            Edit Category
          </AppText>
          <AppText gray semiMedium>
            Enter your category information to continue.
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
                    label="Category Name"
                    placeholder="What's your category name"
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    errors={errors?.name?.message}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Category name is required!",
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
                    placeholder="Enter category color"
                    label="Category Color"
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    errors={errors?.color?.message}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Category color is required!",
                  },
                }}
                name="color"
                defaultValue=""
              />
            </View>
          </ScrollView>
        )}

        <AppBtn
          title="Update Category"
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
