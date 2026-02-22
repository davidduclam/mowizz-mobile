import { useEffect, useState } from "react";
import { fetchSearch } from "../api";
import { SearchResult } from "../types";

export const useSearch = (keyword: string) => {
  const [data, setData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      let active = true;
      setLoading(true);
      setError(null);
      fetchSearch(keyword)
        .then((media) => active && setData(media))
        .catch((err) => {
          if (!active) return;
          setError(
            err instanceof Error ? err : new Error("Could not fetch search"),
          );
        })
        .finally(() => active && setLoading(false));
      return () => {
        active = false;
      };
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  return { data, loading, error };
};
