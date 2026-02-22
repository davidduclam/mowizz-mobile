import { Movie } from "@features/movies/types";
import { TvShow } from "@features/tv-shows/types";

export type SearchMovie = Movie & { media_type: "movie" };
export type SearchTvShow = TvShow & { media_type: "tv" };
export type SearchResult = SearchMovie | SearchTvShow;
export type SearchQuery = string;
