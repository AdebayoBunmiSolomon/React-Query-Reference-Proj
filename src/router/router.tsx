import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "@src/state/commonState";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const Router = () => {
  const [loading, setLoading] = useState(false);
  const authStore = useAuthStore();
  const token = authStore.token;
  const isAuthenticated = authStore.isAuthenticated;

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <NavigationContainer>
      {token && isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
