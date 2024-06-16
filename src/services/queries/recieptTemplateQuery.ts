import { getResource } from "..";
import { endpoints } from "@src/constant/endpoints";
import { useQuery } from "@tanstack/react-query";
import { querykeys } from "../querkeys";
import { ReceiptSettings, StoreId } from "@src/types/api";

export const getAllReceiptTemplate = async (
  storeId: StoreId
): Promise<ReceiptSettings[]> => {
  const data = await getResource({
    pathUrl: `${endpoints.getAllReceiptTemplate}/${storeId}`,
  });
  return data;
};

export const getOneReceiptTemplate = async (
  receiptId: number
): Promise<ReceiptSettings> => {
  const data = await getResource({
    pathUrl: `${endpoints.getReceiptTemplate}/${receiptId}`,
  });
  return data;
};

export const useGetAllReceiptTemplate = (storeId: StoreId) => {
  const query = useQuery({
    queryKey: [querykeys.GET_ALL_RECEIPT_TEMPLATE, storeId],
    queryFn: () => getAllReceiptTemplate(storeId),
  });
  return query;
};

export const useGetOneReceiptTemplate = async (receiptId: number) => {
  const query = useQuery({
    queryKey: [querykeys.GET_RECEIPT_TEMPLATE, receiptId],
    queryFn: () => getOneReceiptTemplate(receiptId),
  });

  return query;
};
