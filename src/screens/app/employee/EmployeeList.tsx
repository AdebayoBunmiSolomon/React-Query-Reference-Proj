import React, { useEffect, useState } from "react";
import Screen from "@src/screens/Screen";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import {
  AppInput,
  AppText,
  EmptyEntity,
  EntityModal,
  List,
} from "@src/components";
import { RootStackProps } from "@src/router/types";
import { usePagination } from "@src/hooks/usePagination";
import { employeeDataList } from "@src/constant/data";
import { globalStyle } from "@src/theme/globalStyles";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { Sizes } from "@src/theme";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export const EmployeeList = ({}: RootStackProps<"EmployeeList">) => {
  const navigation: NavigationProp<any> = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    currentPage,
    setCurrentPage,
    handleSearch,
    getFilteredDataListForCurrentPage,
    getTotalPages,
    isDataLoading,
  } = usePagination();
  const employeePerPage = 8;
  const totalPages = getTotalPages(employeeDataList.length, employeePerPage);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(isDataLoading(employeeDataList, employeePerPage));
    };
    loadData();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader
          title='Employee List'
          iconType='modal'
          onIconPress={toggleModal}
          drawerBtn
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppInput
            placeholder='Search for employee'
            icon={require("@src/assets/icons/fi_search.png")}
            onChangeText={handleSearch}
          />
        </TouchableWithoutFeedback>
        {employeeDataList.length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <EmptyEntity
              headerText='No customers yet!'
              title='Customer you have added will show up here as a list.'
            />
          </View>
        ) : (
          <>
            <View style={styles.listContainer}>
              <AppText black fontRegular style={{ marginBottom: Sizes.font6 }}>
                All Employee
              </AppText>
              <List
                isLoading={isLoading}
                loaderSize='large'
                data={getFilteredDataListForCurrentPage(
                  employeeDataList,
                  employeePerPage
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
                  navigation.navigate("EditCustomer", {
                    data: {
                      customerName: name,
                      customerEmail: email,
                      customerAddress: address,
                      customerCity: city,
                      customerState: state,
                      customerCountry: country,
                      customerPhone: phone,
                    },
                  })
                }
                onEditEmployee={(name, email, phone, passcode) =>
                  console.log(name, email, phone, passcode)
                }
                onPressDelete={(dataId) => {
                  console.log(dataId);
                }}
                isEdit={true}
              />
            </View>
          </>
        )}
      </View>
      {isModalVisible && (
        <EntityModal
          label='Customer List'
          actions={[
            {
              label: "Add Employee",
              icon: "plus",
              onPress: () => navigation.navigate("AddEmployee"),
            },
            {
              label: "Export Employee",
              icon: "export",
              onPress: () => console.log("Export customer"),
            },
            {
              label: "Import Employee",
              icon: "export2",
              onPress: () => console.log("Import customer"),
            },
          ]}
        />
      )}
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
