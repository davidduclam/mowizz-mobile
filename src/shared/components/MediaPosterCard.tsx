import { getPosterUrl } from "@shared/api/tmdb";
import { Link } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

type Props = {
  id: number;
  posterPath: string;
  mediaType: "movie" | "tv-show";
};

const MediaPosterCard = ({ id, posterPath, mediaType }: Props) => {
  return (
    <Link
      href={{
        pathname: `/(modals)/${mediaType}/[id]`,
        params: { id: String(id) },
      }}
      asChild
    >
      <TouchableOpacity className="w-32 mr-4">
        <Image
          source={{ uri: getPosterUrl(posterPath) }}
          className="w-36 h-56 rounded-lg"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Link>
  );
};

export default MediaPosterCard;
