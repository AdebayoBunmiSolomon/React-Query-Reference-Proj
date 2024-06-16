import { endpoints } from "@src/constant/endpoints";
import { getResource, updateResource } from "..";
import { GetStores, StoreId, Stores, UpdateStoreDTO } from "@src/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { querykeys } from "../querkeys";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useUser } from "@src/state";
import ToastMessage from "@src/components/core/ToastMessage";

export const getAllStore = async (): Promise<Stores[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.getAllStore}`,
  });
  return data;
};

export const getStore = async (storeId: StoreId): Promise<GetStores> => {
  const data = await getResource({
    pathUrl: `${endpoints.getStore}/${storeId}`,
  });
  return data;
};

export const updateStore = async (storeId: StoreId, payload: UpdateStoreDTO) => {
  return updateResource({
    pathUrl: `${endpoints.updateStore}/${storeId}`,
    payload,
  });
};

export const useGetAllStore = (storeId: StoreId) => {
  const query = useQuery({
    queryKey: [querykeys.GET_ALL_STORE, storeId],
    queryFn: () => getAllStore(),
  });
  return query;
};

export const useGetStore = (storeId: StoreId) => {
  const query = useQuery({
    queryKey: [querykeys.GET_STORE, storeId],
    queryFn: () => getStore(storeId),
  });
  return query;
};

export const useUpdateStore = (id: number) => {
  const { storeId } = useUser();
  const { refetch } = useGetAllStore(storeId);

  return useMutation({
    mutationFn: (payload: UpdateStoreDTO) => updateStore(id, payload),
    onSuccess: (data) => {
      refetch();
      // navigation.navigate("Category" as never);
      ToastMessage({
        type: "success",
        message: "Store updated successfully",
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
