import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TabScreenProps } from "@src/router/types";
import { globalStyle } from "@src/theme/globalStyles";
import Screen from "../../Screen";
import {
  Barchart,
  Dashboard,
  HomeHeader,
  ScrollContainer,
  StoreOverview,
} from "@src/components";
import { DrawerActions } from "@react-navigation/native";
import { Colors, RPW, Sizes } from "@src/theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useThemeContext } from "@src/theme/themeContext";
import { useUser } from "@src/state";
import { useGetUserProfile } from "@src/services/queries";

export const Home = ({ navigation }: TabScreenProps<"Home">) => {
  type DateHandler = (date: Date) => void;
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const { theme } = useThemeContext();

  const { data: userProfile, isLoading, isError } = useGetUserProfile();
  const { setUserProfile, setActiveStore, setStoreId } = useUser();

  useEffect(() => {
    if (userProfile) {
      setUserProfile(userProfile);
      setActiveStore(userProfile.activeStore);
      setStoreId(userProfile.activeStore.storeId);
    }
  }, [userProfile, isLoading, isError]);

  const handleConfirm: DateHandler = (date) => {
    console.log(date);
    setDatePickerVisibility(!isDatePickerVisible);
  };
  return (
    <Screen>
      <ScrollContainer>
        <View style={globalStyle.container}>
          <HomeHeader
            onOpenSlideMenu={() =>
              navigation.dispatch(DrawerActions.openDrawer())
            }
          />
          <StoreOverview
            onPressToday={() => setDatePickerVisibility(!isDatePickerVisible)}
            onPressFilter={() => console.log("Pressed filter")}
            style={styles.overView}
          />
          <Dashboard
            grossPercent={39.4}
            refundPercent={39.4}
            discountPercent={0}
            netSalesPercent={39.4}
            grossVal={33800}
            refundVal={35800}
            discountVal={0}
            netSalesVal={8000}
          />
          <StoreOverview
            onPressToday={() => setDatePickerVisibility(!isDatePickerVisible)}
            onPressFilter={() => console.log("Pressed filter2")}
            style={styles.overView2}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(!isDatePickerVisible)}
            isDarkModeEnabled={theme === "dark" ? true : false}
            display="inline"
          />
        </View>
        <Barchart />
      </ScrollContainer>
    </Screen>
  );
};

const styles = StyleSheet.create({
  overView: {
    marginTop: Sizes.font22,
  },
  overView2: {
    borderBottomWidth: RPW(0.3),
    paddingBottom: Sizes.font12,
    borderBottomColor: Colors.gray,
  },
});
