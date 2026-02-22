import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import { Movie } from "../types";

const MovieCard = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: Movie) => {
  return (
    <Link
      href={{ pathname: "/(modals)/movie/[id]", params: { id: String(id) } }}
      asChild
    >
      <TouchableOpacity className="w-32 mr-4">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/300x400/1a1a1a/ffffff.png",
          }}
          className="w-23 h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2">{title}</Text>
        <Text className="text-xs text-white font-bold mt-1">
          ⭐ {vote_average.toFixed(2)}
        </Text>
        <Text className="text-xs text-gray-400 font-medium mt-1">
          {release_date?.split("-")[0]}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
