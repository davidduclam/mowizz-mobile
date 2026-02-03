import { API_BASE_URL } from "@features/movies/api";
import { Movie } from "@features/movies/types";

export async function fetchSearch(keyword: string) {
  const res = await fetch(`${API_BASE_URL}/movie/search?query=${keyword}`);
  if (!res.ok) throw new Error("Failed to fetch search");
  return (await res.json()) as Movie[];
}
