"use client";
import React from "react";
import { useManga } from "@/context/mangaContext";
import MangaCard from "@/components/app-mangaCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Adjust path based on your file structure
import { useRouter } from "next/navigation";
import { useUi } from "@/context/uiContext";
import { Filter, SortAsc, SortDesc } from "lucide-react";
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex flex-col justify-center">
      <div className="flex p-2 m-2 gap-5">
        <h2 className="font-medium text-3xl text-gray-600">Your Collection</h2>

        <div className="ml-auto flex">
          <button>
            <SortAsc />
          </button>
          <button>
            <Filter />
          </button>
        </div>
        <input placeholder="search..." alt="search" className="border w-80" />
      </div>
      <div className="flex flex-wrap gap-8 p-4 m-4 items-center">
        {collection?.length > 0 ? (
          collection.map((item) => (
            <div key={item.userCollectionId}>
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
    </div>
  );
};

export default Collection;
