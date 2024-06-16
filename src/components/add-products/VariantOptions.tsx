import { Colors, Sizes } from "@src/theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { Ionicons } from "@expo/vector-icons";

interface variantOptionsProps {
  data: any[];
  handleDeleteOption: (index: number) => void;
}

export const VariantOptions: React.FC<variantOptionsProps> = ({
  data,
  handleDeleteOption,
}) => {
  return (
    <>
      {data.length > 0 && (
        <View style={styles.optionsContainer}>
          <AppText fontMedium black style={styles.optionsTitle}>
            Options:
          </AppText>
          <View style={styles.optionsList}>
            {data.map((option, index) => (
              <View key={index} style={styles.optionItem}>
                <AppText fontRegular black>
                  {option.optionName}
                </AppText>
                <TouchableOpacity
                  onPress={() => handleDeleteOption(index)}
                  style={styles.deleteBtn}>
                  <Ionicons
                    name='close-circle'
                    size={Sizes.font20}
                    color={Colors.red}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    marginTop: Sizes.font20,
  },
  optionsTitle: {
    marginBottom: Sizes.font10,
  },
  optionsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: Sizes.font10,
    paddingHorizontal: Sizes.font10,
    paddingVertical: Sizes.font6,
    marginRight: Sizes.font10,
    marginBottom: Sizes.font10,
  },
  deleteBtn: {
    marginLeft: Sizes.font10,
  },
});
