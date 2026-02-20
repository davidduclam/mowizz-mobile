import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import { TvShow } from "../types";

const TvShowCard = ({
  id,
  name,
  poster_path,
  first_air_date,
  vote_average,
}: TvShow) => {
  return (
    <Link
      href={{ pathname: "/(modals)/tv-show/[id]", params: { id: String(id) } }}
      asChild
    >
      <TouchableOpacity className="w-32 mr-4">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-23 h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2">{name}</Text>
        <Text className="text-xs text-white font-bold mt-1">
          ⭐ {vote_average.toFixed(2)}
        </Text>
        <Text className="text-xs text-gray-400 font-medium mt-1">
          {first_air_date?.split("-")[0]}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TvShowCard;
