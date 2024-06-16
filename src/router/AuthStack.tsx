import React from "react";
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import {
  ForgotPassword,
  Login,
  LoginPasscode,
  OnBoarding,
  Register,
  UpdatePassword,
  SetPasscode,
  VerifyEmail,
  SubscriptionPlan,
} from "@src/screens/auth";

const Stack = createNativeStackNavigator<AuthStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

type ScreenConfig = {
  screenName: keyof AuthStackParamList;
  component: React.ComponentType<any>;
};

const screens: ScreenConfig[] = [
  { screenName: "OnBoarding", component: OnBoarding },
  { screenName: "Register", component: Register },
  { screenName: "Login", component: Login },
  { screenName: "ForgotPassword", component: ForgotPassword },
  { screenName: "UpdatePassword", component: UpdatePassword },
  { screenName: "LoginPasscode", component: LoginPasscode },
  { screenName: "SetPasscode", component: SetPasscode },
  { screenName: "VerifyEmail", component: VerifyEmail },
  { screenName: "SubscriptionPlan", component: SubscriptionPlan },
];

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      {screens &&
        screens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.screenName}
            component={screen.component}
          />
        ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
