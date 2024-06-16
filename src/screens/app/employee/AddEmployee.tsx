import { RootStackProps } from "@src/router/types";
import { globalStyle } from "@src/theme/globalStyles";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "@src/screens/Screen";
import {
  AddProductsHeader,
  AppBtn,
  AppInput,
  OtpInput,
  ScrollContainer,
  SheetModal,
} from "@src/components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEmployee } from "@src/types/api";
import * as yup from "yup";
import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { storeAccessData } from "@src/constant/data";
import { useModal } from "@src/hooks/useModal";
import { useStoreAccessStore } from "@src/hooks/services/useStoreAccessStore";
import { usePhoneNumber } from "@src/hooks/usePhoneNumber";

const schema = yup.object().shape({
  full_name: yup.string().required("full name is required"),
  email: yup.string().required("email is required"),
  phone_number: yup.string().required("phone number is required"),
  role: yup.string().required("role is required"),
  pos_pin: yup
    .string()
    .required("pin is required for selected role")
    .matches(/^[0-9]+$/, "pin must be only digits")
    .min(4, "pin must be be exactly 5 digits")
    .max(4, "pin must be exactly 5 digits"),
  store_access: yup.string().required("store access is required"),
  profile_image: yup.string().required("profile image is required"),
});

export const AddEmployee = ({ navigation }: RootStackProps<"AddEmployee">) => {
  const { modalOpen, modalRef, openModal, closeModal } = useModal();
  const { storeAccess } = useStoreAccessStore();
  const [selectedStoreAccess, setSelectedStoreAccess] = useState("");
  const { phNumber } = usePhoneNumber();
  const selectedStores = storeAccess
    .map((storeAccess) => storeAccess.title)
    .join(", ");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createEmployee>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: createEmployee) => {
    console.log("form data is", data);
  };

  return (
    <Screen>
      <AddProductsHeader
        goBack={() => navigation.goBack()}
        title="Add an Employee"
        description="Add an employee information to continue"
        btnPressed={() => {}}
      />
      <ScrollContainer>
        <View style={globalStyle.container}>
          <Controller
            shouldUnregister={false}
            control={control}
            render={({ field }) => (
              <AppInput
                label="Full name"
                placeholder="John"
                value={field.value}
                onChangeText={(text) => field.onChange(text)}
                errors={errors?.full_name?.message}
              />
            )}
            name="full_name"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field }) => (
              <AppInput
                label="Email address"
                placeholder="what's the email address"
                value={field.value}
                onChangeText={(text) => field.onChange(text)}
                errors={errors?.email?.message}
              />
            )}
            name="email"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field }) => (
              <AppInput
                label="Phone Number"
                placeholder="Enter Phone number"
                value={field.value}
                onChangeText={(text) => field.onChange(text)}
                errors={errors?.phone_number?.message}
              />
            )}
            name="phone_number"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field }) => (
              <AppInput
                label="Role"
                placeholder="Select role"
                value={field.value}
                onChangeText={(text) => field.onChange(text)}
                errors={errors?.role?.message}
                showDropDown
                clickDropDown={() => {}}
                showSoftInputOnFocus={false}
              />
            )}
            name="role"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field }) => (
              <>
                <OtpInput
                  value={field.value}
                  onChange={(text) => field.onChange(text)}
                  count={4}
                  label="POS PIN"
                  errors={errors?.pos_pin?.message}
                />
              </>
            )}
            name="pos_pin"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field }) => (
              <AppInput
                label="Store access"
                placeholder="Select store"
                value={selectedStores}
                onChangeText={(text) => {
                  setSelectedStoreAccess(text); // Update selectedStoreAccess state
                  field.onChange(text);
                }}
                errors={errors?.store_access?.message}
                showDropDown
                clickDropDown={() => {
                  openModal();
                }}
                showSoftInputOnFocus={false}
              />
            )}
            name="store_access"
            defaultValue=""
          />

          <AppBtn
            title="Proceed"
            onPress={handleSubmit(handleRegister)}
            style={styles.appBtn}
          />
        </View>
      </ScrollContainer>
      <SheetModal
        modalRef={modalRef}
        modalOpen={modalOpen}
        onCloseModal={() => closeModal()}
        title="Store Access"
        description=""
        data={storeAccessData}
        dataType={"store-access"}
        btnTitle="Add"
        selectionType="checkbox"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  appBtn: {
    alignSelf: "center",
  },
  otpInput: {
    borderWidth: RPW(0.3),
    borderBottomWidth: RPW(0.3),
    height: RPH(6),
    width: RPW(21),
    borderRadius: Sizes.font4,
  },

  label: {
    marginBottom: Sizes.font6,
    color: Colors.black,
    paddingLeft: Sizes.font4,
  },
});
