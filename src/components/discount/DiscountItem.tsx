import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors, Sizes, moderateScale } from "@src/theme";
import { discountItemProps } from "@src/types/types";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "../shared/AppText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDeleteDiscount } from "@src/services/mutations";
import { useThemeContext } from "@src/theme/themeContext";

export const DiscountItem = ({ data, onEditNavigate }: discountItemProps) => {
  const navigation: NavigationProp<any> = useNavigation();
  const { theme } = useThemeContext();
  const { mutate: deleteDiscount, isPending } = useDeleteDiscount(
    data.discountId
  );

  return (
    <View style={styles.customerData}>
      <View style={styles.leftDetailsContainer}>
        <View
          style={[
            styles.avatarContainer,
            {
              backgroundColor:
                theme === "dark" ? Colors.modalBgDark : Colors.deleteButton,
            },
          ]}
        >
          <MaterialIcons
            name="group-work"
            size={32}
            color={Colors.deleteIcon}
          />
        </View>

        <View style={styles.discountDataDetails}>
          <AppText black medium>
            {data.name}
          </AppText>
          {/* {!!data. && (
            <View style={styles.usedText}>
              <AppText small usedTextColor>{`Used ${data.used} times`}</AppText>
            </View>
          )} */}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.editIconContainer,
            {
              backgroundColor:
                theme === "dark" ? Colors.modalBgDark : Colors.editButton,
            },
          ]}
          onPress={() =>
            navigation.navigate(onEditNavigate, { discountId: data.discountId })
          }
        >
          <Feather name="edit-3" size={18} color={Colors.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.deleteIconContainer,
            {
              backgroundColor:
                theme === "dark" ? Colors.modalBgDark : Colors.deleteButton,
            },
          ]}
          onPress={() => deleteDiscount()}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Ionicons name="trash" size={18} color={Colors.deleteIcon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customerData: {
    marginTop: Sizes.font16,
    marginBottom: Sizes.font6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font10,
  },
  discountDataDetails: {
    flexDirection: "column",
    width: "55%",
    gap: Sizes.font6,
  },
  avatarContainer: {
    borderRadius: Sizes.font26,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font10,
  },
  editIconContainer: {
    padding: moderateScale(12),
    borderRadius: Sizes.font10,
  },
  deleteIconContainer: {
    padding: moderateScale(12),
    borderRadius: Sizes.font10,
  },
  usedText: {
    backgroundColor: Colors.usedTextBg,
    paddingVertical: Sizes.font6,
    borderRadius: Sizes.font26,
    alignItems: "center",
    width: "70%",
  },
});
