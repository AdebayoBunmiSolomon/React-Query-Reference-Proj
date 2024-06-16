import { FontAwesome } from "@expo/vector-icons";
import { AppBtn, AppInput, AppText } from "@src/components";
import { Colors, Sizes, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { createProductInformation } from "@src/types/api";
import { servicesFormProps } from "@src/types/types";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";

export const ServicesForm: React.FC<servicesFormProps> = ({
  openCategoryModal,
  openStoreModal,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createProductInformation>({ mode: "onChange" });
  const { theme } = useThemeContext();
  const [checked, setChecked] = useState<boolean>(false);

  const handleRegister = async (data: createProductInformation) => {
    console.log("form data is", data);
  };

  return (
    <>
      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            label='Service name'
            placeholder='Enter service name'
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            errors={errors.service_name?.message}
          />
        )}
        name='service_name'
        defaultValue=''
        rules={{
          required: {
            value: true,
            message: "Service name is required",
          },
        }}
      />

      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            label='Category'
            placeholder='Select category'
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            errors={errors.category?.message}
            showDropDown
            clickDropDown={() => openCategoryModal()}
          />
        )}
        name='category'
        defaultValue=''
        rules={{
          required: {
            value: true,
            message: "Category is required",
          },
        }}
      />

      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            label='Select store to add product'
            placeholder='Select store'
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            errors={errors.service_store?.message}
            showDropDown
            clickDropDown={() => openStoreModal()}
          />
        )}
        name='service_store'
        defaultValue=''
        rules={{
          required: {
            value: true,
            message: "Store is required",
          },
        }}
      />

      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            label='Product Price'
            placeholder='Cost price'
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            errors={errors.service_product_price?.message}
            keyboardType='phone-pad'
          />
        )}
        name='service_product_price'
        defaultValue=''
        rules={{
          required: {
            value: true,
            message: "Price is required",
          },
        }}
      />

      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            label=''
            placeholder='Selling price'
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            errors={errors.service_selling_price?.message}
            keyboardType='phone-pad'
          />
        )}
        name='service_selling_price'
        defaultValue=''
        rules={{
          required: {
            value: true,
            message: "Selling price is required",
          },
        }}
      />
      <TouchableOpacity
        style={styles.bottomBtn}
        onPress={() => setChecked(!checked)}>
        <AppText fontMedium small>
          Use this same pricing across other stores
        </AppText>
        <FontAwesome
          name={`${checked ? "check-square" : "square-o"}`}
          size={Sizes.font22}
          color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
        />
      </TouchableOpacity>

      <AppBtn title='Proceed' onPress={handleSubmit(handleRegister)} />
    </>
  );
};

const styles = StyleSheet.create({
  bottomBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
  },
});
