import { Ionicons } from "@expo/vector-icons";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { useThemeContext } from "@src/theme/themeContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AppBtn,
  AppInput,
  AppText,
  PhoneNumberInput,
  SwitchToggle,
} from "@src/components";
import { useCreateReceiptTemplate } from "@src/services/mutations";
import { useUser } from "@src/state";
import { CreateReceiptDTO } from "@src/types/api";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import * as yup from "yup";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors, RPW, Sizes, moderateScale, verticalScale } from "@src/theme";

const schema = yup.object().shape({
  logo: yup.string().required("Logo is required"),
  address: yup.string().required("Address is required"),
  header: yup.string().required("Header is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  footer: yup.string().required("Footer text is required"),
  countryCode: yup.string().required("Country code is required"),
});

export const UpdateReceipt = ({
  navigation,
}: RootStackProps<"UpdateReceipt">) => {
  const { storeId } = useUser();
  const { mutate, isPending, error } = useCreateReceiptTemplate(storeId);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [showBrandToggle, setShowBrandToggle] = useState(false);
  const { theme } = useThemeContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<{
    logo: string;
    address: string;
    header: string;
    phoneNumber: string;
    footer: string;
    countryCode: string;
  }>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handlePreview = () => {
    handleSubmit((data: CreateReceiptDTO) => {
      const { phoneNumber, countryCode } = getValues();
      navigation.navigate("PreviewReceipt", {
        data: {
          ...data,
          phoneNumber: `${countryCode}${phoneNumber}`,
        },
        onSubmit: async () => {
          data.logo = selectedLogo;
          await mutate(data);
        },
      });
    })();
  };

  const handleShowBrandToggle = () => {
    setShowBrandToggle(!showBrandToggle);
  };

  const selectLogo = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Camera Permission Required",
          "Please grant camera permissions."
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedLogo(result.assets[0].uri);
        // Update 'logo' field value using setValue
        setValue("logo", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting logo:", error);
    }
  };

  const handlePhoneNumberSelect = (
    phoneNumber: string,
    countryCode: string
  ) => {
    setValue("phoneNumber", phoneNumber);
    setValue("countryCode", countryCode);
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader backBtn title='Receipt' />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <View style={styles.receiptHeaderContainer}>
            <TouchableOpacity onPress={selectLogo}>
              {selectedLogo ? (
                <View style={styles.logoContainer}>
                  <Image
                    source={{ uri: selectedLogo }}
                    style={styles.logoImage}
                  />
                </View>
              ) : (
                <View
                  style={[
                    styles.emptyLogoContainer,
                    {
                      backgroundColor:
                        theme === "light" ? Colors.light : Colors.iconNfocused,
                    },
                  ]}>
                  <Ionicons
                    name='image-outline'
                    size={50}
                    color={Colors.primary}
                  />
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.addLogoText}>
              <AppText
                fontRegular
                style={{ color: errors.logo ? "red" : "black" }}>
                {selectedLogo
                  ? "Change Logo"
                  : !selectedLogo && !errors.logo
                  ? "Add Logo"
                  : !selectedLogo && errors.logo && errors.logo.message}
              </AppText>
            </View>
          </View>

          <View style={styles.receiptDetailsContainer}>
            <View style={styles.headerInput}>
              <AppText black semiMedium style={{ marginBottom: Sizes.font14 }}>
                Header
              </AppText>
              <View style={styles.headerInputText}>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <AppInput
                      placeholder='Enter Address'
                      value={field.value}
                      onChangeText={(text) => field.onChange(text)}
                      errors={errors?.address?.message}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Address is required!",
                    },
                  }}
                  name='address'
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field }) => (
                    <AppInput
                      placeholder='Enter Store name'
                      value={field.value}
                      onChangeText={(text) => field.onChange(text)}
                      errors={errors?.header?.message}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Store name is required!",
                    },
                  }}
                  name='header'
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({ field }) => (
                    <PhoneNumberInput
                      onPhoneNumberChange={handlePhoneNumberSelect}
                      errors={errors.phoneNumber?.message}
                    />
                  )}
                  name='phoneNumber'
                  rules={{ required: "Phone number is required" }}
                  defaultValue=''
                />
              </View>
            </View>
            <View style={styles.headerInput}>
              <AppText black semiMedium style={{ marginBottom: Sizes.font6 }}>
                Footer
              </AppText>
              <Controller
                control={control}
                render={({ field }) => (
                  <AppInput
                    placeholder='Wifi, Website, Thank You'
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    errors={errors?.footer?.message}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Footer is required!",
                  },
                }}
                name='footer'
                defaultValue=''
              />
            </View>
            <View style={styles.brandToggle}>
              <AppText black semiMedium style={{ marginBottom: Sizes.font14 }}>
                Brand
              </AppText>
              <View style={styles.brandToggleBtn}>
                <View style={styles.brandToggleBtnText}>
                  <Image source={require("@src/assets/icons/favicon.png")} />
                  <AppText fontRegular black>
                    Show "Paysharperly" Brand
                  </AppText>
                </View>
                <SwitchToggle
                  onToggle={handleShowBrandToggle}
                  toggleSwitch={showBrandToggle}
                />
              </View>
            </View>
            {showBrandToggle && (
              <AppText small gray style={{ marginTop: Sizes.font14 }}>
                Paysharperly brand will show on the receipt
              </AppText>
            )}
          </View>
        </ScrollView>
        <AppBtn
          disabled={isPending}
          style={styles.btn}
          title='Preview Receipt'
          onPress={handlePreview}
        />

        <TouchableWithoutFeedback>
          <Modal
            visible={showBrandToggle}
            transparent={true}
            animationType='slide'
            onRequestClose={() => setShowBrandToggle(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <AppText style={styles.modalText}>
                  You are using the free plan. Upgrade to standard.
                </AppText>
                <AppBtn
                  title='Upgrade plan'
                  onPress={() => {
                    setShowBrandToggle(false);
                  }}
                  style={{
                    width: "90%",
                  }}
                />
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  receiptHeaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: moderateScale(3),
  },
  logoContainer: {
    width: RPW(25),
    height: RPW(25),
    borderRadius: RPW(13),
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: RPW(15),
  },
  addLogoText: {
    alignItems: "center",
    gap: Sizes.font6,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
  },
  emptyLogoContainer: {
    width: RPW(25),
    height: RPW(25),
    borderRadius: RPW(13),
    alignItems: "center",
    justifyContent: "center",
  },
  receiptDetailsContainer: {
    flexDirection: "column",
  },
  headerInput: {
    flexDirection: "column",
  },
  headerInputText: {
    flexDirection: "column",
    marginTop: Sizes.font6,
    marginBottom: verticalScale(5),
  },
  brandToggle: {
    flexDirection: "column",
  },
  brandToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: Colors.gray,
    paddingHorizontal: Sizes.font14,
    borderRadius: Sizes.font8,
  },
  brandToggleBtnText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: Sizes.font8,
    gap: Sizes.font10,
  },
  btn: {
    width: "auto",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.modalBgDark,
  },
  modalContent: {
    backgroundColor: Colors.light,
    position: "absolute",
    width: "95%",
    paddingVertical: Sizes.font26,
    paddingHorizontal: Sizes.font20,
    borderRadius: Sizes.font10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: Sizes.font20,
    textAlign: "center",
    width: 250,
  },
});
