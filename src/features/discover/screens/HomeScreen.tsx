import MoviePosterCard from "@features/movies/components/MoviePosterCard";
import TvShowCard from "@features/tv-shows/components/TvShowCard";
import { useTvShows } from "@features/tv-shows/hooks/useTvShows";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MovieCard from "../../movies/components/MovieCard";
import { useMovies } from "../../movies/hooks/useMovies";

export default function HomeScreen() {
  const segments = useSegments() as unknown as string[];
  const isModalOpen = segments.includes("(modals)");
  const { popular, topRated, upcoming, isLoadingMovies, errorMovies } =
    useMovies();
  const { popularTvShow, topRatedTvShow, isLoadingTvShow, errorTvShows } =
    useTvShows();
  const noTvContent =
    !isLoadingTvShow &&
    !errorTvShows &&
    popularTvShow.length === 0 &&
    topRatedTvShow.length === 0;
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
  const topScrimOpacity = scrollY.interpolate({
    inputRange: [0, 36],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const width = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1 }}>
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
          showsHorizontalScrollIndicator={false}
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
        >
          <View className="flex-1 mt-5">
            {isLoadingMovies ? (
              <View className="-mb-10 -mt-10 -mx-5">
                <View
                  className="bg-white/10"
                  style={{ width, height: width * 1.5 }}
                />
              </View>
            ) : errorMovies ? (
              <Text className="text-red-400 mb-3">Could not load movies.</Text>
            ) : (
              <>
                {popular.length === 0 ? (
                  <View className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <Text className="text-white font-semibold">
                      No popular movies available
                    </Text>
                    <Text className="text-gray-300 mt-1">Try again later.</Text>
                  </View>
                ) : (
                  <View className="-mb-10 -mt-10 -mx-5">
                    <Carousel
                      autoPlay={true}
                      autoPlayInterval={5000}
                      loop={true}
                      width={width}
                      height={width * 1.5}
                      data={popular}
                      mode="parallax"
                      renderItem={({ item }) => <MoviePosterCard {...item} />}
                    />
                  </View>
                )}
                {upcoming.length > 0 && (
                  <>
                    <Text className="text-white text-lg font-bold -mt-30 mb-3">
                      Upcoming Movies
                    </Text>
                    <FlatList
                      className="mt-30 pb-32"
                      data={upcoming}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={({ id }) => String(id)}
                      renderItem={({ item }) => <MovieCard {...item} />}
                      contentContainerStyle={{
                        justifyContent: "flex-start",
                        gap: 10,
                        paddingRight: 1,
                        marginBottom: 1,
                      }}
                    />
                  </>
                )}
                {topRated.length > 0 && (
                  <>
                    <Text className="text-white text-lg font-bold -mt-28 mb-3">
                      Top Rated Movies
                    </Text>
                    <FlatList
                      className="mt-2 pb-10"
                      data={topRated}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={({ id }) => String(id)}
                      renderItem={({ item }) => <MovieCard {...item} />}
                      contentContainerStyle={{
                        justifyContent: "flex-start",
                        gap: 10,
                        paddingRight: 1,
                        marginBottom: 1,
                      }}
                    />
                  </>
                )}
              </>
            )}
            {errorTvShows ? (
              <Text className="text-red-400 mb-3">
                Could not load TV shows.
              </Text>
            ) : noTvContent ? (
              <View className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <Text className="text-white font-semibold">
                  No TV shows available
                </Text>
                <Text className="text-gray-300 mt-1">Try again later.</Text>
              </View>
            ) : (
              <>
                <Text className="text-white text-lg font-bold -mt-30 mb-3">
                  Popular TV Shows
                </Text>
                <FlatList
                  className="mt-2 pb-32"
                  data={popularTvShow}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
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
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={({ id }) => String(id)}
                  renderItem={({ item }) => <TvShowCard {...item} />}
                  contentContainerStyle={{
                    justifyContent: "flex-start",
                    gap: 10,
                    paddingRight: 1,
                    marginBottom: 1,
                  }}
                />
              </>
            )}
          </View>
        </Animated.ScrollView>
      </SafeAreaView>

      <BlurView
        intensity={35}
        tint="dark"
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          { opacity: isModalOpen ? 1 : 0 },
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          opacity: topScrimOpacity,
          zIndex: 30,
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ height: insets.top + 36 }}
        />
      </Animated.View>
    </View>
  );
}
