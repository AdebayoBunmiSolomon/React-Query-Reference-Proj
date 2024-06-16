import React, { useEffect, useState } from "react";
import { RootStackProps } from "@src/router/types";
import { AppInput, AppText, EmptyEntity, List } from "@src/components";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { usePagination } from "@src/hooks/usePagination";
import { employeeRoleData } from "@src/constant/data";
import { Sizes } from "@src/theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const EmployeeRoleList = ({}: RootStackProps<"EmployeeRoleList">) => {
  const navigation: NavigationProp<any> = useNavigation();
  const {
    currentPage,
    setCurrentPage,
    handleSearch,
    getFilteredDataListForCurrentPage,
    getTotalPages,
    isDataLoading,
  } = usePagination();

  const employeeRolesPerPage = 8;
  const totalPages = getTotalPages(
    employeeRoleData.length,
    employeeRolesPerPage
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(isDataLoading(employeeRoleData, employeeRolesPerPage));
    };
    loadData();
  }, []);

  return (
    <>
      <Screen>
        <View style={globalStyle.container}>
          <AuthHeader
            title='List of Roles'
            iconType='filledBtn'
            filledBtnText='Add new role'
            drawerBtn
          />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <AppInput
              placeholder='Search for roles'
              icon={require("@src/assets/icons/fi_search.png")}
              onChangeText={handleSearch}
            />
          </TouchableWithoutFeedback>
        </View>
        {employeeRoleData.length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <EmptyEntity
              headerText='No Roles List yet!'
              title='Roles you have added will show up here as a list.'
            />
          </View>
        ) : (
          <>
            <View style={styles.listContainer}>
              <AppText black fontRegular style={{ marginBottom: Sizes.font6 }}>
                Roles
              </AppText>
              <List
                isLoading={isLoading}
                loaderSize='large'
                data={getFilteredDataListForCurrentPage(
                  employeeRoleData,
                  employeeRolesPerPage
                )}
                currentPage={currentPage}
                goToPage={setCurrentPage}
                totalPages={totalPages}
                onEditCustomer={(
                  name,
                  email,
                  address,
                  city,
                  state,
                  country,
                  phone
                ) =>
                  console.log(name, email, address, city, state, country, phone)
                }
                onEditEmployee={(name, email, phone, passcode) =>
                  navigation.navigate("EditEmployee", {
                    data: {
                      employeeName: name,
                      employeeEmail: email,
                      employeePhone: phone,
                      employeePasscode: passcode,
                    },
                  })
                }
                onPressDelete={() => {}}
              />
            </View>
          </>
        )}
      </Screen>
    </>
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
    marginHorizontal: Sizes.font10,
  },
  pageFilter: { alignSelf: "flex-end", paddingTop: Sizes.font14 },
});
