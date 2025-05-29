"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const WithProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (isLoggedIn === false && !loading) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, loading, router]);

  if (loading || isLoggedIn === null) {
    return <div>Loading...</div>; // show spinner while checking
  }

  if (isLoggedIn === false) {
    return null; // don't render protected content while redirecting
  }

  return children; // user is logged in, show protected page
};

export default WithProtectedRoute;
