import { API_BASE_URL } from "@shared/api";
import { SearchResult } from "../types";

export async function searchMedia(keyword: string) {
  const res = await fetch(`${API_BASE_URL}/search/multi?query=${keyword}`);
  if (!res.ok) throw new Error("Failed to fetch search");
  return (await res.json()) as SearchResult[];
}
