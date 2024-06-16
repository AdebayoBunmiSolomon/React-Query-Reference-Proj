import React from "react";
import { AppText } from "../shared/AppText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors, Sizes, moderateScale, verticalScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { taxItem } from "@src/types/types";
import { truncateText } from "@src/helper/helper";
import { useDeleteTax } from "@src/services/mutations";
import { Loader } from "../shared/Loader";

export const TaxItem: React.FC<taxItem> = ({ data }) => {
  const { theme } = useThemeContext();
  const { mutate: deleteTax, isPending } = useDeleteTax(data.taxId);
  return (
    <>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Feather
              name='percent'
              size={Sizes.font20}
              color={
                theme === "dark" ? Colors.taxIconColor : Colors.taxIconColor
              }
            />
          </View>
          <View>
            <AppText fontRegular fontMedium black>
              {truncateText(
                String(`${data.ratePercentage} % off on ${data.name}`)
              )}
            </AppText>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.editIconContainer}>
            <Feather name='edit-3' size={18} color={Colors.editIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteIconContainer}
            onPress={() => {
              deleteTax();
            }}>
            {isPending ? (
              <Loader sizes='small' />
            ) : (
              <Ionicons name='trash' size={18} color={Colors.deleteIcon} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },
  icon: {
    padding: Sizes.font14,
    backgroundColor: Colors.taxIconBgColor,
    borderRadius: Sizes.font50,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font10,
  },
  editIconContainer: {
    padding: moderateScale(12),
    backgroundColor: Colors.editButton,
    borderRadius: Sizes.font10,
  },
  deleteIconContainer: {
    padding: moderateScale(12),
    backgroundColor: Colors.deleteButton,
    borderRadius: Sizes.font10,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font10,
  },
});
