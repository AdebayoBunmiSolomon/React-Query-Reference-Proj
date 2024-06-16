import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { categoryItemProps } from "@src/types/types";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "../shared/AppText";
import { Colors, Sizes, moderateScale } from "@src/theme";
import { useDeleteCategory } from "@src/services/mutations";
import { useThemeContext } from "@src/theme/themeContext";

export const CategoryItem = ({ data, onEditNavigate }: categoryItemProps) => {
  const navigation: NavigationProp<any> = useNavigation();
  const { theme } = useThemeContext();
  const { mutate: deleteDiscount, isPending } = useDeleteCategory(
    data.categoryId
  );

  return (
    <View style={styles.customerData}>
      <View style={styles.leftDetailsContainer}>
        <View
          style={[
            styles.avatarContainer,
            {
              backgroundColor:
                theme === "dark" ? Colors.modalBgDark : Colors.light,
            },
          ]}
        >
          <AntDesign name="folder1" size={24} color={Colors.primary} />
        </View>

        <View style={styles.discountDataDetails}>
          <AppText medium fontRegular black>
            {data.name}
          </AppText>
          <View style={styles.usedText}>
            {/* <AppText small usedTextColor>{`${data.products} items`}</AppText> */}
          </View>
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
            navigation.navigate(onEditNavigate, { categoryId: data.categoryId })
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
    gap: Sizes.font6,
  },
  avatarContainer: {
    // backgroundColor: Colors.primaryColor2,
    backgroundColor: "#F9FAFB",
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
    paddingVertical: Sizes.font4,
    paddingHorizontal: Sizes.font10,
    borderRadius: Sizes.font26,
    alignItems: "center",
    width: "auto",
  },
});
