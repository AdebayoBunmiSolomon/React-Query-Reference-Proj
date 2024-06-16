import { endpoints } from "@src/constant/endpoints";
import { getResource, updateResource } from "..";
import { GetTaxes, StoreId, Taxes, updateTaxesDTO } from "@src/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { querykeys } from "../querkeys";
import { useUser } from "@src/state";
import ToastMessage from "@src/components/core/ToastMessage";

//Get all taxes by store id
export const getAllTax = async (storeId: StoreId): Promise<Taxes[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.getAllTax}/${storeId}`,
  });
  return data;
};

//Get a tax by tax id
export const getTax = async (taxId: number): Promise<GetTaxes> => {
  const data = await getResource({
    pathUrl: `${endpoints.getTax}/${taxId}`,
  });
  return data;
};

export const updateTax = async (
  taxId: number,
  storeId: StoreId,
  payload: updateTaxesDTO
) => {
  return updateResource({
    pathUrl: `${endpoints.updateTax}/${taxId}/${storeId}`,
    payload,
  });
};

export const useGetAllTax = (storeId: StoreId) => {
  const query = useQuery({
    queryKey: [querykeys.GET_ALL_TAX, storeId],
    queryFn: () => getAllTax(storeId),
  });
  return query;
};

export const useGetTax = (taxId: number) => {
  const query = useQuery({
    queryKey: [querykeys.GET_TAX, taxId],
    queryFn: () => getTax(taxId),
  });
  return query;
};

export const useUpdateTax = (taxId: number) => {
  const { storeId } = useUser();
  const { refetch } = useGetAllTax(storeId);

  return useMutation({
    mutationFn: (payload: updateTaxesDTO) => updateTax(taxId, storeId, payload),
    onSuccess: (data) => {
      refetch();
      // navigation.navigate("Category" as never);
      ToastMessage({
        type: "success",
        message: "Tax updated successfully",
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
