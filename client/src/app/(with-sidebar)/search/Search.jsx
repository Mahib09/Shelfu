"use client";
import { useManga } from "@/context/mangaContext";
import { ArrowLeft, SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import MangaCard from "@/components/app-mangaCard";
import SearchCard from "@/components/app-searchMangaCard";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import AddMangaModel from "@/components/app-addMangaModel";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import SearchSkeleton from "@/components/searchSkeleton";

const Search = () => {
  const router = useRouter();
  const {
    loading,
    searchManga,
    searchResult,
    setSearchResult,
    setSearchQuery,
    error,
    searchQuery,
  } = useManga();
  const { profile } = useAuth();

  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedManga(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    await searchManga();
  };

  const handlePrevious = () => {
    if (isSearching) {
      setIsSearching(false);
      setSearchQuery("");
      setSearchResult(null);
    } else {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Ensure scroll is enabled when component unmounts
    };
  }, [isModalOpen]);

  const handleAddManga = (item) => {
    if (!isModalOpen) {
      openModal();
    }
    setSelectedManga(item);
  };

  return (
    <div className="min-h-[calc(100% - 2rem)]  container-wrapper">
      <div
        className={`flex flex-col  transition-all duration-300 ${
          isSearching ? "pt-4 max-h-fit" : "pt-[40vh] min-h-[calc(100% - 2rem)]"
        }`}
      >
        <div className="flex w-full max-w-md mb-4">
          <button
            onClick={handlePrevious}
            className="hover:text-accent-foreground"
          >
            <ArrowLeft />
          </button>
          <h2 className="ml-2 text-xl font-bold">Search Volumes</h2>
        </div>

        <div className={`w-full  mx-auto `}>
          <form
            className="flex items-center border rounded-lg shadow-md gap-2"
            onSubmit={handleSearch}
          >
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" p-2 outline-none border-none h-12 text-lg"
            />
            <button
              type="submit"
              className="ml-auto mr-2 hover:text-accent-foreground"
            >
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="mt-12 w-[100%] flex flex-wrap gap-4 p-4 justify-center">
          {loading ? (
            <SearchSkeleton />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : searchResult.length > 0 ? (
            searchResult.map((item) => (
              <div key={item.booksApiId}>
                <SearchCard
                  image={item.image}
                  title={item.title}
                  author={item.author}
                  description={item.description}
                  volumeNumber={item.volumeNumber}
                  handleAdd={() => handleAddManga(item)}
                />
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
      {isModalOpen && (
        <AddMangaModel
          onClose={closeModal}
          userId={profile.userId}
          volumeInfo={selectedManga}
        />
      )}
    </div>
  );
};

export default Search;
