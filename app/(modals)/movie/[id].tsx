import { useWatchlistContext } from "@features/watchlist/components/WatchlistContext";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMovieDetails } from "../../../src/features/movies/hooks/useMovieDetails";

export default function MovieDetailsModal() {
  const { id } = useLocalSearchParams();

  const { data: movie, loading, error } = useMovieDetails(id as string);
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const hasAnimatedRef = useRef(false);
  const { add, remove, isInWatchlist } = useWatchlistContext();

  useEffect(() => {
    hasAnimatedRef.current = false;
    imageOpacity.setValue(0);
    textOpacity.setValue(0);
  }, [id, imageOpacity, textOpacity]);

  const runIntro = useCallback(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    Animated.sequence([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [imageOpacity, textOpacity]);

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
            <Animated.View style={{ opacity: imageOpacity }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original${movie?.backdropPath}`,
                }}
                className="w-full aspect-video"
                onLoadEnd={runIntro}
              />
            </Animated.View>
            <Animated.View
              className="flex-col items-start justify-center mt-5 px-5"
              style={{ opacity: textOpacity }}
            >
              <Text className="font-bold color-white text-2xl self-center text-">
                {movie?.title}
              </Text>
              <Text className="mt-2 color-white text-lg self-center">
                Movie • {movie?.releaseDate.split("-")[0]}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  isInWatchlist(movie?.id!, "movie")
                    ? remove(movie?.id!, "movie")
                    : add(movie?.id!, "movie")
                }
                className={`mt-4 mb-5 rounded-full px-6 py-4 self-center w-full ${isInWatchlist(movie?.id!, "movie") ? "bg-red-500" : "bg-blue-500"}`}
              >
                <Text className="text-white font-semibold self-center">
                  {isInWatchlist(movie?.id!, "movie")
                    ? "Remove from watchlist"
                    : "Add to watchlist"}
                </Text>
              </TouchableOpacity>
              <Text className="color-white text-l">{movie?.overview}</Text>
            </Animated.View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
