import { endpoints } from "@src/constant/endpoints";
import { getResource, updateResource } from "..";
import {
  GetProducts,
  Products,
  StoreId,
  updateProductDTO,
} from "@src/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { querykeys } from "../querkeys";
import { useUser } from "@src/state";
import ToastMessage from "@src/components/core/ToastMessage";
import { NavigationProp, useNavigation } from "@react-navigation/native";

//Get all product by store id
export const getAllProduct = async (storeId: StoreId): Promise<Products> => {
  const data = await getResource({
    pathUrl: `${endpoints.getAllProduct}/${storeId}`,
  });
  return data;
};

//Get a product by product id
export const getProduct = async (productId: number): Promise<GetProducts> => {
  const data = await getResource({
    pathUrl: `${endpoints.getProduct}/${productId}`,
  });
  return data;
};

export const updateProduct = async (
  productId: number,
  payload: updateProductDTO
) => {
  return updateResource({
    pathUrl: `${endpoints.updateProduct}/${productId}`,
    payload,
  });
};

export const useGetAllProduct = (storeId: StoreId) => {
  const query = useQuery({
    queryKey: [querykeys.GET_ALL_PRODUCT, storeId],
    queryFn: () => getAllProduct(storeId),
  });
  return query;
};

export const useGetProduct = (productId: number) => {
  const query = useQuery({
    queryKey: [querykeys.GET_PRODUCT, productId],
    queryFn: () => getProduct(productId),
  });
  return query;
};

export const useUpdateProduct = (productId: number) => {
  const { storeId } = useUser();
  const { refetch } = useGetAllProduct(storeId);
  const navigation: NavigationProp<any> = useNavigation();

  return useMutation({
    mutationFn: (payload: updateProductDTO) =>
      updateProduct(productId, payload),
    onSuccess: (data) => {
      refetch();
      navigation.goBack();
      ToastMessage({
        type: "success",
        message: "Product updated successfully",
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
