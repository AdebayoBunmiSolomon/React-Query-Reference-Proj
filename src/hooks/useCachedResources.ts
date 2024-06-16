import { useEffect, useState } from "react";
import * as Font from "expo-font"
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import { useAuthStore } from "@src/state/commonState";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useCachedResources() {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    // const authStore = useAuthStore();

    useEffect(() => {
      async function loadResourcesAndDataAsync() {
        try {
          await Font.loadAsync({
            "open-sans-light": OpenSans_300Light,
            "open-sans-regular": OpenSans_400Regular,
            "open-sans-medium": OpenSans_500Medium,
            "open-sans-semi-bold": OpenSans_600SemiBold,
            "open-sans-bold": OpenSans_700Bold,
            "open-sans-extra-bold": OpenSans_800ExtraBold,
          });
          // await authStore.loadStorageData();
        } catch (error) {
          console.warn(error);
        } finally {
          setIsLoadingComplete(true);
        }
      }
      loadResourcesAndDataAsync();
    }, []);
    return isLoadingComplete;
  }
  