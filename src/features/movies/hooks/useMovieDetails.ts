import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api";
import { Movie } from "../types";

export const useMovieDetails = (id: string | number) => {
  const [data, setData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchMovieDetails(id)
      .then((movie) => active && setData(movie))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  return { data, loading };
};
