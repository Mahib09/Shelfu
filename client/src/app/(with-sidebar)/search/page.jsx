"use client";
import { useManga } from "@/context/mangaContext";
import { ArrowLeft, SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import MangaCard from "@/components/app-mangaCard";

const Search = () => {
  const {
    loading,
    searchManga,
    searchResult,
    setSearchQuery,
    error,
    searchQuery,
  } = useManga();

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    await searchManga();
  };
  useEffect(() => {
    if (searchResult.length === 0) setIsSearching(false);
  }, [searchResult]);
  console.log(searchResult);
  return (
    <div className="min-h-[calc(100% - 2rem)] px-20">
      <div
        className={`flex flex-col  transition-all duration-300 ${
          isSearching ? "pt-4 max-h-fit" : "pt-[40vh] min-h-[calc(100% - 2rem)]"
        }`}
      >
        <div className="flex w-full max-w-md mb-4">
          <button>
            <ArrowLeft />
          </button>
          <h2 className="ml-2 text-lg font-semibold">Search Volumes</h2>
        </div>

        <div className={`w-full  mx-auto `}>
          <form
            className="flex items-center border border-gray-300 rounded-lg p-2 shadow-md"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow p-2 outline-none"
            />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="mt-[70px] w-full flex flex-wrap gap-3 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : searchResult.length > 0 ? (
            searchResult.map((item) => (
              <div key={item.booksApiId}>
                <MangaCard
                  author={item.author}
                  title={item.title}
                  src={item.image || null}
                />
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
