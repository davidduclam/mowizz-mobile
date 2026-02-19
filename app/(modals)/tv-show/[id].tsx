import { useTvShowDetails } from "@features/tv-shows/hooks/useTvShowDetails";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function TvShowDetailsModal() {
  const { id } = useLocalSearchParams();

  const { data: movie, loading, error } = useTvShowDetails(id as string);

  return (
    <View className="bg-black flex-1">
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="color-white font-bold">{error.message}</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 80,
          }}
        >
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`,
              }}
              className="w-full h-[300px]"
            />
            <View className="flex-col items-start justify-center mt-5 px-5">
              <Text className="font-bold color-white text-xl">
                {movie?.name}
              </Text>
              <Text className="color-white text-l">{movie?.overview}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
