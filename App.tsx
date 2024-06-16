import "react-native-gesture-handler";
import useCachedResources from "@src/hooks/useCachedResources";
import NetInfo from "@react-native-community/netinfo";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Router from "@src/router/router";
import { ThemeProvider } from "@src/theme/themeContext";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Appearance, View } from "react-native";
import { onlineManager } from "@tanstack/react-query";
import { useAuthStore } from "@src/state/commonState";
import { queryClient } from "@src/utils/init";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 3000,
});

export default function App() {
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const isLoaded = useCachedResources();
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const status = !!state.isConnected;
      onlineManager.setOnline(status);
    });
  }, []);

  if (!isLoaded || !hasHydrated) {
    return <View></View>;
  } else {
    return (
      <PersistQueryClientProvider
        persistOptions={{ persister }}
        onSuccess={() =>
          queryClient
            .resumePausedMutations()
            .then(() => queryClient.invalidateQueries())
        }
        client={queryClient}
      >
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colorScheme === "dark" ? "#051215" : "#FFF",
                }}
              >
                <Router />
              </View>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistQueryClientProvider>
    );
  }
}
