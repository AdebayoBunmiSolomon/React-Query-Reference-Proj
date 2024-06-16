import { StoreId, createProductInformation } from "@src/types/api";
import { deleteResource, postResource } from "..";
import { endpoints } from "@src/constant/endpoints";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import ToastMessage from "@src/components/core/ToastMessage";
import { useUser } from "@src/state";
import { useGetAllProduct } from "../queries/productQuery";

export const createProduct = (payload: createProductInformation) => {
  return postResource({
    pathUrl: `${endpoints.createProduct}`,
    payload,
  });
};

export const deleteProduct = (productId: number) => {
  return deleteResource({
    pathUrl: `${endpoints.deleteProduct}/${productId}`,
  });
};

export const useCreateProduct = (storeId: StoreId) => {
  const navigation: NavigationProp<any> = useNavigation();
  const { refetch } = useGetAllProduct(storeId);

  return useMutation({
    mutationFn: (payload: createProductInformation) => createProduct(payload),
    onSuccess: (data) => {
      refetch();
      navigation.goBack();
      ToastMessage({
        type: "success",
        message: "Product created successfully",
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

export const useDeleteTax = (productId: number) => {
  const { storeId } = useUser();
  const { refetch } = useGetAllProduct(storeId);

  return useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: (data) => {
      refetch();
      ToastMessage({
        type: "success",
        message: "Product deleted successfully",
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
