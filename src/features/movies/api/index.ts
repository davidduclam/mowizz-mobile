import { Movie } from "../types";

export const API_BASE_URL = __DEV__
  ? process.env.EXPO_PUBLIC_API_BASE_URL
  : "http://localhost:8080";

export async function fetchMovies(type: string) {
  const res = await fetch(`${API_BASE_URL}/movie/${type}`);
  if (!res.ok) throw new Error(`Failed to fetch ${type} movies`);
  return (await res.json()) as Movie[];
}
export async function fetchMovieDetails(id: number | string) {
  const res = await fetch(`${API_BASE_URL}/movie/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return (await res.json()) as Movie;
}
