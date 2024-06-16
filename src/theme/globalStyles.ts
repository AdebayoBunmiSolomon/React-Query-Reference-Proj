import { StyleSheet } from "react-native";
import { Sizes } from ".";

export const globalStyle = StyleSheet.create({
  container: {
    marginHorizontal: Sizes.font14,
    alignSelf: "center",
    // alignItems: "center",
  },
  footer: {
    marginVertical: Sizes.font16,
    alignSelf: "center",
  },
});
