import { getPosterUrl } from "@shared/api/tmdb";
import { Link } from "expo-router";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { Movie } from "../types";

const MoviePosterCardWatchlist = ({ id, posterPath }: Movie) => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 16) / 2;
  const cardHeight = cardWidth * 1.5;
  return (
    <Link
      href={{ pathname: "/(modals)/movie/[id]", params: { id: String(id) } }}
      asChild
    >
      <TouchableOpacity style={{ width: cardWidth }}>
        <Image
          source={{ uri: getPosterUrl(posterPath) }}
          style={{ width: cardWidth, height: cardHeight }}
          className="rounded-lg"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Link>
  );
};

export default MoviePosterCardWatchlist;
