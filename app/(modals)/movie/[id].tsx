import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useMovieDetails } from "../../../src/features/movies/hooks/useMovieDetails";

export default function MovieDetailsModal() {
  const { id } = useLocalSearchParams();

  const { data: movie, loading, error } = useMovieDetails(id as string);
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const hasAnimatedRef = useRef(false);

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
                className="w-full h-[300px]"
                onLoadEnd={runIntro}
              />
            </Animated.View>
            <Animated.View
              className="flex-col items-start justify-center mt-5 px-5"
              style={{ opacity: textOpacity }}
            >
              <Text className="font-bold color-white text-xl">
                {movie?.title}
              </Text>
              <Text className="color-white text-l">{movie?.overview}</Text>
            </Animated.View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
