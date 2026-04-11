import { API_BASE_URL } from "@shared/api";
import { SearchResult } from "../types";

export async function searchMedia(keyword: string) {
  const res = await fetch(`${API_BASE_URL}/search/multi?query=${keyword}`);
  if (!res.ok) throw new Error("Failed to fetch search");
  const results = (await res.json()) as (Omit<SearchResult, "mediaType"> & { mediaType: string })[];
  return results.map((item) => ({
    ...item,
    mediaType: item.mediaType === "tv" ? "tv-show" : item.mediaType,
  })) as SearchResult[];
}
