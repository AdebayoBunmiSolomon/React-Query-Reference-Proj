import { CreateReceiptDTO, StoreId } from "@src/types/api";
import { postResource } from "..";
import { endpoints } from "@src/constant/endpoints";
import { useNavigation } from "@react-navigation/native";
import { useGetAllReceiptTemplate } from "../queries";
import { useMutation } from "@tanstack/react-query";
import ToastMessage from "@src/components/core/ToastMessage";

export const createReceiptTemplate = (
  storeId: StoreId,
  payload: CreateReceiptDTO
) => {
  return postResource({
    pathUrl: `${endpoints.createReceiptTemplate}/${storeId}`,
    payload,
  });
};

export const useCreateReceiptTemplate = (storeId: StoreId) => {
  const navigation = useNavigation() as any;
  const { refetch } = useGetAllReceiptTemplate(storeId);

  return useMutation({
    mutationFn: (payload: CreateReceiptDTO) =>
      createReceiptTemplate(storeId, payload),
    onSuccess: () => {
      refetch();
      navigation.navigate("Account");
      ToastMessage({
        type: "success",
        message: "Receipt template created successfully!",
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