import { useTvShowDetails } from "@features/tv-shows/hooks/useTvShowDetails";
import MediaDetailModal from "@shared/components/MediaDetailModal";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function TvShowDetailsModal() {
  const { id } = useLocalSearchParams();
  const { data: show, loading, error } = useTvShowDetails(id as string);

  return (
    <MediaDetailModal
      id={id as string}
      loading={loading}
      error={error}
      backdropPath={show?.backdropPath}
      tmdbId={show?.id}
      mediaType="tv-show"
      overview={show?.overview}
    >
      <Text className="font-bold color-white text-2xl self-center">
        {show?.name}
      </Text>
      <Text className="mt-2 color-white text-lg self-center">
        TV show • {show?.firstAirDate?.split("-")[0]}
      </Text>
    </MediaDetailModal>
  );
}
