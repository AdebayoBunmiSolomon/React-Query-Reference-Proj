import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AppText } from "../../shared/AppText";
import { Colors, RPH, Sizes, moderateScale, screenWidth } from "@src/theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { headerProps } from "@src/types/types";
import { useThemeContext } from "@src/theme/themeContext";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";

export const Header: React.FC<headerProps> = ({
  backBtn,
  rightIcon,
  rightDoneIcon,
  rightDoneText,
  leftTitle,
  title,
  bellIconPressed,
  onPressRight,
}) => {
  const { theme } = useThemeContext();
  const navigation: NavigationProp<any> = useNavigation();

  const handleOnPressRight = () => {
    if (onPressRight && rightDoneText === "Done") {
      onPressRight();
    } else if (onPressRight && rightDoneText === "Update") {
      navigation.navigate("UpdateReceipt");
    } else if (onPressRight && rightDoneText === "Create") {
      console.log("Create new receipt");
    } else {
      navigation.navigate("Account");
    }
  };

  return (
    <>
      {backBtn ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.header,

              {
                borderColor:
                  theme === "dark" ? Colors.primaryColor2 : Colors.primary,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back-outline"
              size={Sizes.font20}
              color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
            />
          </TouchableOpacity>
          <AppText black fontMedium semiMedium style={styles.appText}>
            {title}
          </AppText>

          {rightIcon && (
            <TouchableOpacity
              onPress={
                bellIconPressed
                  ? () => navigation.navigate("Notifications")
                  : undefined
              }
            >
              <View
                style={[
                  styles.rightHeaderIcon,
                  {
                    backgroundColor:
                      theme === "dark" ? Colors.primaryColor2 : Colors.primary,
                  },
                ]}
              >
                <FontAwesome
                  name="edit"
                  size={Sizes.font16}
                  color={theme === "dark" ? Colors.black : Colors.white}
                />
                <AppText
                  fontMedium
                  style={{
                    color: theme === "dark" ? Colors.black : Colors.white,
                  }}
                >
                  Edit
                </AppText>
              </View>
            </TouchableOpacity>
          )}
          {rightDoneIcon && (
            <TouchableOpacity onPress={handleOnPressRight}>
              <View
                style={[
                  styles.rightHeaderIcon,
                  {
                    backgroundColor:
                      theme === "dark" ? Colors.primaryColor2 : Colors.primary,
                  },
                ]}
              >
                <AppText
                  fontMedium
                  style={{
                    color: theme === "dark" ? Colors.black : Colors.white,
                  }}
                >
                  {rightDoneText}
                </AppText>
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.container2}>
            <Image
              source={require("@src/assets/icons/person.png")}
              style={styles.personImg}
              resizeMode="contain"
            />
            {leftTitle && (
              <AppText black fontMedium semiMedium>
                {leftTitle}
              </AppText>
            )}
          </View>
          {rightIcon && (
            <TouchableOpacity
              style={[
                styles.header,
                {
                  borderColor:
                    theme === "dark" ? Colors.primaryColor2 : Colors.primary,
                },
              ]}
              onPress={
                bellIconPressed
                  ? () => navigation.navigate("EditProduct")
                  : undefined
              }
            >
              <Octicons
                name="bell-fill"
                size={Sizes.font20}
                color={theme === "dark" ? Colors.primaryColor2 : Colors.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: screenWidth - 25,
    alignItems: "center",
    marginVertical: Sizes.font20 * 1,
  },
  personImg: {
    width: moderateScale(40),
    height: RPH(12),
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -25,
    gap: 8,
  },
  appText: {
    marginTop: -20,
    paddingLeft: 15,
  },
  header: {
    marginBottom: Sizes.font20,
    borderWidth: 1,
    paddingHorizontal: Sizes.font6,
    paddingVertical: Sizes.font6,
    borderRadius: 5,
  },
  rightHeaderIcon: {
    borderRadius: Sizes.font20,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(8),
    gap: Sizes.font6 - 2,
    flexDirection: "row",
    marginTop: -20,
  },
  subTitle: {
    marginTop: Sizes.font14,
  },
});
