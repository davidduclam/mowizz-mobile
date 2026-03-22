import { useWatchlistContext } from "@features/watchlist/components/WatchlistContext";
import React, { useCallback, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MediaDetailModalProps = {
  id: string;
  loading: boolean;
  error: Error | null;
  backdropPath?: string;
  tmdbId?: number;
  mediaType: "movie" | "tv";
  children?: React.ReactNode;
};

export default function MediaDetailModal({
  id,
  loading,
  error,
  backdropPath,
  tmdbId,
  mediaType,
  children,
}: MediaDetailModalProps) {
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
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <Animated.View style={{ opacity: imageOpacity }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original${backdropPath}`,
                }}
                className="w-full aspect-video"
                onLoadEnd={runIntro}
              />
            </Animated.View>
            <Animated.View
              className="flex-col items-start justify-center mt-5 px-5"
              style={{ opacity: textOpacity }}
            >
              {children}
              <TouchableOpacity
                onPress={() =>
                  isInWatchlist(tmdbId!, mediaType)
                    ? remove(tmdbId!, mediaType)
                    : add(tmdbId!, mediaType)
                }
                className={`mt-4 mb-5 rounded-full px-6 py-4 self-center w-full ${isInWatchlist(tmdbId!, mediaType) ? "bg-red-500" : "bg-blue-500"}`}
              >
                <Text className="text-white font-semibold self-center">
                  {isInWatchlist(tmdbId!, mediaType)
                    ? "Remove from watchlist"
                    : "Add to watchlist"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
