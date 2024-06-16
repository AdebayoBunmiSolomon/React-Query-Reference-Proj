import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient } from "@src/utils/init";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  setLoading: (loading: boolean) => void;
  setToken: (token: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setHasHydrated: (state: boolean) => void;
  _hasHydrated: boolean; 
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
    isLoading: false,
    isAuthenticated: false,
    token: null,
    _hasHydrated: false,
    setLoading: (loading) => set({ isLoading: loading }),
    setToken: (token) => set({ token: token }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated: isAuthenticated}),
    setHasHydrated: (state) => {
      set({_hasHydrated: state})
    },
    logout: () => set(() => {
     queryClient.clear();      
     return {token: "", isAuthenticated: false}
    })
  }),
  {
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated(true)
    },
    name: "authStore",
    storage: createJSONStorage(() => AsyncStorage)
  })
)


