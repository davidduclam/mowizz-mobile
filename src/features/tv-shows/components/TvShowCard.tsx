import { getPosterUrl } from "@shared/api/tmdb";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import { TvShow } from "../types";

const TvShowCard = ({
  id,
  name,
  posterPath,
  firstAirDate,
  voteAverage,
}: TvShow) => {
  return (
    <Link
      href={{ pathname: "/(modals)/tv-show/[id]", params: { id: String(id) } }}
      asChild
    >
      <TouchableOpacity className="w-32 mr-4">
        <Image
          source={{ uri: getPosterUrl(posterPath) }}
          className="w-23 h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2">{name}</Text>
        <Text className="text-xs text-white font-bold mt-1">
          ⭐ {voteAverage.toFixed(2)}
        </Text>
        <Text className="text-xs text-gray-400 font-medium mt-1">
          {firstAirDate?.split("-")[0]}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TvShowCard;
