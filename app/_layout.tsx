import { Stack } from "expo-router";
import { SearchProvider } from "../src/features/search/components/SearchContext";
import "./globals.css";

export default function RootLayout() {
  return (
    <SearchProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "fade",
          }}
        />
      </Stack>
    </SearchProvider>
  );
}
