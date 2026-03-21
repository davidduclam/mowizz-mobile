import { useState } from "react";
import { addToWatchlist } from "../api";

export function useAddToWatchlist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function add(tmdbId: number, mediaType: string) {
    setLoading(true);
    setError(null);
    try {
      await addToWatchlist(tmdbId, mediaType);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }

  return { add, loading, error };
}
