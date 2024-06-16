import {
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { RootStackProps } from "@src/router/types";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AppInput, EmptyEntity, ReceiptOverview } from "@src/components";
import { useThemeContext } from "@src/theme/themeContext";
import { Colors, RPW, Sizes } from "@src/theme";
import { receiptList } from "@src/constant/data";
import { ReceiptItem } from "@src/components/receipts/ReceiptItem";

export const Receipt = ({}: RootStackProps<"Receipt">) => {
  type DateHandler = (date: Date) => void;
  const { theme } = useThemeContext();
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const handleConfirm: DateHandler = (date) => {
    console.log(date);
    setDatePickerVisibility(!isDatePickerVisible);
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader title="Receipts" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppInput
            placeholder="Search..."
            icon={require("@src/assets/icons/fi_search.png")}
            // onChangeText={handleSearch}
          />
        </TouchableWithoutFeedback>

        <ReceiptOverview
          onPressToday={() => setDatePickerVisibility(!isDatePickerVisible)}
          onPressFilter={() => console.log("Pressed filter")}
          style={styles.overView}
        />

        {receiptList.length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <EmptyEntity
              headerText="No receipt yet!"
              title="Receipts will show up here when you make sales."
            />
          </View>
        ) : (
          <>
            <View style={styles.listContainer}>
              <FlatList
                data={receiptList}
                renderItem={({ item }) => <ReceiptItem receipt={item} />}
                keyExtractor={(item) => item?.id?.toString()}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        )}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(!isDatePickerVisible)}
          isDarkModeEnabled={theme === "dark" ? true : false}
          display="inline"
          accentColor={Colors.primary}
          buttonTextColorIOS={Colors.primary}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  overView: {
    marginTop: Sizes.font22,
  },
  overView2: {
    borderBottomWidth: RPW(0.3),
    paddingBottom: Sizes.font12,
    borderBottomColor: Colors.gray,
  },
  emptyProductContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 140,
  },
  listContainer: {
    flex: 1,
    marginTop: Sizes.font22,
    height: "70%",
    marginBottom: Sizes.font34 * 2,
  },
});
