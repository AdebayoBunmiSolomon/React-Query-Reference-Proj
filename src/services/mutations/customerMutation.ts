import { endpoints } from "@src/constant/endpoints";
import { deleteResource, postResource } from "..";
import { CreateCustomerDTO, StoreId } from "@src/types/api";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import ToastMessage from "@src/components/core/ToastMessage";
import { useUser } from "@src/state";
import { useGetAllCustomers } from "../queries";

export const createCustomer = (storeId: StoreId, payload: CreateCustomerDTO) => {
  return postResource({
    pathUrl: `${endpoints.createCustomer}/${storeId}`,
    payload,
  });
};

export const deleteCustomer = (id: number) => {
  return deleteResource({
    pathUrl: `${endpoints.deleteCustomer}/${id}`,
  });
};

export const useCreateCustomer = (storeId: StoreId) => {
  const navigation = useNavigation() as any;
  const { refetch } = useGetAllCustomers(storeId);

  return useMutation({
    mutationFn: (payload: CreateCustomerDTO) =>
      createCustomer(storeId, payload),
    onSuccess: (data) => {
      refetch();
      navigation.goBack();
      ToastMessage({
        type: "success",
        message: "Customer created successfully",
      });
    },
    onError: (error: any) => {
      ToastMessage({
        type: "error",
        message: error.response.data.message || "An error occurred",
      });
    },
  });
};

export const useDeleteCustomer = (id: number) => {
  const { storeId } = useUser();
  const { refetch } = useGetAllCustomers(storeId);

  return useMutation({
    mutationFn: () => deleteCustomer(id),
    onSuccess: (data) => {
      refetch();
      ToastMessage({
        type: "success",
        message: "Customer deleted successfully",
      });
    },
    onError: (error: any) => {
      ToastMessage({
        type: "error",
        message: error.response.data.message || "An error occurred",
      });
    },
  });
};
