import { Movie } from "@features/movies/types";

export type WatchlistMovie = Movie & { mediaType: "movie" };
export type WatchlistTvShow = Movie & { mediaType: "tv" };
export type WatchlistResult = WatchlistMovie | WatchlistTvShow;
