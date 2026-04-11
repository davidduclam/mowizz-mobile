import { useMovieDetails } from "@features/movies/hooks/useMovieDetails";
import MediaDetailModal from "@shared/components/MediaDetailModal";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function MovieDetailsModal() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading, error } = useMovieDetails(id as string);

  return (
    <MediaDetailModal
      id={id as string}
      loading={loading}
      error={error}
      backdropPath={movie?.backdropPath}
      tmdbId={movie?.id}
      mediaType="movie"
      overview={movie?.overview}
    >
      <Text className="font-bold color-white text-2xl self-center">
        {movie?.title}
      </Text>
      <Text className="mt-2 color-white text-lg self-center">
        Movie • {movie?.releaseDate?.split("-")[0]}
      </Text>
    </MediaDetailModal>
  );
}
