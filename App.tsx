// App.tsx
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import HomeScreen from "./screens/HomeScreen";
import { ActivityIndicator, I18nManager, View } from "react-native";
import * as Font from "expo-font";

// Force RTL layout
I18nManager.allowRTL(true); // Allow RTL layout
I18nManager.forceRTL(true); // Force RTL layout

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        NotoSansArabic: require("./assets/fonts/NotoSansArabic.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
