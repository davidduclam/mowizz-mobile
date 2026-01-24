import { useEffect, useState } from "react";
import { fetchMovies } from "../api";
import { Movie } from "../types";

export const useMovies = () => {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.allSettled([
      fetchMovies("popular"),
      fetchMovies("top-rated"),
      fetchMovies("upcoming"),
    ])
      .then((results) => {
        if (!active) return;
        const [popularResult, topRatedResult, upcomingResult] = results;
        if (popularResult.status === "fulfilled") {
          setPopular(popularResult.value);
        }
        if (topRatedResult.status === "fulfilled") {
          setTopRated(topRatedResult.value);
        }
        if (upcomingResult.status === "fulfilled") {
          setUpcoming(upcomingResult.value);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { popular, topRated, upcoming, isLoading: loading };
};
