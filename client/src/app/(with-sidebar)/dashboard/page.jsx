"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebase"; // Adjust path based on your file structure
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useManga } from "@/context/mangaContext";

export default function Dashboard() {
  const [userCollection, setUserCollection] = useState([]); // Initialize userCollection as an empty array
  const router = useRouter();
  const [user, setUser] = useState(null);
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

        // Update state with the fetched data
        setUserCollection(response.data);
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
    <div>
      <div>
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

      <h1>User Collection</h1>
      <div>
        {userCollection.length > 0 ? (
          userCollection.map((item) => (
            <ul key={item.userCollectionId} className="flex gap-3">
              <li>{item.volume.seriesName}</li>
              <li>{item.volume.volumeNumber}</li>
              <li>{item.volume.author}</li>
              <li>{item.status}</li>
              <li>{item.notes}</li>
            </ul>
          ))
        ) : (
          <div>No items found in your collection.</div> // More descriptive message for empty state
        )}
      </div>
    </div>
  );
}
