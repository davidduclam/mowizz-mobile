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
          headerSearchBarOptions: {
            placement: "automatic",
            placeholder: "Search movies",
            onChangeText: (event) => setSearchQuery(event.nativeEvent.text),
          },
        }}
      />
    </Stack>
  );
}
