import { useContext } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../../movies/components/MovieCard";
import { useMovies } from "../../movies/hooks/useMovies";
import { SearchContext } from "../components/SearchContext";

export default function SearchScreen() {
  const { popular, isLoadingMovies } = useMovies();
  const { searchQuery } = useContext(SearchContext);
  const { data: movie, loading, error } = useSearch(searchQuery as string);
  const { popular } = useMovies();

  return (
    <SafeAreaView className=" flex-1 bg-black">
      <Text className="text-white text-lg font-bold mb-3">Popular Movies</Text>
      {isLoadingMovies ? (
        <ActivityIndicator />
      ) : searchQuery === "" ? (
        <View>
          <FlatList
            className="px-10"
            data={popular}
            numColumns={3}
            keyExtractor={({ id }) => String(id)}
            renderItem={({ item }) => <MovieCard {...item} />}
            contentInsetAdjustmentBehavior="automatic"
            columnWrapperStyle={{
              //justifyContent: "center",
              gap: 10,
              marginVertical: 16,
              marginHorizontal: -25,
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          ></FlatList>
        </View>
      ) : (
        <View>
          {/*<Text className="text-white">Search Results for {searchQuery}</Text>*/}
          <FlatList
            className="px-10"
            data={movie}
            numColumns={3}
            keyExtractor={({ id }) => String(id)}
            renderItem={({ item }) => <MovieCard {...item} />}
            contentInsetAdjustmentBehavior="automatic"
            columnWrapperStyle={{
              //justifyContent: "center",
              gap: 10,
              marginVertical: 16,
              marginHorizontal: -25,
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListEmptyComponent={
              !loading && !error ? (
                <View className="mt-10 px-5">
                  <Text className="text-center text-white">
                    {searchQuery.trim()
                      ? "No movies found"
                      : "Search for a movie"}
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}
