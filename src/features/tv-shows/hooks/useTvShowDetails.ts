import { useEffect, useState } from "react";
import { fetchTvShowDetails } from "../api";
import { TvShow } from "../types";

export const useTvShowDetails = (id: string | number) => {
  const [data, setData] = useState<TvShow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setData(null);
    fetchTvShowDetails(id)
      .then((movie) => active && setData(movie))
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error
            ? err
            : new Error("Could not fetch tv show details"),
        );
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  return { data, loading, error };
};
