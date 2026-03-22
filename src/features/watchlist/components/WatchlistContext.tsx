import {addToWatchlist, removeFromWatchlist, watchlist,} from "../api";
import {WatchlistResult} from "../types";
import {createContext, useCallback, useContext, useEffect, useRef, useState,} from "react";

type WatchlistContextValue = {
  items: WatchlistResult[];
  loading: boolean;
  refreshing: boolean;
  error: Error | null;
  refresh: () => void;
  isInWatchlist: (tmdbId: number, mediaType: string) => boolean;
  add: (tmdbId: number, mediaType: string) => Promise<void>;
  remove: (tmdbId: number, mediaType: string) => Promise<void>;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WatchlistResult[]>([]);
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
      setItems(media);
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
    isMountedRef.current = true;
    fetchWatchlist();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchWatchlist]);

  const refresh = useCallback(() => fetchWatchlist(true), [fetchWatchlist]);

  const isInWatchlist = useCallback(
    (tmdbId: number, mediaType: string) =>
      items.some((item) => item.id === tmdbId && item.mediaType === mediaType),
    [items],
  );

  const add = useCallback(
    async (tmdbId: number, mediaType: string) => {
      await addToWatchlist(tmdbId, mediaType);
      await fetchWatchlist();
    },
    [fetchWatchlist],
  );

  const remove = useCallback(
    async (tmdbId: number, mediaType: string) => {
      await removeFromWatchlist(tmdbId, mediaType);
      setItems((prev) =>
        prev.filter(
          (item) => !(item.id === tmdbId && item.mediaType === mediaType),
        ),
      );
    },
    [],
  );

  return (
    <WatchlistContext.Provider
      value={{ items, loading, refreshing, error, refresh, isInWatchlist, add, remove }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlistContext() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlistContext must be used within WatchlistProvider");
  return ctx;
}
