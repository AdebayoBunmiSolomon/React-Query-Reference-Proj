import { useCheckedOptions } from "@src/hooks/useCheckedOptions";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { Colors, Sizes } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { AppInput } from "../shared/form/AppInput";
import { useOptionCombination } from "@src/hooks/useOptionCombination";

interface optionCombinationProps {
  data: any[];
}

export const OptionsCombination: React.FC<optionCombinationProps> = ({
  data,
}) => {
  const { theme } = useThemeContext();
  const { addCheckedOption, checkedOptions } = useCheckedOptions();
  const [viewAll, setViewAll] = useState<boolean>(false);
  const dataLength = data && data?.length;
  const { handleInputChange, variants } = useOptionCombination();

  return (
    <>
      <TouchableOpacity
        onPress={() => setViewAll(!viewAll)}
        style={{
          alignSelf: "flex-end",
        }}>
        <AppText
          fontBold
          fontMedium
          style={{
            color: theme === "dark" ? Colors.primaryColor2 : Colors.primary,
          }}>
          View All
        </AppText>
      </TouchableOpacity>
      {data &&
        data
          .slice(0, viewAll ? dataLength : 3)
          .map((items: any, index: number) => {
            const isCheckedOptSelected = checkedOptions.some(
              (optTitle) => optTitle === items
            );
            return (
              <View key={index}>
                <View style={styles.viewAllContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      addCheckedOption(String(items));
                      handleInputChange(index, "variantName", String(items));
                    }}
                    style={styles.checkedBtn}>
                    <MaterialIcons
                      name={`${
                        isCheckedOptSelected
                          ? "check-box"
                          : "check-box-outline-blank"
                      }`}
                      color={
                        theme === "dark" ? Colors.primaryColor2 : Colors.primary
                      }
                      size={Sizes.font26}
                    />
                    <AppText fontMedium semiMedium black>
                      {items}
                    </AppText>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.priceCostContainer}>
                    {/* price AppInput */}
                    <AppInput
                      label='Price'
                      placeholder='Enter price'
                      value={variants[index]?.price?.toString() || ""}
                      onChangeText={(text) =>
                        handleInputChange(index, "price", text)
                      }
                      keyboardType='phone-pad'
                      style={{
                        width: "45%",
                      }}
                    />
                    <AppInput
                      label='Cost'
                      placeholder='Enter cost'
                      value={variants[index]?.cost?.toString() || ""}
                      onChangeText={(text) =>
                        handleInputChange(index, "cost", text)
                      }
                      keyboardType='phone-pad'
                      style={{
                        width: "45%",
                      }}
                    />
                  </View>
                  <View style={styles.priceCostContainer}>
                    {/* sku app input */}
                    <AppInput
                      label='SKU'
                      placeholder='Enter sku'
                      value={variants[index]?.sku || ""}
                      onChangeText={(text) =>
                        handleInputChange(index, "sku", text)
                      }
                      keyboardType='default'
                      style={{
                        width: "45%",
                      }}
                    />
                    {/* barcode app input */}
                    <AppInput
                      label='Barcode'
                      placeholder='Enter barcode'
                      value={variants[index]?.barcode || ""}
                      onChangeText={(text) =>
                        handleInputChange(index, "barcode", text)
                      }
                      keyboardType='default'
                      style={{
                        width: "45%",
                      }}
                    />
                  </View>
                </View>
                {/* quantity app input */}
                <AppInput
                  label='Quantity'
                  placeholder='Enter quantity'
                  value={variants[index]?.quantity?.toString() || ""}
                  onChangeText={(text) =>
                    handleInputChange(index, "quantity", text)
                  }
                  keyboardType='phone-pad'
                />
              </View>
            );
          })}
    </>
  );
};

const styles = StyleSheet.create({
  viewAllContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Sizes.font10,
  },
  priceCostContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  checkedBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font6,
  },
});
