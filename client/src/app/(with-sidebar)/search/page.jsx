"use client";
import { useManga } from "@/context/mangaContext";
import { ArrowLeft, SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import MangaCard from "@/components/app-mangaCard";
import SearchCard from "@/components/app-searchMangaCard";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import AddMangaModel from "@/components/app-addMangaModel";

const Search = () => {
  const {
    loading,
    searchManga,
    searchResult,
    setSearchQuery,
    error,
    searchQuery,
  } = useManga();
  const { profile } = useAuth();

  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const handleAddManga = () => {
    if (!isModalOpen) {
      openModal();
    }
  };
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
        <div className="mt-[70px] w-[100%] flex flex-wrap gap-5 p-4 justify-center">
          {loading ? (
            <p>Loading...</p>
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
                  handleAdd={handleAddManga}
                />
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
      {isModalOpen && <AddMangaModel onClose={closeModal} />}
    </div>
  );
};

export default Search;
