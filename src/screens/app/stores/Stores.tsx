import { DrawerStackScreenProps } from "@src/router/types";
import React, { useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { AppInput, AppText, Loader, StoreHeader } from "@src/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { firstCharInFirstNLastString, truncateText } from "@src/helper/helper";
import { Colors, Sizes, verticalScale } from "@src/theme";
import { useUser } from "@src/state";
import { useStores } from "@src/state/stores";
import { useGetAllStore } from "@src/services/queries";
import { useSearchFilter } from "@src/hooks";

export const Stores = ({}: DrawerStackScreenProps<"Stores">) => {
  const { storeId } = useUser();
  const { stores, setStores } = useStores();

  const { data: storeData, isLoading, isError } = useGetAllStore(storeId);

  // handle search query change
  const { handleSearch, filteredData: filteredStores } = useSearchFilter(
    stores || [],
    (item) => item.name
  );

  useEffect(() => {
    if (storeData) {
      setStores(storeData);
      console.log(storeData);
    }
  }, [storeData, isLoading, isError]);

  const navigation: NavigationProp<any> = useNavigation();
  return (
    <Screen>
      <View style={globalStyle.container}>
        <StoreHeader
          onPressAddStore={() => navigation.navigate("CreateStore")}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppInput
            placeholder='Search...'
            icon={require("@src/assets/icons/fi_search.png")}
            onChangeText={handleSearch}
          />
        </TouchableWithoutFeedback>
        {isLoading ? (
          <Loader sizes='large' />
        ) : (
          <FlatList
            data={filteredStores && filteredStores}
            keyExtractor={(items) => items.storeID?.toString()}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const { joinedChar, nameWithoutSpaces } =
                firstCharInFirstNLastString(item.name);
              return (
                <TouchableOpacity
                  style={styles.textContentsContainer}
                  onPress={() =>
                    navigation.navigate("StoreInfo", {
                      data: {
                        storeId: item.storeID,
                        storeAtName: `@${nameWithoutSpaces}`,
                        storeName: item.name,
                        joinedChar: joinedChar,
                        description: item.description,
                        country: item.country,
                        state: item.state,
                        city: item.city,
                        phoneNumber: item.phoneNumber,
                        address: item.address,
                      },
                    })
                  }>
                  <View style={styles.joinedChar}>
                    <AppText
                      fontBold
                      semiMedium
                      white
                      style={{
                        paddingHorizontal: Sizes.font10,
                        paddingVertical: Sizes.font10,
                        borderRadius: Sizes.font45,
                        backgroundColor: Colors.nameColor,
                        color: Colors.white,
                      }}>
                      {joinedChar}
                    </AppText>
                    <View>
                      <AppText fontBold semiMedium black>
                        {truncateText(item.name)}
                      </AppText>
                      <AppText fontRegular small gray>
                        @{nameWithoutSpaces.toLowerCase()}
                      </AppText>
                    </View>
                  </View>
                  <View>
                    {/* <AppText
                      fontRegular
                      small
                      style={{
                        backgroundColor:
                          item.status === "active"
                            ? "rgba(237, 249, 254, 1)"
                            : "rgba(232, 153, 0, 0.1)",
                        paddingVertical: Sizes.font6,
                        paddingHorizontal: Sizes.font10,
                        borderRadius: Sizes.font45,
                        color:
                          item.status === "active"
                            ? "rgba(11, 50, 255, 1)"
                            : "rgba(232, 153, 0, 1)",
                      }}>
                      {item.status}
                    </AppText> */}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  joinedChar: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.font4,
  },
  textContentsContainer: {
    marginBottom: verticalScale(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
