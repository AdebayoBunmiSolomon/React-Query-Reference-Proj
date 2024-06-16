import { ActiveStore, StoreId, UserProfile } from "@src/types/api";
import { create } from "zustand";

interface UserStore {
  isLoading: boolean;
  userProfile: UserProfile | null;
  storeId: StoreId
  setUserProfile: (profile: UserProfile) => void;
  setLoading: (loading: boolean) => void;
  activeStore: ActiveStore | null;
  setActiveStore: (activeStore: ActiveStore) => void;
  setStoreId: (storeId: StoreId) => void;
}

export const useUser = create<UserStore>()((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  activeStore: null,
  setActiveStore: (activeStore) => set({ activeStore: activeStore }),
  storeId: null,
  setStoreId: (storeId) => set({ storeId: storeId }),
}));
