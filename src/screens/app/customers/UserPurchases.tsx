import { AppInput, AppText, EmptyEntity } from "@src/components";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { UserPurchaseItem } from "@src/components/customers/UserPurchaseItem";
import { userPurchasesList } from "@src/constant/data";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { Sizes } from "@src/theme";
import { globalStyle } from "@src/theme/globalStyles";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const UserPurchases = ({}: RootStackProps<"UserPurchases">) => {
  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader backBtn title="User Purchases" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppInput
            placeholder="Search by reciept number"
            icon={require("@src/assets/icons/fi_search.png")}
            style={{ paddingTop: 20 }}
            // onChangeText={handleSearch}
          />
        </TouchableWithoutFeedback>
        {userPurchasesList.length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <EmptyEntity
              headerText="No history yet!"
              title="You will see your purchases when you buy from a store"
            />
          </View>
        ) : (
          <>
            <View style={styles.listContainer}>
              <FlatList
                data={userPurchasesList}
                renderItem={({ item }) => <UserPurchaseItem purchases={item} />}
                keyExtractor={(item) => item?.id?.toString()}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  emptyProductContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 140,
  },
  listContainer: {
    flex: 1,
    marginTop: Sizes.font10,
    height: "70%",
    marginBottom: Sizes.font10,
  },
  pageFilter: { alignSelf: "flex-end", paddingTop: Sizes.font14 },
});
