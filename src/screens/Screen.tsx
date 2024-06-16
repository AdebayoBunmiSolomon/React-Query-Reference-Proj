import { Colors } from "@src/theme";
import { useThemeContext } from "@src/theme/themeContext";
import { useEffect } from "react";
import { NativeModules, Platform, SafeAreaView } from "react-native";

const { StatusBarManager } = NativeModules;

interface ScreenProps {
  children: React.ReactNode;
}

export default function Screen({ children }: ScreenProps) {
  const { theme } = useThemeContext();

  useEffect(() => {
    console.log(theme);
  }, []);

  const themeBackgroundColors: { [key: string]: string } = {
    light: "#FFF",
    dark: Colors.bgDark,
  };

  const backgroundColor = themeBackgroundColors[theme] || "#fff";

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        flex: 1,
        backgroundColor,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
