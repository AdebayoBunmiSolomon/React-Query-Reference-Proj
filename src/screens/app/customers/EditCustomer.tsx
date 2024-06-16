import { AppBtn, AppInput, AppText } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { Sizes, moderateScale, verticalScale } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import { ScrollView, StyleSheet, View } from "react-native";

export const EditCustomer = ({
  navigation,
  route,
}: RootStackProps<"EditCustomer">) => {
  const { data }: any = route.params ?? { data: undefined };
  console.log(data);
  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader backBtn />
        <View style={styles.subtitleContainer}>
          <AppText black fontMedium big>
            Edit Customer
          </AppText>
          <AppText gray semiMedium>
            Update your customer information to continue.
          </AppText>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
          <View style={styles.formData}>
            <AppInput
              placeholder='Meghan Markle'
              label='Full Name'
              value={data && data.customerName}
            />
          </View>
          <View style={styles.formData}>
            <AppInput
              placeholder="What's your store email address?"
              label='Email Address'
              value={data && data.customerEmail}
            />
          </View>
          <View style={styles.formData}>
            <AppInput
              placeholder="What's your phone number"
              label='Phone Number'
              value={data && data.customerPhone}
            />
          </View>
        </ScrollView>
        <AppBtn
          title='Update Customer'
          onPress={() => navigation.navigate("CustomerProfile")}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  subtitleContainer: {
    gap: Sizes.font6,
    marginTop: verticalScale(8),
    marginBottom: moderateScale(40),
  },
  formData: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Sizes.font12,
  },
});
