import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Colors, moderateScale, Sizes } from "@src/theme";
import { AppText } from "../shared/AppText";

interface EmptyEntityProps {
  title: string;
  label?: string;
  headerText?: string;
  onPress?: () => void;
}

export const EmptyEntity: React.FC<EmptyEntityProps> = ({
  title,
  label,
  headerText,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Image source={require("@src/assets/images/empty-box.png")} />
      {headerText && (
        <AppText gray fontBold big centered>
          {headerText}
        </AppText>
      )}
      <View style={{ width: "70%", marginTop: Sizes.font6 }}>
        <AppText gray fontRegular semiMedium centered>
          {title}
        </AppText>
      </View>
      {onPress && (
        <TouchableOpacity style={styles.addBtn} onPress={onPress}>
          <AppText mainColor>{label}</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: Sizes.font6,
  },

  addBtn: {
    backgroundColor: "transparent",
    padding: Sizes.font6,
    borderWidth: 1.2,
    borderColor: Colors.primary,
    alignItems: "center",
    borderRadius: Sizes.font20,
    marginTop: Sizes.font6,
    width: moderateScale(100, 2),
  },
});
