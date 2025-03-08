"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const WithProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth(); // Access user state from context
  const [hasRedirected, setHasRedirected] = useState(false); // Track redirection
  const [isPageLoading, setIsPageLoading] = useState(true); // State to manage page loading

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      router.push("/auth/login"); // Redirect to login if not logged in
    } else if (!loading) {
      setIsPageLoading(false); // If loading is done, stop page loading
    }
  }, [isLoggedIn, loading, router]);

  if (isPageLoading) {
    return <p>Loading...</p>; // Show loading state while checking auth status
  }

  // If the user is authenticated, render the children components (protected page)
  return children;
};

export default WithProtectedRoute;
