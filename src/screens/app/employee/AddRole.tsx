import React, { useState } from "react";
import { RootStackProps } from "@src/router/types";
import { View, StyleSheet } from "react-native";
import { globalStyle } from "@src/theme/globalStyles";
import Screen from "@src/screens/Screen";
import {
  AddProductsHeader,
  AppBtn,
  AppInput,
  AppText,
  SwitchToggle,
} from "@src/components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createEmployeeRole } from "@src/types/api";
import { RPW, Sizes, verticalScale } from "@src/theme";

const toggleFunctions = [
  {
    title: "Pos",
    subTitle: "Employees can log in to the app using personal PIN",
  },
  {
    title: "Back Office",
    subTitle:
      "Employee can log in to the back office using their email and password",
  },
];

const schema = yup.object().shape({
  role_name: yup.string().required("Role name is required"),
  pos: yup.boolean().required("pos not selected"),
  back_office: yup.boolean().required("back office not selected"),
});

export const AddRole = ({ navigation }: RootStackProps<"AddNewRole">) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createEmployeeRole>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [switchStates, setSwitchStates] = useState(
    toggleFunctions.map(() => false) // Initialize all switches to false initially
  );

  const switchToggle = (index: number) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = !newSwitchStates[index];
    setSwitchStates(newSwitchStates);
  };

  return (
    <Screen>
      <AddProductsHeader
        goBack={() => navigation.goBack()}
        title='Add Role'
        description='Add role information to continue'
        btnPressed={() => {}}
      />
      <View style={globalStyle.container}>
        <Controller
          control={control}
          render={({ field }) => (
            <AppInput
              label='Name of Role'
              placeholder='John Role'
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              errors={errors?.role_name?.message}
            />
          )}
          name='role_name'
          defaultValue=''
        />
        {toggleFunctions &&
          toggleFunctions.map((items, index) => (
            <View key={index} style={styles.mainContainer}>
              <View>
                <AppText fontMedium semiMedium black>
                  {items.title}
                </AppText>
                <AppText
                  fontRegular
                  small
                  gray
                  style={{
                    width: RPW(80),
                  }}>
                  {items.subTitle}
                </AppText>
              </View>
              <View style={styles.toggleContainer}>
                <SwitchToggle
                  onToggle={() => switchToggle(index)}
                  toggleSwitch={switchStates[index]}
                />
              </View>
            </View>
          ))}
        <AppBtn
          title='Create Role'
          onPress={() => {
            console.log("Create Role");
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font4,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(15),
  },
});
