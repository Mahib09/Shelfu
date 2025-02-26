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
  const { user } = useAuth();
  useEffect(() => {
    const fetchUserCollection = async () => {
      try {
        const userId = user.uid;
        const response = await axios.get(
          `http://localhost:3001/usercollection/${userId}`,
          {
            withCredentials: true,
          }
        );
        setCollection(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserCollection();
  }, [user]);
  return (
    <ProtectedRoute>
      <div>{user ? <MangaCarousel /> : <>No user</>}</div>
    </ProtectedRoute>
  );
}
