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
import SearchCard from "@/components/app-searchMangaCard";

import { TabsContent, TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs";
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
  console.log(collection);
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

      {/* content */}
      <div>
        <Tabs defaultValue="owned" className="w-full p-2">
          <TabsList className="grid w-[40%] grid-cols-3">
            <TabsTrigger value="owned">Owned</TabsTrigger>
            <TabsTrigger value="wantobuy">Want To Buy</TabsTrigger>
            <TabsTrigger value="forsale">For Sale </TabsTrigger>
          </TabsList>
          <TabsContent
            value="owned"
            className="flex flex-wrap gap-2 justify-center"
          >
            {collection
              .filter((item) => item.status === "Owned")
              .map((item) => (
                <MangaCard
                  key={item.userCollectionId}
                  src={item.volume.coverImageUrl}
                  title={item.volume.seriesName}
                />
              ))}
          </TabsContent>
          <TabsContent
            value="wantobuy"
            className="flex flex-wrap gap-2 justify-center"
          >
            {collection
              .filter((item) => item.status === "Want_To_Buy")
              .map((item) => (
                <MangaCard
                  key={item.userCollectionId}
                  src={item.volume.coverImageUrl}
                  title={item.volume.seriesName}
                />
              ))}
          </TabsContent>
          <TabsContent
            value="forsale"
            className="flex flex-wrap gap-2 justify-center"
          >
            {collection
              .filter((item) => item.status === "For_Sale")
              .map((item) => (
                <MangaCard
                  key={item.userCollectionId}
                  src={item.volume.coverImageUrl}
                  title={item.volume.seriesName}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Collection;
