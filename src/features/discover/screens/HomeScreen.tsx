import TvShowCard from "@features/tv-shows/components/TvShowCard";
import { useTvShows } from "@features/tv-shows/hooks/useTvShows";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MovieCard from "../../movies/components/MovieCard";
import { useMovies } from "../../movies/hooks/useMovies";

export default function HomeScreen() {
  const { popular, topRated, upcoming, isLoading } = useMovies();
  const { popularTvShow, topRatedTvShow, isLoadingTvShow } = useTvShows();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = -20;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -36],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1 bg-black">
      <StatusBar style="light" />

      <Animated.View
        style={{
          position: "absolute",
          top: insets.top,
          left: 20,
          right: 20,
          zIndex: 10,
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslateY }],
        }}
      >
        <Text className="text-white font-bold text-4xl">MoWizz</Text>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingTop: insets.top + headerHeight,
          paddingBottom: 10,
        }}
        contentInsetAdjustmentBehavior="never"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        //stickyHeaderIndices={[0]}
      >
        <View>
          {isLoading && isLoadingTvShow ? (
            <ActivityIndicator />
          ) : (
            <View className="flex-1 mt-5">
              <Text className="text-white text-lg font-bold mb-3">
                Popular Movies
              </Text>
              <FlatList
                className="mt-2 pb-32"
                data={popular}
                horizontal={true}
                keyExtractor={({ id }) => String(id)}
                renderItem={({ item }) => <MovieCard {...item} />}
                contentContainerStyle={{
                  justifyContent: "flex-start",
                  gap: 10,
                  paddingRight: 1,
                }}
              />
              <Text className="text-white text-lg font-bold -mt-28 mb-3">
                Upcoming Movies
              </Text>
              <FlatList
                className="mt-2 pb-32"
                data={upcoming}
                horizontal={true}
                keyExtractor={({ id }) => String(id)}
                renderItem={({ item }) => <MovieCard {...item} />}
                contentContainerStyle={{
                  justifyContent: "flex-start",
                  gap: 10,
                  paddingRight: 1,
                  marginBottom: 1,
                }}
              />
              <Text className="text-white text-lg font-bold -mt-28 mb-3">
                Top Rated Movies
              </Text>
              <FlatList
                className="mt-2 pb-32"
                data={topRated}
                horizontal={true}
                keyExtractor={({ id }) => String(id)}
                renderItem={({ item }) => <MovieCard {...item} />}
                contentContainerStyle={{
                  justifyContent: "flex-start",
                  gap: 10,
                  paddingRight: 1,
                  marginBottom: 1,
                }}
              />
              <Text className="text-white text-lg font-bold -mt-28 mb-3">
                Popular TV Shows
              </Text>
              <FlatList
                className="mt-2 pb-32"
                data={popularTvShow}
                horizontal={true}
                keyExtractor={({ id }) => String(id)}
                renderItem={({ item }) => <TvShowCard {...item} />}
                contentContainerStyle={{
                  justifyContent: "flex-start",
                  gap: 10,
                  paddingRight: 1,
                  marginBottom: 1,
                }}
              />
              <Text className="text-white text-lg font-bold -mt-28 mb-3">
                Top Rated TV Shows
              </Text>
              <FlatList
                className="mt-2 pb-32"
                data={topRatedTvShow}
                horizontal={true}
                keyExtractor={({ id }) => String(id)}
                renderItem={({ item }) => <TvShowCard {...item} />}
                contentContainerStyle={{
                  justifyContent: "flex-start",
                  gap: 10,
                  paddingRight: 1,
                  marginBottom: 1,
                }}
              />
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
