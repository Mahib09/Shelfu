"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const WithProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth(); // Access user state from context

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      router.push("/auth/login"); // Redirect to login if not logged in
    }
  }, [isLoggedIn]);

  // Show loading spinner if authentication is still in progress
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or other loading component
  }
  // If the user is authenticated, render the children components (protected page)
  return children;
};

export default WithProtectedRoute;
