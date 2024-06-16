import { endpoints } from "@src/constant/endpoints";
import { getResource, updateResource } from "..";
import { Categories, GetCategory, StoreId, UpdateCategoryDTO } from "@src/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { querykeys } from "../querkeys";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@src/state";
import ToastMessage from "@src/components/core/ToastMessage";

export const getAllCategory = async (
  storeId: StoreId
): Promise<Categories[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.getAllCategory}/${storeId}`,
  });
  return data;
};

export const getCategory = async (categoryId: number): Promise<GetCategory> => {
  const data = await getResource({
    pathUrl: `${endpoints.getCategory}/${categoryId}`,
  });
  return data;
};

export const updateCategory = async (
  id: number,
  payload: UpdateCategoryDTO
) => {
  return updateResource({
    pathUrl: `${endpoints.updateCategory}/${id}`,
    payload,
  });
};

export const useGetAllCategory = (storeId: StoreId) => {
  const query = useQuery({
    queryKey: [querykeys.GET_ALL_CATEGORY, storeId],
    queryFn: () => getAllCategory(storeId),
  });
  return query;
};

export const useGetCategory = (categoryId: number) => {
  const query = useQuery({
    queryKey: [querykeys.GET_CATEGORY, categoryId],
    queryFn: () => getCategory(categoryId),
  });
  return query;
};

export const useUpdateCategory = (id: number) => {
  const navigation = useNavigation();
  const {  storeId } = useUser();
  const { refetch } = useGetAllCategory(storeId);

  return useMutation({
    mutationFn: (payload: UpdateCategoryDTO) => updateCategory(id, payload),
    onSuccess: (data) => {
      refetch();
      navigation.navigate("Category" as never);
      ToastMessage({
        type: "success",
        message: "Category updated successfully",
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
