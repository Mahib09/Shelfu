"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import {
  addMangatoUserCollectionApi,
  getSearchResultsApi,
  getUserCollectionApi,
  updateCategoryorNotesApi,
} from "@/lib/api";

const MangaContext = createContext();

export const MangaProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { user, isLoggedIn } = useAuth();

  const fetchUserCollection = async () => {
    setLoading(true);
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
  useEffect(() => {
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
      const response = await addMangatoUserCollectionApi({ bodyInfo });
      return response;
    } catch (error) {
      setError(`Failed to add Manga`);
    } finally {
      setLoading(false);
    }
  };

  const updateMangaStatusOrNote = async (bodyInfo, userCollectionId) => {
    setLoading(true);
    setError(null);
    try {
      await updateCategoryorNotesApi(bodyInfo, userCollectionId);
      await fetchUserCollection();
      return true;
    } catch (error) {
      setError("Failed to Update", error);
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
        updateMangaStatusOrNote,
        fetchUserCollection,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = () => {
  return useContext(MangaContext);
};
