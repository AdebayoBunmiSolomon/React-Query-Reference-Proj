import { Customers } from "@src/types/api";
import { create } from "zustand";

interface CustomerStore {
  isLoading: boolean;
  customers: Customers[] | null;
  setCustomers: (customers: Customers[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useCustomers = create<CustomerStore>()((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  customers: [],
  setCustomers: (customers) => set({ customers: customers }),
}));
