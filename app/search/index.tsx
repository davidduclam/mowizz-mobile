import MovieCard from "@/components/MovieCard";
import { SearchContext } from "@/components/SearchContext";
import { useMovies } from "@/services/useMovies";
import { useContext } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchIndex() {
  const { popular, topRated, upcoming, isLoading } = useMovies();
  const { searchQuery } = useContext(SearchContext);

  return (
    <SafeAreaView className=" flex-1 bg-black">
      <Text className="text-white text-lg font-bold mb-3">Popular Movies</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text className="text-white">Search Results for {searchQuery}</Text>
          <FlatList
            className="px-10"
            data={popular}
            numColumns={3}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <MovieCard {...item} />}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 10,
              marginVertical: 16,
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
