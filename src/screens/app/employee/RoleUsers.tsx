import React, { useEffect, useState } from "react";
import Screen from "@src/screens/Screen";
import { globalStyle } from "@src/theme/globalStyles";
import { View, StyleSheet } from "react-native";
import { AppText, EmptyEntity, List } from "@src/components";
import { RootStackProps } from "@src/router/types";
import { AuthHeader } from "@src/components/core/auth/AuthHeader";
import { usePagination } from "@src/hooks/usePagination";
import { roleUsersData } from "@src/constant/data";
import { Sizes } from "@src/theme";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export const RoleUsers = ({ route }: RootStackProps<"RoleUsers">) => {
  const { data }: any = route.params ?? { data: undefined };
  const navigation: NavigationProp<any> = useNavigation();
  const {
    currentPage,
    setCurrentPage,
    getFilteredDataListForCurrentPage,
    getTotalPages,
    isDataLoading,
  } = usePagination();

  const roleUsersPerPage = 8;
  const totalPages = getTotalPages(roleUsersData.length, roleUsersPerPage);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(isDataLoading(roleUsersData, roleUsersPerPage));
    };
    loadData();
  }, []);
  return (
    <Screen>
      <View style={globalStyle.container}>
        <AuthHeader
          title={String(data && data.roleTitle)}
          iconType='modal'
          backBtn
        />
        {roleUsersData.length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <EmptyEntity
              headerText='No users in roles yet!'
              title='Users you have added to a role will show up here as a list.'
            />
          </View>
        ) : (
          <>
            <View style={styles.listContainer}>
              <AppText black fontRegular style={{ marginBottom: Sizes.font6 }}>
                All {String(data && data.roleTitle)}
              </AppText>
              <List
                isLoading={isLoading}
                loaderSize='large'
                data={getFilteredDataListForCurrentPage(
                  roleUsersData,
                  roleUsersPerPage
                )}
                currentPage={currentPage}
                goToPage={setCurrentPage}
                totalPages={totalPages}
                onEditNavigate={(roleTitle: string, employeeId: string) =>
                  navigation.navigate("EditEmployee", {
                    data: {
                      roleTitle: roleTitle,
                      employeeId: employeeId,
                    },
                  })
                }
                onPressDelete={() => {}}
                isEdit={true}
                showStatus={true}
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
