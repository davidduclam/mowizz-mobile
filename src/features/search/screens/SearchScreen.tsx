import { useMovies } from "@features/movies/hooks/useMovies";
import React, { useContext, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useSegments } from "expo-router";
import { SearchContext } from "../components/SearchContext";
import { useSearch } from "../hooks/useSearch";
import MediaPosterCard from "@shared/components/MediaPosterCard";

export default function SearchScreen() {
  const segments = useSegments() as unknown as string[];
  const isModalOpen = segments.includes("(modals)");
  const { searchQuery } = useContext(SearchContext);
  const { data: movie, loading, error } = useSearch(searchQuery as string);
  const { popular } = useMovies();
  const [listHeight, setListHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const canScroll = useMemo(
    () => contentHeight > listHeight + 1,
    [contentHeight, listHeight],
  );

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1 bg-black">
      {/* <Text className="text-white text-lg font-bold mb-3">Popular Movies</Text> */}
      {loading ? (
        <SafeAreaView className="mt-safe">
          <ActivityIndicator />
        </SafeAreaView>
      ) : searchQuery === "" ? (
        <View>
          <FlatList
            className="px-10"
            data={popular}
            numColumns={3}
            onLayout={(event) => setListHeight(event.nativeEvent.layout.height)}
            onContentSizeChange={(_, height) => setContentHeight(height)}
            scrollEnabled={canScroll}
            bounces={canScroll}
            alwaysBounceVertical={canScroll}
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
            contentInsetAdjustmentBehavior="automatic"
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 10,
              marginVertical: 8,
              marginHorizontal: -25,
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListHeaderComponent={
              searchQuery.trim() && error ? (
                <View className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2">
                  <Text className="text-red-300">
                    Could not load search results. Try again.
                  </Text>
                </View>
              ) : null
            }
          ></FlatList>
        </View>
      ) : (
        <View>
          {/*<Text className="text-white">Search Results for {searchQuery}</Text>*/}
          <FlatList
            className="px-10"
            data={movie}
            numColumns={3}
            onLayout={(event) => setListHeight(event.nativeEvent.layout.height)}
            onContentSizeChange={(_, height) => setContentHeight(height)}
            scrollEnabled={canScroll}
            bounces={canScroll}
            alwaysBounceVertical={canScroll}
            keyExtractor={({ id, mediaType }) => `${mediaType}-${id}`}
            renderItem={({ item }) => <MediaPosterCard {...item} />}
            contentInsetAdjustmentBehavior="automatic"
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 10,
              marginVertical: 8,
              marginHorizontal: -25,
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListHeaderComponent={
              searchQuery.trim() && error ? (
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
                  <Text className="text-center text-white">
                    {searchQuery.trim()
                      ? "No media found"
                      : "Search for a movie or TV show"}
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
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
  );
}
