import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "./types";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors, Sizes, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { BlurView } from "expo-blur";
import { AppText } from "@src/components";
import { Account, Home, Order, Products, Receipt } from "@src/screens/app";
import { useIsTablet } from "@src/hooks";
import { StyleSheet, View } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  iconType: keyof TabStackParamList;
  theme: string;
}

const Tab = createBottomTabNavigator<TabStackParamList>();

const tabBarIconMapping: Record<
  keyof TabStackParamList,
  { icon: React.ComponentType<any>; name: string }
> = {
  Home: { icon: Ionicons, name: "home" },
  Products: { icon: FontAwesome5, name: "shopping-bag" },
  Order: { icon: FontAwesome, name: "shopping-cart" },
  Receipt: { icon: MaterialIcons, name: "group-work" },
  Account: { icon: FontAwesome5, name: "user-circle" },
};

const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  iconType,
  theme,
}) => {
  const TabIcon = (tabBarIconMapping[iconType] as any)?.icon;
  const iconName = (tabBarIconMapping[iconType] as any)?.name;

  const tabIconSize = Sizes.font20;

  return (
    <TabIcon
      name={iconName}
      size={tabIconSize}
      color={
        focused
          ? theme === "dark"
            ? Colors.primaryColor2
            : Colors.primary
          : theme === "dark"
          ? Colors.iconNfocused2
          : Colors.iconNfocused
      }
    />
  );
};

export const BottomTabs: React.FC<{}> = () => {
  const { theme } = useThemeContext();
  const isTablet = useIsTablet();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }: any) => ({
        tabBarStyle: {
          height: verticalScale(70),
          borderColor: theme === "dark" ? "black" : undefined,
          position: "absolute",
          backgroundColor:
            theme === "dark"
              ? Colors.bottomTabBgDarkColor
              : Colors.bottomTabBgLightColor,
        },

        tabBarBackground: () => (
          <>
            {theme === "dark" && (
              <BlurView
                tint="dark"
                intensity={1}
                style={{ backgroundColor: Colors.bottomTabBgDarkColor }}
              />
            )}
          </>
        ),
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarLabel: ({ focused }) =>
          focused ? (
            <View
              style={[
                styles.focusedTab,
                {
                  backgroundColor:
                    theme === "dark" ? Colors.primaryColor2 : Colors.primary,
                },
              ]}
            ></View>
          ) : (
            <AppText
              fontMedium
              small
              style={[
                {
                  color: focused ? Colors.primary : Colors.gray,
                  paddingBottom: Sizes.font10,
                },
              ]}
            >
              {route.name}
            </AppText>
          ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} iconType={route.name} theme={theme} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Receipt" component={Receipt} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  focusedTab: {
    padding: Sizes.font4,
    borderRadius: 50,
    marginBottom: verticalScale(15),
  },
});
