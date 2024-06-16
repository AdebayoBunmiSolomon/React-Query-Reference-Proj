import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { TabScreenProps } from "@src/router/types";
import { AppText, SettingsItem } from "@src/components";
import { globalStyle } from "@src/theme/globalStyles";
import Screen from "../../Screen";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { Colors, RPH, RPW, Sizes, moderateScale } from "@src/theme";
import { AntDesign } from "@expo/vector-icons";
import { settingsData } from "@src/constant/data";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuthStore } from "@src/state/commonState";
import { useUser } from "@src/state";

export const Account = ({}: TabScreenProps<"Account">) => {
  const logout = useAuthStore((state) => state.logout);
  const { activeStore } = useUser();

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader title="Settings" />
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
          <View style={styles.storeInfoContainer}>
            <Image
              source={require("@src/assets/images/customer-avatar.png")}
              style={styles.avatar}
            />
            <View style={styles.storeTextContainer}>
              <AppText fontBold black medium>
                {activeStore?.name}
              </AppText>
            </View>
          </View>
          <View style={styles.settingsContainer}>
            <AppText black semiMedium style={{ marginBottom: Sizes.font14 }}>
              General
            </AppText>
            {settingsData.map((setting, index) => (
              <SettingsItem key={index} setting={setting} />
            ))}
          </View>
          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={() => logout()}
          >
            <AntDesign name="logout" size={24} color={Colors.red} />
            <AppText black fontRegular style={{ color: Colors.red }}>
              Logout
            </AppText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  storeInfoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: moderateScale(16),
  },
  avatar: {
    width: RPW(20),
    height: RPW(20),
    borderRadius: RPW(10),
  },
  storeTextContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.font4,
  },

  settingsContainer: {
    marginTop: moderateScale(20),
  },
  settingName: {
    fontSize: moderateScale(16),
    color: Colors.black,
  },
  logoutContainer: {
    flexDirection: "row",
    gap: Sizes.font8,
    alignItems: "center",
    alignSelf: "center",
    height: RPH(8),
    marginBottom: moderateScale(65),
  },
});
