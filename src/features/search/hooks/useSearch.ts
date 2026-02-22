import { useEffect, useState } from "react";
import { searchMedia } from "../api";
import { SearchResult } from "../types";

export const useSearch = (keyword: string) => {
  const [data, setData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    const timeoutId = setTimeout(async () => {
      if (!active) return;
      setLoading(true);
      setError(null);
      searchMedia(keyword)
        .then((media) => active && setData(media))
        .catch((err) => {
          if (!active) return;
          setError(
            err instanceof Error ? err : new Error("Could not fetch search"),
          );
        })
        .finally(() => active && setLoading(false));
    }, 500);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [keyword]);

  return { data, loading, error };
};
