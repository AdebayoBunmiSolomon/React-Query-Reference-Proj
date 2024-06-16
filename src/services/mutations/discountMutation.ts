import { CreateDiscountDTO, StoreId } from "@src/types/api";
import { deleteResource, postResource } from "..";
import { endpoints } from "@src/constant/endpoints";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { useGetAllDiscount } from "../queries";
import { useUser } from "@src/state";
import ToastMessage from "@src/components/core/ToastMessage";

export const createDiscount = (storeId: StoreId, payload: CreateDiscountDTO) => {
  return postResource({
    pathUrl: `${endpoints.createDiscount}/${storeId}`,
    payload,
  });
};

export const deleteDiscount = (discountId: number) => {
  return deleteResource({
    pathUrl: `${endpoints.deleteDiscount}/${discountId}`,
  });
};

export const useDeleteDiscount = (discountId: number) => {
  const {  storeId } = useUser();
  const { refetch } = useGetAllDiscount(storeId);

  return useMutation({
    mutationFn: () => deleteDiscount(discountId),
    onSuccess: (data) => {
      refetch();
      ToastMessage({
        type: "success",
        message: "Discount deleted successfully",
      });
    },
    onError: (error: any) => {
      ToastMessage({ type: "error", message: "Discount deletion failed" });
    },
  });
};

export const useCreateDiscount = (storeId: StoreId) => {
  const navigation = useNavigation() as any;
  const { refetch } = useGetAllDiscount(storeId);

  return useMutation({
    mutationFn: (payload: CreateDiscountDTO) =>
      createDiscount(storeId, payload),
    onSuccess: (data) => {
      // Trigger a refetch of the discounts data
      refetch();
      navigation.navigate("Discounts");
      ToastMessage({
        type: "success",
        message: "Discount created successfully",
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
