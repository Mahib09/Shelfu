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

export default function Dashboard() {
  const [userCollection, setUserCollection] = useState([]); // Initialize userCollection as an empty array
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
    // Check if the user is logged in after component mounts
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("No User LoggedIn");
      router.push("/auth/login");
    } else {
      setUser(currentUser); // Set user once it's available
    }
  }, [router]);

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

  // Render the user collection
  return (
    <div style={{ width: pagewidth, transition: "width 0.3s ease" }}>
      <div className="w-max">
        <input
          type="text"
          placeholder="search manga"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button type="button" onClick={handleSearch}>
          <Search />
        </button>
      </div>

      {/* <h1>User Collection</h1>
      {userCollection?.length > 0 ? (
        userCollection.map((item) => (
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
      <button className="flex items-center justify-center w-[var(--slider-padding)] bg-[rgba(0,0,0,.25)] z-10 my-[0.25rem] mx-0 hover:bg-[rgba(0,0,0,.5)] cursor-pointer border-none rounded-md rounded-r-none">
        <ChevronRight color="white" size={40} />
      </button> */}

      <MangaCarousel />
    </div>
  );
}
