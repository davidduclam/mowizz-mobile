import { Stack } from "expo-router";
import { useContext } from "react";
import { SearchContext } from "../../../src/features/search/components/SearchContext";

export default function SearchLayout() {
  const { setSearchQuery } = useContext(SearchContext);

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
          headerLargeTitleEnabled: false,
          headerTitle: "",
          headerTitleAlign: "left",
          headerSearchBarOptions: {
            placement: "automatic",
            placeholder: "Search",
            hideNavigationBar: true,
            hideWhenScrolling: true,
            onChangeText: (event) => setSearchQuery(event.nativeEvent.text),
          },
        }}
      />
    </Stack>
  );
}
