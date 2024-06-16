import { Discounts, GetDiscount, StoreId, UpdateDiscountDTO } from "@src/types/api";
import { getResource, updateResource } from "..";
import { endpoints } from "@src/constant/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { querykeys } from "../querkeys";
import { useNavigation } from "@react-navigation/native";
import ToastMessage from "@src/components/core/ToastMessage";
import { useUser } from "@src/state";

export const getAllDiscount = async (storeId: StoreId): Promise<Discounts[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.getAllDiscount}/${storeId}`,
  });
  return data;
};

export const getDiscount = async (discountId: number): Promise<GetDiscount> => {
  const data = await getResource({
    pathUrl: `${endpoints.getDiscount}/${discountId}`,
  });
  return data;
};

export const updateDiscount = async (
  discountId: number,
  payload: UpdateDiscountDTO
) => {
  return updateResource({
    pathUrl: `${endpoints.updateDiscount}/${discountId}`,
    payload,
  });
};

export const useGetAllDiscount = (storeId: StoreId) => {
  const query = useQuery({
    queryKey: [querykeys.GET_ALL_DISCOUNT, storeId],
    queryFn: () => getAllDiscount(storeId),
  });
  return query;
};

// Hook to use the query for fetching a specific discount by ID
export const useGetDiscount = (discountId: number) => {
  const query = useQuery({
    queryKey: [querykeys.GET_DISCOUNT, discountId],
    queryFn: () => getDiscount(discountId),
  });
  return query;
};

// Hook to use the mutation for updating a discount by ID
export const useUpdateDiscount = (discountId: number) => {
  const navigation = useNavigation();
  const { storeId } = useUser();
  const { refetch } = useGetAllDiscount(storeId);

  return useMutation({
    mutationFn: (payload: UpdateDiscountDTO) =>
      updateDiscount(discountId, payload),
    onSuccess: (data) => {
      refetch();
      navigation.navigate("Discounts" as never);
      ToastMessage({
        type: "success",
        message: "Discount updated successfully",
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
