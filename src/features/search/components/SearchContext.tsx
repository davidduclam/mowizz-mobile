import { SearchQuery } from "../types";
import { createContext, ReactNode, useState } from "react";

export const SearchContext = createContext<{
  searchQuery: SearchQuery;
  setSearchQuery: (query: SearchQuery) => void;
}>({
  searchQuery: "",
  setSearchQuery: () => {},
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
