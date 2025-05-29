"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const WithProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, loading, router]);

  if (loading || (!isLoggedIn && !loading)) {
    return <div>Loading...</div>; // or a spinner
  }

  return children;
};

export default WithProtectedRoute;
