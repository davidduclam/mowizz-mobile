import { API_BASE_URL } from "@shared/api";
import { WatchlistResult } from "../types";

function toApiMediaType(mediaType: string) {
  return mediaType === "tv-show" ? "tv" : mediaType;
}

function fromApiMediaType(mediaType: string) {
  return mediaType === "tv" ? "tv-show" : mediaType;
}

export async function watchlist() {
  const res = await fetch(`${API_BASE_URL}/users/3/media`);
  if (!res.ok) throw new Error("Failed to fetch watchlist");
  const results = (await res.json()) as WatchlistResult[];
  return results.map((item) => ({
    ...item,
    mediaType: fromApiMediaType(item.mediaType),
  })) as WatchlistResult[];
}

export async function addToWatchlist(tmdbId: number, mediaType: string) {
  const res = await fetch(`${API_BASE_URL}/users/3/media`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tmdbId, mediaType: toApiMediaType(mediaType) }),
  });
  if (!res.ok) throw new Error("Failed to add to watchlist");
}

export async function removeFromWatchlist(tmdbId: number, mediaType: string) {
  const res = await fetch(`${API_BASE_URL}/users/3/media`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tmdbId, mediaType: toApiMediaType(mediaType) }),
  });
  if (!res.ok) throw new Error("Failed to remove from watchlist");
}
