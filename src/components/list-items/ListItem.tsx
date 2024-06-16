import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../shared/AppText";
import { Colors, Sizes, moderateScale } from "@src/theme";
import { listItemProps, customerData, employeeData } from "@src/types/types";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "@src/theme/themeContext";
import { truncateText } from "@src/helper/helper";

type DataType = customerData | employeeData;

export const ListItem = ({
  data,
  onEditCustomer,
  onEditEmployee,
  onPressDelete,
  isEdit,
  showStatus,
}: listItemProps) => {
  const { theme } = useThemeContext();

  const isEmployeeData = (data: DataType): data is employeeData => {
    return (data as employeeData).passcode !== undefined;
  };

  return (
    <View style={styles.customerData}>
      <View style={styles.leftDetailsContainer}>
        <Image
          source={require("@src/assets/images/customer-avatar.png")}
          style={styles.avatarContainer}
        />
        <View style={styles.customerDataDetails}>
          <AppText black semiMedium>
            {truncateText(String(data.name))}
          </AppText>
          <View style={styles.infoTextContainer}>
            {showStatus ? (
              <AppText small gray>
                {isEmployeeData(data) ? `${data.phone}` : data.email}
              </AppText>
            ) : (
              !isEmployeeData(data) && (
                <AppText
                  small
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? Colors.modalBgDark
                        : Colors.statusLightBg,
                    color: Colors.statusLightTxt,
                    paddingHorizontal: Sizes.font6,
                    paddingVertical: Sizes.font2,
                    borderRadius: Sizes.font45,
                  }}>
                  {isEmployeeData(data)
                    ? `${data.phone}`
                    : truncateText(String(data.email))}
                </AppText>
              )
            )}
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={() => {
            if (!isEdit) {
              isEmployeeData(data)
                ? onEditEmployee(
                    data.name,
                    data.email,
                    data.phone,
                    data.passcode
                  ) //employeeID function
                : onEditCustomer(
                    data.name,
                    data.email,
                    data.address,
                    data.city,
                    data.state,
                    data.country,
                    data.phone
                  ); //customerID function
            } else {
              isEmployeeData(data)
                ? onEditEmployee(
                    data.name,
                    data.email,
                    data.phone,
                    data.passcode
                  ) //employeeID function
                : onEditCustomer(
                    data.name,
                    data.email,
                    data.address,
                    data.city,
                    data.state,
                    data.country,
                    data.phone
                  );
            }
          }}>
          {!isEdit ? (
            <EvilIcons name='eye' size={18} color={Colors.editIcon} />
          ) : (
            <Feather name='edit-3' size={18} color={Colors.editIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteIconContainer}
          onPress={() => {
            isEmployeeData(data)
              ? onPressDelete(data.employeeID)
              : onPressDelete(data.customerID);
          }}>
          <Ionicons name='trash' size={18} color={Colors.deleteIcon} />
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
  customerDataDetails: {
    flexDirection: "column",
    gap: Sizes.font6 - 4,
  },
  avatarContainer: {
    backgroundColor: Colors.primary,
    borderRadius: Sizes.font26,
    width: 50,
    height: 50,
  },
  actions: {
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
  infoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font4,
  },
});
