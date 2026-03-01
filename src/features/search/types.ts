import { Movie } from "@features/movies/types";
import { TvShow } from "@features/tv-shows/types";

export type SearchMovie = Movie & { mediaType: "movie" };
export type SearchTvShow = TvShow & { mediaType: "tv" };
export type SearchResult = SearchMovie | SearchTvShow;
export type SearchQuery = string;
