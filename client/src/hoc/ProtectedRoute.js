"use client";
const { useAuth } = require("@/context/authContext");
const { useRouter } = require("next/navigation");
const { useEffect } = require("react");

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading....</p>;

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
