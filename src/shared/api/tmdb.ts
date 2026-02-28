export const TMDB_POSTER_API = "https://image.tmdb.org/t/p/w500";

export function getPosterUrl(posterPath: string | null | undefined): string {
  return posterPath
    ? `${TMDB_POSTER_API}${posterPath}`
    : "https://placehold.co/300x400/1a1a1a/ffffff.png";
}
