import { DrawerStackScreenProps } from "@src/router/types";
import React from "react";
import { View } from "react-native";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { AppText } from "@src/components";

export const Employee = ({
  navigation,
}: DrawerStackScreenProps<"Employee">) => {
  return (
    <Screen>
      <View style={globalStyle.container}>
        <AppText>Employee</AppText>
      </View>
    </Screen>
  );
};
