import { Stack } from "expo-router";
import { SearchProvider } from "../src/features/search/components/SearchContext";
import { WatchlistProvider } from "../src/features/watchlist/components/WatchlistContext";
import "./globals.css";

export default function RootLayout() {
  return (
    <WatchlistProvider>
      <SearchProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)"
            options={{
              headerShown: false,
              presentation: "modal",
              animation: "fade",
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </Stack>
      </SearchProvider>
    </WatchlistProvider>
  );
}
