import MovieCard from "@/components/MovieCard";
import { useMovies } from "@/services/useMovies";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { popular, topRated, upcoming, isLoading } = useMovies();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        stickyHeaderIndices={[0]}
      >
        <Text className="text-white font-bold text-4xl">MoWizz</Text>

        <View>
          {isLoading ? (
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
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
