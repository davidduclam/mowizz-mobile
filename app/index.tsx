import MovieCard from "@/components/MovieCard";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  type Movie = {
    id: string;
    title: string;
    release_date: string;
    poster_path: string;
    overview: string;
  };

  type MoviesResponse = Movie[];

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/movie/popular");
      const json = (await response.json()) as MoviesResponse;
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Text className="text-white font-bold text-4xl">MoWizz</Text>

        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View className="flex-1 mt-5">
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Popular Movies
              </Text>
              <FlatList
                className="mt-2 pb-32"
                data={data}
                numColumns={3}
                scrollEnabled={false}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => <MovieCard {...item} />}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
