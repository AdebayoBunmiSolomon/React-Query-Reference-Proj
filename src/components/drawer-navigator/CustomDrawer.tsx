import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AppBtn } from "../shared/AppButton";
import { AppText } from "../shared/AppText";
import { firstCharInFirstNLastString } from "@src/helper/helper";
import { useDropdown } from "@src/hooks/useDropdown";
import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { customDrawerProps } from "@src/types/types";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "@src/state/commonState";
import { useUser } from "@src/state";

export const CustomDrawer: React.FC<customDrawerProps> = ({ props }) => {
  const { theme } = useThemeContext();
  const { activeStore } = useUser();

  const { joinedChar } = firstCharInFirstNLastString(
    activeStore?.name ? activeStore.name : ""
  );
  const { showDropDown, onPressDropDown } = useDropdown();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? Colors.bgDark : Colors.white,
        },
      ]}
    >
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <>
          <View style={styles.container2}>
            {activeStore?.name && (
              <View style={styles.nameContainer}>
                <View style={styles.nameText}>
                  <AppText
                    fontMedium
                    big
                    style={{
                      color: theme === "dark" ? Colors.bgDark : Colors.white,
                    }}
                  >
                    {joinedChar.toUpperCase()}
                  </AppText>
                </View>
                <View>
                  <AppText fontMedium small gray>
                    {activeStore.name}
                  </AppText>
                </View>
              </View>
            )}
            <View>
              <TouchableOpacity onPress={() => onPressDropDown()}>
                <MaterialIcons
                  size={Sizes.font26}
                  color={
                    theme === "dark" ? Colors.primaryColor2 : Colors.primary
                  }
                  name={
                    !showDropDown ? "keyboard-arrow-down" : "keyboard-arrow-up"
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
        <View style={styles.list}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <AppText fontBold small black>
          Have Multiple Stores?
        </AppText>
        <View style={styles.bottomDescr}>
          <AppText fontMedium small gray>
            Create and manage multiple stores and have smooth inventories for
            all your stores. Get started now!
          </AppText>
        </View>
        <View style={styles.createContainer}>
          <AppBtn
            title="Create a store"
            icon={
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={Sizes.font12}
                color={theme === "dark" ? Colors.black : Colors.white}
              />
            }
            onPress={() => console.log("Create store")}
            style={styles.createBtn}
          />
          <Image
            source={require("@src/assets/icons/drawer-icon.png")}
            style={styles.img}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.font10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font10,
  },
  nameText: {
    paddingHorizontal: Sizes.font12,
    paddingVertical: Sizes.font12,
    borderRadius: 100,
    backgroundColor: Colors.nameColor,
  },
  list: {
    marginTop: RPH(7),
  },
  bottomContainer: {
    alignSelf: "center",
  },
  bottomDescr: {
    width: "80%",
    marginBottom: Sizes.font20,
  },
  createBtn: {
    width: RPW(38),
    height: RPH(6),
    borderRadius: 50,
    marginTop: RPH(5),
  },
  img: {
    width: RPW(30),
    height: RPH(20),
  },
  createContainer: {
    marginTop: RPH(-7),
    flexDirection: "row",
    alignItems: "center",
  },
});
