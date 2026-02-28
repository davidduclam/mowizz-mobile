import { getPosterUrl } from "@shared/api/tmdb";
import { Link } from "expo-router";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { Movie } from "../types";

const { width } = Dimensions.get("window");

const MoviePosterCard = ({ id, poster_path }: Movie) => {
  return (
    <Link
      href={{ pathname: "/(modals)/movie/[id]", params: { id: String(id) } }}
      asChild
    >
      <TouchableOpacity style={{ width }}>
        <Image
          source={{ uri: getPosterUrl(poster_path) }}
          style={{ width, height: width * 1.5 }}
          className="rounded-lg"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Link>
  );
};

export default MoviePosterCard;
