"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { getSearchResultsApi, getUserCollectionApi } from "@/lib/api";

const MangaContext = createContext();

export const MangaProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    setLoading(true);

    const fetchUserCollection = async () => {
      try {
        const userId = user.uid;
        const response = getUserCollectionApi(userId);
        setCollection(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (isLoggedIn && user) {
      fetchUserCollection();
    }
  }, [user, isLoggedIn]);

  const searchManga = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSearchResultsApi(searchQuery);
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
        searchManga,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = () => {
  return useContext(MangaContext);
};
