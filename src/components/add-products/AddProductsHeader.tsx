import { AntDesign, Feather } from "@expo/vector-icons";
import { Colors, RPH, RPW, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { AppBtn } from "../shared/AppButton";
import { addProductTab } from "@src/constant/data";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface addProductsHeaderProps {
  goBack?: () => void;
  title: string;
  description: string;
  btnTitle?: string;
  btnPressed: () => void | undefined;
  icon?: React.ReactNode;
  showRightIcon?: boolean;
  showTab?: boolean;
  setSelectedTab?: (tab: string) => void;
}

export const AddProductsHeader: React.FC<addProductsHeaderProps> = ({
  goBack,
  title,
  description,
  btnTitle,
  btnPressed,
  icon,
  showRightIcon,
  showTab,
  setSelectedTab,
}) => {
  const { theme } = useThemeContext();
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const navigation: NavigationProp<any> = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.arrowBckContainer}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign
              name="arrowleft"
              size={Sizes.font22}
              color={theme === "dark" ? Colors.white : Colors.black}
            />
          </TouchableOpacity>
          {showRightIcon && (
            <AppBtn
              icon={
                <Feather
                  name="camera"
                  size={Sizes.font14}
                  color={Colors.white}
                />
              }
              title='Snap to add product'
              onPress={() => navigation.navigate("SnapToAdd")}

              style={{
                height: RPH(6),
                width: RPW(55),
                borderRadius: Sizes.font50,
              }}
            />
          )}
        </View>
        <View style={styles.headerTextContainer}>
          {showTab && (
            <View style={styles.tabContainer}>
              {addProductTab &&
                addProductTab.map((tabItems, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedTabIndex(index);
                      setSelectedTab(tabItems);
                    }}
                    style={[
                      styles.tabBtn,
                      {
                        borderBottomWidth:
                          selectedTabIndex === index ? RPW(0.4) : undefined,
                        borderBottomColor:
                          theme === "dark"
                            ? Colors.primaryColor2
                            : Colors.primary,
                      },
                    ]}
                  >
                    <AppText
                      fontMedium
                      semiMedium
                      style={{
                        color:
                          theme === "dark" && selectedTabIndex === index
                            ? Colors.primaryColor2
                            : theme === "light" && selectedTabIndex === index
                            ? Colors.primary
                            : Colors.gray,
                      }}
                    >
                      {tabItems}
                    </AppText>
                  </TouchableOpacity>
                ))}
            </View>
          )}

          {title && (
            <AppText fontBold semiMedium black>
              {title}
            </AppText>
          )}
          {description && (
            <AppText fontRegular small gray>
              {description}
            </AppText>
          )}
          <View>
            {btnTitle && (
              <AppBtn
                title={btnTitle}
                onPress={() => btnPressed()}
                style={styles.btn}
                icon={icon}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Sizes.font14,
  },
  headerTextContainer: {
    marginTop: Sizes.font26,
    gap: Sizes.font12,
  },
  btn: {
    width: RPW(35),
    height: RPH(6),
    borderRadius: Sizes.font45,
  },
  arrowBckContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font20,
    marginBottom: Sizes.font6,
  },
  tabBtn: {
    paddingBottom: Sizes.font4,
  },
});
