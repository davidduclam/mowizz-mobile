import { API_BASE_URL } from "@shared/api";
import { TvShow } from "../types";

export async function fetchTvShows(type: string) {
  const res = await fetch(`${API_BASE_URL}/shows/${type}`);
  if (!res.ok) throw new Error(`Failed to fetch ${type} tv shows`);
  return (await res.json()) as TvShow[];
}

export async function fetchTvShowDetails(id: number | string) {
  const res = await fetch(`${API_BASE_URL}/shows/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch tv show`);
  return (await res.json()) as TvShow;
}
