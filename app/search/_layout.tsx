import { SearchContext } from "@/components/SearchContext";
import { Stack } from "expo-router";
import { useContext } from "react";

export default function SearchLayout() {
  const { setSearchQuery } = useContext(SearchContext);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Popular Movies",
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
