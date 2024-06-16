import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppBtn, AppInput, AppText, Header } from "@src/components";
import { icons } from "@src/constant/data";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import {
  Colors,
  RPW,
  Sizes,
  moderateScale,
  screenWidth,
  verticalScale,
} from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export const EditPaymentType = ({
  route,
}: RootStackProps<"EditPaymentType">) => {
  const navigation: NavigationProp<any> = useNavigation();
  const { paymentTypeId }: any = route.params ?? { paymentTypeId: undefined };
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
    setBottomSheetOpen(true);
  };
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
    setBottomSheetOpen(false);
  };

  const handleBottomSheetChange = (index: number) => {
    setBottomSheetOpen(index !== -1);
  };

  const selectIcon = (iconName: string) => {
    setSelectedIcon(iconName === selectedIcon ? null : iconName);
  };

  const handleSaveChanges = () => {
    // Pass the selected icon back to the PaymentTypes screen
    navigation.navigate("PaymentTypes", {
      paymentTypeId,
      iconName: selectedIcon,
      updatedPaymentType: { id: paymentTypeId, iconName: selectedIcon },
    });
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <Header
          title="Edit payment type"
          backBtn
          rightDoneIcon
          rightDoneText="Done"
          onPressRight={handleSaveChanges}
        />
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
          <TouchableOpacity onPress={openBottomSheet}>
            <View style={styles.editContainer}>
              {selectedIcon ? (
                <View
                  style={[
                    styles.paymentIconContainer,
                    { backgroundColor: Colors.primary },
                  ]}
                >
                  {selectedIcon === "credit-card-alt" ? (
                    <FontAwesome name={selectedIcon} size={50} color="white" />
                  ) : (
                    <MaterialCommunityIcons
                      name={selectedIcon as any}
                      size={50}
                      color="white"
                    />
                  )}
                </View>
              ) : (
                <View style={styles.paymentEmptyIconContainer}></View>
              )}
              <View style={styles.editTextContainer}>
                <AppText fontRegular black medium>
                  Edit payment icon
                </AppText>
              </View>
            </View>
          </TouchableOpacity>

          <AppInput label="Title" placeholder="Cash" />
        </ScrollView>
      </View>

      {bottomSheetOpen && <View style={styles.overlay} />}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["40%"]}
        onChange={handleBottomSheetChange}
      >
        <View style={styles.bottomSheetContainer}>
          <AppText fontRegular black medium centered>
            Select payment icon
          </AppText>
          <View style={styles.iconsContainer}>
            {icons.map((iconName: any, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => selectIcon(iconName)}
              >
                <View
                  style={[
                    styles.iconItem,
                    selectedIcon === iconName && styles.selectedIcon,
                  ]}
                >
                  {iconName && (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={28}
                      color={Colors.primary}
                    />
                  )}
                  {selectedIcon === iconName && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={18}
                      color="green"
                      style={styles.checkIcon}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.continueButtonContainer}>
            <AppBtn title="Continue" onPress={closeBottomSheet} />
          </View>
        </View>
      </BottomSheetModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  editContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: moderateScale(6),
    width: screenWidth - 25,
  },
  editTextContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.font6,
    marginBottom: verticalScale(20),
  },
  paymentTypeIcon: {
    width: RPW(30),
    height: RPW(30),
    borderRadius: RPW(15),
  },
  paymentIconContainer: {
    width: RPW(30),
    height: RPW(30),
    borderRadius: RPW(15),
    alignItems: "center",
    justifyContent: "center",
  },
  paymentEmptyIconContainer: {
    width: RPW(30),
    height: RPW(30),
    borderRadius: RPW(15),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: "white",
    justifyContent: "space-between",
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  iconItem: {
    width: "100%",
    backgroundColor: Colors.subContainerBgLight,
    padding: 15,
    marginBottom: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  selectedIcon: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 14,
  },
  checkIcon: {
    position: "absolute",
    top: 2,
    right: -5,
    zIndex: 10,
  },
  continueButtonContainer: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
});
