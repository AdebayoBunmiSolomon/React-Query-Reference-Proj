import { DrawerStackScreenProps } from "@src/router/types";
import React from "react";
import { View } from "react-native";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { AppText } from "@src/components";

export const Cart = ({ navigation }: DrawerStackScreenProps<"Cart">) => {
  return (
    <Screen>
      <View style={globalStyle.container}>
        <AppText>Cart</AppText>
      </View>
    </Screen>
  );
};
