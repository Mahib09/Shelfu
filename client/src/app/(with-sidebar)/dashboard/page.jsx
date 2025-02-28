"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebase"; // Adjust path based on your file structure
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useManga } from "@/context/mangaContext";
import MangaCard from "@/components/app-mangaCard";
import MangaCarousel from "@/components/app-mangaCarousel";
import { useUi } from "@/context/uiContext";
import { useAuth } from "@/context/authContext";
import ProtectedRoute from "@/hoc/ProtectedRoute";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [userCollection, setUserCollection] = useState([]); // Initialize userCollection as an empty array
  const router = useRouter();
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
  const { user, logout } = useAuth();
  const handleSignout = async (e) => {
    e.preventDefault();
    console.log("clicked");
    await logout();
  };
  return (
    <ProtectedRoute>
      <div>{user ? <MangaCarousel /> : <>No user</>}</div>
      <Button variant="destructive" onClick={handleSignout}>
        Signout
      </Button>
    </ProtectedRoute>
  );
}
