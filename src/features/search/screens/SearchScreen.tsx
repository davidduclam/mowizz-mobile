import { useMovies } from "@features/movies/hooks/useMovies";
import MediaPosterCard from "@shared/components/MediaPosterCard";
import ScreenBackground from "@shared/components/ScreenBackground";
import { BlurView } from "expo-blur";
import { useSegments } from "expo-router";
import React, { useContext, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SearchContext } from "../components/SearchContext";
import { useSearch } from "../hooks/useSearch";

export default function SearchScreen() {
  const segments = useSegments() as unknown as string[];
  const isModalOpen = segments.includes("(modals)");
  const { searchQuery } = useContext(SearchContext);
  const {
    data: searchResults,
    loading,
    error,
  } = useSearch(searchQuery as string);
  const { popular } = useMovies();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground />
      <SafeAreaView edges={["left", "right"]} className="flex-1 bg-transparent">
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: insets.top,
            left: 20,
            right: 20,
            zIndex: 10,
            opacity: titleOpacity,
          }}
        >
          <Text className="text-white font-bold text-4xl">Search</Text>
        </Animated.View>

        {loading ? (
          <SafeAreaView className="mt-safe">
            <ActivityIndicator />
          </SafeAreaView>
        ) : searchQuery === "" ? (
          <Animated.FlatList
            className="px-10"
            data={popular}
            numColumns={3}
            keyExtractor={(item, index) =>
              item ? String(item.id) : `placeholder-${index}`
            }
            renderItem={({ item }) =>
              item ? (
                <MediaPosterCard mediaType="movie" {...item} />
              ) : (
                <View style={{ flex: 1 }} />
              )
            }
            contentInsetAdjustmentBehavior="never"
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true },
            )}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 10,
              marginVertical: 8,
              marginHorizontal: -25,
            }}
            contentContainerStyle={{
              paddingTop: insets.top + 48,
              paddingBottom: 100,
            }}
          />
        ) : (
          <Animated.FlatList
            className="px-10"
            data={searchResults}
            numColumns={3}
            keyExtractor={({ id, mediaType }) => `${mediaType}-${id}`}
            renderItem={({ item }) => <MediaPosterCard {...item} />}
            contentInsetAdjustmentBehavior="never"
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true },
            )}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 10,
              marginVertical: 8,
              marginHorizontal: -25,
            }}
            contentContainerStyle={{
              paddingTop: insets.top + 48,
              paddingBottom: 100,
            }}
            ListHeaderComponent={
              error ? (
                <View className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2">
                  <Text className="text-red-300">
                    Could not load search results. Try again.
                  </Text>
                </View>
              ) : null
            }
            ListEmptyComponent={
              !loading && !error ? (
                <View className="mt-10 px-5">
                  <Text className="text-center text-white">No media found</Text>
                </View>
              ) : null
            }
          />
        )}
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
    </View>
  );
}
