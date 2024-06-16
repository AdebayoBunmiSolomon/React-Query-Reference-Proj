import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BottomTabs } from "./BottomTab";
import * as Screens from "@src/screens/app";
import { DrawerStackParamList, RootStackParamsList } from "./types";
import { AppText, CustomDrawer, NestedDropdown } from "@src/components";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors, FontFamily, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { useDropdown } from "@src/hooks/useDropdown";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const Drawer = createDrawerNavigator<DrawerStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamsList>();

type DrawerScreen = {
  name: keyof DrawerStackParamList;
  component: React.ComponentType<any>;
  label: string;
  iconName: string; // Specify iconName type as string
  nestedNavigation: boolean;
};

type ScreenConfig = {
  screenName: keyof RootStackParamsList;
  component: React.ComponentType<any>;
};

// Define the screens for the Stack Navigator
const otherScreens: ScreenConfig[] = [
  { screenName: "CartPreview", component: Screens.CartPreview },
  { screenName: "ProductPreview", component: Screens.ProductPreview },
  { screenName: "Order", component: Screens.Order },
  { screenName: "OrderPayment", component: Screens.OrderPayment },
  { screenName: "OrderReceipt", component: Screens.OrderReceipt },

  { screenName: "AddProducts", component: Screens.AddProducts },

  { screenName: "OrderRefund", component: Screens.OrderRefund },
  { screenName: "AddCustomer", component: Screens.AddCustomer },
  { screenName: "EditCustomer", component: Screens.EditCustomer },
  { screenName: "CustomerProfile", component: Screens.CustomerProfile },
  { screenName: "UserPurchases", component: Screens.UserPurchases },
  { screenName: "EmployeeList", component: Screens.EmployeeList },
  { screenName: "AddEmployee", component: Screens.AddEmployee },
  { screenName: "EditDiscount", component: Screens.EditDiscount },
  { screenName: "AddDiscount", component: Screens.AddDiscount },

  { screenName: "EditCategory", component: Screens.EditCategory },
  { screenName: "AddCategory", component: Screens.AddCategory },
  { screenName: "EmployeeRoleList", component: Screens.EmployeeRoleList },
  { screenName: "RoleUsers", component: Screens.RoleUsers },
  { screenName: "AddNewRole", component: Screens.AddRole },
  { screenName: "EditEmployee", component: Screens.EditEmployee },
  { screenName: "CreateStore", component: Screens.CreateStore },
  { screenName: "StoreInfo", component: Screens.StoreInfo },
  { screenName: "ConnectPrinter", component: Screens.Printer },
  { screenName: "PaymentTypes", component: Screens.PaymentTypes },
  { screenName: "AddPaymentType", component: Screens.AddPaymentType },
  { screenName: "EditPaymentType", component: Screens.EditPaymentType },
  { screenName: "TaxList", component: Screens.TaxList },
  { screenName: "AddTax", component: Screens.AddTax },
  { screenName: "SnapToAdd", component: Screens.SnapToAdd },

  { screenName: "ReceiptSettings", component: Screens.ReceiptSettings },
  { screenName: "UpdateReceipt", component: Screens.UpdateReceipt },
  { screenName: "PreviewReceipt", component: Screens.PreviewReceipt },
];

//Define the drawer screens
const drawerScreens: DrawerScreen[] = [
  {
    name: "Homes",
    component: BottomTabs,
    label: "Home",
    iconName: "home",
    nestedNavigation: false,
  },
  {
    name: "Employee",
    component: Screens.Employee,
    label: "Employee",
    iconName: "addusergroup",
    nestedNavigation: true,
  },
  {
    name: "Customer",
    component: Screens.Customers,
    label: "Customer",
    iconName: "user",
    nestedNavigation: false,
  },
  {
    name: "Stores",
    component: Screens.Stores,
    label: "Stores",
    iconName: "store-alt",
    nestedNavigation: false,
  },
  {
    name: "Discounts",
    component: Screens.Discounts,
    label: "Discount",
    iconName: "currency-sign",
    nestedNavigation: false,
  },
  {
    name: "Cart",
    component: Screens.Cart,
    label: "Cart",
    iconName: "shoppingcart",
    nestedNavigation: false,
  },
  {
    name: "Category",
    component: Screens.Category,
    label: "Category",
    iconName: "folder1",
    nestedNavigation: false,
  },
];

const StackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={DrawerScreens}
        options={{ headerShown: false }}
      />
      {otherScreens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.screenName}
          component={screen.component}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
};

const DrawerScreens = () => {
  const { theme } = useThemeContext();
  const { showDropDown, onPressDropDown } = useDropdown();
  const navigation: NavigationProp<any> = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Homes"
      screenOptions={{
        drawerStyle: { width: "80%" },
        drawerType: "front",
        headerShown: false,
        drawerActiveBackgroundColor: "transparent",
        drawerActiveTintColor:
          theme === "dark" ? Colors.primaryColor2 : Colors.primary,
        drawerInactiveTintColor: theme === "dark" ? Colors.white : Colors.black,
        drawerLabelStyle: {
          fontFamily: FontFamily.openSansMedium,
          fontSize: Sizes.font16,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawer
          props={props}
          loggedInName="hype supermarket"
          userName="John Doe"
        />
      )}
    >
      {drawerScreens.map((screen, index) => (
        <Drawer.Screen
          key={index.toString()} // Ensure key is a string
          name={screen.name}
          component={screen.component}
          options={{
            drawerLabel: ({ focused }) =>
              screen.nestedNavigation ? (
                <>
                  <NestedDropdown
                    focused={focused}
                    label={screen.label}
                    onPressDropDown={() => onPressDropDown()}
                    showDropDown={showDropDown}
                  />
                  {showDropDown && (
                    <View style={styles.dropDownContainer}>
                      <TouchableOpacity
                        style={styles.dropDownBtn}
                        onPress={() => navigation.navigate("EmployeeList")}
                      >
                        <AppText fontMedium semiMedium black>
                          Employee List
                        </AppText>
                        <MaterialIcons
                          size={Sizes.font26}
                          color={theme === "dark" ? Colors.white : Colors.black}
                          name="keyboard-arrow-right"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.dropDownBtn}
                        onPress={() => navigation.navigate("EmployeeRoleList")}
                      >
                        <AppText fontMedium semiMedium black>
                          Create Role
                        </AppText>
                        <MaterialIcons
                          size={Sizes.font26}
                          color={theme === "dark" ? Colors.white : Colors.black}
                          name="keyboard-arrow-right"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              ) : (
                <AppText
                  fontMedium
                  semiMedium
                  style={{
                    color:
                      focused && theme === "dark"
                        ? Colors.primaryColor2
                        : !focused && theme === "dark"
                        ? Colors.white
                        : focused && theme === "light"
                        ? Colors.primary
                        : !focused && theme === "light"
                        ? Colors.black
                        : undefined,
                  }}
                >
                  {screen.label}
                </AppText>
              ),
            drawerIcon: ({ color }) =>
              screen.iconName === "currency-sign" ? (
                <MaterialCommunityIcons
                  name={screen.iconName}
                  size={Sizes.font20}
                  color={color}
                />
              ) : screen.iconName === "store-alt" ? (
                <FontAwesome5
                  name={screen.iconName}
                  size={Sizes.font20}
                  color={color}
                />
              ) : (
                <AntDesign
                  // @ts-ignore
                  // TODO
                  name={screen.iconName}
                  size={Sizes.font20}
                  color={color}
                />
              ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const AppStack = () => {
  return (
    <>
      <StackScreens />
      <Toast />
    </>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: "column",
    gap: Sizes.font10,
    marginTop: Sizes.font10,
  },
  dropDownBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "125%",
  },
});
