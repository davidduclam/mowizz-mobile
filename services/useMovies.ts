import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./api";

export const useMovies = () => {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  const [loading, setLoading] = useState({
    popular: true,
    topRated: true,
    upcoming: true,
  });

  const fetchMovies = async (
    url: string,
    setter: React.Dispatch<React.SetStateAction<Movie[]>>,
    key: keyof typeof loading
  ) => {
    try {
      const res = await fetch(url);
      const json = (await res.json()) as Movie[];
      setter(json);
    } finally {
      setLoading((l) => ({ ...l, [key]: false }));
    }
  };

  useEffect(() => {
    fetchMovies(`${API_BASE_URL}/movie/popular`, setPopular, "popular");
    fetchMovies(`${API_BASE_URL}/movie/top-rated`, setTopRated, "topRated");
    fetchMovies(`${API_BASE_URL}/movie/upcoming`, setUpcoming, "upcoming");
  }, []);

  const isLoading = loading.popular || loading.topRated || loading.upcoming;

  return { popular, topRated, upcoming, isLoading };
};
