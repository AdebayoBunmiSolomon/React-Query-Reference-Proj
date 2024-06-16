import { endpoints } from "@src/constant/endpoints";
import { createTaxesDTO, StoreId } from "@src/types/api";
import { deleteResource, postResource } from "..";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useGetAllTax } from "../queries";
import { useMutation } from "@tanstack/react-query";
import ToastMessage from "@src/components/core/ToastMessage";
import { useUser } from "@src/state";

export const createTax = (storeId: StoreId, payload: createTaxesDTO) => {
  return postResource({
    pathUrl: `${endpoints.createTax}/${storeId}`,
    payload,
  });
};

export const deleteTax = (taxId: number) => {
  return deleteResource({
    pathUrl: `${endpoints.deleteTax}/${taxId}`,
  });
};

export const useCreateTax = (storeId: StoreId) => {
  const navigation: NavigationProp<any> = useNavigation();
  const { refetch } = useGetAllTax(storeId);

  return useMutation({
    mutationFn: (payload: createTaxesDTO) => createTax(storeId, payload),
    onSuccess: (data) => {
      refetch();
      navigation.navigate("TaxList");
      ToastMessage({
        type: "success",
        message: "Tax created successfully",
      });
    },
    onError: (error: any) => {
      ToastMessage({
        type: "error",
        message: error.response.data.message || "An error occurred",
      });
      console.log(error.response.data.message);
    },
  });
};

export const useDeleteTax = (taxId: number) => {
  const { storeId } = useUser();
  const { refetch } = useGetAllTax(storeId);

  return useMutation({
    mutationFn: () => deleteTax(taxId),
    onSuccess: (data) => {
      refetch();
      ToastMessage({
        type: "success",
        message: "Tax deleted successfully",
      });
    },
    onError: (error: any) => {
      ToastMessage({
        type: "error",
        message: `Tax deletion failed ${error}`,
      });
    },
  });
};
