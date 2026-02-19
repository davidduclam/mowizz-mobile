import { useEffect, useState } from "react";
import { fetchTvShows } from "../api";
import { TvShow } from "../types";

export const useTvShows = () => {
  const [popularTvShow, setPopular] = useState<TvShow[]>([]);
  const [topRatedTvShow, setTopRated] = useState<TvShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

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
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { popularTvShow, topRatedTvShow, isLoadingTvShow: loading };
};
