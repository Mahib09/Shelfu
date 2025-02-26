"use client";
import React from "react";
import { useManga } from "@/context/mangaContext";
import MangaCard from "@/components/app-mangaCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Adjust path based on your file structure
import { useRouter } from "next/navigation";
import { useUi } from "@/context/uiContext";
const Collection = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { pagewidth } = useUi();
  const {
    searchQuery,
    setSearchQuery,
    loading,
    setLoading,
    error,
    setError,
    collection,
    setCollection,
    searchResult,
    setSearchResult,
    fetchManga,
  } = useManga();

  useEffect(() => {
    if (!user) return; // If user is not yet set, do not fetch data

    const fetchUserCollection = async () => {
      try {
        setLoading(true);
        setError(null); // Reset any previous errors

        const token = await user.getIdToken();
        const userId = user.uid;

        // Fetch data from the backend
        const response = await axios.get(
          `http://localhost:3001/usercollection/${userId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        // Update state with the fetched data
        setUserCollection(response.data);
        setCollection(response.data);
      } catch (error) {
        console.error("Error fetching user collection:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCollection();
  }, [user]); // Fetch data only when `user` is available

  const handleSearch = async () => {
    await fetchManga();
    console.log(searchResult);
  };
  // Show loading indicator while fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if something went wrong
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex flex-wrap">
      {collection?.length > 0 ? (
        collection.map((item) => (
          <div
            key={item.userCollectionId}
            className="basis-[16.9%] flex-shrink-0 max-w-[16.9%] p-[.25rem]"
          >
            <MangaCard
              author={item.volume.author}
              vol={item.volume.volumeNumber}
              title={item.volume.seriesName}
              src={
                item.volume?.coverImageUrl?.trim()
                  ? item.volume.coverImageUrl
                  : null
              }
              status={item.status}
            />
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          No items found in your collection.
        </div>
      )}
    </div>
  );
};

export default Collection;
