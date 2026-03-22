import { API_BASE_URL } from "@shared/api";
import { WatchlistResult } from "../types";

export async function watchlist() {
  const res = await fetch(`${API_BASE_URL}/users/2/media`);
  if (!res.ok) throw new Error("Failed to fetch watchlist");
  return (await res.json()) as WatchlistResult[];
}

export async function addToWatchlist(tmdbId: number, mediaType: string) {
  const res = await fetch(`${API_BASE_URL}/users/2/media`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tmdbId, mediaType }),
  });
  if (!res.ok) throw new Error("Failed to add to watchlist");
}

export async function removeFromWatchlist(tmdbId: number, mediaType: string) {
  const res = await fetch(`${API_BASE_URL}/users/2/media`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tmdbId, mediaType }),
  });
  if (!res.ok) throw new Error("Failed to remove from watchlist");
}
