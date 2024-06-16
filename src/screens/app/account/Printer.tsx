import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { View } from "react-native";

export const Printer = ({ navigation }: RootStackProps<"ConnectPrinter">) => {
  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader title="Printer" backBtn={true} />
      </View>
    </Screen>
  );
};
