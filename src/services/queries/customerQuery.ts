import { endpoints } from "@src/constant/endpoints";
import { getResource, updateResource } from "..";
import { Customers, GetCustomer, StoreId, UpdateCustomerDTO } from "@src/types/api";
import { querykeys } from "../querkeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@src/state";
import ToastMessage from "@src/components/core/ToastMessage";

export const getAllCustomer = async (storeId: StoreId): Promise<Customers[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.getAllCustomers}/${storeId}`,
  });
  return data;
};

export const getCustomer = async (customerId: number): Promise<GetCustomer> => {
  const data = await getResource({
    pathUrl: `${endpoints.getCustomer}/${customerId}`,
  });
  return data;
};

export const updateCustomer = async (
  id: number,
  payload: UpdateCustomerDTO
) => {
  return updateResource({
    pathUrl: `${endpoints.updateCustomer}/${id}`,
    payload,
  });
};

export const useGetAllCustomers = (storeId: StoreId) => {
  const query = useQuery({
    queryKey: [querykeys.GET_ALL_CUSTOMERS, storeId],
    queryFn: () => getAllCustomer(storeId),
  });
  return query;
};

export const useGetCustomer = (customerId: number) => {
  const query = useQuery({
    queryKey: [querykeys.GET_CUSTOMER, customerId],
    queryFn: () => getCustomer(customerId),
  });
  return query;
};

export const useUpdateCustomer = (id: number) => {
  const navigation = useNavigation();
  const {  storeId } = useUser();
  const { refetch } = useGetAllCustomers(storeId);

  return useMutation({
    mutationFn: (payload: UpdateCustomerDTO) => updateCustomer(id, payload),
    onSuccess: (data) => {
      refetch();
      navigation.navigate("Customers" as never);
      ToastMessage({
        type: "success",
        message: "Customer updated successfully",
      });
    },
    onError: (error: any) => {
      ToastMessage({
        type: "error",
        message: error.response?.data?.message || "An error occurred",
      });
    },
  });
};
