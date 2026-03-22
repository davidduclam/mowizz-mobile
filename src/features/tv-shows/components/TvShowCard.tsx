import { getPosterUrl } from "@shared/api/tmdb";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import { TvShow } from "../types";

type TvShowCardProps = Omit<TvShow, "name" | "firstAirDate"> & {
  name?: string;
  firstAirDate?: string;
  title?: string;
  releaseDate?: string;
};

const TvShowCard = ({
  id,
  name,
  posterPath,
  firstAirDate,
  voteAverage,
  title,
  releaseDate,
}: TvShowCardProps) => {
  const displayTitle = name ?? title ?? "Untitled";
  const displayDate = firstAirDate ?? releaseDate;

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
        <Text className="text-sm font-bold text-white mt-2">
          {displayTitle}
        </Text>
        {!!voteAverage && (
          <Text className="text-xs text-white font-bold mt-1">
            ⭐ {voteAverage.toFixed(1)}
          </Text>
        )}

        <Text className="text-xs text-gray-400 font-medium mt-1">
          {displayDate?.split("-")[0]}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TvShowCard;
