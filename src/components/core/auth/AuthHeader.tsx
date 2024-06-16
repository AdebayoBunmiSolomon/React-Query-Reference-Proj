import { DrawerActions, useNavigation } from "@react-navigation/native";

import {
  Feather,
  Ionicons,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { AppText } from "@src/components/shared/AppText";
import { Colors, RPW, Sizes, moderateScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { ProductData } from "@src/types/types";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface AuthHeaderProps {
  title?: string;
  iconType?: "modal" | "cart" | "filledBtn";
  filledBtnText?: string;
  drawerBtn?: boolean;
  onIconPress?: () => void;
  backBtn?: boolean;
  cartData?: ProductData[];
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  iconType,
  onIconPress,
  cartData,
  drawerBtn,
  backBtn = false,
  filledBtnText = "Add Discount",
}) => {
  const { theme } = useThemeContext();
  const navigation: any = useNavigation();

  // console.log("AuthHeader: ", cartData);
  const handleIconPress = () => {
    if (iconType === "modal" && onIconPress) {
      onIconPress();
    } else if (iconType === "cart") {
      navigation.navigate("CartPreview", { cartData: cartData });
    } else if (iconType === "filledBtn" && filledBtnText === "Add Discount") {
      navigation.navigate("AddDiscount");
    } else if (iconType === "filledBtn" && filledBtnText === "Add Category") {
      navigation.navigate("AddCategory");
    } else if (iconType === "filledBtn" && filledBtnText === "Add new role") {
      navigation.navigate("AddNewRole");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { justifyContent: iconType ? "space-between" : "flex-start" },
      ]}>
      {backBtn && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            {
              borderColor:
                theme === "dark" ? Colors.primaryColor2 : Colors.primary,
            },
          ]}>
          <Ionicons
            name='chevron-back-outline'
            size={Sizes.font20}
            color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
          />
        </TouchableOpacity>
      )}

      {drawerBtn && iconType && (
        <TouchableOpacity
          style={styles.receiptHeader}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <SimpleLineIcons name='menu' size={20} color={Colors.primary} />
        </TouchableOpacity>
      )}

      {!iconType && !backBtn && (
        <TouchableOpacity
          style={styles.receiptHeader}
          onPress={() => navigation.openDrawer()}>
          <SimpleLineIcons name='menu' size={20} color={Colors.primary} />
          <AppText
            black
            fontBold
            semiBig
            style={{ paddingLeft: !iconType ? RPW(5) : 0 }}>
            {title}
          </AppText>
        </TouchableOpacity>
      )}

      {backBtn ||
        (iconType && (
          <AppText
            black
            fontBold
            semiBig
            style={{ paddingLeft: !iconType ? RPW(15) : 0 }}>
            {title}
          </AppText>
        ))}

      {backBtn && (
        <AppText
          black
          fontBold
          semiBig
          style={{ paddingLeft: !iconType ? RPW(15) : 0 }}>
          {title}
        </AppText>
      )}

      {iconType === "modal" && onIconPress && (
        <TouchableOpacity
          onPress={handleIconPress}
          style={styles.iconContainer}>
          <Feather name='more-vertical' size={18} color={Colors.gray} />
        </TouchableOpacity>
      )}
      {iconType === "cart" && (
        <TouchableOpacity
          onPress={handleIconPress}
          style={styles.iconContainer}>
          <View>
            <Feather name='shopping-bag' size={20} color={Colors.gray} />
            {cartData && cartData.length >= 0 && (
              <View style={styles.cartBadge}>
                <AppText centered small style={{ color: Colors.white }}>
                  {cartData.length}
                </AppText>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}

      {iconType === "filledBtn" && (
        <TouchableOpacity
          onPress={handleIconPress}
          style={[
            styles.rightHeaderIcon,
            {
              backgroundColor:
                theme === "dark" ? Colors.primaryColor2 : Colors.primary,
            },
          ]}>
          <Octicons
            name='diff-added'
            size={24}
            color={theme === "dark" ? Colors.black : Colors.white}
          />
          <AppText
            fontMedium
            style={{
              color: theme === "dark" ? Colors.black : Colors.white,
            }}>
            {filledBtnText}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: RPW(90),
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Sizes.font20 * 1.25,
  },
  backButton: {
    borderWidth: 1,
    paddingHorizontal: Sizes.font6,
    paddingVertical: Sizes.font6,
    borderRadius: 5,
  },
  iconContainer: {
    borderWidth: 1.2,
    borderColor: Colors.selectedPinCodeLight,
    borderRadius: Sizes.font20,
    padding: Sizes.font10,
  },
  cartBadge: {
    position: "absolute",
    top: -20,
    right: -18,
    backgroundColor: Colors.red,
    borderRadius: 50,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  receiptHeader: { flexDirection: "row", alignItems: "center" },
  rightHeaderIcon: {
    borderRadius: Sizes.font20,
    paddingHorizontal: moderateScale(15),
    marginLeft: Sizes.font30 * 3,
    paddingVertical: moderateScale(8),
    gap: Sizes.font8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
