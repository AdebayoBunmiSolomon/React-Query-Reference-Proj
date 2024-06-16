import { CreateCategoryDTO, StoreId } from "@src/types/api";
import { deleteResource, postResource } from "..";
import { endpoints } from "@src/constant/endpoints";
import { useNavigation } from "@react-navigation/native";
import { useGetAllCategory } from "../queries";
import { useMutation } from "@tanstack/react-query";
import ToastMessage from "@src/components/core/ToastMessage";
import { useUser } from "@src/state";

export const createCategory = (storeId: StoreId, payload: CreateCategoryDTO) => {
  return postResource({
    pathUrl: `${endpoints.createCategory}/${storeId}`,
    payload,
  });
};

export const deleteCategory = (categoryId: number) => {
  return deleteResource({
    pathUrl: `${endpoints.deleteCategory}/${categoryId}`,
  });
};

export const useCreateCategory = (storeId: StoreId) => {
  const navigation = useNavigation() as any;
  const { refetch } = useGetAllCategory(storeId);

  return useMutation({
    mutationFn: (payload: CreateCategoryDTO) =>
      createCategory(storeId, payload),
    onSuccess: (data) => {
      refetch();
      navigation.navigate("Category");
      ToastMessage({
        type: "success",
        message: "Category created successfully",
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

export const useDeleteCategory = (categoryId: number) => {
  const { storeId } = useUser();
  const { refetch } = useGetAllCategory(storeId);

  return useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: (data) => {
      refetch();
      ToastMessage({
        type: "success",
        message: "Category deleted successfully",
      });
    },
    onError: (error: any) => {
      ToastMessage({ type: "error", message: "Category deletion failed" });
    },
  });
};
