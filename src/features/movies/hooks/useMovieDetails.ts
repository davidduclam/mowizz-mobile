import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api";
import { Movie } from "../types";

export const useMovieDetails = (id: string | number) => {
  const [data, setData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setData(null);
    fetchMovieDetails(id)
      .then((movie) => active && setData(movie))
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error
            ? err
            : new Error("Could not fetch movie details"),
        );
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  return { data, loading, error };
};
