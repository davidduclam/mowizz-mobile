import { API_BASE_URL } from "@shared/api";
import { Movie } from "../types";

export async function fetchMovies(type: string) {
  const res = await fetch(`${API_BASE_URL}/movies/${type}`);
  if (!res.ok) throw new Error(`Failed to fetch ${type} movies`);
  return (await res.json()) as Movie[];
}
export async function fetchMovieDetails(id: number | string) {
  const res = await fetch(`${API_BASE_URL}/movies/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return (await res.json()) as Movie;
}
