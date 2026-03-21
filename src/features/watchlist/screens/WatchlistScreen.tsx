import MoviePosterCardWatchlist from "@features/movies/components/MoviePosterCardWatchlist";
import TvShowPosterCardWatchlist from "@features/tv-shows/components/TvShowPosterCardWatchlist";
import { BlurView } from "expo-blur";
import { useNavigation, useSegments } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWatchlistContext } from "../components/WatchlistContext";

export default function WatchlistScreen() {
  const segments = useSegments() as unknown as string[];
  const isModalOpen = segments.includes("(modals)");
  const {
    items: movie,
    refreshing,
    refresh,
    error,
    loading,
  } = useWatchlistContext();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const titleOpacity = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [0, 8],
        outputRange: [1, 0],
        extrapolate: "clamp",
      }),
    [scrollY],
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Animated.Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
            opacity: titleOpacity,
          }}
        >
          My List
        </Animated.Text>
      ),
    });
  }, [navigation, titleOpacity]);

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1 bg-black">
      <View className="flex-1">
        {loading ? (
          <SafeAreaView className="mt-safe">
            <ActivityIndicator />
          </SafeAreaView>
        ) : error ? (
          <SafeAreaView className="mt-safe">
            <Text className="text-red-400 mb-3">Could not load watchlist.</Text>
          </SafeAreaView>
        ) : (
          <Animated.FlatList
            className="flex-1"
            data={movie}
            refreshing={refreshing}
            onRefresh={refresh}
            numColumns={2}
            keyExtractor={({ id, mediaType }) => `${mediaType}-${id}`}
            ListEmptyComponent={
              <Text className="text-white text-center mt-8">Your watchlist is empty.</Text>
            }
            renderItem={({ item }) =>
              item.mediaType === "movie" ? (
                <MoviePosterCardWatchlist {...item} />
              ) : (
                <TvShowPosterCardWatchlist {...item} />
              )
            }
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true },
            )}
            scrollEventThrottle={16}
            contentInsetAdjustmentBehavior="automatic"
            columnWrapperStyle={{
              gap: 16,
              marginVertical: 8,
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          />
        )}
      </View>
      <BlurView
        intensity={35}
        tint="dark"
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          { opacity: isModalOpen ? 1 : 0 },
        ]}
      />
    </SafeAreaView>
  );
}
