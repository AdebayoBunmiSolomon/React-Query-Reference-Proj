import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { RootStackProps } from "@src/router/types";
import { AppBtn, AppInput, AppText, Header } from "@src/components";
import { Colors, RPW, Sizes, screenWidth, verticalScale } from "@src/theme";
import { Controller, useForm } from "react-hook-form";
import { createTaxesDTO } from "@src/types/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeContext } from "@src/theme/themeContext";
import { useUser } from "@src/state";
import { useCreateTax } from "@src/services/mutations";

const selectionType = ["included_in_price", "added_to_price"];

export const AddTax = ({ navigation }: RootStackProps<"AddTax">) => {
  const formattedSelectionTypes = selectionType.map((type) => {
    // Split the type string by underscores and capitalize each word
    const formattedWords = type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    // Join the formatted words with spaces
    return formattedWords.join(" ");
  });

  const { theme } = useThemeContext();
  const [selectedType, setSelectedType] = useState<string>(selectionType[0]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createTaxesDTO>({ mode: "onChange" });
  const { storeId } = useUser();
  const { mutate, isPending } = useCreateTax(storeId);

  const onSubmit = async (data: createTaxesDTO) => {
    data.type = selectedType;
    mutate(data);
  };

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={globalStyle.container}>
          <View style={styles.headerContainer}>
            <Header title='Tax' backBtn onPressRight={() => {}} />
            <AppBtn
              title={"Done"}
              style={styles.appBtn}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            />
          </View>
          <View>
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label='Title'
                  placeholder='Enter Tax Title'
                  value={field.value}
                  onChangeText={(text: string) => field.onChange(text)}
                  errors={errors?.name?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Category title is required",
                },
              }}
              name='name'
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ field }) => (
                <AppInput
                  label='Tax Rate (%)'
                  placeholder='Enter Tax rate'
                  value={field.value}
                  onChangeText={(text: string) => field.onChange(text)}
                  errors={errors?.ratePercentage?.message}
                  keyboardType='phone-pad'
                />
              )}
              name='ratePercentage'
              defaultValue=''
              rules={{
                required: {
                  value: true,
                  message: "Rate percentage is required",
                },
              }}
            />
            <Controller
              control={control}
              render={({ field }) => (
                <View>
                  <AppText fontMedium black style={styles.typeLabel}>
                    Type
                  </AppText>
                  {selectionType &&
                    selectionType.map((items, index) => (
                      <TouchableOpacity
                        style={styles.selectionContainer}
                        onPress={() => {
                          setSelectedType(items);
                          field.onChange(items);
                        }}
                        key={index}>
                        <AppText>Tax {formattedSelectionTypes[index]}</AppText>
                        <MaterialCommunityIcons
                          name={`${
                            selectedType === items
                              ? "checkbox-blank-circle"
                              : "checkbox-blank-circle-outline"
                          }`}
                          size={Sizes.font16}
                          color={
                            theme === "dark"
                              ? Colors.primaryColor2
                              : Colors.primary
                          }
                        />
                      </TouchableOpacity>
                    ))}
                </View>
              )}
              name='type'
              defaultValue=''
              rules={{
                required: {
                  value: true,
                  message: "Type is required",
                },
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: screenWidth - 25,
  },
  appBtn: {
    width: RPW(30),
    borderRadius: Sizes.font50,
    marginTop: verticalScale(-20),
  },
  typeLabel: {
    marginBottom: Sizes.font6,
  },
  selectionContainer: {
    marginBottom: Sizes.font20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: RPW(92),
    paddingVertical: Sizes.font14,
    paddingHorizontal: Sizes.font18,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: Sizes.font6,
  },
});
