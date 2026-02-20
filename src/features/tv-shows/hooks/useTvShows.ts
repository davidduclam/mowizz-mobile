import { useEffect, useState } from "react";
import { fetchTvShows } from "../api";
import { TvShow } from "../types";

export const useTvShows = () => {
  const [popularTvShow, setPopular] = useState<TvShow[]>([]);
  const [topRatedTvShow, setTopRated] = useState<TvShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    Promise.allSettled([fetchTvShows("popular"), fetchTvShows("top-rated")])
      .then((results) => {
        if (!active) return;
        const [popularResult, topRatedResult] = results;
        if (popularResult.status === "fulfilled") {
          setPopular(popularResult.value);
        }
        if (topRatedResult.status === "fulfilled") {
          setTopRated(topRatedResult.value);
        }

        if (
          popularResult.status === "rejected" &&
          topRatedResult.status === "rejected"
        ) {
          setError(new Error("Failed to load TV shows"));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    popularTvShow,
    topRatedTvShow,
    isLoadingTvShow: loading,
    errorTvShows: error,
  };
};
