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
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#f8f4ef] to-[#eae2d6]">
        <p className="mt-4 text-lg text-[#5a4631]">Loading...</p>
      </div>
    ); // show spinner while checking
  }

  if (isLoggedIn === false) {
    return null; // don't render protected content while redirecting
  }

  return children; // user is logged in, show protected page
};

export default WithProtectedRoute;
