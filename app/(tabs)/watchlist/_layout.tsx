import { Stack } from "expo-router";

export default function WatchlistLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitle: "My List",
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 17,
          },
          headerTitleAlign: "left",
        }}
      />
    </Stack>
  );
}
