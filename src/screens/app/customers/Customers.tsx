import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TabScreenProps } from "@src/router/types";
import {
  AppInput,
  AppText,
  EmptyEntity,
  EntityModal,
  List,
} from "@src/components";
import { globalStyle } from "@src/theme/globalStyles";
import Screen from "../../Screen";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { customerList } from "@src/constant/data";
import { Sizes } from "@src/theme";
import { usePagination } from "@src/hooks/usePagination";
import { useUser } from "@src/state";
import { useCustomers } from "@src/state/customers";
import { useGetAllCustomers } from "@src/services/queries";
import { useSearchFilter } from "@src/hooks";
import { useDeleteCustomer } from "@src/services/mutations";

export const Customers = ({ navigation }: TabScreenProps<"Customers">) => {
  const { storeId } = useUser();
  const { customers, setCustomers } = useCustomers();
  const {
    data: customerData,
    isLoading,
    isError,
  } = useGetAllCustomers(storeId);

  // handle search query change
  const { handleSearch, filteredData: filteredCustomers } = useSearchFilter(
    customers || [],
    (item) => item.name
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    currentPage,
    setCurrentPage,
    getFilteredDataListForCurrentPage,
    getTotalPages,
  } = usePagination();
  const customersPerPage = 8;
  const totalPages = getTotalPages(filteredCustomers.length, customersPerPage);

  const handleDelete = (dataId: number) => {
    console.log(dataId);
  };

  useEffect(() => {
    if (customerData) {
      setCustomers(customerData);
    }
  }, [customerData, isLoading, isError]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader
          title='Customer List'
          iconType='modal'
          onIconPress={toggleModal}
          drawerBtn
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppInput
            placeholder='Search for customer'
            icon={require("@src/assets/icons/fi_search.png")}
            onChangeText={handleSearch}
          />
        </TouchableWithoutFeedback>

        {customerList.length === 0 ? (
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
                All Customers
              </AppText>
              <List
                isLoading={isLoading}
                loaderSize='large'
                data={getFilteredDataListForCurrentPage(
                  filteredCustomers && filteredCustomers,
                  customersPerPage
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
                  handleDelete(dataId);
                }}
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
              label: "Add Customer",
              icon: "plus",
              onPress: () => navigation.navigate("AddCustomer"),
            },
            {
              label: "Export Customer",
              icon: "export",
              onPress: () => console.log("Export customer"),
            },
            {
              label: "Import Customer",
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
