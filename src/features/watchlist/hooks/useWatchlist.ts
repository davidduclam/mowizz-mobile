import { useCallback, useEffect, useRef, useState } from "react";
import { watchlist } from "../api";
import { WatchlistResult } from "../types";

export const useWatchlist = () => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [data, setData] = useState<WatchlistResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isMountedRef = useRef(true);

  const fetchWatchlist = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const media = await watchlist();
      if (!isMountedRef.current) return;
      setData(media);
    } catch (err) {
      if (!isMountedRef.current) return;
      setError(
        err instanceof Error ? err : new Error("Could not fetch watchlist"),
      );
    } finally {
      if (!isMountedRef.current) return;
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchWatchlist();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchWatchlist]);

  const refresh = useCallback(() => fetchWatchlist(true), [fetchWatchlist]);

  return { data, loading, refreshing, error, refresh };
};
