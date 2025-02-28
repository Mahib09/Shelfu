"use client";
import React from "react";
import { useManga } from "@/context/mangaContext";
import MangaCard from "@/components/app-mangaCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Adjust path based on your file structure
import { useRouter } from "next/navigation";
import { useUi } from "@/context/uiContext";
import { Filter, Grid, List, SortAsc, SortDesc } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

import { TabsContent, TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MangaListCard from "@/components/app-mangaListCard";
const Collection = () => {
  const router = useRouter();
  const [layout, setLayout] = useState("Grid");
  const [sort, setSort] = useState("Asc");
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

  const handleGrid = () => {
    setLayout("Grid");
  };
  const handleList = () => {
    setLayout("List");
  };
  const handleSortToggle = () => {
    sort === "Asc" ? setSort("Desc") : setSort("Asc");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex flex-col justify-center">
      <div className="flex p-2 m-2 gap-1 items-center">
        <h2 className="font-medium text-xl md:text-3xl text-gray-600">
          Your Collection
        </h2>
        <Toggle className="ml-auto" onClick={handleSortToggle}>
          <SortDesc />
        </Toggle>
        <Input type="text" placeholder="Search" className="w-[30%]" />
      </div>

      {/* content */}
      <div>
        <Tabs defaultValue="owned" className="w-full p-2">
          <div className="flex">
            <TabsList className="flex w-max gap-3 justify-start items-center p-2">
              <TabsTrigger value="owned">Owned</TabsTrigger>
              <TabsTrigger value="wantobuy">Want To Buy</TabsTrigger>
              <TabsTrigger value="forsale">For Sale </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex gap-1">
              <Button variant="outline" size="icon" onClick={handleGrid}>
                <Grid />
              </Button>
              <Button variant="outline" size="icon" onClick={handleList}>
                <List />
              </Button>
            </div>
          </div>

          <TabsContent
            value="owned"
            className="flex flex-wrap md:flex-row gap-2 items-center justify-around sm:justify-center"
          >
            {collection
              .filter((item) => item.status === "Owned")
              .sort((a, b) =>
                sort === "Asc"
                  ? a.volume.seriesName.localeCompare(b.volume.seriesName)
                  : b.volume.seriesName.localeCompare(a.volume.seriesName)
              )
              .map((item) =>
                layout === "Grid" ? (
                  <MangaCard
                    key={item.userCollectionId}
                    src={item.volume.coverImageUrl}
                    title={item.volume.seriesName}
                    author={item.volume.author}
                  />
                ) : (
                  <MangaListCard
                    key={item.userCollectionId}
                    src={item.volume.coverImageUrl}
                    title={item.volume.seriesName}
                    author={item.volume.author}
                    description={item.volume.description}
                  />
                )
              )}
          </TabsContent>
          <TabsContent
            value="wantobuy"
            className="flex flex-wrap md:flex-row gap-2 items-center justify-around sm:justify-center"
          >
            {collection
              .filter((item) => item.status === "Want_To_Buy")
              .sort((a, b) =>
                sort === "Asc"
                  ? a.volume.seriesName.localeCompare(b.volume.seriesName)
                  : b.volume.seriesName.localeCompare(a.volume.seriesName)
              )
              .map((item) =>
                layout === "Grid" ? (
                  <MangaCard
                    key={item.userCollectionId}
                    src={item.volume.coverImageUrl}
                    title={item.volume.seriesName}
                    author={item.volume.author}
                  />
                ) : (
                  <MangaListCard
                    key={item.userCollectionId}
                    src={item.volume.coverImageUrl}
                    title={item.volume.seriesName}
                    author={item.volume.author}
                    description={item.volume.description}
                    note={item.notes}
                  />
                )
              )}
          </TabsContent>
          <TabsContent
            value="forsale"
            className="flex flex-wrap md:flex-row gap-2 items-center justify-around sm:justify-center"
          >
            {collection
              .filter((item) => item.status === "For_Sale")
              .sort((a, b) =>
                sort === "Asc"
                  ? a.volume.seriesName.localeCompare(b.volume.seriesName)
                  : b.volume.seriesName.localeCompare(a.volume.seriesName)
              )
              .map((item) =>
                layout === "Grid" ? (
                  <MangaCard
                    key={item.userCollectionId}
                    src={item.volume.coverImageUrl}
                    title={item.volume.seriesName}
                    author={item.volume.author}
                  />
                ) : (
                  <MangaListCard
                    key={item.userCollectionId}
                    src={item.volume.coverImageUrl}
                    title={item.volume.seriesName}
                    author={item.volume.author}
                    description={item.volume.description}
                  />
                )
              )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Collection;
