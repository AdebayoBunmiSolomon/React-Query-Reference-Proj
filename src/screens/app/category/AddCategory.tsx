import { AppBtn, AppInput, AppText } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { useCreateCategory } from "@src/services/mutations";
import { useUser } from "@src/state";
import { Sizes, moderateScale, verticalScale } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { CreateCategoryDTO } from "@src/types/api";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

export const AddCategory = ({}: RootStackProps<"AddCategory">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryDTO>({ mode: "onChange" });
  const { userProfile, storeId } = useUser();
  const { mutate, isPending, error } = useCreateCategory(storeId);

  const onSubmit = async (data: CreateCategoryDTO) => {
    mutate(data);
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader backBtn />
        <View style={styles.subtitleContainer}>
          <AppText black fontMedium big>
            Add New Category
          </AppText>
          <AppText gray semiMedium>
            Add your category information to continue.
          </AppText>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
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
                  label="Category Color"
                  placeholder="Enter category color"
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
        <AppBtn
          title="Create Category"
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
