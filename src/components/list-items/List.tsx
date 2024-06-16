import React from "react";
import { Loader } from "../shared/Loader";
import { FlatList, StyleSheet, View } from "react-native";
import { ListItem } from "./ListItem";
import { Pagination } from "../core/pagination/Pagination";
import { Sizes } from "@src/theme";

type listProps = {
  isLoading: boolean;
  loaderSize: "small" | "large";
  data: any[];
  currentPage: number;
  totalPages: number;
  goToPage: any;
  onEditCustomer: (
    name: string,
    email: string,
    address: string,
    city: string,
    state: string,
    country: string,
    phone: string
  ) => void;
  onEditEmployee: (
    name: string,
    email: string,
    phone: string,
    passcode: string
  ) => void;
  onPressDelete: (dataId: number) => void;
  isEdit?: boolean;
  showStatus?: boolean;
};

export const List: React.FC<listProps> = ({
  isLoading,
  loaderSize,
  data,
  currentPage,
  totalPages,
  goToPage,
  onEditCustomer,
  onEditEmployee,
  onPressDelete,
  isEdit,
  showStatus,
}) => {
  return (
    <>
      {isLoading ? (
        <Loader sizes={loaderSize} />
      ) : (
        <>
          <FlatList
            data={data && data}
            renderItem={({ item }) => (
              <ListItem
                data={item}
                onEditCustomer={(
                  name,
                  email,
                  address,
                  city,
                  state,
                  country,
                  phone
                ) =>
                  onEditCustomer(
                    name,
                    email,
                    address,
                    city,
                    state,
                    country,
                    phone
                  )
                }
                onEditEmployee={(name, email, phone, passcode) =>
                  onEditEmployee(name, email, phone, passcode)
                }
                onPressDelete={(dataId) => onPressDelete(dataId)}
                isEdit={isEdit}
                showStatus={showStatus}
              />
            )}
            keyExtractor={(item) => {
              // Dynamically select the key based on the structure of the item
              return item.customerID !== undefined
                ? item.customerID?.toString()
                : item.employeeID !== undefined
                ? item.employeeID?.toString()
                : undefined;
            }}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.pageFilter}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pageFilter: { alignSelf: "flex-end", paddingTop: Sizes.font14 },
});
