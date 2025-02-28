"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import {
  addMangatoUserCollectionApi,
  getSearchResultsApi,
  getUserCollectionApi,
} from "@/lib/api";

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
    // Define the fetch function inside the useEffect
    const fetchUserCollection = async () => {
      try {
        const userId = user?.uid; // Ensure user is defined before accessing userId
        if (!userId) {
          throw new Error("User ID is missing");
        }

        const response = await getUserCollectionApi(userId);
        setCollection(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    // Fetch user collection only if the user is logged in
    if (user) {
      fetchUserCollection();
    } else {
      setLoading(false);
    }
  }, [user]);

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

  const addMangaToCollection = async (bodyInfo) => {
    setLoading(true);
    setError(null);
    try {
      console.log("form context", bodyInfo);
      const response = await addMangatoUserCollectionApi({ bodyInfo });
      return response;
    } catch (error) {
      setError(`Failed to add Manga`);
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
        addMangaToCollection,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = () => {
  return useContext(MangaContext);
};
