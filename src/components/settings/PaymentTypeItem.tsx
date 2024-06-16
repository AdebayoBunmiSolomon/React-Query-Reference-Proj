import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Colors, Sizes, moderateScale } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { paymentItemProps } from "@src/types/types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export const PaymentTypeItem = ({ data, onEditNavigate }: paymentItemProps) => {
  const navigation: NavigationProp<any> = useNavigation();
  const { theme } = useThemeContext();

  const handleEditPaymentType = () => {
    navigation.navigate(onEditNavigate, { paymentTypeId: data.id });
  };

  return (
    <View style={styles.customerData}>
      <View style={styles.leftDetailsContainer}>
        <View
          style={[
            styles.avatarContainer,
            {
              backgroundColor:
                theme === "dark" ? Colors.modalBgDark : Colors.primary,
            },
          ]}
        >
          {data.name === "Cash" || data.name === "POS" ? (
            <MaterialCommunityIcons
              name={data.iconName}
              size={28}
              color="white"
            />
          ) : (
            <Feather name="credit-card" size={28} color="white" />
          )}
        </View>

        <View style={styles.discountDataDetails}>
          <AppText black medium>
            {data.name}
          </AppText>
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
          onPress={handleEditPaymentType}
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
          // onPress={() => deleteDiscount()}
        >
          {/* {isPending ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : ( */}
          <Ionicons name="trash" size={18} color={Colors.deleteIcon} />
          {/* )} */}
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
});
