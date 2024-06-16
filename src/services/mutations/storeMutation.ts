import { CreateStoreDTO, StoreId } from "@src/types/api";
import { deleteResource, postResource } from "..";
import { endpoints } from "@src/constant/endpoints";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useGetAllStore } from "../queries";
import { useMutation } from "@tanstack/react-query";
import ToastMessage from "@src/components/core/ToastMessage";
import { useUser } from "@src/state";

export const createStore = (payload: CreateStoreDTO) => {
  return postResource({
    pathUrl: `${endpoints.createStore}`,
    payload,
  });
};

export const deleteStore = (storeId: StoreId) => {
  return deleteResource({
    pathUrl: `${endpoints.deleteStore}/${storeId}`,
  });
};

export const useCreateStore = (storeId: StoreId) => {
  const navigation: NavigationProp<any> = useNavigation();
  const { refetch } = useGetAllStore(storeId);

  return useMutation({
    mutationFn: (payload: CreateStoreDTO) => createStore(payload),
    onSuccess: (data) => {
      refetch();
      navigation.navigate("Stores");
      ToastMessage({
        type: "success",
        message: "Stores created successfully",
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

export const useDeleteStore = (idOfStore: number) => {
  const { storeId } = useUser();
  const { refetch } = useGetAllStore(storeId);

  return useMutation({
    mutationFn: () => deleteStore(idOfStore),
    onSuccess: (data) => {
      refetch();
      ToastMessage({
        type: "success",
        message: "Store deleted successfully",
      });
    },
    onError: (error: any) => {
      ToastMessage({
        type: "error",
        message: `Store deletion failed ${error}`,
      });
    },
  });
};
