import { Movie } from "@features/movies/types";
import { TvShow } from "@features/tv-shows/types";

export type WatchlistMovie = Movie & { mediaType: "movie" };
export type WatchlistTvShow = TvShow & { mediaType: "tv" };
export type WatchlistResult = WatchlistMovie | WatchlistTvShow;
