import React, { useState } from "react";
import { AppText } from "../shared/AppText";
import { StyleSheet, View } from "react-native";
import { SwitchToggle } from "../shared/SwitchToggle";
import { Sizes, verticalScale } from "@src/theme";

const toggleFunctions = [
  {
    title: "Discount",
    subTitle: "Add Discount",
  },
  {
    title: "Expiry Date",
    subTitle: "Add Expiry Date",
  },
  {
    title: "Return Policy",
    subTitle: "Add Return Policy",
  },
  {
    title: "Tax",
    subTitle: "Add Tax",
  },
  {
    title: "Track Stock",
    subTitle: "Add Track Stock",
  },
];

export const ProductToggle: React.FC<{}> = () => {
  const [switchStates, setSwitchStates] = useState(
    toggleFunctions.map(() => false) // Initialize all switches to false initially
  );

  const switchToggle = (index: number) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = !newSwitchStates[index];
    setSwitchStates(newSwitchStates);
  };
  return (
    <>
      {toggleFunctions &&
        toggleFunctions.map((items, index) => (
          <View key={index} style={styles.mainContainer}>
            <AppText fontRegular semiMedium gray>
              {items.title}
            </AppText>
            <View style={styles.toggleContainer}>
              <AppText fontRegular small gray>
                {items.subTitle}
              </AppText>
              <SwitchToggle
                onToggle={() => switchToggle(index)}
                toggleSwitch={switchStates[index]}
              />
            </View>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font4,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(-10),
  },
});
