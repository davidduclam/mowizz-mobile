import { Image, Text, TouchableOpacity } from "react-native";

type Movie = {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
};

const MovieCard = ({ id, title, poster_path, release_date }: Movie) => {
  return (
    //<Link href={`/movies/${id}`} asChild>
    <TouchableOpacity className="w-[30%]">
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
        }}
        className="w-fill h-52 rounded-lg"
        resizeMode="cover"
      ></Image>
      <Text className="text-sm font-bold text-white mt-2">{title}</Text>
    </TouchableOpacity>
    //</Link>
  );
};

export default MovieCard;
