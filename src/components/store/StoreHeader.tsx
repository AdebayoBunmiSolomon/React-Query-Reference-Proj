import {
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors, RPW, Sizes, screenWidth } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useDropdown } from "@src/hooks/useDropdown";
import { Loader } from "../shared/Loader";

interface storeHeaderProps {
  backBtn?: boolean;
  showTitleText?: boolean;
  titleText?: string;
  showMoreIcon?: boolean;
  onPressMoreIcon?: () => void;
  onPressAddStore?: () => void;
  onPressBackIcon?: () => void;
  onPressDeleteStore?: () => void;
  isPending?: boolean;
}

export const StoreHeader: React.FC<storeHeaderProps> = ({
  backBtn,
  showTitleText,
  titleText,
  showMoreIcon,
  onPressMoreIcon,
  onPressAddStore,
  onPressBackIcon,
  onPressDeleteStore,
  isPending,
}) => {
  const { theme } = useThemeContext();
  const navigation: NavigationProp<any> = useNavigation();
  const { setShowDropDown, showDropDown } = useDropdown();
  return (
    <>
      <View style={styles.headerContainer}>
        {backBtn ? (
          <TouchableOpacity onPress={onPressBackIcon}>
            <Ionicons
              name='arrow-back-sharp'
              size={Sizes.font26}
              color={theme === "dark" ? Colors.white : Colors.black}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.menuBtnContainer}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Entypo
                name='menu'
                size={Sizes.font20}
                color={theme === "dark" ? Colors.white : Colors.black}
              />
            </TouchableOpacity>
            <AppText fontBold semiMedium black>
              Store
            </AppText>
          </View>
        )}
        {showTitleText ? (
          <AppText fontMedium semiMedium black>
            {titleText}
          </AppText>
        ) : (
          <View></View>
        )}

        {showMoreIcon ? (
          <>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => setShowDropDown(!showDropDown)}>
              <Feather
                name='more-vertical'
                size={Sizes.font26}
                color={theme === "dark" ? Colors.white : Colors.black}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[
              styles.addStoreBtn,
              {
                backgroundColor:
                  theme === "dark" ? Colors.primaryColor2 : Colors.primary,
              },
            ]}
            onPress={onPressAddStore}>
            <Feather
              name='plus-square'
              size={Sizes.font22}
              color={Colors.white}
            />
            <AppText
              fontMedium
              semiMedium
              style={{
                color: "white",
              }}>
              Add Store
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      {showDropDown && (
        <View
          style={[
            styles.dropDownContainer,
            {
              backgroundColor: theme === "dark" ? Colors.bgDark : Colors.white,
            },
          ]}>
          <TouchableOpacity style={styles.dropDownBtn}>
            <FontAwesome5
              name='edit'
              size={Sizes.font18}
              color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
            />
            <AppText fontRegular semiMedium black>
              Edit Store Info
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropDownBtn}
            onPress={onPressDeleteStore}>
            {isPending ? (
              <Loader sizes='small' />
            ) : (
              <MaterialIcons
                name='delete-sweep'
                size={Sizes.font26}
                color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
              />
            )}
            <AppText fontRegular semiMedium black>
              Delete Store
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  menuBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font4,
  },
  menuBtn: {
    paddingVertical: Sizes.font6,
    paddingHorizontal: Sizes.font6,
    borderRadius: Sizes.font45,
    borderWidth: RPW(0.3),
    borderColor: Colors.gray,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: screenWidth - 25,
    marginVertical: Sizes.font18,
  },
  addStoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.font6,
    paddingHorizontal: Sizes.font10,
    borderRadius: Sizes.font45,
  },
  dropDownContainer: {
    zIndex: 10,
    width: RPW(55),
    gap: Sizes.font16,
    paddingVertical: Sizes.font18,
    paddingHorizontal: Sizes.font6,
    borderRadius: Sizes.font10,
    position: "absolute",
    marginTop: Sizes.font57,
    alignSelf: "flex-end",
    // Shadow properties for iOS
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      // Elevation for Android
      android: {
        elevation: 5,
      },
    }),
  },
  dropDownBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font6,
  },
});
