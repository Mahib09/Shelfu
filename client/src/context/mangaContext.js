"use client";
import { createContext, useContext, useState } from "react";
import axios from "axios";

const MangaContext = createContext();

export const MangaProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const fetchManga = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3001/manga/search?q=${searchQuery}`
      );
      setSearchResult(response.data);
    } catch (error) {
      setError(`Failed to fetch manga data`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <MangaContext.Provider
      value={{
        loading,
        collection,
        error,
        searchQuery,
        searchResult,
        setCollection,
        setLoading,
        setError,
        setSearchQuery,
        setSearchResult,
        fetchManga,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = () => {
  return useContext(MangaContext);
};
